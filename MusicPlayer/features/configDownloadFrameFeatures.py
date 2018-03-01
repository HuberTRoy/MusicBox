__author__ = 'cyrbuzz'

import os
import re
import glob
import pickle
import os.path
import logging
try:
    import eyed3
except ImportError:
    print('eyed3没有成功加载或安装，当再次打开时下载的音乐会加载不到！')

from apiRequestsBase import HttpRequest
from asyncBase import aAsync, toTask
from base import QFileDialog, QObject, QTableWidgetItem, checkFolder
from addition import itv2time

import logger

logger = logging.getLogger(__name__)

myRequests = HttpRequest()


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


def replace_forbidden_sym(string):

    return re.sub(r'[\\/:*?"<>|]{1}', ' ', string)


class ConfigDownloadFrame(QObject):
    myDownloadFrameCookiesFolder = 'cookies/downloadInfo/downloadFolder.cks'
    allCookiesFolder = [myDownloadFrameCookiesFolder]

    def __init__(self, downloadFrame):
        super(ConfigDownloadFrame, self).__init__()
        self.downloadFrame = downloadFrame
        self.showTable = self.downloadFrame.singsTable

        self.musicList = []
        self.folder = []
        self.myDownloadFolder = os.path.join(os.getcwd(), 'downloads')

        self._setDownloadFolder(self.myDownloadFolder)

        self.bindConnect()

        self.loadCookies()

    def bindConnect(self):
        self.downloadFrame.selectButton.clicked.connect(self.selectFolder)
        self.downloadFrame.singsTable.itemDoubleClicked.connect(self.itemDoubleClickedEvent)

    def getDownloadSignal(self):
        #
        window = self.downloadFrame.parent
        try:
            window.searchArea.config.download.connect(self.downloadSong)
            window.detailSings.config.download.connect(self.downloadSong)
        except Exception as e:
            logger.error("下载时遇到未知错误", exc_info=True)


    def _setDownloadFolder(self, folderName):
        logger.info("下载目标变更{}".format(folderName))
        self.fromPathLoadSong(folderName)
        self.myDownloadFolder = folderName
        self.downloadFrame.currentStorageFolder.setText(folderName)

    @toTask
    def downloadSong(self, musicInfo):
        logger.info("正在下载的音乐的信息: {}".format(musicInfo))

        url = musicInfo.get('url')
        allMusicName = re.search(r'.*\.[a-zA-Z0-9]+', url[url.rfind('/')+1:]).group(0)
        if allMusicName:

            musicSuffix = allMusicName[allMusicName.rfind('.')+1:]
            musicName = '{name}.{suf}'.format(name=musicInfo.get('name') + ' - ' + musicInfo.get('author'), suf=musicSuffix)
        else:
            # TODO MD5。
            musicName = "random_name.mp3"

        musicName = replace_forbidden_sym(musicName)

        self.downloadFrame.parent.systemTray.showMessage("~~~", '{musicName} 加入下载队列'.format(musicName=musicName))
        # TODO
        # Streaming.
        future = aAsync(myRequests.httpRequest, url, 'GET')
        data = yield from future

        localPath = '{myDownloadFolder}/{musicName}'.format(myDownloadFolder=self.myDownloadFolder, musicName=musicName)
        with open(localPath, 'wb') as f:
            f.write(data.content)

        musicInfo['url'] = localPath

        # 从托盘栏给出提示。
        self.downloadFrame.parent.systemTray.showMessage("~~~", '{musicName} 下载完成'.format(musicName=musicName))
        # 将音乐信息加到musicList中。
        self.musicList.append(musicInfo)
        self.updateDownloadShowTable(musicInfo)

    def updateDownloadShowTable(self, musicInfo):
        showInfo = [musicInfo.get("name"), musicInfo.get("author"), musicInfo.get("time")]
        # 这里写"我的下载"的实例对象。
        # 首先获取出当前总共多少行。
        rowCount = self.showTable.rowCount()
        self.showTable.setRowCount(rowCount+1)
        #  然后直接添加过去就好啦。
        for i in range(3):
            self.showTable.setItem(rowCount, i, QTableWidgetItem(showInfo[i]))

    def fromPathLoadSong(self, selectFolder):
        if not os.path.isdir(selectFolder):
            os.mkdir(selectFolder)
            return 
        mediaFiles = glob.glob(selectFolder+'/*.mp3')
        allFolder = getAllFolder(selectFolder)
        for i in allFolder:
            mediaFiles.extend(glob.glob(i+'/*.mp3'))

        length = len(mediaFiles)
        
        self.downloadFrame.singsTable.clearContents()
        self.downloadFrame.singsTable.setRowCount(length)
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
                    filePath = i[1].replace(selectFolder, '')
                    name = filePath[1:][:-4]
                if not author:
                    author = ''  
            except:
                try:
                    # TODO
                    # if more folders exist.
                    filePath = i[1].replace(selectFolder, '')
                    name = filePath[1:][:-4]
                except Exception as e:
                    name = i[1]
                    author = ''
            try:
                time = itv2time(music.info.time_secs)
            except:
                time = '00:00'

            self.musicList.append({'name': name, 'author': author, 'time': time, 'url': i[1], 'music_img': 'None'})
            self.downloadFrame.singsTable.setItem(i[0], 0, QTableWidgetItem(name))
            self.downloadFrame.singsTable.setItem(i[0], 1, QTableWidgetItem(author))
            self.downloadFrame.singsTable.setItem(i[0], 2, QTableWidgetItem(time))

    def selectFolder(self):
        folder = QFileDialog()
        selectFolder = folder.getExistingDirectory()
        if not selectFolder:
            pass
        else:
            self.folder.append(selectFolder)
            self._setDownloadFolder(selectFolder)
            self.fromPathLoadSong(selectFolder)

    @checkFolder(allCookiesFolder)
    def saveCookies(self):
        with open(self.myDownloadFrameCookiesFolder, 'wb') as f:
            pickle.dump(self.myDownloadFolder, f)

    @checkFolder(allCookiesFolder)
    def loadCookies(self):
        with open(self.myDownloadFrameCookiesFolder, 'rb') as f:
            self.myDownloadFolder = pickle.load(f)

        self._setDownloadFolder(self.myDownloadFolder)

    # 事件。
    def itemDoubleClickedEvent(self):
        currentRow = self.downloadFrame.singsTable.currentRow()
        data = self.musicList[currentRow]

        self.downloadFrame.parent.playWidgets.setPlayerAndPlayList(data)