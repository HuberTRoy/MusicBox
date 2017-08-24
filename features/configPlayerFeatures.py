__author__ = 'cyrbuzz'

import os
import randow

from base import *

import addtion


class ConfigPlayWidgets(QObject):

    def __init__(self, playwidgets):
        super(ConfigPlayWidgets, self).__init__()

        self.playwidgets = playwidgets

        # 0模式是列表循环。1模式是单曲循环，2模式是随机播放。
        self.module = 0

        self.bindConnect()

    def bindConnect(self):
        self.playwidgets.previousButton.clicked.connect(self.previousSing)
        self.playwidgets.playButton.clicked.connect(lambda: self.playEvent(self.playwidgets.player))
        self.playwidgets.pauseButton.clicked.connect(lambda: self.pauseEvent(self.playwidgets.player))
        self.playwidgets.nextButton.clicked.connect(self.nextSing)
        self.playwidgets.volume.clicked.connect(self.volumeEvent)
        self.playwidgets.noVolume.clicked.connect(self.noVolumeEvent)
        self.playwidgets.single.clicked.connect(self.singleEvent)
        self.playwidgets.repeat.clicked.connect(self.repeatEvent)
        self.playwidgets.shuffle.clicked.connect(self.shuffleEvent)
        self.playwidgets.playlist.clicked.connect(self.playlistEvent)
        
        self.playwidgets.slider.sliderReleased.connect(self.sliderEvent)
        self.playwidgets.slider.sliderPressed.connect(self.sliderPressEvent)
        self.playwidgets.volumeSlider.valueChanged.connect(self.volumeChangedEvent)
   
   # 功能。
    def previousSing(self):
        # 前一首。
        self.playwidgets.player.playList.previous()

    def nextSing(self):
        # 下一首。
        self.playwidgets.player.playList.next()

    def setPlayerAndPlayList(self, data, index=0):
        """方便外部调用。一键添加歌曲。"""
        """防止重复。"""
        authorAndName = data['author'] + data['name']
        for i, mediaInfo in enumerate(self.playwidgets.playList.musicList):
            checkAuthorAndName = mediaInfo['author'] + mediaInfo['name']
            # if data in self.playList.musicList:
            if authorAndName == checkAuthorAndName:
                # index = self.playList.musicList.index(data)
                if self.playwidgets.player.playList.currentIndex == i and i != 0:
                    return

                self.playwidgets.player.setIndex(i)

                return

        # 添加资源当前项到播放列表。
        sureSetUp = self.playwidgets.player.setMusic(data['url'], data)
        if not sureSetUp:
            self.playwidgets.currentMusic.setShortInfo('音乐不可播放', data['author'], data['music_img'])
            return 
            
        self.playwidgets.playList.addMusic(data)

        # 添加显示播放列表的显示项。
        self.playwidgets.playList.addPlayList(data['name'], data['author'], data['time'])
        # 更改当前音乐的信息。
        self.playwidgets.currentMusic.setShortInfo(data['name'], data['author'], data['music_img'])
        # 添加歌曲到播放器。
        # index = len(self.playList.musicList)
        # index = self.player.playList.mediaCount()
        # self.player.setIndex(index-1)

    def setPlayerAndPlaylists(self, datas:list):
        datas = datas[::-1]
        for i in datas:
            # self.playList.addMusic(i)
            self.playwidgets.playList.addPlayList(i['name'], i['author'], i['time'])

        self.playwidgets.playList.addMusics(datas)
        
        self.playwidgets.player.setAllMusics(datas)

        sureSetUp = self.playwidgets.player.setMusic(i['url'], i)
        if not sureSetUp:
            self.playwidgets.currentMusic.setShortInfo('音乐不可播放', data['author'], data['music_img'])
            self.nextSing()
            return

        self.playwidgets.currentMusic.setShortInfo(i['name'], i['author'], i['music_img'])

    def saveCookies(self):
        self.playwidgets.playList.saveCookies()
        self.playwidgets.player.saveCookies()

    def loadCookies(self):
        self.playwidgets.playList.loadCookies()
        self.playwidgets.player.loadCookies()

    # 事件。
    def playEvent(self, media):
        """播放事件。"""
        self.playwidgets.playButton.hide()
        self.playwidgets.pauseButton.show()
        media.play()

    def pauseEvent(self, media):
        """暂停事件。"""
        self.playwidgets.pauseButton.hide()
        self.playwidgets.playButton.show()
        media.pause()

    def stopEvent(self, media):
        self.playwidgets.pauseButton.hide()
        self.playwidgets.playButton.show()
        media.stop()

    def volumeEvent(self):
        """有音量时事件。"""
        self.playwidgets.volume.hide()
        self.playwidgets.noVolume.show()
        self.playwidgets.volumeSlider.setValue(0)

    def noVolumeEvent(self):
        """静音后事件。"""
        self.playwidgets.noVolume.hide()
        self.playwidgets.volume.show()
        self.playwidgets.volumeSlider.setValue(100)

    def volumeChangedEvent(self):
        """音量改变事件。"""
        self.playwidgets.player.setVolume(self.playwidgets.volumeSlider.value())

    def singleEvent(self):
        """单曲循环事件。将模式更改为随机播放。"""
        self.playwidgets.single.hide()
        self.playwidgets.shuffle.show()
        # 设置成随机。详情看http://doc.qt.io/qt-5/qmediaplaylist.html#PlaybackMode-enum。
        self.playwidgets.player.playList.setPlaybackMode(4)
        self.module = 2

    def repeatEvent(self):
        """列表循环事件。将模式更改为单曲循环。"""
        self.playwidgets.repeat.hide()
        self.playwidgets.single.show()
        self.playwidgets.player.playList.setPlaybackMode(1)
        self.module = 1

    def shuffleEvent(self):
        """随机播放事件。将模式更改为列表循环。"""
        self.playwidgets.shuffle.hide()
        self.playwidgets.repeat.show()
        self.playwidgets.player.playList.setPlaybackMode(3) 
        self.module = 0

    def playlistEvent(self):
        """用于显示播放列表或隐藏播放列表。"""
        if self.playwidgets.playList.isVisible():
            self.playwidgets.playList.hide()
        else:
            self.playwidgets.playList.move(self.playwidgets.parent.width()-574,
             self.playwidgets.parent.height()-477-self.playwidgets.height())
            self.playwidgets.playList.show()
            self.playwidgets.playList.raise_()

    def sliderEvent(self):
        """拖动进度条的事件，用于快进快退。"""
        value = self.playwidgets.slider.value()
        currentSliderTime = self.playwidgets.player.allTime()*value
        self.playwidgets.player.setPosition(currentSliderTime)

        # 按下时将会取消进度条的自动更新，现在恢复它。
        self.playwidgets.player.setConnects()
        # 将进度条移动的事件清除，因为自动更新是不需要的。
        self.playwidgets.slider.sliderMoved.disconnect()

    def sliderPressEvent(self):
        """按下准备拖动时。"""
        # 将进度条自动更新取消。
        self.playwidgets.player.disconnect()
        # 添加进度条移动事件。
        self.playwidgets.slider.sliderMoved.connect(self.sliderMovedEvent)

    def sliderMovedEvent(self):
        """用于拖动时显示当前位置的时间。"""
        # 进度条移动事件，会显示当前的时间。
        value = self.playwidgets.slider.value()
        currentSliderTime = self.playwidgets.player.allTime()*value/1000

        self.playwidgets.currentTime.setText(addition.itv2time(currentSliderTime))