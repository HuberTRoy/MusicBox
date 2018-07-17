# 抓取数据包

假设已经完成了之前的一系列操作，我们在浏览器中键入
```
http://music.163.com/
```

在Fiddler中我们大约会看到
```  
31  200 HTTP    iad.g.163.com   /wa/ad?site=netease&affiliate=music&cat=homepage&type=column689x75&location=1&uuid=5e8a94d2de254f2995c46f69848e1d2b 1,339       text/html;charset=UTF-8 taskmur:45888           
37  200 HTTPS   iad.g.163.com   /wa/s?uuid=8141a5c5-072d-456b-bb57-0ab1d37547b2&flight_id=100003&ad_id=mat_10867    0       application/json;charset=utf-8  taskmur:45888           
23  206 HTTP    m10.music.126.net   /20180315231050/ddb390512bfc0f65de94b592018a07de/ymusic/42ac/7499/7ea9/cd274473f26b61b599c81439b7109fca.mp3 2,393,278       audio/mpeg  taskmur:45888           
1   200 HTTP    music.163.com   /weapi/feedback/weblog?csrf_token=76f11055659b28d8d20f179e2f6dc04b  12  no-store; Expires: Thu, 01 Jan 1970 00:00:00 GMT    text/plain;charset=UTF-8    taskmur:45888           
2   200 HTTP    music.163.com   /   25,284  no-store; Expires: Thu, 01 Jan 1970 00:00:00 GMT    text/html;charset=utf8  taskmur:45888           
...   

```
类似这样的数据包，
我们选择其中一个就可以查看具体的请求与返回。

## 发现音乐
当我们点击了`发现音乐`的`歌单`后我们会发现一个指向`http://music.163.com/discover/playlist/`的数据包，我们点开后会发现响应的数据包是`HTML`，依照浏览器中的信息，我们按关键字搜索了一下，确实是包含我们所需要的内容。

我们再尝试翻页`http://music.163.com/discover/playlist/?order=hot&cat=%E5%85%A8%E9%83%A8&limit=35&offset=35`，从浏览器里的信息与名称我们可以猜一下，order即按照`热门`排序，`cat`解码后我们也可以看出是分类，`limit`则是每次请求返回的歌单数量，`offset`则作为翻页依据，第一页的offset是0，则是0-35的歌单，offset为35时则为35-70个歌单依次类推。

## 详细歌单
我们已经获取了全部歌单，点击其中一个试试看。假设你与我点的是同一个~，我们会抓到
`http://music.163.com/#/playlist?id=2128858806`这样一个`URL`，id猜一下可以知道应该是该歌单所属的id号。它仍然是一个`HTML`，如法炮制可以知道确实包含我们想要的信息，没有额外的加密。

## 听歌！听歌！
继续抓取，我们点击其中一首可以得到`http://music.163.com/weapi/song/enhance/player/url?csrf_token=85e197415974d08cf30e7c6909a2fb4d`
我们右键将此数据包`Unlock For Editing`后将`csrf_token`删除后`Replay`发现返回数据一致，可以确定不需要携带。

我们发现，这个数据包是一个POST请求：
```
params=LQXC5jiXlpMNlhb8173Ta8RHATigZ6sXgAP8sEEhcultGCGkg0C88voQYn5isj4KYmXdz%2FLzusX8c8Aiz2j4vFp9OejmR3%2F%2Bv2mZeRfbRQW3pD4akdGtrPbBpiQCLdktjexqrN5v1X8Ayz2pjxMnVw%3D%3D&encSecKey=75d19aa4c4a1965782478e93f6a4f8ba98f1e9dec2b3b327287d61722d674f43a929d048b2e4a38f9941f6655ce46cfec50e9b4f538328b883f548cf62fedf61415c1e19264985bfb63c0f1392f3165601852875ac62a18456b7b39d1cf7aa91fff78f581419c1e8ad1814bff7a9d82c469913bbbcfc9733d0245b609c6a4686
```
这是携带的信息，但是这是怎么发送的呢？

## 总结
基本的抓取模式我们已经熟悉啦，
* 配置代理
* 在浏览器中发起请求（一般是点击）
* Fiddler自动抓取，我们进行抽取查看。

这样其他的大部分请求我们都已经可以破解分析，进行自定义发送啦。