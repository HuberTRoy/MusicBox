# 分析抓取到的数据包

## 发现音乐
我们在之前已经获取到了地址，也已经得知它返回的是HTML文件，所以我们无需做其他操作，只需要重新发送这个地址即可得到我们想要的信息，由于是HTML所以我们之后还需要进行其他抽取工作不过不在目前讨论之内。

* 所有歌单URL: `http://music.163.com/discover/playlist/?order=hot&cat=%E5%85%A8%E9%83%A8&limit=35&offset=35`
* 参数说明：
* - order: 排序方式
* - cat: 歌单分类
* - limit: 每次返回的个数
* - offset: 从第几个歌单开始获取

## 详细歌单
这个就非常简单了，只有一个`id`参数，这个`id`我们在之前的所有歌单中已经包含了。我们提取的时候可以直接获取。

* 某个歌单: `http://music.163.com/#/playlist?id=2128858806`
* 参数说明:
* - id: 歌单id。 由上一步的全部歌单获取。

## 单个音乐
上次我们只抓到了这个URL以及它所携带的信息，但其中所包含的信息我们并不了解，只知道其中的`csrf_token`可以不传入。

这时我们就需要分析其中的JavaScript文件了，因为是浏览器发起的，不是表单就是Js文件了，这两个都是我们唾手可得的东西，但也正因为如此，为了请求体积与安全性考虑，Js文件都是压缩与混淆加密后的代码，不是给人看的。也没办法，只能去了解其中的步骤才能抓到我们想要的信息，索性前辈们留下大量调试工具，可以让我们事半功倍。

这里我用Firefox进行调试，在其`查看元素`页面（如果是低版本Firefox建议安装FireBug）找到`调试器`，按下`shift+ctrl+f`打开全文件搜索尝试键入`params`搜索一下，很快在`core.js`中匹配到了23个信息。我们将这个js完全复制出来美化一下，不美化根本不能看。美化后复制到本地文件中方便查看，在14509行（可能会因美化不同而不同，只要搜索params就好了）我们发现如下代码:
```
            e7d.data = k7d.cC8u({
                params: bBU3x.encText,
                encSecKey: bBU3x.encSecKey
            })
```
`params`与`encSecKey`正是发送请求时携带的参数。继续查找`bBU3x`，发现如下代码：
```
var bBU3x = window.asrsea(JSON.stringify(j7c), bsL0x(['流泪',
                '强'
            ]), bsL0x(TY1x.md), bsL0x(['爱心',
                '女孩',
                '惊恐',
                '大笑'
            ]));
```

稍加搜索，我们知道了默认是没有`asrsea`     这个函数的，所以肯定是一个自己写的，我们记下准备搜索它在哪。      
在此之前我们在中间加一句打印：
```
            window.console.log(j7c);
            window.console.log(TY1x.md);
            var bBU3x = window.asrsea(JSON.stringify(j7c), bsL0x(['流泪',
                '强'
            ]), bsL0x(TY1x.md), bsL0x(['爱心',
                '女孩',
                '惊恐',
                '大笑'
            ]));
            window.console.log(bBU3x);
            e7d.data = k7d.cC8u({
                params: bBU3x.encText,
                encSecKey: bBU3x.encSecKey
            })
```

搜了一下，`asrsea`同样在`core.js`中:
```
window.asrsea = d,
```
`d`呢往上看：
```
    function d(d, e, f, g) {
        var h = {},
            i = a(16);
        return h.encText = b(d, g),
            h.encText = b(h.encText, i),
            h.encSecKey = c(i, e, f),
            h
    }
```
这段代码就是说返回一个`Object`对象，其`encText`键是经过两次`b`函数处理过后的数据，`encSecKey`则是经过`c`函数处理。

`b`函数我们滚上去看一下：
```
    function b(a, b) {
        var c = CryptoJS.enc.Utf8.parse(b),
            d = CryptoJS.enc.Utf8.parse('0102030405060708'),
            e = CryptoJS.enc.Utf8.parse(a),
            f = CryptoJS.AES.encrypt(e, c, {
                iv: d,
                mode: CryptoJS.mode.CBC
            });
        return f.toString()
    }
```
使用`CBC`模式的[AES](https://baike.baidu.com/item/aes/5903?fr=aladdin)进行加密，变量`d`和`e`都是加密key，`d`是`0102030405060708`转换而来，我们记下这个key，`a`由之前的`d`函数中产生的`i`变量和在之前传入的`g`参数传入，`i`是由`a`函数产生，我们看下`a`函数：
```
    function a(a) {
        var d,
            e,
            b = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
            c = '';
        for (d = 0; a > d; d += 1) e = Math.random() * b.length,
            e = Math.floor(e),
            c += b.charAt(e);
        return c
    }
```

看样子是随机的，随机的我们可以假设是任意传入就行，我们记下这里，测试时传入一个任意16位字符串测试即可，如果不行我们再看这段。
`g`是
```
bsL0x(['爱心',
                '女孩',
                '惊恐',
                '大笑'
            ])
```
`bsL0x`:
```
   var bsL0x = function (czZ5e) {
        var o7h = [];
        k7d.bd7W(czZ5e, function (czX5c) {
            o7h.push(TY1x.emj[czX5c])
        });
        return o7h.join('')
    };
```
`TY1x.emj`是是一个存放key-vaule键值对的`Object`这个就是以传入的参数为key，获取出对应的内容。我们将`爱心女孩惊恐大笑`搞出来发现是`0CoJUm6Qyw8W8jud`我们记下来。

整理下，到这里我们知道
* `params` 是 `encText`，
* - `encText`由`AES`加密两次而成。
* - - `AES`加密时所用key一个是`0102030405060708`
* - - 另一个可能可以是任意16位字符串或者由`a`函数生成。
* - - 加密时用的模式是`CBC`。
* - 第一次加密时的key用的`g`，要加密的内容是原始JSON，第二次用的key是`i`，要加密的密文是第一次加密的结果。
* `g`这个参数就是`0CoJUm6Qyw8W8jud`。

好啦，继续看`c`函数：
```
    function c(a, b, c) {
        var d,
            e;
        return setMaxDigits(131),
            d = new RSAKeyPair(b, '', c),
            e = encryptedString(d, a)
    }
```
什么？`c`函数是干什么的，`c`是另一个参数`encSeckey`所依赖的函数啦。
`h.encSecKey = c(i, e, f)`
传入的是`i`, `e`, `f`参数。`i`我们知道是一个16位字符串。`e`我们发现与`g`的加密方式一样，它的是`流泪强`，对应`010001`，`f`应该是所有的合起来，直接在控制台用它的代码跑一下得到：
```
00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7
```

我们看下`encryptedString`:
```
function encryptedString(a, b) {
    for (var f, g, h, i, j, k, l, c = new Array, d = b.length, e = 0; d > e;) c[e] = b.charCodeAt(e),
        e++;
    for (; 0 != c.length % a.chunkSize;) c[e++] = 0;
    for (f = c.length, g = '', e = 0; f > e; e += a.chunkSize) {
        for (j = new BigInt, h = 0, i = e; i < e + a.chunkSize; ++h) j.digits[h] = c[i++],
            j.digits[h] += c[i++] << 8;
        k = a.barrett.powMod(j, a.e),
            l = 16 == a.radix ? biToHex(k) : biToString(k, a.radix),
            g += l + ' '
    }
    return g.substring(0, g.length - 1)
}
```

这个就没有其他函数的索引了，我们到时候直接一一对换，比如`Array`在Python中对应`list`，其他的`length`，`charCodeAt`之类的我们在其中`console.log`一下看看对应数据然后对应一下就好。

或者...我们得知其参数`e`与`f`都是固定值，且其中加密时不带随机元素。唯一不可控的是`i`，但我们同时又得知`i`可能也可是是固定的，如果我们证明了`i`固定那么我们可以不需要计算这个值，只需要抓取其中一次的值就好，因为没有随机元素所以固定的参数出来的结果都是一样的。

到这里这个`params`和`encSeckey`都分析完了。
* `params`由两次AES加密完成。
* `encSeckey`由一次自写的加密函数完成，但其值很可能是固定的。
* 关键是`i`参数。

### 配置Fiddler，替换掉core.js
在`Fiddler`的`AutoResponder`中添加一个规则
```
REGEX:http://s3.music.126.net/web/s/core.js
```
之后的文件选我们修改好的文件。

然后刷新下页面。

网易云应该会每隔一段时间搜集一下听歌习惯用于搜集个人推荐算法的必须数据，所以我们不必做操作即可在控制台看到输出内容。

哦对，我们还要验证我们的猜想：
```
    function d(d, e, f, g) {
        var h = {},
            i = a(16);
        window.console.log(i)
        i = '1234567891234567'
        return h.encText = b(d, g),
            h.encText = b(h.encText, i),
            h.encSecKey = c(i, e, f),
            h
    }
```
我们将i固定为`1234567891234567`。然后随机听一首歌，发现是可以成功获取到的，所以我们的猜想正确，不用看替换那一大长段代码，直接把`i`固定然后复制这个`encSeckey`即可。

至此，除了登录部分网易云用了其成熟的安全产品易盾没法破解外，90%的都已经可以被我们分析出来。