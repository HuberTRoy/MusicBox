"""
重新设计，主要用于熟悉设计模式。
多线程/漂亮界面的设计等。

以网易云音乐为模板。
# 基本没考虑网络的出错问题。
# 不过也考虑了一些。
# 对于放在线程QThread里的错误捕获如果要显示警示框: QDialog exec_
# 需要使用信号槽，捕获后发出信号，然后在主线程中创建并显示，否则会导致程序错误。
# 
"""

__author__ = 'cyrbuzz'

# from PyQt5.QtWidgets import *
# from PyQt5.QtCore import *
# from PyQt5.QtGui import *

# from PyQt5.QtMultimedia import QMediaPlayer, QMediaContent, QMediaMetaData, QMediaPlaylist
import sys

sys.path.append('widgets')
sys.path.append('networks')
sys.path.append('apis')

from base import *
from player import *
from native import NativeMusic


import network
import addition
import netEaseApi

# netEaseApi
netEase = netEaseApi.NetEaseWebApi()


"""用于承载整个界面。所有窗口的父窗口，所有窗口都可以在父窗口里找到索引。"""
class Window(QWidget):
    """Window 承载整个界面。"""
    def __init__(self):
        super(Window, self).__init__()
        self.setObjectName('MainWindow')
        self.setWindowFlags(Qt.FramelessWindowHint)
        self.setWindowIcon(QIcon('resource/format.ico'))
        self.setWindowTitle("Music")
        with open('QSS/window.qss', 'r') as f:
            self.setStyleSheet(f.read())
        self.resize(1022, 670)

        self.header = Header(self)
        self.navigation = Navigation(self)
        self.playWidgets = PlayWidgets(self)
        self.mainContent = MainContent(self)
        self.nativeMusic = NativeMusic(self)
        self.searchArea = SearchArea(self)
        # self.searchArea.hide()
        # self.player = Player(self)

        self.mainContents = QTabWidget()
        self.mainContents.tabBar().setObjectName("mainTab")
        self.mainContents.currentChanged.connect(self.addTabHistory)
        # 用于存储Tab的历史，方便前后切换。
        # 只存储5个，不考虑效率问题。
        self.history = []
        self.currentIndex = -1
        # 前后切换时也会触发currentChanged信号，
        # 前后切换时不允许增加新的历史也不允许删除旧的历史。
        self.isTab = False

        # 加载tab设置。
        self.setContents()
        # 设置布局小细线。
        self.setLines()
        # 设置布局。
        self.setLayouts()

    def setContents(self):
        """设置tab界面。"""
        # 将需要切换的窗口做成Tab，并隐藏tabBar，这样方便切换，并且可以做前进后退功能。
        
        # 他的父窗口为什么是mainContent是历史问题。暂不需要修改。
        self.detailSings = DetailSings(self.mainContent)
        self.mainContents.addTab(self.mainContent, '')
        self.mainContents.addTab(self.detailSings, '')
        self.mainContents.addTab(self.nativeMusic, '')
        self.mainContents.addTab(self.searchArea, '')

        self.navigation.nativeListFunction = lambda: self.mainContents.setCurrentIndex(2)
        
        self.mainContents.setCurrentIndex(0)

    def addTab(self, widget, name=''):
        self.mainContents.addTab(widget, name)

    def allTab(self):
        return self.mainContents.count()

    def setTabIndex(self, index):
        self.mainContents.setCurrentIndex(index)

    def addTabHistory(self, index):
        length = len(self.history)
        if not self.isTab:
            if length < 5:
                self.history.append(index)
            else:
                self.history.pop(0)
                self.history.append(index)
            # 不是前后切换时将当前的索引定为末尾一个。
            self.currentIndex = length
        else:
            self.isTab = False
            

    def prevTab(self):
        # 前一个的切换。
        if self.currentIndex == 0 or self.currentIndex == -1:
            return
        else:
            self.isTab = True
            self.currentIndex -= 1
            self.mainContents.setCurrentIndex(self.history[self.currentIndex])

    def nextTab(self):
        # 后一个的切换。

        if self.currentIndex  == len(self.history)-1 or self.currentIndex == -1:
            return
        else:
            self.isTab = True
            self.currentIndex += 1
            self.mainContents.setCurrentIndex(self.history[self.currentIndex])

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
        # self.contentLayout.addStretch(1)

        self.contentLayout.setSpacing(0)
        self.contentLayout.setContentsMargins(0, 0, 0, 0)   


        self.mainLayout.addLayout(self.contentLayout)
        self.mainLayout.addWidget(self.playWidgets)
        # self.mainLayout.addStretch(1)

        
        self.mainLayout.setStretch(0, 43)
        self.mainLayout.setStretch(1, 0)
        self.mainLayout.setStretch(2, 576)
        self.mainLayout.setStretch(3, 50)

        self.mainLayout.setSpacing(0)
        self.mainLayout.setContentsMargins(0, 0, 0, 0)
        self.setLayout(self.mainLayout)


"""标题栏，包括logo，搜索，登陆，最小化/关闭。"""
class Header(QFrame):

    def __init__(self, parent=None):
        """头部区域，包括图标/搜索/设置/登陆/最大/小化/关闭。"""

        super(Header, self).__init__()
        self.setObjectName('Header')

        self.parent = parent
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

    def search(self):
        text = self.searchLine.text()
        result = netEase.search(text)['result']

        songsCount = result['songCount']

        # 总数是0即没有找到。
        if not songsCount:
            songs = []
        else:
            songs = result['songs'] 

        self.parent.searchArea.setText(text)

        self.parent.searchArea.setSingsData(songs)

        self.parent.setTabIndex(3)

    def setButtons(self):
        """创建所有的按钮。"""

        self.closeButton = QPushButton('×', self)
        self.closeButton.setObjectName("closeButton")
        self.closeButton.setMinimumSize(21, 17)
        self.closeButton.clicked.connect(self.parent.close)

        self.showminButton = QPushButton('_', self)
        self.showminButton.setObjectName("minButton")
        self.showminButton.setMinimumSize(21, 17)
        self.showminButton.clicked.connect(self.parent.showMinimized)

        self.loginButton = QPushButton("未登录 ▼", self)
        self.loginButton.setObjectName("loginButton")

        self.prevButton = QPushButton("<")
        self.prevButton.setObjectName("prevButton")
        self.prevButton.setMaximumSize(28, 22)
        self.prevButton.setMinimumSize(28, 22)
        self.prevButton.clicked.connect(self.parent.prevTab)

        self.nextButton = QPushButton(">")
        self.nextButton.setObjectName("nextButton")
        self.nextButton.setMaximumSize(28, 22)
        self.nextButton.setMinimumSize(28, 22)
        self.nextButton.clicked.connect(self.parent.nextTab)

    def setLabels(self):
        """创建所需的所有标签。"""
        self.logoLabel = QLabel(self)
        self.logoPixmap = QPixmap(r'resource//format.png')
        self.logoLabel.setPixmap(self.logoPixmap.scaled(22, 22))
        self.logoLabel.setMaximumSize(22, 22)

        self.descriptionLabel = QLabel(self)
        self.descriptionLabel.setText("<b>Music<b>")

        self.userPix = QLabel(self)
        self.nouserPix = QPixmap(r'resource//nouser.png')
        self.userPix.setPixmap(self.nouserPix.scaled(22, 22))
        self.userPix.setMaximumSize(22, 22)

    def setLineEdits(self):
        """创建搜素框。"""
        self.searchLine = addition.SearchLineEdit(self)
        self.searchLine.setPlaceholderText("搜索音乐, 歌手, 歌词, 用户")
        self.searchLine.setButtonSlot(self.search)

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
        # self.mainLayout.addWidget(self.searchButton)
        self.mainLayout.addStretch(1)
        self.mainLayout.addWidget(self.userPix)
        self.mainLayout.addSpacing(7)
        self.mainLayout.addWidget(self.loginButton)
        self.mainLayout.addSpacing(7)
        self.mainLayout.addWidget(self.line1)
        self.mainLayout.addSpacing(30)
        self.mainLayout.addWidget(self.showminButton)
        self.mainLayout.addSpacing(3)
        self.mainLayout.addWidget(self.closeButton)


        self.setLayout(self.mainLayout)

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


"""左侧的导航栏，包括发现音乐/歌单/本地音乐。"""
class Navigation(QScrollArea):
    def __init__(self, parent=None):
        """包括发现音乐，MV，我的音乐, 歌单等导航信息。"""
        super(Navigation, self).__init__(parent)
        self.parent = parent
        self.frame = QFrame()
        self.setMaximumHeight(576)
        self.setMaximumWidth(200)

        self.setWidget(self.frame)
        self.setWidgetResizable(True)
        self.frame.setMaximumWidth(200)
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

    def setLabels(self):
        """定义所有的标签。"""
        self.showLabel = QLabel(" 推荐", self)
        self.showLabel.setObjectName("showLabel")

        self.myMusic = QLabel(" 我的音乐", self)
        self.myMusic.setObjectName("myMusic")

        self.singsListLabel = QLabel(" 收藏与创建的歌单", self)
        self.singsListLabel.setObjectName("singsListLabel")


    def setListViews(self):
        """定义承载功能的ListView"""
        self.navigationList = QListWidget()
        self.navigationList.setMinimumHeight(110)
        self.navigationList.setMaximumHeight(110)
        self.navigationList.setObjectName("navigationList")
        self.navigationList.addItem(QListWidgetItem(QIcon('resource/Music.png'), " 发现音乐"))
        self.navigationList.addItem(QListWidgetItem(QIcon('resource/signal.png'), " 私人FM"))
        self.navigationList.addItem(QListWidgetItem(QIcon('resource/movie.png'), " MV"))
        self.navigationList.itemPressed.connect(self.navigationListItemClickEvent)
        self.navigationList.setCurrentRow(0)

        self.nativeList = QListWidget()
        self.nativeList.setObjectName("nativeList")
        self.nativeList.setMinimumHeight(50)
        self.nativeList.setMaximumHeight(50)
        self.nativeList.addItem(QListWidgetItem(QIcon('resource/notes.png')," 本地音乐"))
        self.nativeList.itemPressed.connect(self.nativeListItemClickEvent)

    def setSingsList(self):
        """歌单用按钮显示，不显示在ListWidget里是因为ListWidget只是单个有滚轮，需要全部有滚轮。"""
        self.singsList = []
        # for i in range(25):
        #     self.singsList.append(QPushButton(QIcon('resource/notes.png'),'TestSingsListaaaaaaaaaaaaaaaaaaaaaaaaa'))

        # for i in self.singsList:
        #     i.setCheckable(True)
        #     i.setAutoExclusive(True)
        #     i.clicked.connect(self.singsButtonClickEvent)
        #     self.frame.mainLayout.addWidget(i)
        pass

    def navigationListItemClickEvent(self):
        """用户处理导航栏的点击事件。"""
        # 处理其他组件取消选中。
        for i in self.singsList:
            if i.isChecked():
                i.setCheckable(False)
                i.setCheckable(True)
                break

        self.nativeList.setCurrentRow(-1)

        """处理事件。"""
        self.navigationListFunction()

    def nativeListItemClickEvent(self):
        """本地功能的点击事件。"""
        for i in self.singsList:
            if i.isChecked():
                i.setCheckable(False)
                i.setCheckable(True)
                break

        self.navigationList.setCurrentRow(-1)

        """处理事件。"""
        self.nativeListFunction()

    def singsButtonClickEvent(self):
        """歌单的点击事件。"""
        self.navigationList.setCurrentRow(-1)
        self.nativeList.setCurrentRow(-1)

        """处理事件。"""
        self.singsFunction()

    def setLayouts(self):
        """定义布局。"""
        self.mainLayout = QVBoxLayout()
        self.mainLayout.addSpacing(10)
        self.mainLayout.addWidget(self.showLabel)
        self.mainLayout.addSpacing(3)
        self.mainLayout.addWidget(self.navigationList)
        self.mainLayout.addSpacing(1)
        
        self.mainLayout.addWidget(self.myMusic)
        self.mainLayout.addSpacing(1)
        self.mainLayout.addWidget(self.nativeList)
        self.mainLayout.addSpacing(1)

        self.mainLayout.addWidget(self.singsListLabel)
        self.mainLayout.addSpacing(1)

        self.setSingsList()
        self.mainLayout.addStretch(1)

        self.setContentsMargins(0, 0, 0, 0)
        self.mainLayout.setContentsMargins(0, 0, 0, 0)
        self.mainLayout.setSpacing(0)
        self.frame.setLayout(self.mainLayout)

    def none(self):
        # 没有用的空函数。
        pass


"""主要内容区，包括最新的歌单。"""
class MainContent(ScrollArea):
    # 定义一个滑到了最低部的信号。
    # 方便子控件得知已经滑到了最底部，要做些加载的动作。

    def __init__(self, parent=None):
        """主内容区，包括推荐歌单等。"""
        super(MainContent, self).__init__()
        self.parent = parent
        self.setObjectName("MainContent")

        # self.detailSings = DetailSings(self)
        # 连接导航栏的按钮。
        self.parent.navigation.navigationListFunction = self.navigationListFunction
        with open("QSS/mainContent.qss", 'r', encoding='utf-8') as f:
            self.style = f.read()
            self.setStyleSheet(self.style)


        self.tab = QTabWidget()
        self.tab.setObjectName("contentsTab")
        self.indexNetEaseSings = NetEaseSingsArea(self)
        self.tab.addTab(self.indexNetEaseSings, "网易云歌单")

        self.mainLayout = QVBoxLayout()
        self.mainLayout.setSpacing(0)
        self.mainLayout.setContentsMargins(0, 0, 0, 0)
        self.mainLayout.addWidget(self.tab)
        # self.mainLayout.addWidget(self.detailSings)

        self.frame.setLayout(self.mainLayout)

    def navigationListFunction(self):
        isVisible = self.tab.isVisible()
        if self.parent.navigation.navigationList.currentRow() == 0:
            # 发现音乐。
            self.parent.mainContents.setCurrentIndex(0)

    def addTab(self, widget, name=''):
        self.tab.addTab(widget, name)



# # ---上面是基本部件。


# ---下面是部件里的子部件。

"""一个Tab，网易云的全部歌单。"""
class NetEaseSingsArea(QFrame):
    """全部歌单。"""

    def __init__(self, parent=None):
        super(NetEaseSingsArea, self).__init__(parent)
        self.parent = parent
        self.transTime = addition.itv2time

        self.setObjectName("allSingsArea")
        # self.frame.setObjectName("allSings")
        # 为什么有的需要加utf-8呢，因为有中文。
        with open('QSS/neteaseSings.qss', 'r', encoding='utf-8') as f:
            self.setStyleSheet(f.read())

        self.picManager = network.NetWorkThread(self)
        self.userPicManager = network.NetWorkThread(self)
        # 连接滑轮到底的信号槽。
        # 同时连接图片下载的线程全部完成的信号槽。
        # 若一轮图片下载完成并且滑到底部则进行下一次线程，否则将不会。
        self.parent.scrollDown.connect(self.sliderDownEvent)
        self.picManager.allFinished.connect(self.picManagerFinishedEvent)
        # 用于存储结果。
        self.result = []
        # 歌单的索引。
        self.singsFrames = []
        # 歌单显示名的url。
        self.singPicUrls = []
        # 歌单名称。
        self.singNames = []
        # 歌单id。
        self.singIds = []

        # 一个是否滑到底部的flag。
        self.sliderDown = False

        # 布局用row。
        self.gridRow = 0
        # 布局用column。
        self.gridColumn = 0

        # 主布局。
        self.mainLayout = QGridLayout()
        self.mainLayout.setSpacing(0)
        self.mainLayout.setHorizontalSpacing(10)
        self.mainLayout.setContentsMargins(0, 0, 0, 0)
        self.setLayout(self.mainLayout)

        # 用于网易云的每次请求的歌单数量。
        self.offset = 0
        # 用于记录次数，多线程的同步。

        self.api = netEase

        # 一个线程，初始化用于请求歌单的全部内容。
        self.netThread = RequestThread(self, self.getSings)
        self.netThread.finished.connect(self.setSings)
        self.netThread.setFlag(True)
        self.netThread.start()
        # 另一个线程，无限循环的时钟，用于检测当picManager处于工作状态时，暂停下一轮请求。
        self.timerThread = Timer(self, self.picManager.picFinished)
        self.timerThread.finished.connect(self.setSings2)
        # 第三个线程，与第一个一样。
        self.singsThread = RequestThread(self)

    def getSings(self):
        """请求一波歌单，一次30个。设置offset会设置请求量。"""
        for i in self.api.all_playlist(offset=self.offset):
            self.result.append(i)
            self.singNames.append(i['name'])
            self.singPicUrls.append(i['coverImgUrl'])
            self.singIds.append(i['id'])

    def setSings(self):
        # 先生成QFrame，并附上名字，图片稍后再获取。
        for i in range(30):
            i += self.offset
            picName = self.singPicUrls[i][self.singPicUrls[i].rfind('/')+1:]
            frame = OneSing(self.gridRow, self.gridColumn, self.singIds[i], self, picName)
            frame.nameLabel.setText(self.singNames[i])
            
            # 建立起索引，一是防止垃圾回收了，二是可以找到他的地址。
            self.singsFrames.append(frame)

            # 用于布局，一行4个。
            if self.gridColumn == 3:
                self.gridColumn = 0
                self.gridRow += 1
            else:
                self.gridColumn += 1
        
        # 设置url。
        self.picManager.setUrl(self.singPicUrls)
        
        # 如果没有在工作那就直接进行就好了。
        if self.picManager.picFinished:
            # 没有在工作，加载图片。
            self.pics = self.picManager.startGet(self.singsFrames)
            # 开启监控的线程，如果是初始化时，没有加载完成就拉到最低时，也可以监控到。
            self.timerThread.start()
        else:
            # 在进行工作，并且监控线程也在工作就不做操作，否则两次start会报错也没有必要。
            if self.timerThread.isFinished() == False:
                pass
            # 下两步可合为一步，懒得改了。
            elif self.timerThread.times == 0:
                self.timerThread.timer = 1
                self.timerThread.start()
            else:
                self.timerThread.start()

    def setSings2(self):
        # 上面那个的副本，只用于发起请求图片的函数。
        # 监控线程的完成槽。
        # 先判断图片线程是否在工作，如果没有在工作，那么就判断请求新歌单的线程有没有在工作，
        # 如果新歌单的线程在工作，那么就重新开启监控线程，因为还不到要进行图片请求的时候。
        # 否则将进行新的图片请求。
        if self.picManager.picFinished:
            if self.netThread.isRunning():
                self.timerThread.start()
            else:
                self.picManager.setUrl(self.singPicUrls)
                self.picManager.startGet(self.singsFrames)

    def sliderDownEvent(self):
        """滑轮到底的事件。"""
        if self.isHidden() == False:
            self.offset += 30
            # 判断是否在工作，免得多次start。
            if self.netThread.isRunning():
                return
            else:
                self.netThread.start()

    def picManagerFinishedEvent(self):
        # 图片线程已经完成，进行标记。
        self.picManager.picFinished = True
        # 让监控线程停止。
        self.timerThread.setVar(True)


"""歌单详情页。"""
class DetailSings(ScrollArea):

    def __init__(self, parent=None):
        super(DetailSings, self).__init__(self)

        # self.hide()
        self.parent = parent
        self.setObjectName('detailSings')
        with open('QSS/detailSings.qss', 'r', encoding='utf-8') as f:
            self.setStyleSheet(f.read())

        self.musicList = []

        # 建立索引。
        self.grandparent = self.parent.parent
        self.player = self.grandparent.playWidgets.player
        self.playList = self.grandparent.playWidgets
        self.currentMusic = self.grandparent.playWidgets.currentMusic

        self.setLabels()
        self.setButtons()
        self.setTabs()
        self.setLayouts()
    
    def setLabels(self):
        self.picLabel = QLabel(self.frame)
        self.picLabel.setObjectName('picLabel')
        self.picLabel.setMinimumSize(200, 200)
        self.picLabel.setMaximumSize(200, 200)

        self.titleLabel = QLabel(self.frame)
        self.titleLabel.setObjectName('titleLabel')
        self.titleLabel.setWordWrap(True)

        self.authorPic = QLabel(self.frame)
        self.authorName = QLabel(self.frame)
        self.authorName.setObjectName('authorName')
        self.authorName.setMaximumHeight(28)

        self.descriptionLabel = QLabel(self.frame)
        self.descriptionLabel.setObjectName('descriptionLabel')
        self.descriptionLabel.setMaximumWidth(450)
        self.descriptionLabel.setMaximumHeight(100)
        self.descriptionLabel.setWordWrap(True)

    def setButtons(self):
        self.showButton = QPushButton("歌单")
        self.showButton.setObjectName('showButton')
        self.showButton.setMaximumSize(36, 20)

        self.descriptionButton = QPushButton(" 简介 ：")
        self.descriptionButton.setObjectName('descriptionButton')
        self.descriptionButton.setMaximumSize(36, 36)

        self.playAllButton = QPushButton("全部播放")
        self.playAllButton.setIcon(QIcon('resource/playAll.png'))
        self.playAllButton.setObjectName('playAllButton')
        self.playAllButton.setMaximumSize(90, 24)

    def setTabs(self):
        self.contentsTab = QTabWidget(self.frame)

        self.singsTable = TableWidget(3, ['音乐标题', '歌手', '时长'])
        self.singsTable.setObjectName('singsTable')
        self.singsTable.setMinimumWidth(self.width())
        self.singsTable.setColumnWidths({i:j for i,j in zip(range(3), 
            [self.width()/3*1.25,self.width()/3*1.25,self.width()/3*0.5])})
        # self.singsTable.setColumnCount(3)
        # self.singsTable.setHorizontalHeaderLabels(['音乐标题', '歌手', '时长'])

        # self.singsTable.setColumnWidth(0, self.width()/3*1.25)
        # self.singsTable.setColumnWidth(1, self.width()/3*1.25)
        # self.singsTable.setColumnWidth(2, self.width()/3*0.5)
        # # self.singsTable.horizontalHeader().setVisible(False)
        # self.singsTable.horizontalHeader().setStretchLastSection(True)
        # self.singsTable.verticalHeader().setVisible(False)
        # self.singsTable.setShowGrid(False)
        # self.singsTable.setAlternatingRowColors(True)

        # self.singsTable.setEditTriggers(QAbstractItemView.NoEditTriggers)
        # self.singsTable.setSelectionBehavior(QAbstractItemView.SelectRows)
        self.singsTable.itemDoubleClicked.connect(self.itemDoubleClickedEvent)

        self.contentsTab.addTab(self.singsTable, "歌曲列表")

    def itemDoubleClickedEvent(self):
        currentRow = self.singsTable.currentRow()
        data = self.musicList[currentRow]

        self.playList.setPlayerAndPlayList(data)

    def setLayouts(self):
        self.mainLayout = QVBoxLayout()

        self.topLayout = QHBoxLayout()

        self.descriptionLayout = QVBoxLayout()
        self.titleLayout = QHBoxLayout()
        self.titleLayout.addWidget(self.showButton)
        self.titleLayout.addSpacing(5)
        self.titleLayout.addWidget(self.titleLabel)

        self.authorLayout = QHBoxLayout()
        self.authorLayout.addWidget(self.authorPic)
        self.authorLayout.addWidget(self.authorName)
        self.authorLayout.addStretch(1)

        self.descriptLayout = QHBoxLayout()
        self.descriptLayout.addWidget(self.descriptionButton)
        self.descriptLayout.addWidget(self.descriptionLabel)

        self.descriptionLayout.addLayout(self.titleLayout)
        self.descriptionLayout.addLayout(self.authorLayout)
        self.descriptionLayout.addSpacing(5)
        self.descriptionLayout.addWidget(self.playAllButton)
        self.descriptionLayout.addSpacing(10)
        self.descriptionLayout.addLayout(self.descriptLayout)

        self.descriptionLayout.setSpacing(0)

        self.topLayout.addWidget(self.picLabel)
        self.topLayout.addSpacing(18)
        self.topLayout.addLayout(self.descriptionLayout)

        self.mainLayout.addLayout(self.topLayout)
        self.mainLayout.addWidget(self.contentsTab)
        
        self.frame.setLayout(self.mainLayout)

    def test(self):
        self.titleLabel.setText("［日系］电音&人声，电毒侵入脑电波！")
        self.picLabel.setStyleSheet('''QLabel {border-image: url(cache/566527372.jpg); padding: 10px;}''')
        self.authorName.setText("Nothing")
        self.descriptionLabel.setText("test"*30)

        self.singsTable.setRowCount(4)


"""一个用于承载歌单简单信息的QFrame。"""
class OneSing(QFrame):
    # 大量创建，这样可以省内存。
    __solts__ = ('parent', 'ggparent', 'detailFrame', 'transTime', 'row', 'column', 'ids',
     'picName', 'picLabel', 'nameLabel',
     'mainLayout',
     'mousePos',
     'result')

    def __init__(self, row, column, ids=None, parent=None, picName=None):
        super(OneSing, self).__init__()
        if parent:
            self.parent = parent
            self.ggparent = self.parent.parent.parent
            self.detailFrame = self.ggparent.detailSings
            self.transTime = self.parent.transTime
        else:
            self.parent = None
            self.ggparent = None
            self.detailFrame = None
            self.transTime = None
            
        self.setObjectName('oneSing')
        # 自己的位置信息。
        self.row = row
        self.column = column
        # 歌单号。
        self.ids = ids
        # 大图的缓存名。
        self.picName = picName

        self.setMinimumSize(180, 235)

        self.picLabel = QLabel(self)
        self.picLabel.setObjectName('picLabel')
        self.picLabel.setMinimumSize(180, 180)
        self.picLabel.setMaximumSize(180, 180)

        self.nameLabel = QLabel(self)
        self.nameLabel.setMaximumWidth(180)
        self.nameLabel.setWordWrap(True)

        self.mainLayout = QVBoxLayout()

        self.mainLayout.addWidget(self.picLabel)
        self.mainLayout.addWidget(self.nameLabel)

        self.setLayout(self.mainLayout)

        self.parent.mainLayout.addWidget(self, self.row, self.column)

    def setStyleSheets(self, styleSheet=None):
        if styleSheet:
            self.setStyleSheet(styleSheet)

    def mousePressEvent(self, event):
        # 记录下当前鼠标的位置。
        self.mousePos = QCursor.pos()

    def mouseReleaseEvent(self, event):
        # 先进行判断，防止误点将鼠标移开后还是会判断为已经点击的尴尬。
        if QCursor.pos() != self.mousePos:
            return
        else:
            self.parent.singsThread.setTarget(self.requestsDetail)
            self.parent.singsThread.finished.connect(self.setDetail)
            self.parent.singsThread.start()

    def requestsDetail(self):
        """请求本歌单的详情，并复制给detailSings."""
        result = self.parent.api.details_playlist(self.ids)
        self.result = result

    def setDetail(self):
        # 方便书写。
        result = self.result
        self.detailFrame.musicList = []
        self.detailFrame.singsTable.clearContents()
        # 一些信息，包括展示大图，标题，创建者，简介。
        self.detailFrame.picLabel.setStyleSheet('''QLabel {border-image: url(cache/%s); padding: 10px;}'''%(self.picName))
        self.detailFrame.titleLabel.setText(result['name'])
        self.detailFrame.authorName.setText(result['creator']['nickname'])
        # 简介有些太长了，暂时只截取前107个字符。
        description = result['description']
        # 有些没有简介会报错的。
        if not description:
            description = ''
        self.detailFrame.descriptionLabel.setText(description[:107])
        # 这边添加歌曲的信息到table。
        self.detailFrame.singsTable.setRowCount(result['trackCount'])
        for i, j in zip(result['tracks'], range(result['trackCount'])):
            names = i['name']
            musicName = QTableWidgetItem(names)
            self.detailFrame.singsTable.setItem(j, 0, musicName)

            author = i['artists'][0]['name']
            musicAuthor = QTableWidgetItem(author)
            self.detailFrame.singsTable.setItem(j, 1, musicAuthor)

            times = self.transTime(i['duration']/1000)
            musicTime = QTableWidgetItem(times)
            self.detailFrame.singsTable.setItem(j, 2, musicTime)

            music_img = i['album']['blurPicUrl']

            self.detailFrame.musicList.append({'url': i['mp3Url'], 'name': names, 'time':times, 'author':author, 'music_img': music_img})

        self.parent.singsThread.finished.disconnect()
        
        # 隐藏原来的区域，显示现在的区域。
        self.ggparent.mainContents.setCurrentIndex(1)


"""搜索后的结果显示页。"""
class SearchArea(ScrollArea):

    def __init__(self, parent=None):
        super(SearchArea, self).__init__(self)
        self.parent = parent
        self.setObjectName("searchArea")
        with open('QSS/searchArea.qss', 'r', encoding='utf-8') as f:
            self.setStyleSheet(f.read())

        self.mainLayout = QVBoxLayout(self.frame)

        self.transTime = addition.itv2time
        
        self.noContents = "<br><br><br><br>, 很抱歉 未能找到关于 <font color='#23518F'>“{0}”</font>的{1}。"
        
        self.titleLabel = QLabel(self.frame)

        # 搜索结果的tab。
        self.contentsTab = QTabWidget(self.frame)

        # 加入布局。
        self.mainLayout.addWidget(self.titleLabel)
        self.mainLayout.addWidget(self.contentsTab)

        self.setSingsFrame()

    def setText(self, text):
        self.text = text
        self.titleLabel.setText("搜索<font color='#23518F'>“{0}”</font>".format(self.text))

    def setSingsFrame(self):
        # 单曲界面。
        self.singsFrame = QFrame()
        self.singsFrameLayout = VBoxLayout(self.singsFrame)

        self.noSingsContentsLabel = QLabel(self.singsFrame)
        self.noSingsContentsLabel.hide()

        self.singsResultTable = TableWidget(3, ['音乐标题', '歌手', '时长'])
        self.singsResultTable.setObjectName('singsTable')
        self.singsResultTable.setMinimumWidth(self.width())
        self.singsResultTable.setColumnWidths({i:j for i,j in zip(range(3), 
            [self.width()/3*1.25,self.width()/3*1.25,self.width()/3*0.5])})

        self.singsFrameLayout.addWidget(self.singsResultTable)
        self.singsFrameLayout.addWidget(self.noSingsContentsLabel)

        self.contentsTab.addTab(self.singsFrame, "单曲")

    def setSingsData(self, data):
        # 单曲搜索结果。

        if not len(data):
            # self.contentsTab.addTab()
            self.noSingsContentsLabel.setText(self.noContents.format(self.text, '单曲'))
            self.singsResultTable.hide()
            self.noSingsContentsLabel.show()
        else:
            self.singsResultTable.setRowCount(len(data))

            for count, datas in enumerate(data):
                # id用来获取歌曲的地址。
                musicId = datas['name']

                name = datas['name']
                authors = ','.join([t['name'] for t in datas['artists']])
                duration = self.transTime(datas['duration']/1000)

                self.singsResultTable.setItem(count, 0, QTableWidgetItem(name))
                self.singsResultTable.setItem(count, 1, QTableWidgetItem(authors))
                self.singsResultTable.setItem(count, 2, QTableWidgetItem(duration))
            
            self.noSingsContentsLabel.hide()
            self.singsResultTable.show()


if __name__ == '__main__':
    app = QApplication(sys.argv)

    main = Window()

    main.show()
    # 当前音乐的显示信息。
    # 因为需要布局之后重新绘制的宽高。
    # 这个宽高会在show之后才会改变。
    # 需要获取宽，高并嵌入到父窗口里。
    main.playWidgets.currentMusic.resize(main.navigation.width(), 64)
    main.playWidgets.currentMusic.move(0, main.height()-64-main.playWidgets.height())

    sys.exit(app.exec_())
