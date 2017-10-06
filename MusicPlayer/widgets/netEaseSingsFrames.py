__author__ = 'cyrbuzz'
"""不要单独运行。"""
from singsFrameBase import SingsFrameBase, SingsSearchResultFrameBase


# 一个Tab，网易云的全部歌单。
class NetEaseSingsArea(SingsFrameBase):
    """全部歌单。"""

    def __init__(self, parent=None):
        super(NetEaseSingsArea, self).__init__(parent)


class NetEaseSearchResultFrame(SingsSearchResultFrameBase):

    def __init__(self, parent):
        super(NetEaseSearchResultFrame, self).__init__(parent)