"""本地音乐的界面，逻辑。"""
__author__ = 'cyrbuzz'

from base import (ScrollArea, QLabel, QFrame, QVBoxLayout, QPushButton, QHBoxLayout, QTableWidget,
                  QAbstractItemView)


class NativeMusic(ScrollArea):
    def __init__(self, parent):
        super(NativeMusic, self).__init__()
        self.parent = parent
        self.setObjectName('nativeMusic')
        with open('QSS/nativeMusic.qss', 'r', encoding='utf-8') as f:
            self.setStyleSheet(f.read())

        self.mainLayout = QVBoxLayout(self)

        self.setTopShow()
        self.musicTable()

    # 布局。
    def setTopShow(self):
        self.showLabel = QLabel("本地音乐")
        
        self.spaceLine = QFrame(self)
        self.spaceLine.setObjectName("spaceLine")
        self.spaceLine.setFrameShape(QFrame.HLine)
        self.spaceLine.setFrameShadow(QFrame.Plain)
        self.spaceLine.setLineWidth(2)

        self.selectButton = QPushButton("选择目录")
        self.selectButton.setObjectName('selectButton')

        self.topShowLayout = QHBoxLayout()
        self.topShowLayout.addSpacing(20)
        self.topShowLayout.addWidget(self.showLabel)
        self.topShowLayout.addWidget(self.selectButton)
        self.topShowLayout.addStretch(1)

        self.mainLayout.addLayout(self.topShowLayout)
        self.mainLayout.addWidget(self.spaceLine)

    def musicTable(self):
        self.singsTable = QTableWidget()
        self.singsTable.setObjectName('singsTable')
        self.singsTable.setMinimumWidth(self.width())
        self.singsTable.setColumnCount(3)
        self.singsTable.setHorizontalHeaderLabels(['音乐标题', '歌手', '时长'])

        self.singsTable.setColumnWidth(0, self.width()/3*1.25)
        self.singsTable.setColumnWidth(1, self.width()/3*1.25)
        self.singsTable.setColumnWidth(2, self.width()/3*0.5)
        self.singsTable.horizontalHeader().setStretchLastSection(True)
        self.singsTable.verticalHeader().setVisible(False)
        self.singsTable.setShowGrid(False)
        self.singsTable.setAlternatingRowColors(True)

        self.singsTable.setEditTriggers(QAbstractItemView.NoEditTriggers)
        self.singsTable.setSelectionBehavior(QAbstractItemView.SelectRows)

        self.mainLayout.addWidget(self.singsTable)


class EmptyMusic(object):

    def __init__(self):
        self.tag = EmptyMusicObject()
        self.tag.title = '未知名称'
        self.tag.artist = '未知歌手'

        self.info = EmptyMusicObject()
        self.info.time_secs = 0


class EmptyMusicObject(object):
    def __init__(self):
        pass

