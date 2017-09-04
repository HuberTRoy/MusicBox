__author__ = 'cyrbuzz'

from base import QAction, QIcon, QMenu, QSystemTrayIcon


class SystemTray(QSystemTrayIcon):
    
    def __init__(self, iconPath, parent=None):
        super(SystemTray, self).__init__(QIcon(iconPath))
        self.parent = parent

        self.menu = QMenu(self.parent)
        self.setContextMenu(self.menu)

        self.show()

    def addAction(self, action:QAction):
        if type(action) != QAction:
            print('添加的Action不是一个QAction对象。')
            return

        self.menu.addAction(action)

    def __del__(self):
        self.hide()