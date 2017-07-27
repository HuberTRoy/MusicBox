# MusicPlayer
## 主要用于学习，制作一个漂亮的界面。完全模仿网易云音乐，真的很好看呀~。

> Python3.4+ <br />
> PyQt5.5+ <br />
> requests. -> pip install requests <br /> 
> eyed3 0.8+ <br />
> crypto/cryptodome. -> pip install pycyrptodome Or pip install pycryptodomex<br />

### 目前很多功能没有添加。

#### 存在的问题:
> 播放列表删除功能有些问题: 如果删除的音乐在当前播放音乐的前面，会导致再次添加相同的音乐时无法播放这个音乐。<br />
> 目前没有某项音乐的详细信息。<br />
> 目前无法获取个人歌单。<br />
> 目前无法登陆。<br />
> 大部分的网络异常没有考虑。 <br />
> 如果音频无效不会做出提示。 <br />

### 不仅仅可以作为音乐播放器，添加更多API支持，可以添加更多内容。

## 2017/7/26 更新: <br />
    0. 优化代码。代码布局的调整，不合理的代码修改。
    1. 新增线程池方法，使图片获取更加流畅。关于PyQt线程池的用法在netEaseSingsFrames有简单介绍。
    2. 初步进行网络错误过滤。装饰器requestsExceptionFilter如果出现错误会重新请求3次，全部挂了会返回False. 


## 2017/7.20 更新: <br />
    0. 优化代码结构。几处不合适的变量/方法名修改。
    1. 现在会正确的显示该文件夹下所有的MP3文件。(之前只会显示当前文件夹。)

## 2017/7/18 更新: <br />
    0. 现在没有搜索结果的音乐会正确的显示。

感谢 <a href="https://www.zhihu.com/people/ke-jin-feng-li-18/activities">刻进风里</a>

## 2017/7/15 更新: <br />
    0. 更新搜索API.
    1. 修复搜索不能播放的问题。
    2. 目前歌曲地址是一个独立的获取url，显得有点慢。

<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/8.jpg" />

## 2017/7/14 更新: <br />
    0. 修复由于API更改导致的无法播放歌曲问题。
    1. 新的API借鉴了  -> https://github.com/xiyouMc/ncmbot
    

## 2017/7/13 更新:<br />
    0. 增加搜索功能。(还不能进行播放。)
    1. 代码结构的调整。
    2. 其他小功能的微调。
    
<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/6.jpg" />
<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/7.jpg" />


## 2017/3/3 更新:
> 0. 添加大模块上的前一个后一个。<br />
>> 目前的大模块包括 歌单/发现音乐/本地音乐。 <br />
> 1. 增加歌曲的缩略图。

<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/5.jpg" />

## 2017/2/27 更新:
> 添加对本地音乐的支持。<br />

<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/4.jpg" />


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