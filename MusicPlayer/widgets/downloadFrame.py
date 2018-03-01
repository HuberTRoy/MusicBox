__author__ = 'cyrbuzz'

from base import (ScrollArea, QLabel, QFrame, QVBoxLayout, QPushButton, QHBoxLayout, QTableWidget,
                  QAbstractItemView)


class DownloadFrame(ScrollArea):

    def __init__(self, parent=None):
        super().__init__()
        self.parent = parent
        self.setObjectName('downloadMusic')
        with open('QSS/downloadFrame.qss', 'r', encoding="utf-8") as f:
            self.setStyleSheet(f.read())

        self.mainLayout = QVBoxLayout(self)

        self.setHeader()
        self.setMusicTable()

    def setHeader(self):
        # self.titleLabel = QLabel("我的下载")

        self.spaceLine = QFrame(self)
        self.spaceLine.setObjectName("spaceLine")
        self.spaceLine.setFrameShape(QFrame.HLine)
        self.spaceLine.setFrameShadow(QFrame.Plain)
        self.spaceLine.setLineWidth(2)
        
        self.currentStorageFolderLabel = QLabel("当前存储目录: ")
        
        self.currentStorageFolder = QLabel()

        self.selectButton = QPushButton("选择目录")
        self.selectButton.setObjectName('selectButton')

        self.topShowLayout = QHBoxLayout()
        self.topShowLayout.addSpacing(20)
        # self.topShowLayout.addWidget(self.titleLabel)
        self.topShowLayout.addWidget(self.currentStorageFolderLabel)
        self.topShowLayout.addWidget(self.currentStorageFolder)
        self.topShowLayout.addWidget(self.selectButton)
        self.topShowLayout.addStretch(1)

        self.mainLayout.addLayout(self.topShowLayout)
        self.mainLayout.addWidget(self.spaceLine)

    def setMusicTable(self):
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