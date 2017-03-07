"""主要是网络部分。"""
from PyQt5.QtNetwork import *
from PyQt5.QtCore import QThread, QObject, QUrl, QEventLoop, QByteArray, pyqtSignal, pyqtSlot
from PyQt5.QtGui import QPixmap
import os

# 3/3
# 设计的不好，本来想设计成<img src='1'> 这样的形式，写着写着就变成了老方法。
# 目前不是主要考虑对象，暂时不修改。

class NetWorkThread(QNetworkAccessManager):
    """用于下载. url是一个列表，里面放置要下载的东西。"""
    allFinished = pyqtSignal()
    saveFinished = pyqtSignal(str)

    def __init__(self, parent=None, url=None):
        super(NetWorkThread, self).__init__()

        self.parent = parent
        
        self.url = url
        
        self.currentUrl = url

        self.result = []
        
        self.offset = 0

        self.picFinished = True

        if not url:
            self.url = []


    def startGet(self, widgets=None):
        """主要用于请求图片。"""
        # currentUlr用于比较，因为是多线程，有两个线程在调用这个函数，
        # 如果两次请求是相同的url，就不会再次请求了。
        if self.currentUrl == len(self.url):
            return
        
        self.finished.connect(lambda :self.dataInResult(data, widgets, names, index, loop))
        
        # 进行标记，存储上一次的状态。
        self.currentUrl = len(self.url)
        # 该标记表示此函数处于工作中。
        self.picFinished = False

        try:
            cacheList = os.listdir('cache')
        except:
            os.mkdir('cache')
            cacheList = os.listdir('cache')

        # self.offset一次30，但有可能在两次都没加载完时做了两次下拉，这样剩余的url其实是60个，
        # 那么就要进行60次。
        # 应该用while 循环做成类似线程池的模式。
        # 暂时先不改了，不是最紧急的。
        for i in range(len(self.url[self.offset:])):
            index = i+self.offset
            # 检测有没有进行了缓存，有的话就不会再次请求了。
            # 歌单id + 后缀。
            # names = str(self.parent.singIds[index]) + self.url[index][self.url[index].rfind('.'):]
            names = str(self.url[index][self.url[index].rfind('/')+1:])
            if names in cacheList:
                if widgets:
                    widgets[index].setStyleSheets("QLabel#picLabel{border-image: url(cache/%s)}"%(names))
            else:
                # 没有缓存，继续进行请求并添加到缓存。
                loop = QEventLoop()
                req = QNetworkRequest(QUrl(self.url[index]))
                # 原以为不是keep-alive，抓包后发现是keep-alive。
                # 但是感觉请求的还是不快啊。
                # req.setRawHeader(QByteArray("Connection"), QByteArray('keep-alive'))
                data = self.get(req)
                loop.exec()
        
        # 请求完成后清理缓存，已经保存到本地。
        self.clearCache()

        # 历史遗留问题，暂时不改。
        try:
            self.finished.disconnect()
        except:
            print(1)

        self.offset += 30
        # 发出全部完成的信号。

        self.allFinished.emit()

    def dataInResult(self, data, widgets=None, name='None', index=0, loop=None):
        """默认将请求完成的数据填入result."""
        if data.error() == QNetworkReply.NoError:
            # 为控件添加图片。
            datas = data.readAll()
            # 为控件添加图片。
            pic = QPixmap()
            pic.loadFromData(datas)
            pic.save("cache/{0}".format(name))
                
            if widgets:
                widgets[index].setStyleSheets("QLabel#picLabel{border-image: url(cache/%s)}"%(name))

                # self.result.append(datas)
        # 释放掉事件锁。
        if loop:
            loop.exit()

        # 发出保存完毕的信号。
        self.saveFinished.emit(name)


    def setUrl(self, url=None):
        """设置Url链接。"""
        self.url = url

    def setOffset(self, value=0):
        """设置Offset，用于歌单图片的索引。"""
        self.offset = value

    def setFinished(self, slot=None):
        """设置请求完成后的槽函数。"""
        self.finished.connect(slot)

    def clearCache(self):
        """清除缓存。"""
        self.clearAccessCache()

    def allFinishedEvent(self):
        """一次全部请求完成的事件。"""
        if self.parent.sliderDown == True:
            pass