"""包含音乐的组件, 显示用信息, 一个自定义可HOVER整行效果的TableWidget。"""
"""
这是一个独立的播放器组件，只需要调用playWidgets里的setPlayerAndPlayList(s)即可播放音乐。
需要的data类型是{'name': str, 'time': str, 'author': str, music_img: None/url}
"""
__author__ = 'cyrbuzz'

import re
import os
import random

from PyQt5.QtWidgets import (QAction, QAbstractItemView, QFrame, QHBoxLayout, QLabel, QMenu, QPushButton, QSlider, QTableWidget, 
                                                              QTableWidgetItem, QVBoxLayout, QApplication)
from PyQt5.QtGui import QBrush, QColor, QCursor
from PyQt5.QtCore import QUrl, Qt, QObject, QPropertyAnimation, QRect, QEasingCurve, QAbstractAnimation
from PyQt5.QtMultimedia import QMediaPlayer, QMediaContent, QMediaMetaData, QMediaPlaylist

import addition

from base import (checkFolder, cacheFolder, checkOneFolder, centerHTML, HBoxLayout, HStretchBox, pickle, PicLabel, pyqtSignal,  
                                     QTextEdit,  ScrollArea, VBoxLayout)
# ../features
from asyncBase import aAsync, toTask
from netEaseApi import NetEaseWebApi


api = NetEaseWebApi()


# 底部的播放组件。主要是用于交互，包括播放/前进/后退/进度条/音量控制/播放模式/打开or关闭音乐列表。
class PlayWidgets(QFrame):
    """播放组件，包括播放按钮，进度条君，音量君，当前歌曲菜单君。"""

    def __init__(self, parent=None):
        super(PlayWidgets, self).__init__()

        self.parent = parent
        # 0模式是列表循环。1模式是单曲循环，2模式是随机播放。
        self.module = 0

        with open('QSS/playWidgets.qss', 'r') as f:
            self.setStyleSheet(f.read())

        self.playList = PlayList(self)
        self.currentMusic = CurrentMusic(self)
        self.player = Player(self)

        self.setButtons()
        self.setLabels()
        self.setSliders()

        self.setLayouts()

        self.loadCookies()

    # 布局。
    def setButtons(self):
        """设置所有的按钮组件，包括前/后一首，暂停/播放等。"""
        self.previousButton = QPushButton(self)
        self.previousButton.setObjectName("previousButton")
        self.previousButton.clicked.connect(self.previousSing)

        self.playButton = QPushButton(self)
        self.playButton.setObjectName("playButton")
        self.playButton.clicked.connect(lambda: self.playEvent(self.player))

        self.pauseButton = QPushButton(self)
        self.pauseButton.setObjectName("pauseButton")
        self.pauseButton.clicked.connect(lambda: self.pauseEvent(self.player))

        # 默认hide.
        self.pauseButton.hide()

        self.nextButton = QPushButton(self)
        self.nextButton.setObjectName("nextButton")
        self.nextButton.clicked.connect(self.nextSing)

        self.volume = QPushButton(self)
        self.volume.setObjectName("volume")
        self.volume.clicked.connect(self.volumeEvent)

        self.noVolume = QPushButton(self)
        self.noVolume.setObjectName("no_volume")
        self.noVolume.hide()
        self.noVolume.clicked.connect(self.noVolumeEvent)

        self.single = QPushButton(self)
        self.single.setObjectName("single")
        self.single.hide()
        self.single.setToolTip("单曲循环")
        self.single.clicked.connect(self.singleEvent)

        self.repeat = QPushButton(self)
        self.repeat.setObjectName("repeat")
        self.repeat.setToolTip("列表循环")
        self.repeat.clicked.connect(self.repeatEvent)

        self.shuffle = QPushButton(self)
        self.shuffle.setObjectName("shuffle")
        self.shuffle.hide()
        self.shuffle.setToolTip("随机播放")
        self.shuffle.clicked.connect(self.shuffleEvent)

        self.playlist = QPushButton(self)
        self.playlist.setObjectName("playlist")
        self.playlist.clicked.connect(self.playlistEvent)

    def setLabels(self):
        """包括两个时间。当前播放时间/歌曲总时间。"""

        self.currentTime = QLabel(self)
        self.countTime = QLabel(self)

        self.currentTime.setText('01:09')
        self.countTime.setText('03:04')

    def setSliders(self):
        """设置进度条君。"""
        self.slider = QSlider(self)
        self.slider.setMinimumHeight(5)
        self.slider.setMinimumWidth(440)
        # 将范围设置成1000滚动时更舒服。
        self.slider.setRange(0, 1000)
        self.slider.setObjectName("slider")
        self.slider.setOrientation(Qt.Horizontal)
        self.slider.sliderReleased.connect(self.sliderEvent)
        self.slider.sliderPressed.connect(self.sliderPressEvent)

        self.volumeSlider = QSlider(self)
        self.volumeSlider.setValue(100)
        self.volumeSlider.setMinimumHeight(5)
        self.volumeSlider.setObjectName("volumeSlider")
        self.volumeSlider.setOrientation(Qt.Horizontal)
        self.volumeSlider.valueChanged.connect(self.volumeChangedEvent)

    def setLayouts(self):
        """设置布局。"""
        self.mainLayout = QHBoxLayout()

        self.mainLayout.addWidget(self.previousButton)
        self.mainLayout.addWidget(self.playButton)
        self.mainLayout.addWidget(self.pauseButton)
        self.mainLayout.addWidget(self.nextButton)

        self.mainLayout.addWidget(self.currentTime)
        self.mainLayout.addWidget(self.slider)
        self.mainLayout.addWidget(self.countTime)

        self.mainLayout.addWidget(self.volume)
        self.mainLayout.addWidget(self.noVolume)

        self.mainLayout.addWidget(self.volumeSlider)
        self.mainLayout.addSpacing(10)

        self.mainLayout.addWidget(self.single)
        self.mainLayout.addWidget(self.repeat)
        self.mainLayout.addWidget(self.shuffle)

        self.mainLayout.addSpacing(10)

        self.mainLayout.addWidget(self.playlist)
        self.mainLayout.addStretch(1)
        self.mainLayout.setContentsMargins(0, 0, 0, 0)
        self.setLayout(self.mainLayout)

    # 功能。
    def previousSing(self):
        # 前一首。
        self.player.playList.previous()

    def nextSing(self):
        # 下一首。
        self.player.playList.next()

    def setPlayerAndPlayList(self, data:dict, index=0):
        """方便外部调用。一键添加歌曲。"""
        """防止重复。"""
        authorAndName = data['author'] + data['name']
        for i, mediaInfo in enumerate(self.playList.musicList):
            checkAuthorAndName = mediaInfo['author'] + mediaInfo['name']
            # if data in self.playList.musicList:
            if authorAndName == checkAuthorAndName:
                # index = self.playList.musicList.index(data)
                if self.player.playList.currentIndex == i and i != 0:
                    return

                self.player.setIndex(i)

                return

        # 添加资源当前项到播放列表。
        sureSetUp = self.player.setMusic(data['url'], data)
        if not sureSetUp:
            self.currentMusic.setShortInfo('音乐不可播放', data['author'], data['music_img'])
            return 
            
        self.playList.addMusic(data)

        # 添加显示播放列表的显示项。
        self.playList.addPlayList(data['name'], data['author'], data['time'])
        # 更改当前音乐的信息。
        self.currentMusic.setShortInfo(data['name'], data['author'], data['music_img'])
        # 添加歌曲到播放器。
        # index = len(self.playList.musicList)
        # index = self.player.playList.mediaCount()
        # self.player.setIndex(index-1)

    def setPlayerAndPlaylists(self, datas:list):
        datas = datas[::-1]
        for i in datas:
            # self.playList.addMusic(i)
            self.playList.addPlayList(i['name'], i['author'], i['time'])

        self.playList.addMusics(datas)
        
        self.player.setAllMusics(datas)

        sureSetUp = self.player.setMusic(i['url'], i)
        if not sureSetUp:
            self.currentMusic.setShortInfo('音乐不可播放', data['author'], data['music_img'])
            self.nextSing()
            return

        self.currentMusic.setShortInfo(i['name'], i['author'], i['music_img'])

    def saveCookies(self):
        self.playList.saveCookies()
        self.player.saveCookies()

    def loadCookies(self):
        self.playList.loadCookies()
        self.player.loadCookies()

    # 事件。
    def playEvent(self, media):
        """播放事件。"""
        self.playButton.hide()
        self.pauseButton.show()
        media.play()

    def pauseEvent(self, media):
        """暂停事件。"""
        self.pauseButton.hide()
        self.playButton.show()
        media.pause()

    def stopEvent(self, media):
        self.pauseButton.hide()
        self.playButton.show()
        media.stop()

    def volumeEvent(self):
        """有音量时事件。"""
        self.volume.hide()
        self.noVolume.show()
        self.volumeSlider.setValue(0)

    def noVolumeEvent(self):
        """静音后事件。"""
        self.noVolume.hide()
        self.volume.show()
        self.volumeSlider.setValue(100)

    def volumeChangedEvent(self):
        """音量改变事件。"""
        self.player.setVolume(self.volumeSlider.value())

    def singleEvent(self):
        """单曲循环事件。将模式更改为随机播放。"""
        self.single.hide()
        self.shuffle.show()
        # 设置成随机。详情看http://doc.qt.io/qt-5/qmediaplaylist.html#PlaybackMode-enum。
        self.player.playList.setPlaybackMode(4)
        self.module = 2

    def repeatEvent(self):
        """列表循环事件。将模式更改为单曲循环。"""
        self.repeat.hide()
        self.single.show()
        self.player.playList.setPlaybackMode(1)
        self.module = 1

    def shuffleEvent(self):
        """随机播放事件。将模式更改为列表循环。"""
        self.shuffle.hide()
        self.repeat.show()
        self.player.playList.setPlaybackMode(3) 
        self.module = 0

    def playlistEvent(self):
        """用于显示播放列表或隐藏播放列表。"""
        if self.playList.isVisible():
            self.playList.hide()
        else:
            self.playList.move(self.parent.width()-574, self.parent.height()-477-self.height())
            self.playList.show()
            self.playList.raise_()

    def sliderEvent(self):
        """拖动进度条的事件，用于快进快退。"""
        value = self.slider.value()
        currentSliderTime = self.player.allTime()*value
        self.player.setPosition(currentSliderTime)

        # 按下时将会取消进度条的自动更新，现在恢复它。
        self.player.setConnects()
        # 将进度条移动的事件清除，因为自动更新是不需要的。
        self.slider.sliderMoved.disconnect()

    def sliderPressEvent(self):
        """按下准备拖动时。"""
        # 将进度条自动更新取消。
        self.player.setDisconnects()
        # 添加进度条移动事件。
        self.slider.sliderMoved.connect(self.sliderMovedEvent)

    def sliderMovedEvent(self):
        """用于拖动时显示当前位置的时间。"""
        # 进度条移动事件，会显示当前的时间。
        value = self.slider.value()
        currentSliderTime = self.player.allTime()*value/1000
        currentSliderTime = addition.itv2time(currentSliderTime)
        self.currentTime.setText(currentSliderTime)
        self.player.timeChanged.emit(currentSliderTime)


# 显示用音乐列表，用于显示当前添加到播放列表里的音乐。
class PlayList(QFrame):
    """播放列表。"""
    musicListCookiesFolder = 'cookies/playlist/musicList.cks'
    allCookiesFolder = [musicListCookiesFolder]

    def __init__(self, parent=None):
        super(PlayList, self).__init__()
        
        self.parent = parent
        
        self.setParent(self.parent.parent)
        self.setObjectName("PlayList")

        self.musicList = []

        self.currentRow = -1

        self.allRow = 0

        self.itemColor = QBrush(QColor.fromRgb(95,95,99))

        with open('QSS/playList.qss', 'r') as f:
            self.setStyleSheet(f.read())

        self.resize(574, 477)

        self.hide()

        self.setButtons()
        self.setLabels()
        self.setTables()

        self.setLayouts()

    # 布局。
    def setButtons(self):
        self.closeButton = QPushButton("×", self)
        self.closeButton.setObjectName("closeButton")
        self.closeButton.clicked.connect(self.hide)

    def setLabels(self):
        pass

    def setTables(self):
        self.playList = _TableWidget(self)
        self.playList.setMinimumWidth(self.width())
        self.playList.setColumnCount(3)
        # 显示名字的部分占全部长度的2/3.
        self.playList.setColumnWidth(0, self.width()/3*2)
        self.playList.horizontalHeader().setVisible(False)
        self.playList.horizontalHeader().setStretchLastSection(True)
        self.playList.verticalHeader().setVisible(False)
        self.playList.setShowGrid(False)
        self.playList.setAlternatingRowColors(True)

        self.playList.setEditTriggers(QAbstractItemView.NoEditTriggers)
        self.playList.setSelectionBehavior(QAbstractItemView.SelectRows)

        self.playList.itemDoubleClicked.connect(self.play)

    def setLayouts(self):
        self.mainLayout = QVBoxLayout()

        self.headerLayout = QHBoxLayout()
        self.headerLayout.addStretch(1)
        self.headerLayout.addWidget(self.closeButton)

        self.mainLayout.addLayout(self.headerLayout)
        self.mainLayout.addWidget(self.playList)

        self.setLayout(self.mainLayout)

    # 功能。
    def play(self):
        """将当前选中的歌曲添加到播放列表。"""
        if self.currentRow == self.playList.currentRow():
            return
        else:
            # 以MediaContent为索引，是一个字典，包括url，name, author。
            currentRow = self.playList.currentRow()
            currentMusic = self.musicList[currentRow]

            self.parent.player.setIndex(currentRow)
            
            self.parent.currentMusic.setShortInfo(currentMusic['name'], currentMusic['author'])

            self.currentRow = currentRow

    def clear(self):
        self.playList.clears()

    def addMusic(self, data):
        self.musicList.append(data)

    def addMusics(self, mlist):
        self.musicList.extend(mlist)

    def addPlayList(self, name, author, time):
        # 将信息添加到显示列表。
        self.playList.setRowCount(self.allRow+1)

        musicName = QTableWidgetItem(name)
        self.playList.setItem(self.allRow, 0, musicName)

        musicAuthor = QTableWidgetItem(author)
        musicAuthor.setForeground(self.itemColor)
        self.playList.setItem(self.allRow, 1, musicAuthor)

        musicTime = QTableWidgetItem(time)
        musicTime.setForeground(self.itemColor)
        self.playList.setItem(self.allRow, 2, musicTime)

        self.allRow += 1

    @checkFolder(allCookiesFolder)
    def saveCookies(self):
        with open(self.musicListCookiesFolder, 'wb') as f:
            pickle.dump(self.musicList, f)

    @checkFolder(allCookiesFolder)
    def loadCookies(self):
        with open(self.musicListCookiesFolder, 'rb') as f:
            self.musicList = pickle.load(f)

        for i in self.musicList:
            self.addPlayList(i['name'], i['author'], i['time'])


# 当前播放的音乐，位于左侧导航栏最下方，播放组件的上方。包括当前音乐的logo，音乐名/作者。点击图片会显示详细信息(暂不完善。)
class CurrentMusic(QFrame):
    """当前正在播放的音乐，包括一个图片，音乐名称，作曲人。以及鼠标移动到上面的遮罩。"""

    def __init__(self, parent=None):
        super(CurrentMusic, self).__init__()
        self.parent = parent
        self.grandparent = self.parent.parent
        self.setParent(self.grandparent)
        self.setObjectName("currentMusic")

        with open('QSS/currentMusic.qss', 'r') as f:
            self.setStyleSheet(f.read())

        # 用于标记是否切换了歌曲，防止多次获取同一个歌词。
        self.currentMusicId = 0
            
        # 用于切换歌词，知道当前的歌词滚到哪一个了。
        self.order = -2

        # 用于切换歌词时滚动滚动条。
        # self.sliderValue = 0

        # 每一条歌词该滚多少。
        # self.slideValue = 0

        # 有多少条歌词控件。
        self.count = 0

        # 歌词缓存。
        self.lyricCache = ''

        # 将窗口提前并激活窗口。
        self.raise_()
        self.activateWindow()

        self.shortInfo = CurrentMusicShort(self)
        self.detailInfo = CurrentMusicDetail(self)
        
        # 
        self.showDetail = 'animation'
        self.showShort = 'animation'
        self.mousePos = None

        self.mainLayout = QHBoxLayout(self)
        self.mainLayout.addWidget(self.shortInfo)
        self.mainLayout.addWidget(self.detailInfo)
        # 保证没有间隙。
        self.mainLayout.setContentsMargins(0, 0, 0, 0)
        self.mainLayout.setSpacing(0)

        self.setFeatures()

    # 功能。
    @checkOneFolder(cacheFolder)
    def setShortInfo(self, name=None, author=None, pic=None):
        """方便设置信息。"""
        if pic:
            cacheList = os.listdir(cacheFolder)
            names = str(pic[pic.rfind('/')+1:])
            if names in cacheList:
                pic = cacheFolder+'/'+names

            self.shortInfo.musicPic.setSrc(pic)

        self.shortInfo.musicName.setText(name)
        self.shortInfo.musicAuthor.setText(author)

    def setDetailInfo(self):
        title = self.shortInfo.musicName.text()
        self.detailInfo.titleLabel.setText(title)
        
        self.showLyric()

    def getDetailInfo(self):
        """点击后进行动画效果的: 显示某歌曲的详细信息。"""
        self.shortInfo.hide()
        self.detailInfo.show()

        self.showDetail = QPropertyAnimation(self, b"geometry")

        x = self.pos().x()
        y = self.pos().y()

        self.showDetail.setStartValue(QRect(x, y, self.width(), self.height()))
        # 获取顶层父窗口的长度。
        self.showDetail.setEndValue(QRect(0, self.grandparent.header.height()+2, self.grandparent.width(), self.grandparent.mainContent.height()))
        self.showDetail.setDuration(300)
        self.showDetail.setEasingCurve(QEasingCurve.InBack)

        self.showDetail.start(QAbstractAnimation.DeleteWhenStopped)
        # 将该组件显示在最前，默认会嵌入到父组件里面。
        self.raise_()

        self.setDetailInfo()

    def showLyric(self):
        lyric = self.getLyric()
        # lyric.add_done_callback(lambda future: self.detailInfo.detailText.setText(centerHTML(future.result)()))
        lyric.add_done_callback(self.lyricCallback)

    def lyricCallback(self, future):
        """lyric加载完成后的回调函数。"""
        # [00:00.00] 作曲 : cyr
        # [00:01.00] 作词 : buzz
        # [00:17.460]
        # [00:33.630] :)

        self.detailInfo.removeAllLyricLabels()
        # 初始化。
        self.count = 0
        self.order = -2
        
        result = future.result().split('\n')
        
        signal = self.parent.player.timeChanged
        
        for x, i in enumerate(result):
            data = re.findall(r'\[+(.*?)\]+(.*)', i)
            # [''] or [':)']
            if not data:
                if not i:
                    continue
                else:
                    self.detailInfo.addLyricLabel(_LyricLabel('00:00', i,  x, signal, self))
                    continue

            # [00:17.460]
            if not data[0][1]:
                self.detailInfo.addLyricLabel(_LyricLabel(data[0][0], '\n',  x, signal, self))
                continue

            # [00:01.00] 作词 : buzz
            self.detailInfo.addLyricLabel(_LyricLabel(data[0][0], data[0][1],  x, signal, self))
        
        self.count = x
        # 这边并不会返回添加了控件后的Value值。
        # self.sliderValue = self.detailInfo.maximumValue()
        # self.slideValue = round(self.sliderValue/x)

    def  slide(self):
        # 待优化。
        # 问题如上所说。
        # value = self.detailInfo.verticalScrollBar().value()
        maxValue = round(self.detailInfo.maximumValue()/self.count)*self.order
        # for i in range(value, maxValue):
        self.detailInfo.verticalScrollBar().setValue(maxValue)

    def unLightLyric(self):
        if self.order < 0:
            return 

        self.detailInfo.allLyrics[self.order].unLightMe()

    @toTask
    def getLyric(self):
        musicInfo = self.parent.player.getCurrentMusicInfo()
        if not musicInfo:
            return "✧请慢慢欣赏~"

        musicId = musicInfo.get('music_id')
        if self.currentMusicId == musicId:
            return self.lyricCache
            # return self.detailInfo.detailText.toPlainText()

        future = aAsync(api.lyric, musicId)
        data = yield from future

        if not data:
            self.currentMusicId = musicId
            return "✧请慢慢欣赏~"

        # 这里暂时处理下不获取时间信息，只获取歌词信息。
        # data = re.sub(r'\[.*?\]', '', data)
        self.currentMusicId = musicId
        self.lyricCache = data
        return data    

    def getShortInfo(self):
        """返回到原来的缩略图信息。"""
        self.detailInfo.hide()
        self.showShort = QPropertyAnimation(self, b"geometry")
        
        x = self.pos().x()
        y = self.pos().y()
        
        self.showShort.setStartValue(QRect(0, self.grandparent.header.height(), self.grandparent.width(), self.grandparent.mainContent.height()))
        self.showShort.setEndValue(QRect(0, self.grandparent.height()-64-self.parent.height(), self.grandparent.navigation.width(), 64))
        self.showShort.setDuration(300)
        self.showShort.setEasingCurve(QEasingCurve.InBack)
        
        self.showShort.start(QAbstractAnimation.DeleteWhenStopped)

        self.shortInfo.show()
        self.raise_()

    def setFeatures(self):
        self.detailInfo.recoveryButton.clicked.connect(self.getShortInfo)

    # 事件。
    def mousePressEvent(self, event):
        self.mousePos = QCursor.pos()

    def mouseReleaseEvent(self, evnet):
        if QCursor.pos() != self.mousePos:
            return
        else:
            self.getDetailInfo()


# 显示简短信息（默认。）
class CurrentMusicShort(QFrame):
    """用于显示当前歌曲的简单信息。"""
    def __init__(self,parent=None):
        super(CurrentMusicShort, self).__init__()
        self.parent = parent
        self.setObjectName('short')

        self.mousePos = None

        self.setLabels()

        # self.setButtons()

        self.setLayouts()

        self.init()

    # 布局。
    def setLabels(self):
        self.musicName = QLabel(self)
        self.musicName.adjustSize()
        self.musicAuthor = QLabel(self)

        self.musicPic = PicLabel('resource/no_music.png', 64, 64)
        self.musicPic.setObjectName("musicPic")

        self.musicMask = PicLabel('resource/expand.png', 64, 64)
        self.musicMask.hide()
        # 设置背景透明。
        self.musicMask.setStyleSheet('QLabel {background-color: rgba(0, 0, 0, 50%;)}')

        # 遮罩层属于musicPic, 用布局简单弄一下即可。
        self.musicLayout = VBoxLayout(self.musicPic)
        self.musicLayout.addWidget(self.musicMask)

    def setLayouts(self):
        """布局。"""
        self.mainLayout = QHBoxLayout()
        self.mainLayout.setContentsMargins(0, 0, 0, 0)

        self.musicInfo = QVBoxLayout()
        self.mainLayout.setContentsMargins(0, 0, 0, 0)

        self.musicInfo.addWidget(self.musicName)
        self.musicInfo.addWidget(self.musicAuthor)

        self.mainLayout.addWidget(self.musicPic)
        self.mainLayout.addLayout(self.musicInfo)

        self.mainLayout.setStretch(0, 1)
        self.mainLayout.setStretch(1, 2)

        self.setLayout(self.mainLayout)

    # 功能.
    def init(self):
        """默认情况下的显示，包括音乐图片，音乐名和音乐作者。"""
        self.musicName.setText("Enjoy it")
        self.musicAuthor.setText("Enjoy it")

    # 事件。
    def enterEvent(self, event):
        if not self.musicMask.isVisible():
            self.musicMask.show()

    def leaveEvent(self, event):
        if self.musicMask.isVisible():
            self.musicMask.hide()


# 显示详细信息（点击后的信息，不完善。）
class CurrentMusicDetail(ScrollArea):
    """
    showPic | MusicDetails
    ---------------------
    comments.

    MusicDetails
    title| recovery
    T        E        X        T
    """
    def __init__(self, parent):
        super(CurrentMusicDetail, self).__init__()
        # with open('QSS/currentMusic.qss', 'r', encoding='utf-8') as f:
        #     self.setStyleSheet(f.read())

        self.setObjectName('detail')
        self.hide()

        self.mainLayout = VBoxLayout(self.frame)
        self.topLayout = HBoxLayout()
        self.topMainLayout = VBoxLayout()
        self.topHeaderLayout = HBoxLayout()

        # 为歌词创建索引方便删除。
        self.allLyrics = []

        # self.detailText = QTextEdit()
        # self.detailText.setObjectName('detailText')
        # self.detailText.setReadOnly(True)

        self.titleLabel = QLabel("✧✧✧")
        self.titleLabel.setObjectName('titleLabel')

        self.recoveryButton = QPushButton()
        self.recoveryButton.setObjectName('recoveryButton')
        self.recoveryButton.setMinimumSize(24, 24)
        self.recoveryButton.setMaximumSize(36, 36)

        self.setLayouts()

    def setLayouts(self):
        self.mainLayout.addLayout(self.topLayout)

        # 为showPic预留。
        # self.topLayout.addStretch(1)
        
        self.topLayout.addLayout(self.topMainLayout)
        self.topMainLayout.addSpacing(25)
        self.topMainLayout.addLayout(self.topHeaderLayout)
        self.topHeaderLayout.addStretch(1)
        self.topHeaderLayout.addSpacing(100)
        self.topHeaderLayout.addWidget(self.titleLabel)
        self.topHeaderLayout.addStretch(1)
        self.topHeaderLayout.addSpacing(20)
        self.topHeaderLayout.addWidget(self.recoveryButton)
        self.topHeaderLayout.addSpacing(50)
        self.topMainLayout.addSpacing(30)

    def addLyricLabel(self, label):

        HStretchBox(self.topMainLayout, label)
        
        self.allLyrics.append(label)

    def removeAllLyricLabels(self):
        for i in self.allLyrics:
            i.deleteLater()
        self.allLyrics = []

        for i in range(3, self.topMainLayout.count()):
            self.topMainLayout.takeAt(i)


# 真 · 播放器，用于播放音频。
class Player(QMediaPlayer):
    """播放器组件。"""

    timeChanged = pyqtSignal(str)

    def __init__(self, parent=None):
        super(Player, self).__init__()
        self.setObjectName('player')

        self.parent = parent
        self.playWidgets = self.parent
        self.transTime = addition.itv2time
        self.musicTime = 0
        self.playList = _MediaPlaylist(self)
        # 默认列表循环。
        self.playList.setPlaybackMode(self.playList.Loop)

        self.setConnects()

    # 功能。
    def setConnects(self):
        """用于设置连接的信号槽。"""
        self.durationChanged.connect(self.countTimeEvent)
        self.positionChanged.connect(self.positionChangedEvent)
        self.stateChanged.connect(self.stateChangedEvent)
        self.error.connect(self.dealError)
        self.playList.setInitConnection()
        # self.currentMediaChanged.connect(self.currentMediaChangedEvent)
        # self.mediaStatusChanged.connect(self.mediaStatusChangedEvent)

    def setDisconnects(self):
        self.durationChanged.disconnect()
        self.positionChanged.disconnect()
        self.stateChanged.disconnect()
        self.error.disconnect()
        self.mediaStatusChanged.disconnect()
        # self.playList.setInitConnection()

    def setMusic(self, url, data):
        """设置当前的音乐，可用直接用网络链接。"""
        if url:
            if 'http' in url or 'file' in url:
                self.playList.addMedias(QMediaContent(QUrl(url)), data)
            else:
                self.playList.addMedias(QMediaContent(QUrl.fromLocalFile(url)), data)
            return True
        else:
            return False
            # self.playMusic()
    
    def setAllMusics(self, datas):
        pass
        self.playList.addAllMedias(datas)

    def setIndex(self, index):
        self.playList.setCurrentIndex(index)
        # self.playMusic()

    def allTime(self):
        """返回当前音乐的总时间。（秒）"""
        return self.duration()/1000

    def getCurrentMusicInfo(self):

        return self.playList.mediaList.get(self.currentMedia().canonicalUrl().toString())

    def playMusic(self, url=None, data=None):
        """播放音乐。"""
        if url:
            self.setMusic(url, data)
            # 播放事件。
            self.playWidgets.playEvent(self)
        else:
            self.playWidgets.playEvent(self)
        
    def dealError(self, error):
        # 具体内容看文档:
        # http://doc.qt.io/qt-5/qmediaplayer.html

        if error:
            musicInfo = self.playList.mediaList.pop(self.currentMedia().canonicalUrl().toString())
            self.loadRealMusicUrl(musicInfo)

    @toTask
    def loadRealMusicUrl(self, musicInfo):
        # 如果有个Url出错，比如音乐地址403重新获取下地址。
        musicId = musicInfo.get('music_id')
        # invalidUrl = musicInfo.get('url')

        if not musicId:
            self.playWidgets.nextSing()
            return

        future = aAsync(api.singsUrl, [musicId])
        data = yield from future

        if not data:
            self.playWidgets.nextSing()
            return 

        url = data[0]['url']
        musicInfo['url'] = url
        self.playList.mediaList[url] = musicInfo
        # replaceIndex = self.playList.musics.index(invalidUrl)

        self.playList.musics[self.playList.currentIndex] = url
        self.playList.play()

    def saveCookies(self):
        self.playList.saveCookies()

    def loadCookies(self):
        self.playList.loadCookies()

    # 事件。
    def countTimeEvent(self, duration):
        """总时间改变的事件。相当于加载完成歌曲的事件。"""
        self.musicTime = duration / 1000
        # print('COUNT{0}'.format(duration))
        self.playWidgets.countTime.setText(self.transTime(self.musicTime))
        self.playList.duration = duration

    def positionChangedEvent(self):
        """音乐在Media里以毫秒的形式保存，这里是播放时的进度条。"""
        currentTime = self.position()/1000
        transedTime = self.transTime(currentTime)
        self.playWidgets.currentTime.setText(transedTime)
        self.timeChanged.emit(transedTime)
        # print(self.transTime(currentTime))

        # position先于duration变化，会出现/0的情况。
        if self.musicTime == 0:
            return
        # *1000是为了与进度条的范围相匹配。
        self.playWidgets.slider.setValue(currentTime/self.musicTime*1000)

    def stateChangedEvent(self):
        """"""
        if self.state() == 0 and self.playList.mediaCount() == 0 and self.playWidgets.pauseButton.isVisible():
            self.playWidgets.stopEvent(self)

    # def mediaStatusChangedEvent(self, status):
        """"""
        # 8是无效音频。
        # if status == 8:
            # print(self.playList.currentIndex(), "当前下标")


# 自定义的QTableWidget, 做了hover一整行的操作，和右键菜单。
class _TableWidget(QTableWidget):

    def __init__(self,parent=None):
        super(_TableWidget, self).__init__()
        self.parent = parent

        self.setMouseTracking(True)
        self.entered.connect(self.itemHover)
        self.viewportEntered.connect(self.viewportHover)
        # #2D2F33
        self.itemDualBackground = QColor.fromRgb(45,47,51)
        # #303236
        self.itemBackground = QColor.fromRgb(48,50,54)
        # #323438
        self.itemHoverBackground = QColor.fromRgb(50,52,56)
        # #E2E2E2
        self.itemHoverColor = QColor.fromRgb(226,226,226)
        # #DCDDE4
        self.itemColor = QColor.fromRgb(220,221,228)
        # #5F5F63
        self.itemColor2 = QColor.fromRgb(95,95,99)
        
        # 当前记录的行数，用于判断鼠标是否离开了当前行。
        self.itemHoverRow = -1
        self.items = []

        self.setActions()

    # 功能。
    def setActions(self):
        
        self.actionClear = QAction('清空', self)
        self.actionClear.triggered.connect(self.clears)

        self.actionRemove = QAction('从列表中删除', self)
        self.actionRemove.triggered.connect(self.remove)

    def _setItems(self, row):
        # 用于记录一整行的item，设置这一整行item的foreground, foreground 是前景色但是只有字体颜色变化了。
        # background, 设置无效,不清楚为什么。
        # 并刷新当前记录的行数。

        self.items.append(self.item(row, 0)) 
        self.items.append(self.item(row, 1))
        self.items.append(self.item(row, 2))

        for i in self.items:
            if i:
                i.setForeground(self.itemHoverColor)
                i.setBackground(self.itemHoverBackground)

        self.itemHoverRow = row

    def itemHover(self, rowItem):
        # 为了实现整行的hover效果。
        row = rowItem.row()

        if row != self.itemHoverRow:
            # 执行第一次初始化。
            if not self.items:
                self._setItems(row)
            # 不是第一次，之前有过
            else:
                # 判断奇偶行还原。
                if row % 2 == 0:
                    for i in self.items:
                        i.setBackground(self.itemDualBackground)
                else:
                    for i in self.items:
                        i.setBackground(self.itemBackground)

                # 还原字体的颜色，第一个为color，其他的为color2.
                self.items[0].setForeground(self.itemColor)
                for i in self.items[1:]:
                    i.setForeground(self.itemColor2)

                # 重新记录并为当前的控件附上相应设置。
                self.items = []
                self._setItems(row)

    def viewportHover(self):
        # 用于还原item到初始化状态。
        if not self.items:
            return

        self.items[0].setForeground(self.itemColor)
        for i in self.items[1:]:
            i.setForeground(self.itemColor2)

        self.items = []
        self.itemHoverRow = -1

    def clears(self):
        """执行清除。"""
        # 删除table里的item。
        # clearContents只清除内容不清除行，清除后如果不设置行为0，行会保留，但是没有QTableWidgetItem，
        # setFroeground会出错，因为None对象是不能设置的。
        self.clearContents()
        self.setRowCount(0)
        playlist = self.parent.parent.player.playList
        playlist.clear()
        playlist.removeList = []
        playlist.mediaList = {}
        # 将音乐信息及索引回归初始化。
        self.parent.musicList = []
        self.parent.currentRow = -1
        self.parent.allRow = 0
        self.items = []
        self.itemHoverRow = -1
        # 将播放器停止。
        self.parent.parent.player.stop()

    def remove(self):
        """从播放列表里删除某歌曲。"""
        row = self.currentRow()
        player = self.parent.parent.player
        # 删除table里的item。
        self.removeRow(row)

        # 剔除音乐信息。
        self.parent.musicList = self.parent.musicList[:row] + self.parent.musicList[row+1:]
        player.playList.removeMedias(row)
        # 将总索引-1.
        self.parent.allRow -= 1
        # 如果删除的是当前记录的行数。
        # 还原到初始状态。
        # items用于一些显示效果。
        if self.itemHoverRow == row:
            self.itemHoverRow = -1
            self.items = []

        # 如果当前播放的音乐是要删除的音乐。
        # if self.parent.currentRow == row:
        #     # 停止后会触发stateChangeEvent。
        #     # 如果是当前的音乐会切换到下一首，如果没有了就停止，如果到达列表底部则切回顶部。
        #     self.parent.parent.player.stop()

    # 事件。
    def contextMenuEvent(self, event):
        item = self.itemAt(self.mapFromGlobal(QCursor.pos()))
        self.menu = QMenu(self)

        if not item:
            self.menu.addAction(self.actionClear)
        else:
            self.menu.addAction(self.actionRemove)
            self.menu.addAction(self.actionClear)

        self.menu.exec_(QCursor.pos())


class _MediaPlaylist(QObject):
    musicsCookiesFolder = 'cookies/mediaPlaylist/musics.cks'
    mediaListCookiesFolder = 'cookies/mediaPlaylist/mediaList.cks'
    allCookiesFolder = [musicsCookiesFolder, mediaListCookiesFolder]

    def __init__(self, parent=None):
        super(_MediaPlaylist, self).__init__()
        self.parent = parent
        self.playWidgets = self.parent.parent

        self.duration = 0

        self.musics = []

        self.currentIndex = 0

        # 用于记录歌曲的信息。
        self.mediaList = {}

        # models.
        self.single = 1
        self.Loop = 3
        self.Random = 4

        # currentModel
        # 默认是3.循环。
        self.myModel = 3

    def setInitConnection(self):
        self.parent.mediaStatusChanged.connect(self.mediaStatusChangedEvent)

    def addMedias(self, url, data):
        # url为QMediaContent, data包含这个歌曲的信息。{name, author, url, music_id}
        self.parent.setMedia(url)
        self.musics.append(url)
        self.currentIndex = len(self.musics) - 1
        self.mediaList[url.canonicalUrl().toString()] = data
        self.parent.playMusic()
        
        # window
        self.playWidgets.parent.systemTray.setToolTip('{0}-{1}'.format(data['name'], data['author']))

    def addAllMedias(self, datas):
        # self.musics.extend(datas)
        for i in datas:
            self.musics.append(i['url'])
            self.mediaList[i['url']] = i

    def clear(self):
        self.musics = []
        self.mediaList = {}
        self.currentIndex = 0
        self.duration = 0

    def mediaCount(self):
        return len(self.musics)

    def removeMedias(self, row):

        self.musics.pop(row)

    def next(self):
        if self.currentIndex + 1 >= len(self.musics):
            self.currentIndex = 0
        else:
            self.currentIndex += 1

        self.play()

    def previous(self):
        if self.currentIndex - 1 <= -1:
            self.currentIndex = 0
        else:
            self.currentIndex -= 1
        
        self.play()

    def play(self):
        media = self.musics[self.currentIndex]
        if type(media) == str:
            if 'http' in media or 'file' in media:
                content = QMediaContent(QUrl(media))
            else:
                content = QMediaContent(QUrl.fromLocalFile(media))

            self.musics = self.musics[:self.currentIndex] + [content] + self.musics[self.currentIndex+1:]
            media = content

        self.parent.setMedia(media)
        self.parent.playMusic()

        self.tabMusicEvent()

    def setCurrentIndex(self, index):
        media = self.musics[index]
        if type(media) == str:
            if 'http' in media or 'file' in media:
                content = QMediaContent(QUrl(media))
            else:
                content = QMediaContent(QUrl.fromLocalFile(media))

            self.musics = self.musics[:index] + [content] + self.musics[index+1:]
            self.parent.setMedia(content)
        else:
            self.parent.setMedia(media)

        self.parent.playMusic()
        self.tabMusicEvent()

        self.currentIndex = index

    def setPlaybackMode(self, model:int):
        self.myModel = model

    @checkFolder(allCookiesFolder)
    def saveCookies(self):
        with open(self.musicsCookiesFolder, 'wb') as f:
            for row, data in enumerate(self.musics):
                if type(data) == QMediaContent:
                    self.musics[row] = data.canonicalUrl().toString()

            pickle.dump(self.musics, f)

        with open(self.mediaListCookiesFolder, 'wb') as f:
            pickle.dump(self.mediaList, f)

    @checkFolder(allCookiesFolder)
    def loadCookies(self):
        with open(self.musicsCookiesFolder, 'rb') as f:
            self.musics = pickle.load(f)

        with open(self.mediaListCookiesFolder, 'rb') as f:
            self.mediaList = pickle.load(f)

    # 事件。
    def mediaStatusChangedEvent(self, status):
        if status == 7:
            # 循环。
            if self.myModel == 3:
                self.next()
            # 随机。
            elif self.myModel == 4:
                index = random.randint(0, len(self.musics)-1)
                self.setCurrentIndex(index)
            # 单曲。
            else:
                self.parent.play()

    def tabMusicEvent(self):
        indexUrl = self.parent.currentMedia().canonicalUrl().toString()
        name = self.mediaList[indexUrl]['name']
        author = self.mediaList[indexUrl]['author']
        pic = self.mediaList[indexUrl]['music_img']
        self.playWidgets.currentMusic.setShortInfo(name, author, pic)

        if self.playWidgets.currentMusic.detailInfo.isVisible():
            self.playWidgets.currentMusic.setDetailInfo()

        # window.
        self.playWidgets.parent.systemTray.setToolTip('{0}-{1}'.format(name, author))


class _LyricLabel(QLabel):
    """
    显示歌词的Label。
    为Label设置一个时间属性，这样方便歌词滚动。
    """
    __slots__ = ('myTime', 'myLyric', 'myOrder', 'parent')

    def __init__(self, myTime, lyric, myOrder, signal, parent=None):
        super(_LyricLabel, self).__init__(lyric)
        self.setObjectName('lyric')
        self.parent = parent
        self.myTime = myTime[:myTime.rfind('.')]
        self.myLyric = lyric
        self.myOrder = myOrder

        signal.connect(self.lightMe)
        
        self.setMinimumHeight(40)

        # 设置为可复制状态。
        self.setTextInteractionFlags(Qt.TextSelectableByMouse)

    def lightMe(self, currentTime):
        if currentTime == self.myTime:
            if self.parent.order !=  self.myOrder:
                self.parent.unLightLyric()
                self.parent.order = self.myOrder
                self.parent.slide()
                self.setText('<font color="white">{0}</font>'.format(self.myLyric))

    def unLightMe(self):
            self.setText(self.myLyric)
        
            # self.isLight = True
        # else:
        #     if self.isLight:
        #         self.isLight = False


if __name__ == '__main__':
    import sys
    os.chdir('..')
    app = QApplication(sys.argv)

    main = PlayWidgets()

    main.show()

    sys.exit(app.exec_())
    