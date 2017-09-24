from base import (QFrame, QPushButton, QLabel, QVBoxLayout, QCursor, 
                pyqtSignal)


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


# 设计的不好。暂时这样。
# 功能逻辑方面与上面那个一样。(仅图片处不同.)
# 区别是一个是QFrame一个是Button....
class PlaylistButton(QPushButton):
    # parent = navigation
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
