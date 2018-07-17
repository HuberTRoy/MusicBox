# 下载抓包工具
抓包工具有很多，这里选择[Fiddler](https://www.telerik.com/fiddler)作为主要使用的工具，当然你如果喜欢[Wireshark](https://www.wireshark.org/)或者[Burp Suite](https://portswigger.net/burp/)都是可以的。下面以配置Fiddler为例。

## 下载所需浏览器
这里使用[Firefox](http://www.firefox.com.cn/)作为主要分析使用的浏览器，其他的也是可以的。

## 配置Fiddler与Firefox
假设你已经完全获取了上列两个工具：
网易云音乐基本上所使用的都是HTTP协议，如果你不需要抓取/使用它HTTPS部分（登录部分）可以略过此配置。

### 配置Fiddler来抓取HTTPS
* 依次打开`Tools`->`Fiddler Options`->`HTTPS`。
* 勾选`Decrypt HTTPS traffic`。
* 选择`Actions`中的`Export Root Certificate to Desktop`将证书导出。

### 在Firefox中导入认证证书
* 在其`证书管理器`的`证书机构`中导入刚才导出的证书，并将各个选项都勾选。

## 配置Firefox代理
开始正式抓包前，我们还需要为Firefox设置代理才能让Fiddler抓取到数据包。
* 我们首先需要在Fiddler的`Tools`->`Fiddler Options`->`connections`中查看所监听的端口，默认是`8888`。
* 之后在Firefox中将代理设置为`127.0.0.1`，端口`8888`。
* 打开任意网页，如果Fiddler中出现数据包，则证明我们配置成功。

## 其他注意事项
我们所需要的数据包不需要图片传输，所以可以在Fiddler的`×`图标处点击一下`images`这样就不会再有图片出现了。












