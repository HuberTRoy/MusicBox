__author__ = 'cyrbuzz'
"""制作登陆区盒子。"""

from base import QDialog, QFrame, HBoxLayout, HStretchBox, QLabel, QLineEdit, QPushButton, Qt, VBoxLayout, RequestThread


class InputLine(QLineEdit):

    def __init__(self, parent=None, width=0, height=0, placeholderText=None):
        super(QLineEdit, self).__init__()
        self.parent = parent

        if width:
            self.setMaximumWidth(width)
            self.setMinimumWidth(width)
        
        if height:
            self.setMaximumHeight(height)
            self.setMinimumHeight(height)

        if placeholderText:
            self.setPlaceholderText(placeholderText)


class Header(QFrame):
    myStyle = """
    QFrame {background: #2D2D2D;}

    QLabel {
        margin-left: 8px; 
        color: white; 
        font-weight: bold;
        font-size: 15px;
    }

    QPushButton {
        border: none;
        font: bold;
        font-size: 13px;
        color: #7C7C7C;
        margin-right: 8px;
    }

    QPushButton:hover{
        color: #DCDDE4;
    }
    """

    def __init__(self, title:str, parent=None):
        super(Header, self).__init__()
        self.parent = None

        self.setStyleSheet(self.myStyle)

        self.mainLayout = HBoxLayout(self)
        
        self.title = QLabel(title)
        self.mainLayout.addWidget(self.title)

        self.mainLayout.addStretch(1)

        self.closeButton = QPushButton('×')
        self.mainLayout.addWidget(self.closeButton)

    def connectCloseButton(self, functionName):
        self.closeButton.clicked.connect(functionName)


class LoginBox(QDialog):

    def __init__(self, parent=None):
        super(LoginBox, self).__init__()
        self.parent = parent
        
        self.setWindowFlags(Qt.FramelessWindowHint)
        self.setWindowTitle('登陆')
        self.setObjectName('LoginBox')

        self.resize(520, 300)

        # 可能会有多个渠道登陆的后续扩展。
        self.currentFrame = 0

        self.mainLayout = VBoxLayout(self)

        self.phoneAndEMailFrame = PhoneAndEMailFrame(self)

        self.mainLayout.addWidget(self.phoneAndEMailFrame)

    def setWarningAndShowIt(self, warningStr):
        if not self.currentFrame:
            self.phoneAndEMailFrame.setWarningAndShowIt(warningStr)

    def connectLogin(self, functionName):
        if not self.currentFrame:
            self.phoneAndEMailFrame.connectLogin(functionName)
    
    def checkAndGetLoginInformation(self):
        if not self.currentFrame:
            return self.phoneAndEMailFrame.checkAndGetLoginInformation()            


class PhoneAndEMailFrame(QFrame):

    def __init__(self, parent=None):
        super(PhoneAndEMailFrame, self).__init__()
        self.parent = parent
        self.resize(520, 300)
        with open('QSS/phoneAndEMailFrame.qss', 'r') as f:

            self.setStyleSheet(f.read())

        self.mainLayout = VBoxLayout(self)

        self.header = Header("用户名", self)
        self.header.setMinimumHeight(40)
        self.header.connectCloseButton(self.parent.accept)
        self.mainLayout.addWidget(self.header)

        self.mainLayout.addStretch(1)

        self.usernameLine = InputLine(self, 220, 32, '请输入用户名')
        self.usernameLine.setObjectName('usernameLine')
        self.usernameCenterBox = HStretchBox(self.mainLayout, self.usernameLine)   
        
        self.mainLayout.addSpacing(10) 
        
        self.passwordLine = InputLine(self, 220, 32, '请输入密码')
        self.passwordLine.setObjectName('passwordLine')
        self.passwordCenterBox = HStretchBox(self.mainLayout, self.passwordLine)
        self.passwordLine.setEchoMode(QLineEdit.Password)

        self.warningIconLabel = QLabel()
        self.warningIconLabel.setObjectName('warningIconLabel')
        self.warningIconLabel.setMaximumSize(14, 14)
        self.warningIconLabel.setMinimumSize(14, 14)
        self.warningIconLabel.hide()
        self.warningLabel = QLabel("请输入用户名")
        self.warningLabel.hide()
        self.warningLabel.setObjectName('warningLabel')

        self.warningCenterBox = HStretchBox(self.mainLayout, self.warningIconLabel, self.warningLabel, 
            behindStretch=2)

        self.mainLayout.addSpacing(30) 

        self.enterLoginButton = QPushButton("登 录")
        self.enterLoginButton.setObjectName("enterButton")
        self.enterLoginButton.setMaximumSize(217, 27)
        self.enterLoginButton.setMinimumSize(217, 27)
        self.enterLoginCenterBox = HStretchBox(self.mainLayout, self.enterLoginButton)

        self.mainLayout.addSpacing(30)
        
        self.mainLayout.addStretch(1)

    def checkAndGetLoginInformation(self):
        username = self.usernameLine.text()
        password = self.passwordLine.text()
        
        if not username or not password:
            self.warningIconLabel.show()

        if not username:
            self.warningLabel.setText('请输入用户名')
            self.warningLabel.show()
            return False

        if not password:
            self.warningLabel.setText('请输入密码')
            self.warningLabel.show()
            return False

        self.warningIconLabel.hide()
        self.warningLabel.hide()

        return username, password

    def setWarningAndShowIt(self, warningStr):
        self.warningLabel.setText(warningStr)

        self.warningLabel.show()
        self.warningIconLabel.show()

    def connectLogin(self, functionName):
        self.enterLoginButton.clicked.connect(functionName)


if __name__ == '__main__':
    import os
    
    os.chdir('..')

    app = QApplication([])

    main = LoginBox()
    main.show()

    app.exec_()