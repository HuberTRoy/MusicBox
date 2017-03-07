"""本地音乐的界面，逻辑。"""
__author__ = 'cyrbuzz'

from base import *
from addition import itv2time

import eyed3
import glob

class NativeMusic(ScrollArea):
    def __init__(self, parent):
        super(NativeMusic, self).__init__()
        self.parent = parent
        self.setObjectName('nativeMusic')
        with open('QSS/nativeMusic.qss', 'r', encoding='utf-8') as f:
            self.setStyleSheet(f.read())

        self.musicList = []
        self.folder = []

        self.mainLayout = QVBoxLayout(self)

        self.setTopShow()
        self.musicTable()

    def setTopShow(self):
        self.showLabel = QLabel("本地音乐")
        
        self.spaceLine = QFrame(self)
        self.spaceLine.setObjectName("spaceLine")
        self.spaceLine.setFrameShape(QFrame.HLine)
        self.spaceLine.setFrameShadow(QFrame.Plain)
        self.spaceLine.setLineWidth(2)

        self.selectButton = QPushButton("选择目录")
        self.selectButton.setObjectName('selectButton')
        self.selectButton.clicked.connect(self.selectFolder)


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
        self.singsTable.itemDoubleClicked.connect(self.itemDoubleClickedEvent)

        self.mainLayout.addWidget(self.singsTable)

    def itemDoubleClickedEvent(self):
        currentRow = self.singsTable.currentRow()
        data = self.musicList[currentRow]

        self.parent.playWidgets.setPlayerAndPlayList(data)

    def selectFolder(self):
        folder = QFileDialog()
        selectFolder = folder.getExistingDirectory()
        if not selectFolder:
            pass
        else:
            self.folder.append(selectFolder)
            mediaFiles = glob.glob(selectFolder+'\\*.mp3')
            length = len(mediaFiles)

            self.singsTable.setRowCount(self.singsTable.rowCount()+length)
            self.musicList = []
            for i in enumerate(mediaFiles):
                temp = eyed3.load(i[1])
                name = temp.tag.title
                if not name:
                    name = i[1].split('\\')[-1][:-4]

                author = temp.tag.artist
                if not author:
                    author = '未知歌手'

                time = itv2time(temp.info.time_secs)

                self.musicList.append({'name': name, 'author': author, 'time': time, 'url': i[1], 'music_img': 'None'})
                self.singsTable.setItem(i[0], 0, QTableWidgetItem(name))
                self.singsTable.setItem(i[0], 1, QTableWidgetItem(author))
                self.singsTable.setItem(i[0], 2, QTableWidgetItem(time))

