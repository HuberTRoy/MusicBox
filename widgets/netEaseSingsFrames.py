__author__ = 'cyrbuzz'
"""不要单独运行。"""
import os

import network
import addition

import netEaseApi

from base import *

# netEaseApi
netEase = netEaseApi.NetEaseWebApi()

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

        # 没有gevent时用这个。
        self.picManager = network.NetWorkThread(self)
        self.userPicManager = network.NetWorkThread(self)

        # 有gevent时用这个。
        # self.picSession = network.Requests
        
        # ThreadPool方式。
        self.picThreadPool = QThreadPool()
        self.picThreadPool.setMaxThreadCount(5)

        self.queue = QueueObject()
        self.queue.add.connect(self.setStyleCodes)

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
        # if network.noGevent:
        # self.netThread.finished.connect(self.setSings)
        self.netThread.finished.connect(self.threadSetSings)

        # else:
        # self.netThread.finished.connect(self.geventSetSings)

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

    """之后的两个是使用gevent请求图片。但是会卡主界面。目前保留但不使用。"""
    # def geventSetSings(self):
    #     for i in range(30):
    #         i += self.offset
    #         picName = self.singPicUrls[i][self.singPicUrls[i].rfind('/')+1:]
    #         frame = OneSing(self.gridRow, self.gridColumn, self.singIds[i], self, picName)
    #         frame.nameLabel.setText(self.singNames[i])
            
    #         # 建立起索引，一是防止垃圾回收了，二是可以找到他的地址。
    #         self.singsFrames.append(frame)

    #         # 用于布局，一行4个。
    #         if self.gridColumn == 3:
    #             self.gridColumn = 0
    #             self.gridRow += 1
    #         else:
    #             self.gridColumn += 1

    #         try:
    #             cacheList = os.listdir('cache')
    #         except:
    #             os.mkdir('cache')
    #             cacheList = os.listdir('cache')
            
    #         url = self.singPicUrls[i]

    #         names = str(url[url.rfind('/')+1:])
    #         if names in cacheList:
    #             frame.setStyleSheets("QLabel#picLabel{border-image: url(cache/%s)}"%(names))
    #         else:
    #             self.geventSetSingsPic(frame, url)
    

    #     network.pool.join()

    # @network.joinJobInGevent
    # def geventSetSingsPic(self, widget, url):

    #     names = str(url[url.rfind('/')+1:])
    #     content = self.picSession.get(url).content
        
    #     # 可能是open读写的问题，用open会导致某些图片显示不出来。
    #     # with open('cache/{0}'.format(names), 'wb') as f:
    #     #     f.write(content)
    #     # 所以改成这样进行存储。
    #     pic = QPixmap()
    #     pic.loadFromData(content)
    #     pic.save("cache/{0}".format(names))

    #     widget.setStyleSheets("QLabel#picLabel{border-image: url(cache/%s)}"%(names))

    """测试线程池方法。"""
    def threadSetSings(self):
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

            try:
                cacheList = os.listdir('cache')
            except:
                os.mkdir('cache')
                cacheList = os.listdir('cache')
            
            url = self.singPicUrls[i]

            names = str(url[url.rfind('/')+1:])   
            if names in cacheList:
                frame.setStyleSheets("QLabel#picLabel{border-image: url(cache/%s)}"%(names))
            else:
                task = _PicThreadTask(self.queue, frame, url)
                self.picThreadPool.start(task)

    def setStyleCodes(self):
        data = self.queue.get()
        if not data:
            return
        else:
            data[0].setStyleSheets(data[1])

    # 事件。
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


class _PicThreadTask(QRunnable):
    # finished = pyqtSignal(QFrame, str)
    def __init__(self, queue, widget=None, url=None):
        super(_PicThreadTask, self).__init__()
        self.queue = queue
        self.widget = widget
        self.url = url

    def run(self):
        names = str(self.url[self.url.rfind('/')+1:])
        content = network.Requests.get(self.url).content
        
        pic = QPixmap()
        pic.loadFromData(content)
        pic.save("cache/{0}".format(names))

        self.queue.put([self.widget, "QLabel#picLabel{border-image: url(cache/%s)}"%(names)])
        # self.widget.setStyleSheets("QLabel#picLabel{border-image: url(cache/%s)}"%(names))
        # self.finished.emit(self.widget, "QLabel#picLabel{border-image: url(cache/%s)}"%(names))


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
    
    # 布局。
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

    # 功能。
    def test(self):
        self.titleLabel.setText("［日系］电音&人声，电毒侵入脑电波！")
        self.picLabel.setStyleSheet('''QLabel {border-image: url(cache/566527372.jpg); padding: 10px;}''')
        self.authorName.setText("Nothing")
        self.descriptionLabel.setText("test"*30)

        self.singsTable.setRowCount(4)

    # 事件。
    def itemDoubleClickedEvent(self):
        currentRow = self.singsTable.currentRow()
        data = self.musicList[currentRow]

        self.playList.setPlayerAndPlayList(data)


"""一个用于承载歌单简单信息的QFrame。"""
class OneSing(QFrame):
    # 大量创建，这样可以省内存。
    __solts__ = ('parent', 'ggparent', 'detailFrame', 'transTime', 'row', 'column', 'ids',
     'picName', 'picLabel', 'nameLabel',
     'mainLayout',
     'mousePos',
     'result',
     'singsIds', 'singsUrls')

    def __init__(self, row, column, ids=None, parent=None, picName=None):
        super(OneSing, self).__init__()

        # 这边设计的不好，暂不改。
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
        # 歌曲id。
        self.singsIds = []
        # 所有歌曲的url。
        self.singsUrls = []
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

    # 功能。
    def setStyleSheets(self, styleSheet=None):
        if styleSheet:
            self.setStyleSheet(styleSheet)

    def requestsDetail(self):
        """请求本歌单的详情，并复制给detailSings."""
        result = self.parent.api.details_playlist(self.ids)
        self.result = result

        # 由于旧API不在直接返回歌曲地址，需要获取歌曲号后再次进行请求。
        self.singsIds = [i['id'] for i in result['tracks']]

        # 此处还有些问题。
        # 由于是两次url请求，稍微变得有点慢。
        self.singsUrls = {i['id']:i['url'] for i in self.parent.api.singsUrl(self.singsIds)}
        self.singsUrls = [self.singsUrls[i] for i in self.singsIds]

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


        for i, j, t in zip(result['tracks'], range(result['trackCount']), self.singsUrls):
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
            self.detailFrame.musicList.append({'url': t, 'name': names, 'time':times, 'author':author, 'music_img': music_img})

        self.parent.singsThread.finished.disconnect()
        
        # 隐藏原来的区域，显示现在的区域。
        self.ggparent.mainContents.setCurrentIndex(1)

    # 事件。
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