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

import sys

sys.path.append('widgets')
sys.path.append('networks')
sys.path.append('apis')

from base import *
from player import *
from native import NativeMusic
from loginFrames import LoginBox
from netEaseSingsFrames import *

import network
import addition
import netEaseApi

# netEaseApi
netEase = netEaseApi.NetEaseWebApi()
# Requests = network.Requests


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

    # 布局。
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

    # 功能。
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

    def closeEvent(self, event):
        # 主要是保存cookies.
        self.header.saveCookies()
        self.playWidgets.saveCookies()


"""标题栏，包括logo，搜索，登陆，最小化/关闭。"""
class Header(QFrame):

    # 装饰器初始化时还不会调用__init__.
    loginCookiesFolder = 'cookies/headers/loginInfor.cks'
    allCookiesFolder = [loginCookiesFolder]
    
    def __init__(self, parent=None):
        """头部区域，包括图标/搜索/设置/登陆/最大/小化/关闭。"""

        super(Header, self).__init__()
        self.setObjectName('Header')

        self.parent = parent

        self.searchThread = RequestThread(self)
        self.searchThread.setTarget(self.search)
        self.searchThread.finished.connect(self.searchFinished)

        self.loginThread = RequestThread(self)
        self.loginThread.breakSignal.connect(self.emitWarning)
        self.loginThread.finished.connect(self.loginFinished)

        self.loadUserPlaylistThread = RequestThread(self)
        self.loadUserPlaylistThread.finished.connect(self.loadUserPlaylistFinished)

        self.loginBox = LoginBox(self)
        self.loginBox.connectLogin(self.login)

        # 
        self.loginInfor = {}

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

        # 加载cookies.
        self.loadCookies()

    # 布局。
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
        self.loginButton.clicked.connect(self.showLoginBox)

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
        self.logoLabel = PicLabel(r'resource/format.png', 32, 32)

        self.descriptionLabel = QLabel(self)
        self.descriptionLabel.setText("<b>Music<b>")

        self.userPix = PicLabel(r'resource/no_music.png', 32, 32, r'resource/user_pic_mask.png')
        self.userPix.setMinimumSize(22, 22)
        self.userPix.setObjectName("userPix")

    def setLineEdits(self):
        """创建搜素框。"""
        self.searchLine = addition.SearchLineEdit(self)
        self.searchLine.setPlaceholderText("搜索音乐, 歌手, 歌词, 用户")
        self.searchLine.setButtonSlot(self.searchThread.start)

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

    # 功能。
    def search(self):
        text = self.searchLine.text()
        self.result = netEase.search(text)

        if not self.result['songCount']:
            songsIds = []
            self.result['songs'] = []
        else: 
            songsIds = [i['id'] for i in self.result['songs']]
            self.songsDetail = netEase.singsUrl(songsIds)
            self.songsDetail = {i['id']:i['url'] for i in self.songsDetail}
            # 进行重新编辑方便索引。
            songs = self.result['songs']
            self.result['songs'] = [{'name':i['name'], 
            'artists': i['ar'], 
            'picUrl': i['al']['picUrl'],
            'mp3Url': self.songsDetail[i['id']],
            'duration': i['dt']} for i in songs]

    def searchFinished(self):
        text = self.searchLine.text()
        songsCount = self.result['songCount']

        # 总数是0即没有找到。
        if not songsCount:
            songs = []
        else:
            songs = self.result['songs'] 

        self.parent.searchArea.setText(text)

        self.parent.searchArea.setSingsData(songs)

        self.parent.setTabIndex(3)

    def showLoginBox(self):
        self.loginBox.open()

    def login(self):
        informations = self.loginBox.checkAndGetLoginInformation()
        
        if not informations:
            return 

        self.loginThread.setTarget(self.loadLoginInformations)
        self.loginThread.setArgs(informations)
        self.loginThread.start()

    def loadLoginInformations(self, informations:tuple):
        result = netEase.login(*informations)
        # 网络不通或其他问题。
        if not result:
            self.loginThread.breakSignal.emit('请检查网络后重试~.')
            return

        code = result.get('code')
        if code != 200 or code != '200':
            self.loginThread.breakSignal.emit(str(result.get('msg')))

        self.loginInfor = result

    def loginFinished(self):
        self.loginBox.accept()
        self.setUserData()
        # profile = self.loginInfor['profile']
        # avatarUrl = profile['avatarUrl']
        # self.userPix.setSrc(avatarUrl)
        
        # # 加载该账户创建及喜欢的歌单。
        # userId = profile['userId']
        # self.loadUserPlaylistThread.setTarget(netEase.user_playlist)
        # self.loadUserPlaylistThread.setArgs(userId)
        # self.loadUserPlaylistThread.start()

        # nickname = profile['nickname']
        # self.loginButton.setText(nickname)

    def setUserData(self):
        profile = self.loginInfor['profile']
        avatarUrl = profile['avatarUrl']
        self.userPix.setSrc(avatarUrl)
        
        # 加载该账户创建及喜欢的歌单。
        userId = profile['userId']
        self.loadUserPlaylistThread.setTarget(netEase.user_playlist)
        self.loadUserPlaylistThread.setArgs(userId)
        self.loadUserPlaylistThread.start()

        nickname = profile['nickname']
        self.loginButton.setText(nickname)

    def emitWarning(self, warningStr):
        self.loginBox.setWarningAndShowIt(warningStr)

    def exitLogin(self):
        self.loginButton.setText('未登录 ▼')
        self.loginButton.clicked.connect(self.showLoginBox)
        self.userPix.setSrc('resource/nouser.png')

    def loadUserPlaylistFinished(self):
        result = self.loadUserPlaylistThread.result
        self.parent.navigation.setPlaylists(result)

    @checkFolder(allCookiesFolder)
    def saveCookies(self):
        with open(self.loginCookiesFolder, 'wb') as f:
            pickle.dump(self.loginInfor, f)

    @checkFolder(allCookiesFolder)
    def loadCookies(self):
        with open(self.loginCookiesFolder, 'rb') as f:
            self.loginInfor = pickle.load(f)
        self.setUserData()

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

        self.playlists = []
        self.playlistThread = RequestThread(self)

        # 需要让子控件使用。
        # 设计的不好，暂时这样。
        self.api = netEase

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

        self.singsListLabel = QLabel(" 收藏与创建的歌单")
        self.singsListLabel.setObjectName("singsListLabel")
        self.singsListLabel.setMaximumHeight(27)

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
        # print(self.mainLayout.count())
        """歌单用按钮显示，不显示在ListWidget里是因为ListWidget只是单个有滚轮，需要全部有滚轮。"""
        # self.singsList = []
        # for i in range(3):
        #     temp = QPushButton(QIcon('resource/notes.png'),'TestSingsListaaaaaaaaaaaaaaaaaaaaaaaaa')
        # #     temp.setObjectName('playlistButton')
        #     self.playlists.append(temp)

        # for i in self.playlists:
        #     i.setCheckable(True)
        #     i.setAutoExclusive(True)
        # #     i.clicked.connect(self.singsButtonClickEvent)
        #     self.mainLayout.addWidget(i)

        pass

    # 功能。
    def none(self):
        # 没有用的空函数。
        pass

    def setPlaylists(self, datas):
        # 布局原因，需要在最后加一个stretch才可以正常布局。
        # 所以这边先将最后一个stretch删去，将所有的内容添加完成后在加上。
        self.mainLayout.takeAt(self.mainLayout.count()-1)
        for i in datas:
            button = PlaylistButton(self, i['id'], i['coverImgUrl'], QIcon('resource/notes.png'), i['name'])
            self.playlists.append(button)
            self.mainLayout.addWidget(button)       
        
        self.mainLayout.addStretch(1)

    # 事件。
    def navigationListItemClickEvent(self):
        """用户处理导航栏的点击事件。"""
        # 处理其他组件取消选中。
        for i in self.playlists:
            if i.isChecked():
                i.setCheckable(False)
                i.setCheckable(True)
                break

        self.nativeList.setCurrentRow(-1)

        """处理事件。"""
        self.navigationListFunction()

    def nativeListItemClickEvent(self):
        """本地功能的点击事件。"""
        for i in self.playlists:
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


"""搜索后的结果显示页。"""
class SearchArea(ScrollArea):

    def __init__(self, parent=None):
        super(SearchArea, self).__init__(self)
        self.parent = parent
        self.setObjectName("searchArea")
        with open('QSS/searchArea.qss', 'r', encoding='utf-8') as f:
            self.setStyleSheet(f.read())

        # 本次搜索的内容。
        self.musicList = []

        self.mainLayout = QVBoxLayout(self.frame)

        self.transTime = addition.itv2time
        
        self.noContents = "很抱歉 未能找到关于<font style='text-align: center;' color='#23518F'>“{0}”</font>的{1}。"
        
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
        self.singsFrame = QFrame()
        self.singsFrameLayout = VBoxLayout(self.singsFrame)

        self.noSingsContentsLabel = QLabel(self.singsFrame)
        self.noSingsContentsLabel.setMaximumHeight(60)

        self.noSingsContentsLabel.setObjectName("noSingsLable")
        self.noSingsContentsLabel.hide()

        self.singsResultTable = TableWidget(3, ['音乐标题', '歌手', '时长'])
        self.singsResultTable.setObjectName('singsTable')
        self.singsResultTable.setMinimumWidth(self.width())
        self.singsResultTable.setColumnWidths({i:j for i,j in zip(range(3), 
            [self.width()/3*1.25,self.width()/3*1.25,self.width()/3*0.5])})

        self.singsResultTable.itemDoubleClicked.connect(self.itemDoubleClickedEvent)

        self.singsFrameLayout.addWidget(self.singsResultTable, Qt.AlignTop|Qt.AlignCenter)

        self.centerLabelLayout = HBoxLayout()
        self.centerLabelLayout.addStretch(1)
        self.centerLabelLayout.addWidget(self.noSingsContentsLabel)
        self.centerLabelLayout.addStretch(1)

        self.singsFrameLayout.addLayout(self.centerLabelLayout)

        self.contentsTab.addTab(self.singsFrame, "单曲")

    # 功能。
    def setText(self, text):
        self.text = text
        self.titleLabel.setText("搜索<font color='#23518F'>“{0}”</font><br>".format(self.text))

    def setSingsData(self, data):
        # 单曲搜索结果。

        if not len(data):
            # self.contentsTab.addTab()
            self.noSingsContentsLabel.setText(self.noContents.format(self.text, '单曲'))
            self.singsResultTable.hide()
            self.noSingsContentsLabel.show()
        else:
            self.singsResultTable.setRowCount(len(data))

            musicList = []
            for count, datas in enumerate(data):
                picUrl = datas['picUrl']
                url = datas['mp3Url']
                name = datas['name']
                authors = ','.join([t['name'] for t in datas['artists']])
                duration = self.transTime(datas['duration']/1000)

                self.singsResultTable.setItem(count, 0, QTableWidgetItem(name))
                self.singsResultTable.setItem(count, 1, QTableWidgetItem(authors))
                self.singsResultTable.setItem(count, 2, QTableWidgetItem(duration))
                musicList.append({'url': url, 
                    'name': name, 
                    'time':duration, 
                    'author':authors, 
                    'music_img': picUrl})

            self.noSingsContentsLabel.hide()
            self.singsResultTable.show()

            self.musicList = musicList

    # 事件。
    def itemDoubleClickedEvent(self):
        currentRow = self.singsResultTable.currentRow()
        data = self.musicList[currentRow]
        self.parent.playWidgets.setPlayerAndPlayList(data)


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
    
