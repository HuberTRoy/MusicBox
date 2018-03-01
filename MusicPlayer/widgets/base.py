"""用于定义几个需要多次调用的基础类。"""
__author__ = 'cyrbuzz'

from queue import Queue

# 这是一个次级目录。
import os
import sys
# sys.path.append('..')
# sys.path.append('../networks')
import pickle
import hashlib
import os.path
import logging

# PEP8不允许使用通配符的原因是会混淆命名空间。
# PyQt5的所有命名都是QXXX, 这边暂时不改了。
from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
from PyQt5.QtGui import *

from network import Requests


logger = logging.getLogger(__name__)


# 保存cookies的基础装饰器用于检测是否存在这个文件。
# 保存为pickle.
def checkFolder(filenames:iter):
    # /test/test/file.suffix
    for filename in filenames:
        splits = filename.split('/')
        # 检查目录是否存在.
        for i in range(len(splits[:-1])):
            dirs = '/'.join(splits[:i+1])
            if not os.path.isdir(dirs):
                os.mkdir(dirs)

        if not os.path.isfile(filename):
            with open(filename, 'wb') as f:
                pass

    def _check(func):
        def _exec(*args):
            try:
                func(*args)
            except:
                logger.warning('读取或保存cookies出错 文件名: {0}'.format(filenames), exc_info=True)
                print('读取或保存cookies出错', filenames)

        return _exec
    return _check


def checkOneFolder(folderName:str):
    if not os.path.isdir(folderName):
        os.mkdir(folderName)

    def _check(func):
        def _exec(*args):
            try:
                func(*args)
            except:
                logger.warning('读取或保存cookies出错 文件夹名: {0}'.format(folderName), exc_info=True)
                print('读取或保存cookies出错', folderName)

        return _exec
    return _check


def makeMd5(raw):

     m = hashlib.md5()  
     m.update(raw.encode()) 
     return  m.hexdigest()  


# Qt的一些部件是直接支持HTML的，
# 做个用于方便支持居中的装饰器。
def centerHTML(func):
    def wrap(*args):

        centerHTML = '<p align="center" style="line-height: 175%">{0}</p>'.format(func(*args).replace('\n', '<br>'))

        return centerHTML

    return wrap


# 一个有信号槽机制的安全线程队列。
class QueueObject(QObject):
    add = pyqtSignal()

    def __init__(self):
        super(QueueObject, self).__init__()
        self.queue = Queue()

    def put(self, data):
        self.queue.put(data)
        self.add.emit()

    def get(self):
        if self.queue.empty():
            return 0

        return self.queue.get()


# 一个用于继承的类，方便多次调用。
class ScrollArea(QScrollArea):
    """包括一个ScrollArea做主体承载一个QFrame的基础类。"""
    scrollDown = pyqtSignal()

    def __init__(self, parent=None):
        super(ScrollArea, self).__init__()
        self.parent = parent
        self.frame = QFrame()
        self.frame.setObjectName('frame')
        # 用于发出scroll滑到最底部的信号。
        self.verticalScrollBar().valueChanged.connect(self.sliderPostionEvent)

        self.setWidgetResizable(True)

        self.setWidget(self.frame)

    def noInternet(self):
        # 设置没有网络的提示。
        self.noInternetLayout = QGridLayout()
        self.setLayout(self.mainLayout)

        self.Tip = QLabel("您已进入没有网络的异次元，打破次元壁 →", self)
        self.TipButton = QPushButton("打破次元壁", self)
        self.TipButton.setObjectName("TipButton")

        self.TipLayout = QHBoxLayout()
        self.TipLayout.addWidget(self.Tip)
        self.TipLayout.addWidget(self.TipButton)

        # self.indexAllSings.setLayout(self.TipLayout)

        self.noInternetLayout.addLayout(self.TipLayout, 0, 0, Qt.AlignCenter|Qt.AlignTop)

        self.frame.setLayout(self.noInternetLayout)

    def sliderPostionEvent(self):
        if self.verticalScrollBar().value() == self.verticalScrollBar().maximum():
            self.scrollDown.emit()

    def maximumValue(self):
        return self.verticalScrollBar().maximum()


class TableWidget(QTableWidget):

    def __init__(self, count, headerLables):
        super(TableWidget, self).__init__()
        self.setColumnCount(count)
        self.setHorizontalHeaderLabels(headerLables)

        self.horizontalHeader().setStretchLastSection(True)
        self.verticalHeader().setVisible(False)
        self.setShowGrid(False)
        self.setAlternatingRowColors(True)
        self.setEditTriggers(QAbstractItemView.NoEditTriggers)
        self.setSelectionBehavior(QAbstractItemView.SelectRows)

    def setColumnWidths(self, widths:dict):
        for key in widths:
            self.setColumnWidth(key, widths[key])


# 去除了margin和spacing的布局框。
class VBoxLayout(QVBoxLayout):

    def __init__(self, *args):
        super(VBoxLayout, self).__init__(*args)

        self.setContentsMargins(0, 0, 0, 0)
        self.setSpacing(0)


class HBoxLayout(QHBoxLayout):

    def __init__(self, *args):
        super(HBoxLayout, self).__init__(*args)

        self.setContentsMargins(0, 0, 0, 0)
        self.setSpacing(0)


# 默认情况下。
# ----!!!----
# 一个水平居中的布局。
class HStretchBox(HBoxLayout):

    def __init__(self, parentLayout, *widgets, frontStretch=1, behindStretch=1):
        super(HStretchBox, self).__init__()
        self.addStretch(frontStretch)
        for i in widgets:
            self.addWidget(i)

        self.addStretch(behindStretch)

        parentLayout.addLayout(self)


# 默认情况下。
#  |
#  !
#  |
# 一个垂直居中的布局。
class VStretchBox(VBoxLayout):

    def __init__(self, parentLayout, *widgets, frontStretch=1, behindStretch=1):
        super(VStretchBox, self).__init__()
        self.addStretch(frontStretch)
        for i in widgets:
            self.addWidget(i)
        self.addStretch(behindStretch)

        self.parentLayout.addLayout(self)


# ---下面是线程，包括网络线程和时钟线程。
class RequestThread(QThread):
    # 该信号用于在线程执行时发出，通知主线程做些界面更新。
    # 因为在其他线程修改主界面是非常危险的事情。
    breakSignal = pyqtSignal(str)

    """异步请求，类似Pyhton封装的Thread形式，用QThread在简单封装一下。"""
    def __init__(self, parent=None, target=None, finishedConnection=None, *args, **kwargs):
        super(RequestThread, self).__init__()

        self.parent = parent
        self.args = args
        self.kwargs = kwargs
        self.target = target
        self.flag = False
        self.result = None
        if finishedConnection:
            self.finished.connect(finishedConnection)
            
    def run(self):
        self.result = self.target(*self.args, **self.kwargs)

    def setTarget(self, target=None):
        """方便多次调用。"""
        self.target = target

    def setArgs(self, *args, **kwargs):
        """方便多次调用。"""
        self.args = args
        self.kwargs = kwargs

    def setFlag(self, flag):
        self.flag = flag


class Timer(QThread):
    # 一个无限循环的时钟，只有特定的条件才会解锁。
    def __init__(self, var=None, parent=None):
        super(Timer, self).__init__()
        self.parent = parent
        self.var = var
        self.times = 0

    def run(self):
        while 1:
            if self.var:
                self.var = False
                break
            self.sleep(0.1)

    def setVar(self, value):
        """设置变量。"""
        self.var = value


# <img src=1.jpg>相关变量。

picsThreadPool = QThreadPool()
picsThreadPool.setMaxThreadCount(10)

picsQueue = QueueObject()

# 缓存目录。
cacheFolder = 'cache'


## 对<img src=1.jpg>的初步探索。
# 暂只接受http(s)和本地目录。
class PicLabel(QLabel):

    def __init__(self, src=None, width=200, height=200, pixMask=None):
        super(PicLabel, self).__init__()
        global picsThreadPool

        self.src = None

        self.width = width
        self.height = height

        self.pixMask = None
        if pixMask:
            self.pixMask = pixMask
        if src:
            self.setSrc(src)

        if self.width:
            self.setMaximumSize(self.width, self.height)
            self.setMinimumSize(self.width, self.height)

    @checkOneFolder(cacheFolder)
    def setSrc(self, src):
        src = str(src)
        if 'http' in src or 'https' in src:
            cacheList = os.listdir(cacheFolder)

            # names = str(src[src.rfind('/')+1:])
            names = makeMd5(src)
            localSrc = cacheFolder+'/'+names
            if names in cacheList:
                self.setSrc(localSrc)
                self.src = localSrc
                return

            task = GetPicture(self, src)
            picsThreadPool.start(task)
        else:
            self.src = src
            pix = QPixmap(src)
            pix.load(src)
            pix = pix.scaled(self.width, self.height)
            # mask需要与pix是相同大小。
            if self.pixMask:
                mask = QPixmap(self.pixMask)
                mask = mask.scaled(self.width, self.height)
                pix.setMask(mask.createHeuristicMask())

            self.setPixmap(pix)

    def getSrc(self):
        """返回该图片的地址。"""
        return self.src


class GetPicture(QRunnable):

    def __init__(self, widget, src):
        super(GetPicture, self).__init__()
        global picsQueue
        self.widget = widget
        self.src = src

    def run(self):
        # names = str(self.src[self.src.rfind('/')+1:])
        names = makeMd5(self.src)
        content = Requests.get(self.src).content
        picsQueue.put([self.widget, content, names])


# just for picLabel.
def __addPic():
    data = picsQueue.get()
    # widget, content, names.
    if not data:
        return

    widget = data[0]
    width = widget.width
    height = widget.height

    pic = QPixmap()
    pic.loadFromData(data[1])
    localSrc = cacheFolder+'/'+data[2]
    pic.save(localSrc, 'jpg')
    pic = pic.scaled(width, height)

    widget.src = localSrc

    # 上遮罩。
    if widget.pixMask:
        mask = QPixmap()
        mask.load(widget.pixMask)
        mask = mask.scaled(width, height)

        pic.setMask(mask.createHeuristicMask())
    
    widget.setPixmap(pic)


picsQueue.add.connect(__addPic)


# 图片模糊化处理函数。
try:
    # from PIL import Image, ImageFilter
    noPIL = False
except ImportError:
    noPIL = True


# 本来想做图片虚化然后显示的效果，
# 发现显示出来比较丑。
def blur(source):
    return False

# def blur(source:str):
#     """接受图片路径，返回处理后的图片路径。"""
#     if noPIL:
#         return False

#     image = Image.open(source)
#     image = image.filter(ImageFilter.GaussianBlur(radius=30))
#     saveName = source + '_blur.jpg'
#     image.save(saveName)

#     return saveName


if __name__ == '__main__':
    import os
    os.chdir('..')

    app = QApplication([])

    # a = QFrame()
    a = PicLabel('F:/pics/Crow.jpg', width=64, height=64)
    # a.setObjectName('sss')
    # a.setStyleSheet('QLabel#sss {border-image: url(F:/pics/Crow.jpg);}')
    # a.resize(500, 600)
    b = PicLabel('resource/expand.png', 64, 64)
    b.setStyleSheet('QLabel {background-color: rgba(0, 0, 0,50%);}')
    c = VBoxLayout(a)
    c.addWidget(b)
    a.show()

    exit(app.exec_())