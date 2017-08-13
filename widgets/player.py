"""包含音乐的组件, 显示用信息, 一个自定义可HOVER整行效果的TableWidget。"""
__author__ = 'cyrbuzz'

import os
import random

from PyQt5.QtWidgets import *
from PyQt5.QtGui import QBrush, QColor, QIcon, QCursor
from PyQt5.QtCore import QUrl, QSize, Qt, QObject, QPropertyAnimation, QRect, QEasingCurve, QAbstractAnimation
from PyQt5.QtMultimedia import QMediaPlayer, QMediaContent, QMediaMetaData, QMediaPlaylist

import addition

from network import NetWorkThread


"""底部的播放组件。主要是用于交互，包括播放/前进/后退/进度条/音量控制/播放模式/打开or关闭音乐列表。"""
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

    def setPlayerAndPlayList(self, data, index=0):
        """方便外部调用。一键添加歌曲。"""
        """防止重复。"""
        if data in self.playList.musicList:
            index = self.playList.musicList.index(data)
            if self.player.playList.currentIndex == index:
                return

            self.player.setIndex(index)

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
        self.player.disconnect()
        # 添加进度条移动事件。
        self.slider.sliderMoved.connect(self.sliderMovedEvent)

    def sliderMovedEvent(self):
        """用于拖动时显示当前位置的时间。"""
        # 进度条移动事件，会显示当前的时间。
        value = self.slider.value()
        currentSliderTime = self.player.allTime()*value/1000

        self.currentTime.setText(addition.itv2time(currentSliderTime))


"""显示用音乐列表，用于显示当前添加到播放列表里的音乐。"""
class PlayList(QFrame):
    """播放列表。"""
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
        # self.mediaList[self.parent]

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


"""当前播放的音乐，位于左侧导航栏最下方，播放组件的上方。包括当前音乐的logo，音乐名/作者。点击图片会显示详细信息(暂不完善。)"""
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

        # 将窗口提前并激活窗口。
        self.raise_()
        self.activateWindow()

        self.picManager = NetWorkThread(self)
        self.picManager.saveFinished.connect(self.setMusicPic)

        self.shortInfo = CurrentMusicShort(self)
        self.detailInfo = CurrentMusicDetail(self)

        self.mainLayout = QHBoxLayout()
        self.mainLayout.addWidget(self.shortInfo)
        self.mainLayout.addWidget(self.detailInfo)
        # 保证没有间隙。
        self.mainLayout.setContentsMargins(0, 0, 0, 0)
        self.mainLayout.setSpacing(0)
        self.setLayout(self.mainLayout)

    # 功能。
    def setShortInfo(self, name=None, author=None, pic=None):
        """方便设置信息。"""
        if pic:
            cacheList = os.listdir('cache')
            picName = pic[pic.rfind('/')+1:]
            if picName in cacheList:
                self.setMusicPic(picName)
            else:
                # 历史问题。
                self.picManager.offset = 0
                self.picManager.currentUrl = -1
                self.picManager.setUrl([pic])
                self.picManager.startGet()

        self.shortInfo.musicName.setText(name)
        self.shortInfo.musicAuthor.setText(author)

    def setMusicPic(self, name='None'):
        if name != 'None':
            self.shortInfo.musicPic.setIcon(QIcon('cache/%s'%(name)))
            self.shortInfo.musicPic.setIconSize(QSize(64, 64))
        else:
            self.shortInfo.musicPic.setIcon(QIcon('resource/no_music.png'))
            self.shortInfo.musicPic.setIconSize(QSize(64, 64))

    def setDetailInfo(self):
        pass

    def getDetailInfo(self):
        """点击后进行动画效果的: 显示某歌曲的详细信息。"""
        self.showDetail = QPropertyAnimation(self, b"geometry")

        x = self.pos().x()
        y = self.pos().y()

        self.showDetail.setStartValue(QRect(x, y, self.width(), self.height()))
        # 获取顶层父窗口的长度。
        self.showDetail.setEndValue(QRect(0, self.grandparent.header.height(), self.grandparent.width(), self.grandparent.mainContent.height()+10))
        self.showDetail.setDuration(300)
        self.showDetail.setEasingCurve(QEasingCurve.InBack)

        self.showDetail.start(QAbstractAnimation.DeleteWhenStopped)
        # 将该组件显示在最前，默认会嵌入到父组件里面。
        self.raise_()

    def getShortInfo(self):

        """返回到原来的缩略图信息。"""
        self.showShort = QPropertyAnimation(self, b"geometry")
        
        x = self.pos().x()
        y = self.pos().y()
        
        self.showShort.setStartValue(QRect(0, self.grandparent.header.height(), self.grandparent.width(), self.grandparent.mainContent.height()))
        self.showShort.setEndValue(QRect(0, self.grandparent.height()-64-self.parent.height(), self.grandparent.navigation.width(), 64))
        self.showShort.setDuration(300)
        self.showShort.setEasingCurve(QEasingCurve.InBack)
        
        self.showShort.start(QAbstractAnimation.DeleteWhenStopped)

        self.raise_()


"""显示简短信息（默认。）"""
class CurrentMusicShort(QFrame):
    """用于显示当前歌曲的简单信息。"""
    def __init__(self,parent=None):
        super(CurrentMusicShort, self).__init__()
        self.parent = parent
        self.setObjectName('short')
        self.setLabels()

        self.setButtons()

        self.setLayouts()

        self.init()

    # 布局。
    def setLabels(self):
        self.musicName = QLabel(self)
        self.musicName.adjustSize()
        self.musicAuthor = QLabel(self)

    def setButtons(self):
        self.musicPic = QPushButton(self)
        self.musicPic.setObjectName("musicPic")
        self.musicPic.resize(64, 64)
        self.musicPic.setMinimumSize(64, 64)

        self.musicPic.clicked.connect(self.getDetailInfo)

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

    # 功能。
    def getDetailInfo(self):
        """点击后将自己隐藏并放大。"""
        self.parent.getDetailInfo()
        self.hide()

    def init(self):
        """默认情况下的显示，包括音乐图片，音乐名和音乐作者。"""
        self.musicPic.setIcon(QIcon('resource/no_music.png'))
        self.musicPic.setIconSize(QSize(64, 64))
        self.musicName.setText("Enjoy it")
        self.musicAuthor.setText("Enjoy it")

    # def mouseMoveEvent(self, event):
        # self.mask = QPixmap('resource/music_mask.png')
        # self.musicPic.setMask(self.mask.createHeuristicMask())


"""显示详细信息（点击后的信息，不完善。）"""
class CurrentMusicDetail(QFrame):

    def __init__(self, parent):
        super(CurrentMusicDetail, self).__init__()

        self.setObjectName('detail')
        self.hide()


"""真 · 播放器，用于播放音频。"""
class Player(QMediaPlayer):
    """播放器组件。"""
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
        # self.setPlaylist(self.playList)

        self.setConnects()
        # QUrl 可直接播放网络音乐。
        # http://sc1.111ttt.com/2016/1/12/10/205102159306.mp3
        # self.setMedia(QMediaContent(QUrl(r'file:///F:/Programming%20Files/Music/testMusic/七月上.mp3')))

    # 功能。
    def setConnects(self):
        """用于设置连接的信号槽。"""
        self.durationChanged.connect(self.countTimeEvent)
        self.positionChanged.connect(self.positionChangedEvent)
        self.stateChanged.connect(self.stateChangedEvent)
        self.playList.setInitConnection()
        # self.currentMediaChanged.connect(self.currentMediaChangedEvent)
        # self.mediaStatusChanged.connect(self.mediaStatusChangedEvent)

    def setMusic(self, url, data):
        """设置当前的音乐，可用直接用网络链接。"""
        if url:
            if 'http' in url:
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
        self.playMusic()

    def allTime(self):
        """返回当前音乐的总时间。（秒）"""
        return self.duration()/1000

    def playMusic(self, url=None, data=None):
        """播放音乐。"""
        if url:
            self.setMusic(url, data)
            # 播放事件。
            self.playWidgets.playEvent(self)
        else:
            self.playWidgets.playEvent(self)

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
        self.playWidgets.currentTime.setText(self.transTime(currentTime))

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


"""自定义的QTableWidget, 做了hover一整行的操作，和右键菜单。"""
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
        # url为QMediaContent, data包含这个歌曲的信息。{name, author, url}
        self.parent.setMedia(url)
        self.musics.append(url)
        self.currentIndex = len(self.musics) - 1
        self.mediaList[url.canonicalUrl().toString()] = data
        self.parent.playMusic()

    def addAllMedias(self, datas):
        # self.musics.extend(datas)
        for i in datas:
            self.musics.append(i['url'])
            self.mediaList[i['url']] = i

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

        if self.parent.currentMedia() == media:
            self.parent.setMedia(media)
            self.parent.playMusic()
        else:
            self.parent.setMedia(media)
            self.parent.playMusic()

        self.tabMusicEvent()

    def setCurrentIndex(self, index):
        media = self.musics[index]
        if type(media) == str:
            if 'http' in media:
                content = QMediaContent(QUrl(media))
            else:
                content = QMediaContent(QUrl.fromLocalFile(media))

            self.musics = self.musics[:index] + [content] + self.musics[index+1:]
            self.parent.setMedia(content)
        else:
            self.parent.setMedia(self.musics[index])
        self.parent.playMusic()
        self.tabMusicEvent()

    def setPlaybackMode(self, model:int):
        self.myModel = model

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
