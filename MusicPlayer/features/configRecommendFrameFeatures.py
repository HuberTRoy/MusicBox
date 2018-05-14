__author__ = 'cyrbuzz'

import addition

from base import QObject, QTableWidgetItem

transTime = addition.itv2time


class ConfigRecommendFrame(QObject):

    def __init__(self, parent):
        super().__init__()

        self.recommendFrame = parent

        self.musicList = []

        self.bindConnect()

    def setSongs(self, musicInfo):
        self.recommendFrame.singsTable.setRowCount(len(musicInfo))

        for index, data in enumerate(musicInfo):
            self.musicList.append(data._asdict())
            self.recommendFrame.singsTable.setItem(index, 0, QTableWidgetItem(data.name))
            self.recommendFrame.singsTable.setItem(index, 1, QTableWidgetItem(data.author))
            self.recommendFrame.singsTable.setItem(index, 2, QTableWidgetItem(transTime(data.time/1000)))

    def bindConnect(self):
        self.recommendFrame.singsTable.itemDoubleClicked.connect(self.itemDoubleClickedEvent)

    def itemDoubleClickedEvent(self):
        currentRow = self.recommendFrame.singsTable.currentRow()
        data = self.musicList[currentRow]

        self.recommendFrame.parent.playWidgets.setPlayerAndPlayList(data)
