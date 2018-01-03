# MusicPlayer
    MusicPlayer 是一个整合了多家音乐资源的跨平台音乐播放器，你可以随心听音乐~。

# 感谢
    感谢所使用到的/将要使用到的各类资源的开发者/贡献者们，感谢所有关注MusicPlayer和热爱折腾的你，感谢。

# 安装
```
$ git clone https://github.com/HuberTRoy/MusicPlayer
$ (sudo) python(3) setup.py install
```

# 本程序所需依赖
    Python 3.5+
    PyQt5.5+
    requests
    pycyrptodome
    quamash
    可选:
    eyed3==0.8

# 项目结构
    Music:
        apis/
        features/
        logger/
        networks/
        QSS/
        widgets/
        music.py

# 各类组件说明
## apis/
### apiRequestsBase
*def ignored(\*exception):*   
&ensp;&ensp;&ensp;用于使用with语法来忽略即将到来的错误。  
```
    with ignored(OSError):
        print(1)
        raise(OSError)
```
*decorator def requestsExceptionFilter(func):*  
&ensp;&ensp;&ensp;用于进行网络请求错误后的重试。  
```
    @requestsExceptionFilter
    def test():
        requests.get('http://www.thereAreNothing.com')
```
*class HttpRequest(object):*  
&ensp;&ensp;&ensp; 是一个包含基础cookies，基础http头信息，默认超时时间的HTTP请求基础类。   
&ensp;&ensp;&ensp;*httpRequest(action, method="GET", add=None, data=None, headers=None, cookies='', timeout=default_timeout, urlencode='utf-8', is_json=True):*  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;action: URL地址  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;add: GET方法时的附加内容。  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;data: POST方法时的附加内容。  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;is_json: 已废弃。  

### netEaseApi
```
暂时以netEase返回的内容形式作为某一个歌单结果以及搜索歌曲结果的标准。

某一歌单:
{'name': 该歌单名称。
    'creator': 该歌单创建者。
    'description': 该歌单简介。
    'trackCount': 该歌单包含的歌曲总量。
    "tracks":
        [
            {'name': 该歌曲信息。
              'artists': 该歌曲作者。
              'dutation': 该歌曲时长。
              'album': {'blurPicUrl': 该歌曲所显示图片。}
            }, ...
        ]
}


搜索歌曲:
{
'songsCount': 搜到的歌曲总量。
'songs':
  [{'name': 歌曲名称。
      'ar': [{'name': 歌曲作者名称。}]
      'al': {'picUrl': 歌曲图片URL。}
      'dt': 整数，歌曲时间。
      'id': 字符串，歌曲id。
      'mp3Url': 歌曲URL。
      'lyric': 歌曲歌词地址，此项可忽略。
  }...]
}

```
*class NetEaseWebApi(HttpRequest):*   
&ensp;&ensp;&ensp;提供网易云音乐的相关API。  
&ensp;&ensp;&ensp;*httpRequest(\*args, \*\*kwargs):*   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;返回所请求到的JSON信息，如果失败则返回False。  
&ensp;&ensp;&ensp;*login(usename, password):*   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 用于进行登陆。  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 返回登录后的信息，目前仅支持手机号登陆。  
&ensp;&ensp;&ensp;*user_playlist(uid, offset=0, limit=1000):*   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;用于获取用户个人歌单。  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;uid: 标识用户的数字id号。  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;offset: 不明。  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;limit: 所返回的歌单最大数量。  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;返回用户歌单信息，失败则返回`{}`。  
&ensp;&ensp;&ensp;*all_playlist(cat='全部歌单', types='all', offset=0, index=1):*    
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;用于获取所有最新歌单。  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;cat: 歌单标识。  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;types: 歌单类型。  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;offset: 控制歌单的返回数量。默认30一组。  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;index: 不明。   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;返回全部歌单信息，失败则返回`{}`。  
&ensp;&ensp;&ensp;*details_playlist(ids):*   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 用于获取某一歌单的详细内容。  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;ids: 歌单的id号。  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;返回歌单详细信息。  
&ensp;&ensp;&ensp;*search(s, offset=0, limit=100, stype=1):*   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;用于搜索内容。   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;s 所要搜索的关键字。   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;offset: 所返回的页数。  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;limit: 每页所返回的信息数量。   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;stype: 搜索的类型。1: 单曲。10: 专辑。100: 歌手。 1000: 歌单。 1002: 用户。    
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 返回搜索到的结果失败则返回`{'songCount': 0, 'songs':[]}`。   
&ensp;&ensp;&ensp;*singsUrl(ids:list):*    
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 用于获取歌曲的URL。   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; ids: 是一个包含要获取URL的歌曲的id信息的列表。   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 返回包含歌曲URL的JSON数据，失败则返回False。    
&ensp;&ensp;&ensp;*newsong:*    
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;已废弃。   
&ensp;&ensp;&ensp;*fnewsong:*    
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;已废弃。   
&ensp;&ensp;&ensp;*lyric(ids):*   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;获取歌曲的歌词。    
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;ids: 歌曲的id号。    
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;返回歌词内容，失败则返回False。   
*netease*   
&ensp;&ensp;&ensp;方便使用的接口实例。  

### xiamiApi
*class XiamiApi(HttpRequest):*   
&ensp;&ensp;&ensp;*playList(page=1):*   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;获取当前页全部歌单。   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;page: 当前的页数。   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;返回歌单信息，失败则返回Falase。   
&ensp;&ensp;&ensp;*getPlaylist(ids):*    
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;某一歌单的详细信息。   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;ids: 歌单id号。    
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;返回歌单信息，失败则返回Falase。  
&ensp;&ensp;&ensp;*search(keyword):*     
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 使用虾米搜索内容。   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;keyword: 要搜索的关键字。   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;返回搜索到的内容，否则返回False。    
&ensp;&ensp;&ensp;*lyric(url):*   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 返回该URL所关联的歌词信息。   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; url: 歌词URL。   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 返回歌词内容，失败则返回False。   
*xiami*
&ensp;&ensp;&ensp;方便使用的接口实例。  

### qqApi
*class QQApi(httpRequest):*   
&ensp;&ensp;&ensp; 除了没有lyric歌词信息，其他接口均与xiami一样。   

## features/

### asyncBase
*def aAsync(func, \*args, \*\*kwargs):*
&ensp;&ensp;&ensp;用于将任意函数包装成awaitable对象，看着像异步，实际内部还是由线程操作。   
```
    future = aAsync(requests.get, 'http://www.xxx.com', headers=headers)
    data = yield from future
```

*decorator toTask(func):*   
&ensp;&ensp;&ensp;将某一函数交由异步处理器调用。   
```
        @toTask
        def test(x):

            future = aAsync(requests.get, 'http://www.xxx.com', headers=headers)
            print(x)
            data = yield from future

            print(data)
```

### configMainFeatures
*class ConfigWindow(QObject):*    
&ensp;&ensp;&ensp; 用于注册Window类的逻辑事件。   
&ensp;&ensp;&ensp; history (list): 包含前进后退的列表索引。    
&ensp;&ensp;&ensp; currentIndex (int):  当前所显示的内容页。   
&ensp;&ensp;&ensp; isTab (bool): 如果为False则该操作会添加到历史中，否则将不会。   
&ensp;&ensp;&ensp;*addTab(widget, name=''):*   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 添加一个Tab到Window中。   
&ensp;&ensp;&ensp; *allTab:*     
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;返回已经添加过的所有Tab。    
&ensp;&ensp;&ensp; *addTabHistory(index):*   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 将此index添加到历史中。  
&ensp;&ensp;&ensp; *nextTab:*    
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 将当前页面切换到后一个，如果已经是最后一个则不做操作。   
&ensp;&ensp;&ensp; *prevTab:*      
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 将当前页面切换到前一个，如果已经是最新的一个则不做操作。   
&ensp;&ensp;&ensp; *setTabIndex(index):*    
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;  设置为index所指代的页面。   
&ensp;&ensp;&ensp; *bindConnect:*   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 所连接的信号槽。   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 当页面切换时会连接addTabHistory槽。   

*class ConfigHeader(QObject):*    
&ensp;&ensp;&ensp;注册Header类的逻辑事件。   
&ensp;&ensp;&ensp;*search:*   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 歌曲搜索。   
&ensp;&ensp;&ensp;其他的方法个人感觉比较明确，暂不详细介绍。   

*class ConfigNavigation(QObject):*    
&ensp;&ensp;&ensp; 注册Nvigation类的逻辑事件。   
&ensp;&ensp;&ensp; nativeListFunction: 我的音乐区域后鼠标点击时所连带触发的函数。    
&ensp;&ensp;&ensp; coverImgUrl: 所选的**歌单**的图片地址。   
&ensp;&ensp;&ensp; *setPlaylists(datas):*    
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;将datas中包含的歌单逐一添加到"收藏与创建的歌单"栏目下。类型为PlaylistButton。    
&ensp;&ensp;&ensp; *clearPlaylists:*    
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 清除已经存在的歌单。    
&ensp;&ensp;&ensp; *startRequest(ids, coverImgUrl):*    
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 由PlaylistButton触发的函数，用于获取歌单详细信息，并显示出来。   
&ensp;&ensp;&ensp;其他的方法个人感觉比较明确，暂不详细介绍。   

*class ConfigSearchArea(QObject):*     
&ensp;&ensp;&ensp; 注册SearchArea的逻辑事件。   
&ensp;&ensp;&ensp; transTime: 将数字转成时间的函数。      
&ensp;&ensp;&ensp;其他的方法个人感觉比较明确，暂不详细介绍。  
 
*class ConfigSystemTray(QObject):*    
&ensp;&ensp;&ensp; 注册SystemTray的逻辑事件。   

### ConfigNativeFeatures
*def getAllFolder(topFolder):*   
&ensp;&ensp;&ensp; 获取位于该文件夹目录下的所有目录路径。    

*class ConfigNative(QObject):*   
&ensp;&ensp;&ensp;注册Native的逻辑事件。

### ConfigNeteaseFeatures
*class ConfigNetEase(QObject)*    
&ensp;&ensp;&ensp; 注册Netease的逻辑事件。   
&ensp;&ensp;&ensp; myHeight: 已废弃。   
&ensp;&ensp;&ensp; picThreadPool, queue: 早期使用Qt的线程池的初步尝试，先已迁移到widgets/base.py中。    
&ensp;&ensp;&ensp; *threadSetSings:* 同上。    
&ensp;&ensp;&ensp; *getSings:*    
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;下拉或初始化时会进行一次getSings的请求，实际是获取的歌单。每次是30个。   
&ensp;&ensp;&ensp; *startRequest(ids, picName):*    
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 所添加的歌单点击时所触发的第一个函数，之后会调用requestsDetail请求。    
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; ids: 此歌单的id号。    
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; picName: 此歌单所展示的图片。   
&ensp;&ensp;&ensp; *requestsDetail(ids):*    
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 点击某歌单时所发起的请求。    
&ensp;&ensp;&ensp; *setRequestsDetail:*
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; requestsDetail完成后调用的函数，用于将内容设置到DetailArea中。
 
*class ConfigDetailSings(QObject):*    
&ensp;&ensp;&ensp;注册DetailSings(Area)的逻辑事件。   
&ensp;&ensp;&ensp;*setupDetailFrames(datas, singsUrls, singsIds):*   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 设置所展示的信息。  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; datas: 包含歌曲内容的列表。   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; singsUrls，singsIds: 与datas中歌曲所对应的播放地址和id号。   

### ConfigXiamiFeatures
*class ConfigXiami(ConfigNetEase):*   
&ensp;&ensp;&ensp; 注册Xiami界面的逻辑事件。     
&ensp;&ensp;&ensp; 基本与NetEase相同，只重写了getSings(获取歌单的方法)和requestsDetail(获取某一歌单的详细信息的方法)。

### ConfigQQFeatures
*class ConfigQQ(ConfigNetEase):*    
&ensp;&ensp;&ensp; 注册QQ界面的逻辑事件。     
&ensp;&ensp;&ensp; 基本与NetEase相同，只重写了getSings(获取歌单的方法)和requestsDetail(获取某一歌单的详细信息的方法)。  


## logger/
### logger
logName: 存放日志的路径。   
dictConfig: 日志配置信息。   
*def loggerConfig(logName=None):*   
&ensp;&ensp;&ensp;方便配置。   

## networks/
&ensp;&ensp;&ensp; 该目录下文件暂时无用。  

## QSS/
&ensp;&ensp;&ensp; 存放一些样式信息，类似CSS语法和功能。


## widgets/

### addition
*def itv2time(iItv):*   
&ensp;&ensp;&ensp; 用于将时间戳转成时间格式的函数，复制自网络。   

*class SearchLineEdit(QLineEdit):*    
&ensp;&ensp;&ensp;一个自定义搜索框。不该出现在这里，早期做的尝试，暂未做迁移。   

### base
&ensp;&ensp;&ensp; base中包含一些个人觉得不错的方法。    

cacheFolder: 图片的缓存目录，默认是当前目录下的cache文件夹。

*decorator checkFolder(filename:iter):*   
&ensp;&ensp;&ensp;用于检测该目录是否存在，不存在的情况会创建一个。
```
    @checkFolder(['/test/test'])
    def saveCookies(self):
        with open('test.cks', 'wb') as f:
            pickle.dump(infomations, f)
```

*decorator checkOneFolder(folderName:str):*    
&ensp;&ensp;&ensp; 上面那个的翻版，只检测某一个目录。   
 
*def makeMd5(raw):*   
&ensp;&ensp;&ensp; 返回字符串的md5值。   
&ensp;&ensp;&ensp; raw: 接受任意字符串。   

*decorator centerHTML(func):*    
&ensp;&ensp;&ensp; 已废弃。

*class QueueQbject(QObject):*   
&ensp;&ensp;&ensp; 一个带信号槽组件的安全线程池队列。   
&ensp;&ensp;&ensp; 除了常规queue的方法，在添加内容时还会发出add信号。   

*class ScrollArea(QScrollArea):*   
&ensp;&ensp;&ensp; 设置了一些通用设置的滚动类。滚到底部时会发出scrollDown信号。   
&ensp;&ensp;&ensp; *noInternet:*    
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;没有网络时的提示，暂时没用。   
&ensp;&ensp;&ensp; *maximumValue:*   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;返回垂直滚动条的最大值。   

*class TableWidget(QTableWidget):*    
&ensp;&ensp;&ensp; 设置了一些通用设置的表格类。    
&ensp;&ensp;&ensp; *setColumnWidths(widths:dict):*   
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 方便一次性设置各个表头区域长度的方法。  

*class VBoxLayout(QVBoxLayout):*   
&ensp;&ensp;&ensp; 去除了外边框和空白的垂直布局类。


*class HBoxLayout(QHBoxLayout):*    
&ensp;&ensp;&ensp; 去除了外边框和空白的水平布局类。


*class HStretchBox(HBoxLayout):*     
&ensp;&ensp;&ensp; 默认居中，可自由伸展的水平布局类。    
```
# ----!!!----
```  
&ensp;&ensp;&ensp; parentLayout: 父布局，因为此类布局一般用在嵌套在另一个布局里。    
&ensp;&ensp;&ensp; \*widget: !!!区域所存放的东西。    

*class VStretchBox(VBoxLayout):*     
&ensp;&ensp;&ensp; 默认居中，可自由伸展的垂直布局类。    
```
#  |
#  !
#  |
```

*class RequestThread(QThread):*
&ensp;&ensp;&ensp; 早期使用线程时的线程类。   
&ensp;&ensp;&ensp; *setTarget(targe=None):*    
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 线程中要执行的函数。执行完的结果会保存在self.result中。   
&ensp;&ensp;&ensp;  *setArgs(\*args, \*\*kwargs):*
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 函数运行时所需要的参数。    

*class Timer(QThread):*      
&ensp;&ensp;&ensp; 早期配合Netease中的线程池所使用的类，现已废弃。   

*class PicLabel(QLabel):*
&ensp;&ensp;&ensp; Qt版`<img src=1.jpg>`。   
&ensp;&ensp;&ensp; src: 图片路径。   
&ensp;&ensp;&ensp; width: 图片长度。   
&ensp;&ensp;&ensp; height: 图片高度。     
&ensp;&ensp;&ensp; pixMask: 图片遮罩，使用遮罩后图片会被切割成遮罩的样式，比如一个方图片只要找一个圆形即可切成圆的，详情见歌曲图片和登陆后的个人头像。   

*class GetPicture(QRunnable):*   
&ensp;&ensp;&ensp;与图片请求相关的线程池类。    


### singsFrameBase

*class OneSing(QFrame):*    
&ensp;&ensp;&ensp; 包含自己位置信息和歌单信息的歌单frame显示组件。   
&ensp;&ensp;&ensp; 点击后会发出相应的clicked信号。    

*class PlaylistButton(QPushButton):*    
&ensp;&ensp;&ensp; 包含自己位置信息和歌单信息的歌单button显示组件。   
&ensp;&ensp;&ensp; 点击后会发出相应的hasClicked信号。


### player
&ensp;&ensp;&ensp; player模块写的比较乱，界面和功能糅杂在一起。    
&ensp;&ensp;&ensp; 如果只需要调用它播放音乐，调用PlayWidgets中的setPlayerAndPlayList（data={'name': 'test', 'time': '03:10', 'url': 'http://www.xyz.com/test.mp3', 'author': 'None', 'music_img': 'None'}）方法即可。   
&ensp;&ensp;&ensp; 歌词在CurrentMusic类中。其他的暂不做介绍。   
```
结构:
PlayWidgets
      PlayList
      CurrentMusic
           CurrentMusicShort
           CurrentMusicDetail
                 Lyric
    Player
```

## music.py
&ensp;&ensp;&ensp; 整个页面的入口。    
```
结构:
Window
  Header
     login
  Navigation
     navigationList
     nativeList
     otherList
  MainContent
     netease playlists
     xiami playlists
     qq playlists
  SearchArea
     netease search
     xiami search
     qq search
  DetailPlaylist
     show a playlist
  PlayWidget
     Play control
     current play list
     music informaiton frame
     Player
```
*class Window(QWidget):*     
&ensp;&ensp;&ensp; *configFeatures:*     
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 用于将各个界面注册上逻辑事件。   
&ensp;&ensp;&ensp; *resizeEvent(event):*     
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 重绘大小时所触发的事件，因为playWidgets中的currentMusic不在布局中，所以需要额外进行些位置调整。   
&ensp;&ensp;&ensp;其他的类是用VBoxLayout和HBoxlayout组合起来的界面，就像搭积木一样~，应该无须太多介绍~。

# 最后
感谢你看到这里~，Enjoy(debug) it!