# MusicPlayer
## 界面以网易云音乐为模板，资源整合多家音乐网站(目前网易云/虾米/QQ音乐)，   ( • ̀ω•́ )✧~。

### 安装:
```
$ git clone https://github.com/HuberTRoy/MusicPlayer
$ (sudo) python(3) setup.py install
```

### 运行:
```
$ (sudo) musicplayer
```

### 手动安装依赖:
> Python3.5+ <br />
> PyQt5.5+ <br />
> pip install -r requirements.txt

### 可能会出现的依赖错误:
> Windows 下如果 pycryptodome 安装不上可以安装pycryptodomex -> pip install pycryptodomex.

#### \*nix额外依赖:
```
$ sudo apt-get install pyqt5.qtmultimedia
$ sudo apt-get install libqt5multimedia5-plugins
```

### QQ音乐播放依赖:
> Windows下如果缺少m4a的解码器需要下载 <a href="https://github.com/Nevcairiel/LAVFilters/releases">LAV Filters</a> <br>
> Linux 需要下载 <a href="https://gstreamer.freedesktop.org/">GStreamer</a>


### 开发详情请移步至： <a href="https://github.com/HuberTRoy/MusicPlayer/blob/master/doc/updateLog.md">更新日志~</a>

## 截图:
<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/22.jpg"/>

<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/16.jpg"/>

<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/19.jpg"/>

<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/23.jpg"/>

<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/10.jpg"/>

<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/14.jpg"/>

#### TODO:
- [ ] 支持私人FM.
- [ ] 创建个人歌单.
- [ ] 支持下载歌曲.
- [ ] 打包下载方便食用.
- [ ] 多平台账号同步歌单.
- [ ] 方便的界面皮肤更换.