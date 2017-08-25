__author__ = 'cyrbuzz'
"""不要单独运行。"""
# from configFeatures import *
from base import (QFrame, QTabWidget, QLabel, QIcon, QPushButton, QHBoxLayout, QVBoxLayout, QGridLayout, QTableWidgetItem, 
                  PicLabel, ScrollArea, TableWidget)

import addition


"""一个Tab，网易云的全部歌单。"""
class NetEaseSingsArea(QFrame):
    """全部歌单。"""

    def __init__(self, parent=None):
        super(NetEaseSingsArea, self).__init__(parent)
        self.parent = parent
        self.transTime = addition.itv2time

        self.setObjectName("allSingsArea")
        # 为什么有的需要加utf-8呢，因为有中文。
        with open('QSS/neteaseSings.qss', 'r', encoding='utf-8') as f:
            self.setStyleSheet(f.read())
        
        # 主布局。
        self.mainLayout = QGridLayout(self)
        self.mainLayout.setSpacing(0)
        self.mainLayout.setHorizontalSpacing(10)
        self.mainLayout.setContentsMargins(0, 0, 0, 0)
        
        # 注册功能。
        # self.config = ConfigNetEase(self)


"""歌单详情页。"""
class DetailSings(ScrollArea):

    def __init__(self, parent=None):
        super(DetailSings, self).__init__(self)

        # self.hide()
        self.parent = parent
        self.setObjectName('detailSings')
        with open('QSS/detailSings.qss', 'r', encoding='utf-8') as f:
            self.setStyleSheet(f.read())

        self.setLabels()
        self.setButtons()
        self.setTabs()
        self.setLayouts()

        # self.config = ConfigDetailSings(self)
    
    # 布局。
    def setLabels(self):
        self.picLabel = PicLabel(width=200, height=200)
        self.picLabel.setObjectName('picLabel')

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
        # self.playAllButton.clicked.connect(self.addAllMusicToPlayer)

    def setTabs(self):
        self.contentsTab = QTabWidget(self.frame)

        self.singsTable = TableWidget(3, ['音乐标题', '歌手', '时长'])
        self.singsTable.setObjectName('singsTable')
        self.singsTable.setMinimumWidth(self.width())
        self.singsTable.setColumnWidths({i:j for i,j in zip(range(3), 
            [self.width()/3*1.25,self.width()/3*1.25,self.width()/3*0.5])})

        # self.singsTable.itemDoubleClicked.connect(self.itemDoubleClickedEvent)

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
    # def addAllMusicToPlayer(self):
    #     self.playList.setPlayerAndPlaylists(self.musicList)

    # def setupDetailFrames(self, datas, singsUrls):
    #     result = datas
    #     self.musicList = []
        
    #     self.singsTable.clearContents()

    #     self.titleLabel.setText(result['name'])
    #     self.authorName.setText(result['creator']['nickname'])
    #     # 简介有些太长了，暂时只截取前107个字符。
    #     description = result['description']
    #     # 有些没有简介会报错的。
    #     if not description:
    #         description = ''
    #     self.descriptionLabel.setText(description[:107])
    #     # 这边添加歌曲的信息到table。
    #     self.singsTable.setRowCount(result['trackCount'])

    #     for i, j, t in zip(result['tracks'], range(result['trackCount']), singsUrls):
    #         names = i['name']
    #         musicName = QTableWidgetItem(names)
    #         self.singsTable.setItem(j, 0, musicName)

    #         author = i['artists'][0]['name']
    #         musicAuthor = QTableWidgetItem(author)
    #         self.singsTable.setItem(j, 1, musicAuthor)

    #         times = self.transTime(i['duration']/1000)
    #         musicTime = QTableWidgetItem(times)
    #         self.singsTable.setItem(j, 2, musicTime)

    #         music_img = i['album']['blurPicUrl']
    #         self.musicList.append({'url': t, 'name': names, 'time':times, 'author':author, 'music_img': music_img})

    # def test(self):
    #     self.titleLabel.setText("［日系］电音&人声，电毒侵入脑电波！")
    #     self.picLabel.setStyleSheet('''QLabel {border-image: url(cache/566527372.jpg); padding: 10px;}''')
    #     self.authorName.setText("Nothing")
    #     self.descriptionLabel.setText("test"*30)

    #     self.singsTable.setRowCount(4)

    # # 事件。
    # def itemDoubleClickedEvent(self):
    #     currentRow = self.singsTable.currentRow()
    #     data = self.musicList[currentRow]

    #     self.playList.setPlayerAndPlayList(data)
