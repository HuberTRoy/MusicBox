# -*- coding: utf-8 -*-

# This file copy from https://github.com/wn0112/PPlayer

from PyQt5 import QtWidgets, QtGui, QtCore

def _fromUtf8(s):
    return s

class Button(QtWidgets.QPushButton):
    def __init__(self,parent = None):
        super(Button,self).__init__(parent)
        self.status = 0 

    def loadPixmap(self, pic_name):
        self.pixmap = QtGui.QPixmap(pic_name)
        self.btn_width = self.pixmap.width()
        self.btn_height = self.pixmap.height()/6
        self.setFixedSize(self.btn_width, self.btn_height)

    def mousePressEvent(self,event):
        if event.button() == QtCore.Qt.LeftButton:
            self.status = 2
            self.update()
            self.clicked.emit(True)

    def mouseReleaseEvent(self,event):
        if event.button() == QtCore.Qt.LeftButton:
            self.status = 0 
            self.update()
            self.released.emit()

    def rst(self):
        self.status = 0
        self.update()

    def rbReleased(self):
        self.status = 0
        self.update()

    def rbPressed(self):
        self.status = 4
        self.update()

    def lbPressed(self):
        self.status = 3
        self.update()

    def lbReleased(self):
        self.status = 0
        self.update()

    def bothPressed(self):
        self.status = 5
        self.update()
        
    def bothReleased(self):
        self.status = 0
        self.update()

    def paintEvent(self,event):
        self.painter = QtGui.QPainter()
        self.painter.begin(self)
        self.painter.drawPixmap(self.rect(), self.pixmap.copy(0, self.btn_height * self.status, self.btn_width, self.btn_height))
        self.painter.end()

class PlayButton(Button):
    def __init__(self,parent = None):
        super(PlayButton,self).__init__(parent)
        self.setCheckable(True)

    def mouseReleaseEvent(self, event):
        self.released.emit()

class SRButton(PlayButton):
    def __init__(self,parent = None):
        super(SRButton,self).__init__(parent)
        self.syn = 0

    def mousePressEvent(self,event):    
        if event.button() == QtCore.Qt.LeftButton:
            self.status = 2 
            self.update()
            if not self.isChecked():
                self.syn = 1
                self.clicked.emit(True)        

    def mouseReleaseEvent(self, event):
        if self.isChecked() and self.syn != 1:
            self.clicked.emit(True)
            self.released.emit()
        else:
            self.syn = 0


class PushButton(QtWidgets.QPushButton):
    def __init__(self,parent = None):
        super(PushButton,self).__init__(parent)
        self.status = 0 

    def loadPixmap(self, pic_name):
        self.pixmap = QtGui.QPixmap(pic_name)
        self.btn_width = self.pixmap.width()/4
        self.btn_height = self.pixmap.height()
        self.setFixedSize(self.btn_width, self.btn_height)

    def enterEvent(self,event):
        if not self.isChecked() and self.isEnabled():
            self.status = 1 
            self.update()

    def setDisabled(self, bool):
        super(PushButton,self).setDisabled(bool)
        if not self.isEnabled():
            self.status = 2
            self.update()
        else:
            self.status = 0
            self.update()

    def mousePressEvent(self,event):
        if event.button() == QtCore.Qt.LeftButton:
            self.status = 2 
            self.update()    

    def mouseReleaseEvent(self,event):
        if event.button() == QtCore.Qt.LeftButton: 
            self.clicked.emit(True)
        if not self.isChecked():
            self.status = 3
        if self.menu():
            self.menu().exec_(event.globalPos())
        self.update()
        
    def leaveEvent(self,event):
        if not self.isChecked() and self.isEnabled():
            self.status = 0 
            self.update()

    def paintEvent(self,event):
        self.painter = QtGui.QPainter()
        self.painter.begin(self)
        self.painter.drawPixmap(self.rect(), self.pixmap.copy(self.btn_width * self.status, 0, self.btn_width, self.btn_height))
        self.painter.end()
        
class PushButton2(QtWidgets.QPushButton):
    def __init__(self,parent = None):
        super(PushButton2,self).__init__(parent)

    def loadPixmap(self, pic_name):
        self.pixmap = QtGui.QPixmap(pic_name)
        self.btn_width = self.pixmap.width()
        self.btn_height = self.pixmap.height()
        self.setFixedSize(self.btn_width, self.btn_height)

    def paintEvent(self,event):
        self.painter = QtGui.QPainter()
        self.painter.begin(self)
        self.painter.drawPixmap(self.rect(), self.pixmap.copy(0, 0, self.btn_width, self.btn_height))
        self.painter.end()    