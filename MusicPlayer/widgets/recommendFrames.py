"""推荐歌曲的显示区域"""
__author__ = 'cyrbuzz'

from base import (ScrollArea, QLabel, QFrame, QVBoxLayout, QPushButton, QHBoxLayout, QTableWidget,
                  QAbstractItemView)


class RecommendFrame(ScrollArea):

    def __init__(self, parent=None):
        super().__init__()
        self.parent = parent

        self.setObjectName("recommendFrame")
        with open('QSS/recommendFrames.qss', 'r', encoding='utf-8') as f:
            self.setStyleSheet(f.read())

        self.mainLayout = QVBoxLayout(self)

        self.setHeader()

        self.setMusicTable()

    def setHeader(self):
        self.spaceLine = QFrame(self)
        self.spaceLine.setObjectName("spaceLine")
        self.spaceLine.setFrameShape(QFrame.HLine)
        self.spaceLine.setFrameShadow(QFrame.Plain)
        self.spaceLine.setLineWidth(2)
        
        self.recommendLabel = QLabel("你的专属推荐~❤")
        
        self.topShowLayout = QHBoxLayout()
        self.topShowLayout.addSpacing(20)
        # self.topShowLayout.addWidget(self.titleLabel)
        self.topShowLayout.addWidget(self.recommendLabel)
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