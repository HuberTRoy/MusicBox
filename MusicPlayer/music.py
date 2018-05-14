"""
重新设计，主要用于熟悉设计模式。
多线程/漂亮界面的设计等。

以网易云音乐为模板。
# 基本没考虑网络的出错问题。
# 
"""

__author__ = 'cyrbuzz'

import os
import sys
import os.path

myFolder = os.path.split(os.path.realpath(__file__))[0]
sys.path = [os.path.join(myFolder, 'widgets'),
os.path.join(myFolder, 'networks'),
os.path.join(myFolder, 'features'),
os.path.join(myFolder, 'apis'),
os.path.join(myFolder, 'logger'),
os.path.join(myFolder, 'dbManager')
] + sys.path

os.chdir(myFolder)

import asyncio
import logging

# event loop
# https://github.com/harvimt/quamash
# an asyncio eventloop for PyQt.
from quamash import QEventLoop

# widgets
from base import (QApplication, cacheFolder, QDialog, QFrame, QHBoxLayout, HBoxLayout, QIcon, QLabel, QListWidget, QListWidgetItem,
                  QPushButton, PicLabel, QScrollArea, ScrollArea, Qt, QTabWidget, TableWidget, QVBoxLayout, VBoxLayout,
                  QWidget)
from player import PlayWidgets
from native import NativeMusic
from downloadFrame import DownloadFrame
from addition import SearchLineEdit
from systemTray import SystemTray
from loginFrames import LoginBox
from singsFrameBase import DetailSings
from netEaseSingsFrames import  NetEaseSingsArea, NetEaseSearchResultFrame
from xiamiSingsFrames import XiamiSingsArea, XiamiSearchResultFrame
from qqSingsFrames import QQSingsArea, QQSearchResultFrame
from recommendFrames import RecommendFrame

# features
from configMainFeatures import (ConfigWindow, ConfigHeader, ConfigNavigation, ConfigMainContent, ConfigSearchArea,
                                ConfigSystemTray, ConfigDetailSings)
from configNativeFeatures import ConfigNative
from configDownloadFrameFeatures import ConfigDownloadFrame
from configNeteaseFeatures import ConfigNetEase
from configXiamiFeatures import ConfigXiami
from configQQFeatures import ConfigQQ
from configRecommendFrameFeatures import ConfigRecommendFrame

# logger
import logger


logger.loggerConfig('logger/running_log.log')

# 覆盖原logger变量。
logger = logging.getLogger(__name__)

logger.info("当前图片缓存目录: {0}".format(os.path.join(os.getcwd(), cacheFolder)))


# 用于承载整个界面。所有窗口的父窗口，所有窗口都可以在父窗口里找到索引。
# 2018/03/18
# 这种嵌套虽然不会出错但有点麻烦，但又不知如何设计得更好。
# 最近在学vue，发现其与Qt有些相似，貌似有个叫vuex的可以很好得管理这些问题。
# 待学习改进。
class Window(QWidget):
    """Window 承载整个界面。"""
    def __init__(self):
        super(Window, self).__init__()
        self.setObjectName('MainWindow')
        self.setWindowFlags(Qt.FramelessWindowHint)
        self.setWindowIcon(QIcon('resource/format.ico'))
        self.setWindowTitle("Music")

        self.resize(1022, 670)

        self.header = Header(self)
        self.navigation = Navigation(self)
        self.playWidgets = PlayWidgets(self)
        self.detailSings = DetailSings(self)
        self.mainContent = MainContent(self)
        self.nativeMusic = NativeMusic(self)
        self.downloadFrame = DownloadFrame(self)
        self.searchArea = SearchArea(self)
        self.recommendFrame = RecommendFrame(self)

        self.mainContents = QTabWidget()
        self.mainContents.tabBar().setObjectName("mainTab")

        self.systemTray = SystemTray('resource/logo.png', self)

        # 加载tab设置。
        self.setContents()
        # 添加各类网站的歌单。
        self.addAllPlaylist()
        # 设置布局小细线。
        self.setLines()
        # 设置布局。
        self.setLayouts()
        # 注册功能。
        self.configFeatures()

        with open('QSS/window.qss', 'r') as f:
            self.setStyleSheet(f.read())

    def addAllPlaylist(self):
        self.indexNetEaseSings = NetEaseSingsArea(self.mainContent)
        self.indexXiamiSings = XiamiSingsArea(self.mainContent)
        self.indexQQSings = QQSingsArea(self.mainContent)
        self.mainContent.addTab(self.indexNetEaseSings, "网易云歌单")
        self.mainContent.addTab(self.indexXiamiSings, "虾米歌单")
        self.mainContent.addTab(self.indexQQSings, "QQ歌单")

    # 布局。
    def setContents(self):
        """设置tab界面。"""
        # 将需要切换的窗口做成Tab，并隐藏tabBar，这样方便切换，并且可以做前进后退功能。
        
        self.mainContents.addTab(self.mainContent, '')
        self.mainContents.addTab(self.detailSings, '')
        self.mainContents.addTab(self.nativeMusic, '')
        self.mainContents.addTab(self.downloadFrame, '')
        self.mainContents.addTab(self.recommendFrame, '')
        self.mainContents.addTab(self.searchArea, '')

        self.mainContents.setCurrentIndex(0)

    def setLines(self):
        """设置布局小细线。"""
        self.line1 = QFrame(self)
        self.line1.setObjectName("line1")
        self.line1.setFrameShape(QFrame.HLine)
        self.line1.setFrameShadow(QFrame.Plain)
        self.line1.setLineWidth(2)

    def setLayouts(self):

        self.mainLayout = QVBoxLayout()
        self.mainLayout.addWidget(self.header)
        self.mainLayout.addWidget(self.line1)
        
        self.contentLayout = QHBoxLayout()
        self.contentLayout.setStretch(0, 70)
        self.contentLayout.setStretch(1, 570)
        
        self.contentLayout.addWidget(self.navigation)
        self.contentLayout.addWidget(self.mainContents)

        self.contentLayout.setSpacing(0)
        self.contentLayout.setContentsMargins(0, 0, 0, 0)   

        self.mainLayout.addLayout(self.contentLayout)
        self.mainLayout.addWidget(self.playWidgets)
        
        self.mainLayout.setStretch(0, 43)
        self.mainLayout.setStretch(1, 0)
        self.mainLayout.setStretch(2, 576)
        self.mainLayout.setStretch(3, 50)

        self.mainLayout.setSpacing(0)
        self.mainLayout.setContentsMargins(0, 0, 0, 0)
        self.setLayout(self.mainLayout)

    # 注册所有功能。
    def configFeatures(self):
        self.config = ConfigWindow(self)
        self.header.config = ConfigHeader(self.header)
        self.downloadFrame.config = ConfigDownloadFrame(self.downloadFrame)
        self.searchArea.config = ConfigSearchArea(self.searchArea)
        self.navigation.config = ConfigNavigation(self.navigation)
        self.nativeMusic.config = ConfigNative(self.nativeMusic)
        self.mainContent.config = ConfigMainContent(self.mainContent)
        self.detailSings.config = ConfigDetailSings(self.detailSings)
        self.indexNetEaseSings.config = ConfigNetEase(self.indexNetEaseSings)
        self.indexXiamiSings.config = ConfigXiami(self.indexXiamiSings)
        self.indexQQSings.config = ConfigQQ(self.indexQQSings)
        self.systemTray.config = ConfigSystemTray(self.systemTray)
        self.recommendFrame.config = ConfigRecommendFrame(self.recommendFrame)

        self.indexNetEaseSings.config.initThread()
        self.indexXiamiSings.config.initThread()
        self.indexQQSings.config.initThread()

        # 当前耦合度过高。
        self.downloadFrame.config.getDownloadSignal()
        
        self.config.pullRecommendSong()

        # move to center.
        screen = QApplication.desktop().availableGeometry()
        self.playWidgets.desktopLyric.resize(screen.width(), 50)
        self.playWidgets.desktopLyric.move(0, screen.height() - 100)

    def closeEvent(self, event):
        # 主要是保存cookies.
        self.header.config.saveCookies()
        self.playWidgets.saveCookies()
        self.downloadFrame.config.saveCookies()

        # 关闭并保存数据库
        self.db.commitAndClose()

        # 系统托盘需要先隐藏，否则退出后会残留在任务栏。
        self.systemTray.hide()

    def resizeEvent(self, event):
       self. playWidgets.currentMusic.move(0, self.height()-64-self.playWidgets.height())


# 标题栏，包括logo，搜索，登陆，最小化/关闭。
class Header(QFrame):

    def __init__(self, parent=None):
        """头部区域，包括图标/搜索/设置/登陆/最大/小化/关闭。"""

        super(Header, self).__init__()
        self.setObjectName('Header')

        self.parent = parent

        self.loginBox = LoginBox(self)

        with open('QSS/header.qss', 'r', encoding='utf-8') as f:
            self.setStyleSheet(f.read())

        # 加载按钮设置。
        self.setButtons()
        # 加载标签设置。
        self.setLabels()
        # 加载输入框设置。
        self.setLineEdits()
        # 加载小细线装饰。
        self.setLines()
        # 加载布局设置。
        self.setLayouts()

    # 布局。
    def setButtons(self):
        """创建所有的按钮。"""

        self.closeButton = QPushButton('×', self)
        self.closeButton.setObjectName("closeButton")
        self.closeButton.setMinimumSize(21, 17)

        self.showminButton = QPushButton('_', self)
        self.showminButton.setObjectName("minButton")
        self.showminButton.setMinimumSize(21, 17)

        self.showmaxButton = QPushButton('□')
        self.showmaxButton.setObjectName("maxButton")
        self.showmaxButton.setMaximumSize(16, 16)

        self.loginButton = QPushButton("未登录 ▼", self)
        self.loginButton.setObjectName("loginButton")

        self.prevButton = QPushButton("<")
        self.prevButton.setObjectName("prevButton")
        self.prevButton.setMaximumSize(28, 22)
        self.prevButton.setMinimumSize(28, 22)

        self.nextButton = QPushButton(">")
        self.nextButton.setObjectName("nextButton")
        self.nextButton.setMaximumSize(28, 22)
        self.nextButton.setMinimumSize(28, 22)

    def setLabels(self):
        """创建所需的所有标签。"""
        self.logoLabel = PicLabel(r'resource/format.png', 32, 32)

        self.descriptionLabel = QLabel(self)
        self.descriptionLabel.setText("<b>Music</b>")

        self.userPix = PicLabel(r'resource/no_music.png', 32, 32, r'resource/user_pic_mask.png')
        self.userPix.setMinimumSize(22, 22)
        self.userPix.setObjectName("userPix")

    def setLineEdits(self):
        """创建搜素框。"""
        self.searchLine = SearchLineEdit(self)
        self.searchLine.setPlaceholderText("搜索音乐, 歌手, 歌词, 用户")

    def setLines(self):
        """设置装饰用小细线。"""
        self.line1 = QFrame(self)
        self.line1.setObjectName("line1")
        self.line1.setFrameShape(QFrame.VLine)
        self.line1.setFrameShadow(QFrame.Plain)
        self.line1.setMaximumSize(1, 25)

    def setLayouts(self):
        """设置布局。"""
        self.mainLayout = QHBoxLayout()
        self.mainLayout.setSpacing(0)
        self.mainLayout.addWidget(self.logoLabel)
        self.mainLayout.addWidget(self.descriptionLabel)
        self.mainLayout.addSpacing(70)
        self.mainLayout.addWidget(self.prevButton)
        self.mainLayout.addWidget(self.nextButton)
        self.mainLayout.addSpacing(10)
        self.mainLayout.addWidget(self.searchLine)
        self.mainLayout.addStretch(1)
        self.mainLayout.addWidget(self.userPix)
        self.mainLayout.addSpacing(7)
        self.mainLayout.addWidget(self.loginButton)
        self.mainLayout.addSpacing(7)
        self.mainLayout.addWidget(self.line1)
        self.mainLayout.addSpacing(30)
        self.mainLayout.addWidget(self.showminButton)
        self.mainLayout.addWidget(self.showmaxButton)
        self.mainLayout.addSpacing(3)
        self.mainLayout.addWidget(self.closeButton)

        self.setLayout(self.mainLayout)

    # 事件。
    """重写鼠标事件，实现窗口拖动。"""
    def mousePressEvent(self, event):
        if event.buttons() == Qt.LeftButton:
            self.parent.m_drag = True
            self.parent.m_DragPosition = event.globalPos()-self.parent.pos()
            event.accept()

    def mouseMoveEvent(self, event):
        try:
            if event.buttons() and Qt.LeftButton:
                self.parent.move(event.globalPos()-self.parent.m_DragPosition)
                event.accept()
        except AttributeError:
            pass

    def mouseReleaseEvent(self, event):
        if event.buttons() == Qt.LeftButton:
            self.m_drag = False


# 左侧的导航栏，包括发现音乐/歌单/本地音乐。
class Navigation(QScrollArea):
    def __init__(self, parent=None):
        """包括发现音乐，MV，我的音乐, 歌单等导航信息。"""
        super(Navigation, self).__init__(parent)
        self.parent = parent
        self.frame = QFrame()
        self.setMaximumWidth(200)

        self.setWidget(self.frame)
        self.setWidgetResizable(True)
        self.frame.setMinimumWidth(200)

        # 定义3个事件函数，方便扩展。
        self.navigationListFunction = self.none
        self.nativeListFunction = self.none
        self.singsFunction = self.none

        with open('QSS/navigation.qss', 'r') as f:
            style = f.read()
            self.setStyleSheet(style)
            self.frame.setStyleSheet(style)

        # 包括显示信息： 推荐 我的音乐 歌单。
        self.setLabels()
        # 包括详细的内容：发现音乐，FM，MV等。
        self.setListViews()

        self.setLayouts()

    # 布局。
    def setLabels(self):
        """定义所有的标签。"""
        self.recommendLabel = QLabel(" 推荐")
        self.recommendLabel.setObjectName("recommendLabel")
        self.recommendLabel.setMaximumHeight(27)

        self.myMusic = QLabel(" 我的音乐")
        self.myMusic.setObjectName("myMusic")
        self.myMusic.setMaximumHeight(27)
        # self.myMusic.setMaximumHeight(54)

        self.singsListLabel = QLabel(" 收藏与创建的歌单")
        self.singsListLabel.setObjectName("singsListLabel")
        self.singsListLabel.setMaximumHeight(27)

    def setListViews(self):
        """定义承载功能的ListView"""
        self.navigationList = QListWidget()
        self.navigationList.setMaximumHeight(110)
        self.navigationList.setObjectName("navigationList")
        self.navigationList.addItem(QListWidgetItem(QIcon('resource/music.png'), " 发现音乐"))
        self.navigationList.addItem(QListWidgetItem(QIcon('resource/signal.png'), " 私人FM"))
        self.navigationList.addItem(QListWidgetItem(QIcon('resource/movie.png'), " MV"))
        self.navigationList.setCurrentRow(0)

        self.nativeList = QListWidget()
        self.nativeList.setObjectName("nativeList")
        self.nativeList.setMaximumHeight(100)
        self.nativeList.addItem(QListWidgetItem(QIcon('resource/notes.png')," 本地音乐"))
        self.nativeList.addItem(QListWidgetItem(QIcon('resource/download_icon.png'), " 我的下载"))
        self.nativeList.addItem(QListWidgetItem(QIcon('resource/recommend_icon.png'), " 专属推荐"))

    def setLayouts(self):
        """定义布局。"""
        self.mainLayout = VBoxLayout(self.frame)
        self.mainLayout.addSpacing(10)
        self.mainLayout.addWidget(self.recommendLabel)
        self.mainLayout.addSpacing(3)
        self.mainLayout.addWidget(self.navigationList)
        self.mainLayout.addSpacing(1)
        
        self.mainLayout.addWidget(self.myMusic)
        self.mainLayout.addSpacing(3)
        self.mainLayout.addWidget(self.nativeList)
        self.mainLayout.addSpacing(1)

        self.mainLayout.addWidget(self.singsListLabel)
        self.mainLayout.addSpacing(1)

        self.mainLayout.addStretch(1)

        self.setContentsMargins(0, 0, 0, 0)

    # just a test.
    def setSingsList(self):

        pass

    # 功能。
    def none(self):
        # 没有用的空函数。
        pass


# 主要内容区，包括最新的歌单。
class MainContent(ScrollArea):
    # 定义一个滑到了最低部的信号。
    # 方便子控件得知已经滑到了最底部，要做些加载的动作。

    def __init__(self, parent=None):
        """主内容区，包括推荐歌单等。"""
        super(MainContent, self).__init__()
        self.parent = parent
        self.setObjectName("MainContent")

        # 连接导航栏的按钮。
        # self.parent.navigation.navigationListFunction = self.navigationListFunction
        with open("QSS/mainContent.qss", 'r', encoding='utf-8') as f:
            self.style = f.read()
            self.setStyleSheet(self.style)

        self.tab = QTabWidget()
        self.tab.setObjectName("contentsTab")

        self.mainLayout = QVBoxLayout()
        self.mainLayout.setSpacing(0)
        self.mainLayout.setContentsMargins(0, 0, 0, 0)
        self.mainLayout.addWidget(self.tab)

        self.frame.setLayout(self.mainLayout)

    def addTab(self, widget, name=''):
        self.tab.addTab(widget, name)


# 搜索后的结果显示页。
class SearchArea(ScrollArea):

    def __init__(self, parent=None):
        super(SearchArea, self).__init__(self)
        self.parent = parent
        self.setObjectName("searchArea")
        with open('QSS/searchArea.qss', 'r', encoding='utf-8') as f:
            self.setStyleSheet(f.read())

        self.mainLayout = QVBoxLayout(self.frame)

        self.titleLabel = QLabel(self.frame)

        # 搜索结果的tab。
        self.contentsTab = QTabWidget(self.frame)

        # 加入布局。
        self.mainLayout.addWidget(self.titleLabel)
        self.mainLayout.addWidget(self.contentsTab)

        self.setSingsFrame()

    # 布局。
    def setSingsFrame(self):
        # 单曲界面。
        self.neteaseSearchFrame = NetEaseSearchResultFrame(self)
        self.contentsTab.addTab(self.neteaseSearchFrame, "网易云")

        self.xiamiSearchFrame = XiamiSearchResultFrame(self)
        self.contentsTab.addTab(self.xiamiSearchFrame, "虾米")

        self.qqSearchFrame = QQSearchResultFrame(self)
        self.contentsTab.addTab(self.qqSearchFrame, 'QQ')

    # 功能。
    def setText(self, text):
        self.text = text
        self.titleLabel.setText("搜索<font color='#23518F'>“{0}”</font><br>".format(self.text))


def start():
    app = QApplication(sys.argv)

    # 将Qt事件循环写到asyncio事件循环里。
    # QEventLoop不是Qt原生事件循环，
    # 是被asyncio重写的事件循环。
    eventLoop = QEventLoop(app)
    asyncio.set_event_loop(eventLoop)

    try:
        main = Window()

        main.show()
        # 当前音乐的显示信息。
        # 因为需要布局之后重新绘制的宽高。
        # 这个宽高会在show之后才会改变。
        # 需要获取宽，高并嵌入到父窗口里。
        main.playWidgets.currentMusic.resize(main.navigation.width(), 64)
        
        with eventLoop:
            eventLoop.run_forever()

        sys.exit(0)
    except:
        logger.error("got some error", exc_info=True)


if __name__ == '__main__':
    start()    
