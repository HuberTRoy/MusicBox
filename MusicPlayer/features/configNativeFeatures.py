__author__ = 'cyrbuzz'

import os
import glob
import pickle
import os.path

try:
    import eyed3
except ImportError:
    print('eyed3没有成功加载或安装，请不要使用本地音乐功能！')

from base import QFileDialog, QObject, QTableWidgetItem, checkFolder
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
    loadLocalFolder = 'cookies/native/local.cks'
    allCookiesFolder = [loadLocalFolder]

    def __init__(self, native):
        super(ConfigNative, self).__init__()
        self.native = native

        self.musicList = []
        self.folder = []

        self.bindConnect()
        self.loadCookies()

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

        self.loadMusic()

    def loadMusic(self):

        for folder in self.folder:
            mediaFiles = glob.glob(folder+'/*.mp3')
            allFolder = getAllFolder(folder)
            for i in allFolder:
                mediaFiles.extend(glob.glob(i+'/*.mp3'))

            length = len(mediaFiles)
            self.native.singsTable.clearContents()
            self.native.singsTable.setRowCount(length)
            self.musicList = []
            for i in enumerate(mediaFiles):
                music = eyed3.load(i[1])

                if not music:
                    self.singsTable.removeRow(i[0])
                    continue

                try:
                    name = music.tag.title
                    author = music.tag.artist

                    if not name:
                        filePath = i[1].replace(folder, '')
                        name = filePath[1:][:-4]
                    if not author:
                        author = ''  
                except:
                    try:
                        # TODO
                        # if more folders exist.
                        filePath = i[1].replace(folder, '')
                        name = filePath[1:][:-4]
                    except Exception as e:
                        name = i[1]
                        author = ''
                try:
                    time = itv2time(music.info.time_secs)
                except:
                    time = '00:00'

                self.musicList.append({'name': name, 'author': author, 'time': time, 'url': i[1], 'music_img': 'None'})
                self.native.singsTable.setItem(i[0], 0, QTableWidgetItem(name))
                self.native.singsTable.setItem(i[0], 1, QTableWidgetItem(author))
                self.native.singsTable.setItem(i[0], 2, QTableWidgetItem(time))

    # 事件。
    def itemDoubleClickedEvent(self):
        currentRow = self.native.singsTable.currentRow()
        data = self.musicList[currentRow]

        self.native.parent.playWidgets.setPlayerAndPlayList(data)

    @checkFolder(allCookiesFolder)
    def saveCookies(self):
        with open(self.loadLocalFolder, 'wb') as f:
            pickle.dump(self.folder, f)

    @checkFolder(allCookiesFolder)
    def loadCookies(self):
        with open(self.loadLocalFolder, 'rb') as f:
            self.folder = pickle.load(f)

        self.loadMusic()
