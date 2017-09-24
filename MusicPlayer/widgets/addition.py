from PyQt5.QtWidgets import QLineEdit, QHBoxLayout, QPushButton, QSpacerItem, QSizePolicy, QApplication
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QCursor

"""处理时间，处理成00:00:00的格式。"""
def deal_time(x):
    x = str(x)
    if len(x) == 1:
        x = '0' + x

    return x

def itv2time(iItv):
    iItv = int(iItv)

    # 地板除求小时整数。
    h = iItv//3600
    # 求余数。
    h_remainder = iItv % 3600

    # 地板除求分钟整数。
    m = h_remainder // 60
    # 求余数 为秒。
    s = h_remainder % 60

    return ":".join(map(deal_time,(m,s)))


class SearchLineEdit(QLineEdit):
    """创建一个可自定义图片的输入框。"""
    def __init__(self, parent=None):
        super(SearchLineEdit, self).__init__()
        self.setObjectName("SearchLine")
        self.parent = parent
        self.setMinimumSize(218, 20)
        with open('QSS/searchLine.qss', 'r') as f:
            self.setStyleSheet(f.read())

        self.button = QPushButton(self)
        self.button.setMaximumSize(13, 13)
        self.button.setCursor(QCursor(Qt.PointingHandCursor))

        self.setTextMargins(3, 0, 19, 0)

        self.spaceItem = QSpacerItem(150, 10, QSizePolicy.Expanding)

        self.mainLayout = QHBoxLayout()
        self.mainLayout.addSpacerItem(self.spaceItem)
        # self.mainLayout.addStretch(1)
        self.mainLayout.addWidget(self.button)
        self.mainLayout.addSpacing(10)
        self.mainLayout.setContentsMargins(0, 0, 0, 0)
        self.setLayout(self.mainLayout)
    
    def setButtonSlot(self, funcName):
        self.button.clicked.connect(funcName)



if __name__ == '__main__':
    # import sys

    # app = QApplication(sys.argv)

    # main = SearchLineEdit()

    # main.show()

    # sys.exit(app.exec_())
    print(itv2time(12.34))