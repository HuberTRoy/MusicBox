# MusicPlayer
## 主要用于学习，制作一个漂亮的界面。完全模仿网易云音乐，真的很好看呀~。

> Python3.4+ <br />
> PyQt5.5+ <br />
> requests. <br />
> eyed3 0.8+ <br />

### 目前很多功能没有添加。

### 不仅仅可以作为音乐播放器，添加更多API支持，可以添加更多内容。

## 2017/3/3 更新:
> 0. 添加大模块上的前一个后一个。<br />
>> 目前的大模块包括 歌单/发现音乐/本地音乐。 <br />
> 1. 增加歌曲的缩略图。

<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/5.jpg" />

## 2017/2/27 更新:
> 添加对本地音乐的支持。<br />

<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/4.jpg" />

#### 存在的问题:
> 目前没有搜索功能。<br />
> 播放列表删除功能有些问题: 如果删除的音乐在当前播放音乐的前面，会导致再次添加相同的音乐时无法播放这个音乐。<br />
> 目前没有某项音乐的详细信息。<br />
> 目前无法获取个人歌单。<br />
> 目前无法登陆。<br />
> 大部分的网络异常没有考虑。 <br />
> 如果音频无效不会做出提示。 <br />

歌单完善:
<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/0.jpg" />
<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/1.jpg" />
<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/3.jpg" />
<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/2.jpg" />

### 扩展:
> 侧边栏扩展: 
>>  0. 继承base 里面的ScrollArea(或者自己起一个基础面板。)并按照自己喜欢的样式随意编写。
>>  1. 继承music 里面的Window 创建0所编写的类，调用allTab()方法查看当前已经添加的tab总量，调用addTab(widget, name='')方法将类添加(这里的name为'', 此tab的bar是不可见的)。
>>  2. 继承music 里面的Navigation 在合适的位置添加一个用于触发的按钮，将此按钮的clicked信号连接为self.parent.setTabIndex(allTab())
>>  3. enjoy it.

> 主内容区扩展(位于<b>发现音乐</b>按钮下):
>>  0. 继承base 里面的ScrollArea(或者自己起一个基础面板。)并按照自己喜欢的样式随意编写。
>>  1. 继承music 里面的MainContent 并调用addTab(widget, name='')方法将类添加(此name要写一个名字，如: <b>网易云歌单</b>)。
>>  2. enjoy it.
>>  3. 如果要扩展歌单类的tab，可以继承music 里面的NetEaseSingsArea, 将self.api替换为你的API，并按格式改写api的返回值，或者改写getSings方法的处理过程。

# 持续更新ing...