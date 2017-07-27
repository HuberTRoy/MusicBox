"""用于定义几个需要多次调用的基础类。"""
__author__ = 'cyrbuzz'

from queue import Queue

from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
from PyQt5.QtGui import *


"""一个有信号槽机制的安全线程队列。"""
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


"""一个用于继承的类，方便多次调用。"""
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


# ---下面是线程，包括网络线程和时钟线程。
class RequestThread(QThread):
    """异步请求，类似Pyhton封装的Thread形式，用QThread在简单封装一下。"""
    def __init__(self, parent=None, target=None, *args, **kwargs):
        super(RequestThread, self).__init__()

        self.parent = parent
        self.args = args
        self.kwargs = kwargs
        self.target = target
        self.flag = False

    def run(self):
        self.target(*self.args, **self.kwargs)

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