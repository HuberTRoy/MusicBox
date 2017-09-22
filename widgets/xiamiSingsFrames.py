__author__ = 'cyrbuzz'

from netEaseSingsFrames import NetEaseSingsArea, DetailSings


class XiamiSingsArea(NetEaseSingsArea):

    def __init__(self, parent=None):
        super(XiamiSingsArea, self).__init__(parent)

# class XiamiDetailSings(ScrollArea):

    # def __init__(self, parent=None):
    #     super(DetailSings, self).__init__(self)

    #     # self.hide()
    #     self.parent = parent
    #     self.setObjectName('detailSings')
    #     with open('QSS/detailSings.qss', 'r', encoding='utf-8') as f:
    #         self.setStyleSheet(f.read())

    #     self.setLabels()
    #     self.setButtons()
    #     self.setTabs()
    #     self.setLayouts()

    # # 布局。
    # def setLabels(self):
    #     self.picLabel = PicLabel(width=200, height=200)
    #     self.picLabel.setObjectName('picLabel')

    #     self.titleLabel = QLabel(self.frame)
    #     self.titleLabel.setObjectName('titleLabel')
    #     self.titleLabel.setWordWrap(True)
    #     self.titleLabel.setMaximumHeight(40)

    #     self.authorPic = QLabel(self.frame)
    #     self.authorName = QLabel(self.frame)
    #     self.authorName.setObjectName('authorName')
    #     self.authorName.setMaximumHeight(28)

    #     self.descriptionText = QTextEdit(self.frame)
    #     self.descriptionText.setReadOnly(True)
    #     self.descriptionText.setObjectName('descriptionText')
    #     self.descriptionText.setMaximumWidth(450)
    #     self.descriptionText.setMaximumHeight(100)
    #     self.descriptionText.setMinimumHeight(100)

    # def setButtons(self):
    #     self.showButton = QPushButton("歌单")
    #     self.showButton.setObjectName('showButton')
    #     self.showButton.setMaximumSize(36, 20)

    #     self.descriptionButton = QPushButton(" 简介 ：")
    #     self.descriptionButton.setObjectName('descriptionButton')
    #     self.descriptionButton.setMaximumSize(36, 36)

    #     self.playAllButton = QPushButton("全部播放")
    #     self.playAllButton.setIcon(QIcon('resource/playAll.png'))
    #     self.playAllButton.setObjectName('playAllButton')
    #     self.playAllButton.setMaximumSize(90, 24)

    # def setTabs(self):
    #     self.contentsTab = QTabWidget(self.frame)

    #     self.singsTable = TableWidget(3, ['音乐标题', '歌手', '时长'])
    #     self.singsTable.setObjectName('singsTable')
    #     self.singsTable.setMinimumWidth(self.width())
    #     self.singsTable.setColumnWidths({i:j for i,j in zip(range(3), 
    #         [self.width()/3*1.25,self.width()/3*1.25,self.width()/3*0.5])})

    #     self.contentsTab.addTab(self.singsTable, "歌曲列表")

    # def setLayouts(self):
    #     self.mainLayout = VBoxLayout()

    #     self.topLayout = HBoxLayout()

    #     self.descriptionLayout = VBoxLayout()
    #     self.titleLayout = HBoxLayout()
    #     self.titleLayout.addWidget(self.showButton)
    #     self.titleLayout.addSpacing(5)
    #     self.titleLayout.addWidget(self.titleLabel)

    #     self.authorLayout = HBoxLayout()
    #     self.authorLayout.addWidget(self.authorPic)
    #     self.authorLayout.addWidget(self.authorName)
    #     self.authorLayout.addStretch(1)

    #     self.descriptLayout = HBoxLayout()
    #     self.descriptLayout.addWidget(self.descriptionButton)
    #     self.descriptLayout.addWidget(self.descriptionText)
        
    #     self.descriptionLayout.addSpacing(5)
    #     self.descriptionLayout.addLayout(self.titleLayout)
    #     self.descriptionLayout.addLayout(self.authorLayout)
    #     self.descriptionLayout.addSpacing(5)
    #     self.descriptionLayout.addWidget(self.playAllButton)
    #     self.descriptionLayout.addSpacing(10)
    #     self.descriptionLayout.addLayout(self.descriptLayout)

    #     self.topLayout.addWidget(self.picLabel)
    #     self.topLayout.addSpacing(18)
    #     self.topLayout.addLayout(self.descriptionLayout)

    #     self.mainLayout.addLayout(self.topLayout)
    #     self.mainLayout.addWidget(self.contentsTab)
        
    #     self.frame.setLayout(self.mainLayout)
