__author__ = 'cyrbuzz'

import os
import glob
import os.path

try:
    import eyed3
except ImportError:
    print('eyed3没有成功加载或安装，请不要使用本地音乐功能！')

from base import QFileDialog, QObject, QTableWidgetItem
from addition import itv2time


def getAllFolder(topFolder):
    result = []

    def findFolder(topFolder):
        folders = [os.path.join(topFolder, i) for i in os.listdir(topFolder) if not os.path.isfile(os.path.join(topFolder, i))]
        if not folders:
            return 
        else:
            result.extend(folders)
            for i in folders:
                findFolder(i)

    findFolder(topFolder)

    return result


class ConfigNative(QObject):

    def __init__(self, native):
        super(ConfigNative, self).__init__()
        self.native = native

        self.musicList = []
        self.folder = []

        self.bindConnect()

    def bindConnect(self):
        self.native.selectButton.clicked.connect(self.selectFolder)
        self.native.singsTable.itemDoubleClicked.connect(self.itemDoubleClickedEvent)

    def selectFolder(self):
        folder = QFileDialog()
        selectFolder = folder.getExistingDirectory()
        if not selectFolder:
            pass
        else:
            self.folder.append(selectFolder)

            mediaFiles = glob.glob(selectFolder+'/*.mp3')
            allFolder = getAllFolder(selectFolder)
            for i in allFolder:
                mediaFiles.extend(glob.glob(i+'/*.mp3'))

            length = len(mediaFiles)

            self.native.singsTable.setRowCount(self.native.singsTable.rowCount()+length)
            self.musicList = []
            for i in enumerate(mediaFiles):
                
                music = eyed3.load(i[1])
                if not music:
                    self.singsTable.removeRow(i[0])
                    continue

                try:
                    name = music.tag.title
                except:
                    print('获取该歌曲信息出错: {}，已跳过。'.format(i))
                    self.singsTable.removeRow(i[0])
                    continue

                if not name:
                    name = i[1].split('\\')[-1][:-4]
                author = music.tag.artist
                if not author:
                    author = '未知歌手'
                time = itv2time(music.info.time_secs)

                self.musicList.append({'name': name, 'author': author, 'time': time, 'url': i[1], 'music_img': 'None'})
                self.native.singsTable.setItem(i[0], 0, QTableWidgetItem(name))
                self.native.singsTable.setItem(i[0], 1, QTableWidgetItem(author))
                self.native.singsTable.setItem(i[0], 2, QTableWidgetItem(time))

    # 事件。
    def itemDoubleClickedEvent(self):
        currentRow = self.native.singsTable.currentRow()
        data = self.musicList[currentRow]

        self.native.parent.playWidgets.setPlayerAndPlayList(data)