"""包含音乐的组件, 显示用信息, 一个自定义可HOVER整行效果的TableWidget。"""
"""
这是一个独立的播放器组件，只需要调用playWidgets里的setPlayerAndPlayList(s)即可播放音乐。
需要的data类型是{'name': str, 'time': str, 'author': str, music_img: None/url}
"""
"""
写法上这个模块比较难懂，界面与功能混合在一块。
只要在需要播放音乐时调用
setPlayerAndPlayList(s)设置音乐即可。
必要时会进行重写。
"""
__author__ = 'cyrbuzz'

import re
import os
import sys
import random
import logging

from PyQt5.QtWidgets import (QAction, QAbstractItemView, QDialog, QFrame, QHBoxLayout, QLabel, QMenu, QPushButton, QSlider, 
                                                              QTableWidget, QTableWidgetItem, QVBoxLayout, QApplication)
from PyQt5.QtGui import QBrush, QColor, QCursor, QPixmap, QFont, QPainter, QPen, QLinearGradient
from PyQt5.QtCore import QUrl, Qt, QObject, QPropertyAnimation, QPoint, QRect, QEasingCurve, QAbstractAnimation, QTime, QTimer, QRegExp, QRectF
from PyQt5.QtMultimedia import QMediaPlayer, QMediaContent, QMediaMetaData, QMediaPlaylist

import addition
from base import (blur, checkFolder, cacheFolder, checkOneFolder, centerHTML, HBoxLayout, HStretchBox, 
                                     pickle, PicLabel, pyqtSignal,  QTextEdit,  ScrollArea, VBoxLayout)
# ../features
from asyncBase import aAsync, toTask
# ../apis
from netEaseApi import netease
from xiamiApi import xiami
from qqApi import qqApi

# support desktop lyric.
from desktopLyricButtons import *

def _fromUtf8(s):
    return s

# for desktop lyric too.
QString = str

logger = logging.getLogger(__name__)


# 底部的播放组件。主要是用于交互，包括播放/前进/后退/进度条/音量控制/播放模式/打开or关闭音乐列表。
class PlayWidgets(QFrame):
    """播放组件，包括播放按钮，进度条君，音量君，当前歌曲菜单君。"""

    def __init__(self, parent=None):
        super(PlayWidgets, self).__init__()
        self.setObjectName('playwidget')
        self.parent = parent
        # 0模式是列表循环。1模式是单曲循环，2模式是随机播放。
        self.module = 0

        with open('QSS/playWidgets.qss', 'r', encoding='utf-8') as f:
            self.setStyleSheet(f.read())

        self.playList = PlayList(self)
        self.currentMusic = CurrentMusic(self)
        self.player = Player(self)

        # test desktopLyric
        self.desktopLyric = DesktopLyric(self)

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

        self.lyricButton = QPushButton(self)
        self.lyricButton.setText("词")
        self.lyricButton.setToolTip("打开歌词")
        self.lyricButton.setObjectName("lyricButton")
        self.lyricButton.clicked.connect(self.lyricEvent)

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
        self.mainLayout.addWidget(self.lyricButton)
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
        logger.info("尝试添加歌曲到播放列表，歌曲信息: {0} \n".format(data))
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
        # if 'qq.com' in data['url']:
            # print(data['url'])
            # return
            
        sureSetUp = self.player.setMusic(data['url'], data)
        if not sureSetUp:
            self.currentMusic.setShortInfo('音乐不可播放', data['author'], data['music_img'])
            return 
            
        self.playList.addMusic(data)

        self.player.playList.tabMusicEvent()
        # 添加显示播放列表的显示项。
        self.playList.addPlayList(data['name'], data['author'], data['time'])
        # # 更改当前音乐的信息。
        # self.currentMusic.setShortInfo(data['name'], data['author'], data['music_img'])
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
        self.player.playList.tabMusicEvent()

        # self.currentMusic.setShortInfo(i['name'], i['author'], i['music_img'])

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

    def lyricEvent(self):
        """return None"""
        lyricStyle = """
                QPushButton#lyricButton {{
                    width: 10px;
                    height: 10px;
                    margin: 0px;
                    padding: 3px;
                    background: {};
                    color: {};
                    border: 1px solid #919192;
                }}
            QPushButton#lyricButton:hover {{
                background: none;
                color: #DCDCDC;
                border-color: #DCDCDC;
            }}
                """
        # 如果桌面歌词处于可见状态则隐藏桌面歌词。
        if self.desktopLyric.isVisible():
            self.lyricButton.setToolTip("打开歌词")
            self.lyricButton.setStyleSheet(lyricStyle.format("none", "#79797B"))
            return self.desktopLyric.hide()

        # 防止先打开的音乐后显示的歌词，所以在点击时获取一次歌词。
        self.lyricButton.setToolTip("关闭歌词")
        self.lyricButton.setStyleSheet(lyricStyle.format("#828282", "#FFFFFF"))
        self.desktopLyric.show()
        self.currentMusic.setDetailInfo()

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
            
            logger.info("尝试播放已在播放列表的歌曲，歌曲位置索引{0}.".format(currentRow))

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
        
        picSrc = self.shortInfo.musicPic.getSrc()
        
        blurSrc = blur(picSrc)

        self.detailInfo.titleLabel.setText(title)
        if blurSrc:
            self.detailInfo.lyricFrames.setStyleSheet('''
            QScrollArea#lyricScroll {{
                background-image: url({0});
            }}
                '''.format(blurSrc))

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
        self.showDetail.setEndValue(QRect(0, self.grandparent.header.height()+3, self.grandparent.width(), self.grandparent.mainContent.height()))
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
        
        # set desktop lyric list.
        self.parent.player.lrc_lst = getLyric(result)

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
        maxValue = round(self.detailInfo.lyricFrames.maximumValue()/self.count)*self.order
        # for i in range(value, maxValue):
        self.detailInfo.lyricFrames.verticalScrollBar().setValue(maxValue)

    def unLightLyric(self):
        if self.order < 0:
            return 

        self.detailInfo.allLyrics[self.order].unLightMe()

    @toTask
    def getLyric(self):
        musicInfo = self.parent.player.getCurrentMusicInfo()
        logger.info("尝试获取歌曲歌词地址。 当前歌曲信息: {0}".format(musicInfo))
        if not musicInfo:
            return "✧请慢慢欣赏~"

        if 'http' not in musicInfo.get('url'):
            future = aAsync(xiami.search, musicInfo.get('name') + ' ' + musicInfo.get('author'))
            data = yield from future
            # 最好做下判断以免搜不到获取时导致报错退出。
            lyricUrl = data['songs'][0].get('lyric')
            future = aAsync(xiami.lyric, lyricUrl)
            data = yield from future

            self.lyricCache = data

            return data

        musicId = musicInfo.get('music_id')
        if self.currentMusicId == musicId:
            return self.lyricCache
            # return self.detailInfo.detailText.toPlainText()

        lyricUrl = musicInfo.get('lyric')
        # 默认网易云，网易云没有返回歌词地址，所以会是None.
        if not lyricUrl:
            future = aAsync(netease.lyric, musicId)
            data = yield from future
        else:
            if 'xiami' in lyricUrl:
                future = aAsync(xiami.lyric, lyricUrl)
                data = yield from future
            elif lyricUrl == 'qq':
                # TODO
                # get qq music lyric.
                return "✧请慢慢欣赏~"


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

        self.setObjectName('detail')
        self.hide()

        self.mainLayout = VBoxLayout(self.frame)
        self.topLayout = HBoxLayout()
        self.topMainLayout = VBoxLayout()
        self.topHeaderLayout = HBoxLayout()

        self.lyricFrames = ScrollArea()
        self.lyricFrames.setObjectName('lyricScroll')
        self.lyricFrames.frame.setObjectName('lyricFrame')
        self.lyricFramesLayout = VBoxLayout(self.lyricFrames.frame)
        # self.lyricFrames.setMaximumHeight(500)
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
        self.topMainLayout.addWidget(self.lyricFrames)

    def addLyricLabel(self, label):

        HStretchBox(self.lyricFramesLayout, label)
        
        self.allLyrics.append(label)

    def removeAllLyricLabels(self):
        for i in self.allLyrics:
            i.deleteLater()
        self.allLyrics = []

        for i in range(self.lyricFramesLayout.count()):
            self.lyricFramesLayout.takeAt(i)


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

        # lyric from CurrentMusic setting.
        self.lrc_lst = []

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
        """设置当前的音乐，可以直接用网络链接。"""
        if url:
            if 'http' in url or 'file' in url:
                self.playList.addMedias(QMediaContent(QUrl(url)), data)
            else:
                self.playList.addMedias(QMediaContent(QUrl.fromLocalFile(url)), data)
            return True
        return False
    
    def setAllMusics(self, datas):
        self.playList.addAllMedias(datas)

    def setIndex(self, index):
        self.playList.setCurrentIndex(index)

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
            try:
                musicInfo = self.playList.mediaList.pop(self.currentMedia().canonicalUrl().toString())
                self.loadRealMusicUrl(musicInfo)
            except:
                logger.error("尝试重新获取音乐地址出错。", exc_info=True)
                print('尝试重新获取音乐地址出错，请清空或删除无效的音乐信息后重试。')

    @toTask
    def loadRealMusicUrl(self, musicInfo):
        # 如果有个Url出错，比如音乐地址403重新获取下地址。
        musicId = musicInfo.get('music_id')

        logger.info("歌曲地址失效，尝试重新获取，id号: {0}".format(musicId))

        if not musicId:
            self.playWidgets.nextSing()
            return

        future = aAsync(netease.singsUrl, [musicId])
        
        musicUrl = musicInfo.get('url')
        if musicUrl.find('C40000') != -1 or musicUrl.find('qqmusic') != -1:
            future = aAsync(qqApi.getSongUrl, musicUrl)

        data = yield from future

        if not data:
            self.playWidgets.nextSing()
            return 

        logger.info("id {0}'s response: {1}".format(musicId, data))
        
        if not data:
            print("获取音乐地址失败，请检查网络后重试。")
            self.playList.mediaList[url] = musicInfo
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

        self.playWidgets.countTime.setText(self.transTime(self.musicTime))
        self.playList.duration = duration

    def positionChangedEvent(self, position):
        """音乐在Media里以毫秒的形式保存，这里是播放时的进度条。"""
        currentTime = self.position()/1000
        transedTime = self.transTime(currentTime)
        self.playWidgets.currentTime.setText(transedTime)
        self.timeChanged.emit(transedTime)

        # position先于duration变化，会出现/0的情况。
        if self.musicTime == 0:
            return
        # *1000是为了与进度条的范围相匹配。
        self.playWidgets.slider.setValue(currentTime/self.musicTime*1000)
        self.setLyricEvent(position)

    def stateChangedEvent(self):
        """"""
        if self.state() == 0 and self.playList.mediaCount() == 0 and self.playWidgets.pauseButton.isVisible():
            self.playWidgets.stopEvent(self)

    def setLyricEvent(self, position):
        # copy from https://github.com/wn0112/PPlayer
        t = QTime(0, 0, 0)
        t = t.addMSecs(int(position))
        lycF = ''
        lycL = ''
        lycM = ''
        if self.lrc_lst:
            lenOfLrc = len(self.lrc_lst)
            for i in range(lenOfLrc):
                if t.toString("mm:ss") in self.lrc_lst[i][0]:                    
                    t1 = t
                    if i < lenOfLrc - 1:
                        x = self.lrc_lst[i+1][0].replace('[', '')
                        x = x.replace(']', '')
                        t1 = QTime().fromString(x, 'mm:ss.z')
                        intervel = t.msecsTo(t1)
                    else:
                        t1 = QTime().fromString('00:10.99')
                        intervel = 3000
                    self.parent.desktopLyric.stopMask()
                    self.parent.desktopLyric.setText(self.lrc_lst[i][1], intervel)                
                    self.parent.desktopLyric.startMask()
                    if i > 0:
                        lycM = self.lrc_lst[i-1][1]
                    j = 0
                    while(j < i-1):
                        lycF += self.lrc_lst[j][1]+'\n'
                        j += 1
                    j = i
                    while(j < lenOfLrc - 1):
                        lycL += self.lrc_lst[j+1][1]+'\n'
                        j += 1
                    # self.parent.desktopLyric.setText(lycF, lycM, self.lrc_lst[i][1], lycL, intervel)
                    # self.parent.desktopLyric.setText(lycF, lycM, self.lrc_lst[i][1], lycL, intervel)

                    break

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
        if self.myModel == 4:
                index = random.randint(0, len(self.musics)-1)
                self.setCurrentIndex(index)
                return 

        if self.currentIndex + 1 >= len(self.musics):
            self.currentIndex = 0
        else:
            self.currentIndex += 1

        self.play()

    def previous(self):
        if self.myModel == 4:
                index = random.randint(0, len(self.musics)-1)
                self.setCurrentIndex(index)
                return 
                
        if self.currentIndex - 1 <= -1:
            self.currentIndex = 0
        else:
            self.currentIndex -= 1
        
        self.play()

    def play(self):
        try:
            media = self.musics[self.currentIndex]
        except:
            logger.error("unknow error. musics info: {0}".format(self.musics))
            return

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
        try:
            media = self.musics[index]
        except:
            logger.error("unknow error. musics info: {0}".format(self.musics))
            return

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

    def setShortInfo(self, musicInfo):
        name = musicInfo['name']
        author = musicInfo['author']
        pic = musicInfo['music_img']
        self.playWidgets.currentMusic.setShortInfo(name, author, pic)

    def setLyric(self, musicInfo):
        name = musicInfo['name']
        author = musicInfo['author']
        if self.playWidgets.currentMusic.detailInfo.isVisible() or self.playWidgets.desktopLyric.isVisible():
            self.playWidgets.desktopLyric.setText("{}-{}".format(name, author), 0)
            self.playWidgets.currentMusic.setDetailInfo()

    def setSystemTrayTip(self, tipMessage):
        self.playWidgets.parent.systemTray.setToolTip(tipMessage)

    def updatePlayTimes(self, musicInfo):
        # 网易云歌曲初次播放地址是http(int, int)，这是个错误地址，所以会进行一次重新获取地址，
        # 写的很麻烦，获取成功后会重新设置一次全部信息，这样的话网易云的歌曲就会插入两次，这里尝试只插入一次。
        # 这个方法也不好。
        # 想到的方法是 1. 如果播放地址获取失败会请求一次数据库让其删除一次。
        # TODO:
        # 新方法。
        if 'http(' in musicInfo['url']:
            return

        self.playWidgets.parent.db.addPlayTimesById(musicInfo['music_id'],
            musicInfo['name'],
            musicInfo['author'])

    @checkFolder(allCookiesFolder)
    def saveCookies(self):
        with open(self.musicsCookiesFolder, 'wb') as f:
            for row, data in enumerate(self.musics):
                if type(data) == QMediaContent:
                    url = data.canonicalUrl().toString()
                    self.musics[row] = url

            pickle.dump(self.musics, f)

        with open(self.mediaListCookiesFolder, 'wb') as f:
            pickle.dump(self.mediaList, f)

    @checkFolder(allCookiesFolder)
    def loadCookies(self):
        with open(self.mediaListCookiesFolder, 'rb') as f:
            self.mediaList = pickle.load(f)

        with open(self.musicsCookiesFolder, 'rb') as f:
            self.musics = pickle.load(f)
            for index, url in enumerate(self.musics):
                if '?vkey=' in url:
                    musicInfo = self.mediaList.pop(url)
                    url = url.split('qq.com/')
                    url2 = url[1].split('?vkey=')[0]

                    url = '{0}'.format(qqApi.sip) + url2 + '?vkey={0}'.format(qqApi.key) +\
                               '&guid={0}'.format(qqApi.guid)

                    self.musics[index] = url.format(qqApi.sip, qqApi.key)
                    self.mediaList[url] = musicInfo

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
        try:
            indexUrl = self.parent.currentMedia().canonicalUrl().toString()
            musicInfo = self.mediaList[indexUrl]
            self.setShortInfo(musicInfo)

            self.setLyric(musicInfo)

            self.setSystemTrayTip('{0}-{1}'.format(musicInfo['name'], musicInfo['author']))
            self.updatePlayTimes(musicInfo)
        except:
            logger.error("tabbing music error has ignored. index{0} mediaList{1}".format(indexUrl, self.mediaList), exc_info=True)


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
        

class DesktopLyric(QDialog):
    def __init__(self, parent=None):
        super(DesktopLyric, self).__init__()
        self.lyric = QString('Lyric Show.')
        self.intervel = 0
        self.maskRect = QRectF(0, 0, 0, 0)
        self.maskWidth = 0
        self.widthBlock = 0
        self.t = QTimer()
        self.screen = QApplication.desktop().availableGeometry()
        self.setObjectName(_fromUtf8("Dialog"))
        self.setWindowFlags(Qt.CustomizeWindowHint | Qt.FramelessWindowHint | Qt.Dialog | Qt.WindowStaysOnTopHint | Qt.Tool)
        self.setMinimumHeight(65)
        self.setAttribute(Qt.WA_TranslucentBackground)
        self.handle = lyric_handle(self)
        self.verticalLayout = QVBoxLayout(self)
        self.verticalLayout.setSpacing(0)
        self.verticalLayout.setContentsMargins(0, 0, 0, 0)
        self.verticalLayout.setObjectName(_fromUtf8("verticalLayout"))
        self.font = QFont(_fromUtf8('微软雅黑, verdana'), 50)
        self.font.setPixelSize(50)
        # QMetaObject.connectSlotsByName(self)
        self.handle.lyricmoved.connect(self.newPos)
        self.t.timeout.connect(self.changeMask)
        
    def changeMask(self):
        self.maskWidth += self.widthBlock
        self.update()
    
    def setText(self, s, intervel=0):
        self.lyric = s
        self.intervel = intervel
        self.maskWidth = 0
        self.update()
        
    def hideLyric(self):
        self.hide()
        # self.emit(SIGNAL('lyrichide()'))

                    
    def leaveEvent(self, event):
        self.handle.leaveEvent(event)
    
    def show(self):

        super(DesktopLyric, self).show()
    
    def hide(self):
        super(DesktopLyric, self).hide()
        self.handle.hide()
        
    def enterEvent(self, event):
        pass
        # self.handle.handler.setFocus()
        # self.handle.show()
    
    def newPos(self, p):
        self.move(self.pos().x() + p.x(), self.pos().y() + p.y())
        # self.move(500, 600)


    def startMask(self):
        self.t.start(100)
            
    def stopMask(self):
        self.t.stop()
        self.update()
        
    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setFont(self.font)
        
        linear = QLinearGradient(QPoint(self.rect().topLeft()), QPoint(self.rect().bottomLeft()))
        linear.setStart(0, 10)
        linear.setFinalStop(0, 50)
        linear.setColorAt(0.1, QColor(14, 179, 255));
        linear.setColorAt(0.5, QColor(154, 232, 255));
        linear.setColorAt(0.9, QColor(14, 179, 255));
        
        linear2 = QLinearGradient(QPoint(self.rect().topLeft()), QPoint(self.rect().bottomLeft()))
        linear2.setStart(0, 10)
        linear2.setFinalStop(0, 50)
        linear2.setColorAt(0.1, QColor(222, 54, 4));
        linear2.setColorAt(0.5, QColor(255, 172, 116));
        linear2.setColorAt(0.9, QColor(222, 54, 4));
        
        painter.setPen(QColor(0, 0, 0, 200));
        painter.drawText(QRect(1, 1, self.screen.width(), 60), Qt.AlignHCenter | Qt.AlignVCenter, self.lyric)
        
        painter.setPen(QColor('transparent'));
        self.textRect = painter.drawText(QRect(0, 0, self.screen.width(), 60), Qt.AlignHCenter | Qt.AlignVCenter, self.lyric)

        painter.setPen(QPen(linear, 0))
        painter.drawText(self.textRect, Qt.AlignLeft | Qt.AlignVCenter, self.lyric)
        if self.intervel != 0:
            self.widthBlock = self.textRect.width()/(self.intervel/150.0)
        else:
            self.widthBlock = 0
        self.maskRect = QRectF(self.textRect.x(), self.textRect.y(), self.textRect.width(), self.textRect.height())
        self.maskRect.setWidth(self.maskWidth)
        painter.setPen(QPen(linear2, 0));
        painter.drawText(self.maskRect, Qt.AlignLeft | Qt.AlignVCenter, self.lyric)

    def mousePressEvent(self, event):
        if event.buttons() == Qt.LeftButton:
            self.m_drag = True
            self.m_DragPosition = event.globalPos()-self.pos()
            event.accept()

    def mouseMoveEvent(self, event):
        try:
            if event.buttons() and Qt.LeftButton:
                self.move(event.globalPos()-self.m_DragPosition)
                event.accept()
        except AttributeError:
            pass

    def mouseReleaseEvent(self, event):
        if event.buttons() == Qt.LeftButton:
            self.m_drag = False


class lyric_handle(QDialog):
    # copy from https://github.com/wn0112/PPlayer
    lyricmoved = pyqtSignal(QPoint)
    def __init__(self, parent=None):
        super(lyric_handle, self).__init__(parent)
        self.timer = QTimer()
        self.setObjectName(_fromUtf8("Dialog"))
        self.setWindowFlags(Qt.CustomizeWindowHint | Qt.FramelessWindowHint | Qt.Dialog | Qt.WindowStaysOnTopHint | Qt.Tool)
        self.setStyleSheet('QDialog { background: #2c7ec8; border: 0px solid black;}')
        self.horiLayout = QHBoxLayout(self)
        self.horiLayout.setSpacing(5)
        self.horiLayout.setContentsMargins(0, 0, 0, 0)
        self.horiLayout.setObjectName(_fromUtf8("horiLayout"))
        self.handler = QLabel(self)
        self.handler.setToolTip('Move Lyric')
        self.handler.setPixmap(QPixmap(':/icons/handler.png'))
        self.handler.setMouseTracking(True)
        self.lockBt = PushButton2(self)
        self.lockBt.setToolTip('Unlocked')
        self.lockBt.loadPixmap(QPixmap(':/icons/unlock.png'))
        self.hideBt = PushButton2(self)
        self.hideBt.setToolTip('Hide Lyric')
        self.hideBt.loadPixmap(QPixmap(':/icons/close.png').copy(48, 0, 16, 16))
        self.lockBt.setCheckable(True)
        
        self.horiLayout.addWidget(self.handler)
        self.horiLayout.addWidget(self.lockBt)
        self.horiLayout.addWidget(self.hideBt)
    
        self.lockBt.clicked.connect(self.lockLyric)
        self.hideBt.clicked.connect(self.hideLyric)
        self.timer.timeout.connect(self.hide)
        
    def lockLyric(self):
        if self.lockBt.isChecked():
            self.lockBt.loadPixmap(QPixmap(':/icons/lock.png'))
            self.lockBt.setToolTip('Locked')
            self.lockBt.update()
        else:
            self.lockBt.loadPixmap(QPixmap(':/icons/unlock.png'))
            self.lockBt.setToolTip('Unlocked')
            self.lockBt.update()
    
    def hideLyric(self):
        # self.parent().emit(SIGNAL('lyrichide()'))
        self.parent().lyrichide.emit()
        self.parent().hide()
        self.hide()
                
    def isInTitle(self, xPos, yPos):
        if self.lockBt.isChecked():
            return False
        else:
            return yPos <= self.height() and 0 <= xPos <= self.handler.width()

    def moveEvent(self, event):
        # self.emit(SIGNAL("lyricmoved(QPoint)"), event.pos() - event.oldPos())
        self.lyricmoved.emit(QPoint(event.pos() - event.oldPos()))

    def enterEvent(self, event):
        # print(1)
        self.setFocus()
        self.timer.stop()

    def leaveEvent(self, event):
        self.timer.stop()
        self.timer.start(3000)


def getLyric(rawLyric):
    # copu from https://github.com/wn0112/PPlayer
    lrc = rawLyric

    r1 = re.compile("\[(\d{2}:\d{2}(.\d+)?)\]")
    r2 = re.compile("\[\d+:+.+\](.*)")
    r3 = re.compile("\[offset:(-?\d+)\]")
    item = []
    lrc_lst = []
    offset = 0
    for line in lrc:
        times = r1.findall(line)
        lrc_words = r2.findall(line)
        if lrc_words:
            lrc_words = lrc_words[0]
        else:
            lrc_words = []

        if len(lrc_words) and lrc_words[0].rstrip():
            for i in times:
                item.append(i[0])
                item.append(lrc_words)
                lrc_lst.append(item)
                item = []
    lrc_lst.sort()

    return lrc_lst


if __name__ == '__main__':
    import sys
    os.chdir('..')
    app = QApplication(sys.argv)

    main = PlayWidgets()

    main.show()

    sys.exit(app.exec_())
    