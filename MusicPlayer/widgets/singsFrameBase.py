__author__ = 'cyrbuzz'
# 方便扩展，抽象成基类。
from base import (QCursor, QFrame, Qt, QTabWidget, QTextEdit,  QLabel, QIcon, QPushButton, QHBoxLayout, QVBoxLayout, 
                                     QGridLayout, QTableWidgetItem, PicLabel, ScrollArea, TableWidget, VBoxLayout, HBoxLayout, pyqtSignal)

import addition


class SingsFrameBase(ScrollArea):
    """全部歌单。"""

    def __init__(self, parent=None):
        super(SingsFrameBase, self).__init__()
        self.parent = parent
        self.transTime = addition.itv2time

        self.setObjectName("allSingsArea")
        # 为什么有的需要加utf-8呢，因为有中文。
        with open('QSS/singsFrameBase.qss', 'r', encoding='utf-8') as f:
            self.setStyleSheet(f.read())
        
        # 主布局。
        self.mainLayout = QGridLayout(self.frame)
        self.mainLayout.setSpacing(0)
        self.mainLayout.setHorizontalSpacing(10)
        self.mainLayout.setContentsMargins(0, 0, 0, 0)
        

class SingsSearchResultFrameBase(QFrame):

    def __init__(self, parent):
        super(SingsSearchResultFrameBase, self).__init__()
        self.parent = parent

        self.singsFrameLayout = VBoxLayout(self)

        self.noSingsContentsLabel = QLabel(self)
        self.noSingsContentsLabel.setMaximumHeight(60)

        self.noSingsContentsLabel.setObjectName("noSingsLable")
        self.noSingsContentsLabel.hide()

        self.singsResultTable = TableWidget(3, ['音乐标题', '歌手', '时长'])
        self.singsResultTable.setObjectName('singsTable')
        self.singsResultTable.setMinimumWidth(self.parent.width())
        self.singsResultTable.setColumnWidths({i:j for i,j in zip(range(3), 
            [self.parent.width()/3*1.25,self.parent.width()/3*1.25,self.parent.width()/3*0.5])})

        self.singsFrameLayout.addWidget(self.singsResultTable, Qt.AlignTop|Qt.AlignCenter)

        self.centerLabelLayout = HBoxLayout()
        self.centerLabelLayout.addStretch(1)
        self.centerLabelLayout.addWidget(self.noSingsContentsLabel)
        self.centerLabelLayout.addStretch(1)

        self.singsFrameLayout.addLayout(self.centerLabelLayout)


# 歌单详情页。
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

    # 布局。
    def setLabels(self):
        self.picLabel = PicLabel(width=200, height=200)
        self.picLabel.setObjectName('picLabel')

        self.titleLabel = QLabel(self.frame)
        self.titleLabel.setObjectName('titleLabel')
        self.titleLabel.setWordWrap(True)
        self.titleLabel.setMaximumHeight(40)

        self.authorPic = QLabel(self.frame)
        self.authorName = QLabel(self.frame)
        self.authorName.setObjectName('authorName')
        self.authorName.setMaximumHeight(28)

        self.descriptionText = QTextEdit(self.frame)
        self.descriptionText.setReadOnly(True)
        self.descriptionText.setObjectName('descriptionText')
        self.descriptionText.setMaximumWidth(450)
        self.descriptionText.setMaximumHeight(100)
        self.descriptionText.setMinimumHeight(100)

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

        self.contentsTab.addTab(self.singsTable, "歌曲列表")

    def setLayouts(self):
        self.mainLayout = VBoxLayout()

        self.topLayout = HBoxLayout()

        self.descriptionLayout = VBoxLayout()
        self.titleLayout = HBoxLayout()
        self.titleLayout.addWidget(self.showButton)
        self.titleLayout.addSpacing(5)
        self.titleLayout.addWidget(self.titleLabel)

        self.authorLayout = HBoxLayout()
        self.authorLayout.addWidget(self.authorPic)
        self.authorLayout.addWidget(self.authorName)
        self.authorLayout.addStretch(1)

        self.descriptLayout = HBoxLayout()
        self.descriptLayout.addWidget(self.descriptionButton)
        self.descriptLayout.addWidget(self.descriptionText)
        
        self.descriptionLayout.addSpacing(5)
        self.descriptionLayout.addLayout(self.titleLayout)
        self.descriptionLayout.addLayout(self.authorLayout)
        self.descriptionLayout.addSpacing(5)
        self.descriptionLayout.addWidget(self.playAllButton)
        self.descriptionLayout.addSpacing(10)
        self.descriptionLayout.addLayout(self.descriptLayout)

        self.topLayout.addWidget(self.picLabel)
        self.topLayout.addSpacing(18)
        self.topLayout.addLayout(self.descriptionLayout)

        self.mainLayout.addLayout(self.topLayout)
        self.mainLayout.addWidget(self.contentsTab)
        
        self.frame.setLayout(self.mainLayout)
        


class OneSing(QFrame):
    # 大量创建，这样可以省内存。
    __solts__ = ('parent', 'ggparent', 'detailFrame', 'row', 'column', 'ids',
     'picName', 'picLabel', 'nameLabel',
     'mainLayout',
     'mousePos',
     'result','catch',
     'singsIds', 'singsUrls')

    clicked = pyqtSignal(str, str)

    def __init__(self, row, column, ids=None, parent=None, picName=None):
        super(OneSing, self).__init__()

        self.setObjectName('oneSing')
        # 自己的位置信息。
        self.row = row
        self.column = column
        # 歌单号。
        self.ids = str(ids)
        # 大图的缓存名。
        self.picName = picName

        self.setMinimumSize(180, 235)

        self.picLabel = QLabel()
        self.picLabel.setObjectName('picLabel')
        self.picLabel.setMinimumSize(180, 180)
        self.picLabel.setMaximumSize(180, 180)

        self.nameLabel = QLabel()
        self.nameLabel.setMaximumWidth(180)
        self.nameLabel.setWordWrap(True)

        self.mainLayout = QVBoxLayout(self)

        self.mainLayout.addWidget(self.picLabel)
        self.mainLayout.addWidget(self.nameLabel)

    # 功能。
    def setStyleSheets(self, styleSheet=None):
        if styleSheet:
            self.setStyleSheet(styleSheet)

    # 事件。
    def mousePressEvent(self, event):
        # 记录下当前鼠标的位置。
        self.mousePos = QCursor.pos()

    def mouseReleaseEvent(self, event):
        # 先进行判断，防止误点将鼠标移开后还是会判断为已经点击的尴尬。
        if QCursor.pos() != self.mousePos:
            return
        else:
            self.clicked.emit(self.ids, self.picName)


class PlaylistButton(QPushButton):
    """
        提供一个简单点击的歌单自动切换点击状态，点击时会发出hasClicked信号。
        Args:
        parent 父类。
        ids 歌单的ids。
        coverImgUrl 这个歌单应该包含的图片地址 -> None, url.
        *args其他作用于原生Button的参数。
        singsIds 与 singsUrls暂时无用，不提供接受接口。

    """
    __solts__ = ('parent', 'grandparent', 'ids', 'coverImgUrl', 
        'catch', 'detailFrame', 'result', 'singsIds', 'singsUrls'
        )

    hasClicked = pyqtSignal(int, str)

    def __init__(self, parent, ids, coverImgUrl, *args):
        super(PlaylistButton, self).__init__(*args)
        self.parent = parent
        self.grandparent = self.parent.parent
        
        self.setCheckable(True)
        self.setAutoExclusive(True)

        self.ids = ids
        self.coverImgUrl = coverImgUrl

        self.catch = None
        self.result = None
        self.singsIds = None
        self.singsUrls = None

        self.clicked.connect(self.clickedEvent)

    def clickedEvent(self):
        self.hasClicked.emit(self.ids, self.coverImgUrl)
