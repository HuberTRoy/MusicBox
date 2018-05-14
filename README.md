# MusicPlayer
[![Build Status](https://travis-ci.org/HuberTRoy/MusicBox.svg?branch=master)](https://travis-ci.org/HuberTRoy/MusicBox)
[![Python](https://img.shields.io/badge/Python-3.5%203.6-green.svg)](https://pypi.python.org/pypi/Music-Player)
[![Enjoy](https://img.shields.io/badge/EnjoyYourself-yes-orange.svg)](https://github.com/HuberTRoy/MusicBox/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://pypi.python.org/pypi/Music-Player)


## 整合多家音乐网站(目前网易云/虾米/QQ音乐)的播放器~， ( • ̀ω•́ )✧~。

### 功能:
* 支持网易云，虾米，QQ音乐的歌单/搜索，播放音乐，查看音乐信息(歌词)。
* 根据所听歌曲推荐歌曲~。
* 桌面歌词系统~。
* 下载音乐支持~。
* 支持网易云手机号登陆同步歌单。
* 尽可能还原网易云音乐体验。
* 跨平台。
* QSS设置样式，类似CSS易于自定义扩展。

## 截图:
<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/24.jpg"/>

<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/16.jpg"/>

<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/19.jpg"/>

<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/23.jpg"/>

### 安装:
```
$ (sudo) pip install Music-Player
✨🍰✨
```
或
```
$ git clone git@github.com:HuberTRoy/MusicBox.git
$ (sudo) python(3) setup.py install
```

### 运行:
```
$ (sudo) musicplayer
```

### 可能会出现的依赖错误:
Windows 下如果 `pycryptodome` 安装不上可以安装 `pycryptodomex` ->`pip install pycryptodomex`.

#### \*nix额外依赖:
```
$ sudo apt-get install pyqt5.qtmultimedia
$ sudo apt-get install libqt5multimedia5-plugins
```

### QQ音乐播放依赖:
> Windows下如果缺少m4a的解码器需要下载 <a href="https://github.com/Nevcairiel/LAVFilters/releases">LAV Filters</a> <br>
> Linux 需要下载 <a href="https://gstreamer.freedesktop.org/">GStreamer</a>

### 开发详情请移步至： <a href="https://github.com/HuberTRoy/MusicPlayer/blob/master/doc/updateLog.md">更新日志~</a>

#### 功能TODO:
- [ ] 支持私人FM.
- [ ] 创建个人歌单.
- [ ] 打包下载方便食用.
- [ ] 多平台账号同步歌单.
- [ ] 方便的界面皮肤更换.
- [x] 支持下载歌曲.
- [x] 简略推荐歌曲.
- [x] 桌面歌词系统.

#### 开发TODO:
- [x] 加入日志方便调试.
- [ ] 尝试使用其他方式播放音乐.
