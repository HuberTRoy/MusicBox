# MusicPlayer
## 主要用于学习，制作一个漂亮的界面。完全模仿网易云音乐，真的很好看呀~。

> Python3.4+ <br />
> PyQt5.5+ <br />
> requests. <br /> 
> eyed3 0.8+ <br />
> crypto/cryptodome. -> pip install pycyrptodome Or pip install pycryptodomex<br />

### 目前很多功能没有添加。

#### 存在的问题:
> 目前没有某项音乐的详细信息。<br />
> 大部分的网络异常没有考虑。 <br />
> 目前没有MV。 <br />
> 目前没有私人FM。 <br />

### 不仅仅可以作为音乐播放器，添加更多API支持，可以添加更多内容。

## 2017/8/21 更新: <br />
    0. bug修复: 现在缓存的歌曲可以正常播放(需网络.)。
    1. PicLabel(<img src=1.jpg>)添加缓存，之后不需要网络。

## 2017/8/20 更新: <br />
    0. 修复歌单占用大量内存。修复前显示30个歌单大约要150M目前需要大约5M.
    1. QLabel显示图片说明: 由实验证明。QLabel显示图片并不是占用图片原内存。
    而是由QLabel的大小决定，如果QLabel的大小是100x100而原图片大小是1000x1000，
    那所显示出来的图片内存占用会比之前扩大几倍。所以在显示之前用QPixmap将图片缩小到合适的大小会修复这一行为。


## 2017/8/18 更新: <br />
    0. 添加保存上一次的功能。具体为:
    0.0 保存登陆的状态(歌单/昵称/头像). 目前没有用到cookies功能暂未保存cookies.
    0.1 保存正在听的歌(歌曲列表. 未保存当前播放歌曲的状态.)。

    1. 扩展上: 需实现类里的saveCookies和loadCookies方法。目前需要在类中明确调用.
    widget/base.py -> checkFolder提供方便检测所需目录是否存在的装饰器。
    ```
    class Test:
        saveFolder = 'test/test/save.suffix'
        @checkFolder(saveFolder):
        def saveCookies(self):
            pass
            ...
    ```

## 2017/8/15 更新: <br />
    0. 将头像处方形图片变成圆形图片。
    1. 使用方法:
    ```
    from base import PicLabel
    picture = PicLabel(url, width, height, mask:filename)
    # mask就是显示方法，是个圆形就会显示圆形,是个不规则图形就是不规则图形。
    # 传入路径即可。mask不支持网络图片。
    ```
<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/14.jpg"/>

## 2017/8/13 更新: <br />
    0. 一个被遗忘的功能. -> 全部播放现在可用~。

<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/13.jpg"/>


## 2017/8/12 更新: <br />
    0. 现在可以获取到登陆后的用户收藏及创建的歌单。

<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/12.jpg"/>


## 2017/8/11 更新: <br />
    0. 目前可用手机号登陆。还不可以获取歌单, 仅登陆和头像, 其他功能待更新。详情见下图。
    1. 做了<img src=1.jpg>的初步尝试。 多线程(线程池。详情请看base文件.)，杜绝卡界面。
    使用方法: 
    ···
    from base import picLabel
    # 支持本地目录和带http(s)的url.
    # url必须有，width, height可选.
    mypic = picLabel('url', width:int, height:int)
    ...
    ···
<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/10.jpg"/>
<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/11.jpg"/>

## 2017/7/31 更新: <br />
    0. 重构播放列表。将之前关于播放列表的问题全部修复。
    1. 音频无效不会退出，而是会将不可播放的信息反馈到简介框。
    2. 目前登陆API已经更新，尚处于测试阶段。欢迎折腾一波~。
<img src="https://github.com/HuberTRoy/MusicPlayer/blob/master/testpic/9.jpg" />

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