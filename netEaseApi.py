"""获取网易云音乐的API。"""


__author__ = 'cyrbuzz'

import urllib.parse
import requests
import hashlib
import json


def shotlist(lst):
    """列表去重。"""
    temp1 = sorted(list(set(lst)))
    return temp1


class NetEaseWebApi:
    """通过抓取客户端的包得到的API，相对较旧，新版客户端使用POST发包并有所加密，不知道加密形式无法进行请求。
       2015年时候的API。函数名居然aBbbC形式与a_bbb_c形式同时写在一个类里。

    """
    default_timeout = 10
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'Accept-Encoding': 'gzip,deflate,sdch',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        # 'Proxy-Connection': 'keep-alive',
        # 'Content-Type': 'application/x-www-form-urlencoded',
        'Host': 'music.163.com',
        'Upgrade-Insecure-Requests': 1,
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36'
    }

    def __init__(self):
        self.cookies = {
            'appver': '2.0.3.131777',
            'os': 'pc',
            # 'osver': 'Microsoft-Windows-7-Ultimate-Edition-Service-Pack-1-build-7601-64bit',
            # 'playliststatus': 'visible',
            # 'TOKEN': 'XvuPIYQz5UjczoK9',
            # '': '',
        }

    def httpRequest(self, action, method="GET", add=None, data=None, headers=headers, cookies='',\
                    timeout=default_timeout, urlencode='utf-8'):
        """
            默认以get方式请求，
            GET方式附加内容用add参数，POST方式提交内容用data参数。
            编码用urlencode参数，默认utf-8。
            GET方式返回json形式请求的内容。
            POST方式返回cookies和json形式的内容。(0,1)
            默认cookies为空。
        """
        if method.upper() == 'GET':
            if add:
                html = requests.get(action, params=add, headers=headers, cookies=cookies, timeout=timeout)
            else:
                html = requests.get(action, headers=headers, cookies=cookies, timeout=timeout)
            html.encoding = urlencode
            return json.loads(html.text)
        elif method.upper() == 'POST':
            if data:
                html = requests.post(action, data=data, headers=headers, cookies=cookies, timeout=timeout)
            else:
                html = requests.post(action, headers=headers, cookies=cookies, timeout=timeout)
            html.encoding = urlencode
            return html.cookies, json.loads(html.text)

    def user_playlist(self, uid, offset=0):
        """
            个人歌单。
        """
        url = 'http://music.163.com/api/user/playlist/?offset=%s&limit=1000&uid=%s' % (offset, uid)
        html = self.httpRequest(url, method='GET', cookies=self.cookies)
        return html['playlist']

    def all_playlist(self, cat='全部歌单', types='all', offset=0, index=1):
        """
            全部歌单。列表字典形式。
        """
        url = 'http://music.163.com/api/playlist/list?cat=%s&type=%s&order=%s&offset=%d&total=true&limit=30&index=%d)'\
            % (urllib.parse.quote(cat), types, types, offset, index)
        html = self.httpRequest(url, method='GET', cookies=self.cookies)
        return html['playlists']

    def details_playlist(self, id):
        """
            歌单详情。
        """
        url = 'http://music.163.com/api/playlist/detail?id=%d' % (id)
        html = self.httpRequest(url, method="GET", cookies=self.cookies)
        return html['result']

    def search(self, s, offset=0, limit=100, total='true', stype=1):
        """
            搜索.
            type类型: 单曲(1), 专辑(10), 歌手(100), 歌单(1000), 用户(1002)
        """
        url = 'http://music.163.com/api/search/get/web'
        data = {
            's': s,
            'offset': offset,
            'total': total,
            'limit': limit,
            'type': stype
        }
        html = self.httpRequest(url, method='POST', data=data, cookies=self.cookies)
        try:
            return html
        except:
            return "Not Found!"

    def details_search(self, id):
        """
            搜索结果详情，返回歌曲URL。
        """
        id = str(id)
        url = "http://music.163.com//api/song/detail/?id=%s&ids=%s" % (id, urllib.parse.quote('[%s]' % (id)))
        html = self.httpRequest(url, method='GET', cookies=self.cookies)
        return html['songs'][0]['mp3Url']

    def newsong(self, areaID=0, offset=0, total='true', limit=100):
        """
            最新音乐--新歌速递。
            areaID(0全部, 9华语, 96欧美, 16韩国, 8日本。)
        """
        url = 'http://music.163.com/api/discovery/new/songs?areaId=%d&offset=%d&total=%s&limit=%d' %\
              (areaID, offset, total, limit)
        html = self.httpRequest(url, method='GET', cookies=self.cookies)
        return html['data']

    def fnewsong(self, year=2015, month=4, area='ALL'):
        """
            最新音乐--新碟上架。
            area(ALL全部, ZH华语, EA欧美, KR韩国, 日本JP)
        """
        url = 'http://music.163.com/api/discovery/new/albums/area?year=%d&month=%d&area=%s&type=hot&offset=0&total=true&limit=20&rcmd=true' \
              % (year, month, area)
        html = self.httpRequest(url, method="GET", cookies=self.cookies)
        return html['monthData']

if __name__ == '__main__':
    main = NetEaseWebApi()
    req = main.details_playlist(566527372)
    # print(req)
    # req = main.all_playlist(offset=30)
    # print(req[0])
    # for i in req:
        # print(i)
        # print(req[i])
    print(req['creator'])
"""
updateTime 1482383777862
commentThreadId A_PL_0_530599175
highQuality False
adType 0
artists None
privacy 0
shareCount 14
trackNumberUpdateTime 1482383777862
specialType 0
status 0
newImported False
tags ['华语', '流行']
totalDuration 0
trackUpdateTime 1484832643067
subscribed False
playCount 81949
subscribers []
createTime 1481165801114
coverImgUrl http://p4.music.126.net/b40_sLSv9rXZ4IWp-2ZSxQ==/109951162819443484.jpg
trackCount 58
cloudTrackCount 0
creator {'backgroundImgId': 109951162854004311, 'userType': 0, 'avatarUrl': 'http://p4.music.126.net/FJKay1DfQqI1izwZsZvHnA==/18693896697138453.jpg', 'detailDescription': '', 'avatarImgIdStr': '18693896697138453', 'backgroundUrl': 'http://p1.music.126.net/PK0DZ53ML8brdsc5dLstjg==/109951162854004311.jpg', 'defaultAvatar': False, 'djStatus': 10, 'backgroundImgIdStr': '109951162854004311', 'expertTags': ['韩语', '电子', '流行'], 'vipType': 11, 'city': 1006100, 'authStatus': 0, 'authority': 0, 'gender': 2, 'followed': False, 'description': '', 'province': 1000000, 'remarkName': None, 'birthday': 859392000000, 'userId': 75287303, 'nickname': 'LalisaManoban', 'signature': '🔥BLACKPINK、女团博爱；爱K-Pop、爱电子；颜控、舞控、旋律控、编曲控；韩国电子日常搬运', 'avatarImgId': 18693896697138453, 'mutual': False, 'accountStatus': 0}
description 纵观内地女团，尤其在这两年相当的高产，各个娱乐公司纷纷在包装后推出训练已久的新女团，其中有一些质量还是很不错的

在路线上也是非常的多，有走日本女团路线的比如SNH48、ATF，有走韩国女团路线的比如Ume band、ACEMAX-RED，还有走中国古风路线的比如七朵组合、萌萌哒天团。风格上也是千姿百态，有性感火辣的、有清新可爱的、有嘻哈狂野的

值得一提的几个比较“特别”的女团

ACEMAX-RED：韩国S.M.Entertainment和YG Entertainment联合打造的国内新生女团（YG Entertainment作曲、S.M.Entertainment编舞）

UV Girls：中国第一支在韩国出道的女子组合，也是中国第一支“GIRLS HIP-HOP”风格的女子组合

Angel Girl：在日本出道的新晋人气女子偶像团体组合（中国女团也是可以出口日韩的）

TXG：首个以电子竞技为主的女子娱乐偶像组合

Lunar：最初由一群在动漫主题咖啡馆打工的女生自发组成的演出团队

网易CC游戏天使团：网易CC2015年打造的互联网第一游戏美女主播团体

葫芦姐妹：百度贴吧第一大女生组织，目前妹子团合计有两万名妹子加入

另外有两个特殊种类

中国模特女团：Lady First、UP Girls、AIO

中国古风女团：七朵组合、萌萌哒天团、i2star、花仙子、DREAMIX

还是要给大家区分一下女团和乐队。乐队一般指包含演奏者在内的组合，有部分演奏者也会参加演唱，但也都归结在乐队里，比如一些摇滚乐队、演奏乐队和独立乐队。而女团指只包含演唱者在内的纯演唱团体

歌单不包含乐队、不包含中韩混搭女团、不包含香港女团比如Twins、不包含台湾女团比如S.H.E、不包含新加坡女团比如By2。著名女团Sunshine由于颜值唱功均大幅度超标，严重影响整体平衡性故不做收录

封面：ACEMAX-RED
userId 75287303
coverImgId_str 109951162819443484
id 530599175
commentCount 85
tracks None
coverImgId 109951162819443484
subscribedCount 807
name 中国内地女团，破茧而出的少女们
"""
"""
newImported
trackUpdateTime
id
privacy
createTime
creator
subscribed
status
commentThreadId
description
cloudTrackCount
updateTime
adType
totalDuration
commentCount
trackNumberUpdateTime
coverImgUrl
name
trackCount
tracks
ordered
playCount
highQuality
specialType
subscribers
coverImgId
shareCount
userId
subscribedCount
tags
coverImgId_str
artists.
"""

# {'artists': 
# [{'name': 'NI+CORA', 'musicSize': 0, 'picUrl': 'http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg', 'id': 12234092, 'alias': [],
#  'img1v1Id': 0, 'img1v1Url': 'http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg', 'trans': '', 'briefDesc': '', 'picId': 0, 'albumSize': 0}], 

# 'lMusic': {'name': None, 'size': 2066435, 'playTime': 172133, 'sr': 44100, 'volumeDelta': -4.6, 'bitrate': 96000, 'dfsId': 1369991500638044, 'extension': 'mp3', 'id': 1216601012},

# 'score': 60, 'rtype': 0, 'copyrightId': 0, 'position': 6, 'ringtone': None, 'starredNum': 0, 'crbt': None, 

# 'hMusic': {'name': None, 'size': 6888011, 'playTime': 172133, 'sr': 44100, 'volumeDelta': -4.96, 'bitrate': 320000, 'dfsId': 1369991500638042, 'extension': 'mp3', 'id': 1216601010},

# 'id': 419250193, 'mp3Url': 'http://m2.music.126.net/PKRAYyuS_teBrmDoLqycHA==/1369991500638044.mp3', 'dayPlays': 0, 'no': 6, 'hearTime': 0, 'disc': '2', 'playedNum': 0, 'rurl': None, 'ftype': 0, 'rtUrls': [],
# 'copyFrom': '', 'mvid': 0, 'starred': False, 'popularity': 60.0, 'name': "You Can't Win", 'commentThreadId': 'R_SO_4_419250193', 'alias': [], 
# 'mMusic': {'name': None, 'size': 3444028, 'playTime': 172133, 'sr': 44100, 'volumeDelta': -4.54, 'bitrate': 160000, 'dfsId': 1369991500638043, 'extension': 'mp3', 'id': 1216601011},

# 'duration': 172133, 'status': 0, 'audition': None,
# 'album': {'size': 53, 'pic': 1390882221525715, 'picUrl': 'http://p4.music.126.net/UkMrfLH0BVs7IDze8Xkv5w==/1390882221525715.jpg', 'blurPicUrl': 'http://p3.music.126.net/UkMrfLH0BVs7IDze8Xkv5w==/1390882221525715.jpg', 'commentThreadId': 'R_AL_3_34754051', 'copyrightId': 0, 'companyId': 0, 'type': '专辑', 'description': '', 'id': 34754051, 'name': 'Are You Ready 7th-TYPES??', 'company': 'Victor Entertainment',
# 'artist': {'name': '', 'musicSize': 0, 'picUrl': 'http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg', 'id': 0, 'alias': [], 'img1v1Id': 0, 'img1v1Url': 'http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg', 'trans': '', 'briefDesc': '', 'picId': 0, 'albumSize': 0},
# 'artists': [{'name': 'Tokyo 7th シスターズ', 'musicSize': 0, 'picUrl': 'http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg', 'id': 1181405, 'alias': [], 'img1v1Id': 0, 'img1v1Url': 'http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg', 'trans': '', 'briefDesc': '', 'picId': 0, 'albumSize': 0}], 'picId': 1390882221525715, 'status': 0, 'publishTime': 1467129600007, 'briefDesc': '', 'songs': [], 'tags': '', 'alias': []}, 'rtUrl': None, 'bMusic': {'name': None, 'size': 2066435, 'playTime': 172133, 'sr': 44100, 'volumeDelta': -4.6, 'bitrate': 96000, 'dfsId': 1369991500638044, 'extension': 'mp3', 'id': 1216601012}, 'fee': 0}
# {'userType': 0, 'followed': False, 'authority': 0, 'mutual': False, 'detailDescription': '', 'city': 420600, 'gender': 2, 'userId': 272038143, 'defaultAvatar': False, 'djStatus': 10, 'backgroundImgId': 18759867394891789, 'backgroundUrl': 'http://p1.music.126.net/X8zMvBDh0WP0SPp1l_79kQ==/18759867394891789.jpg', 'signature': '『从一到一百很容易，但难得的是从零到一』过气萌旧，累了。', 'authStatus': 0, 'vipType': 0, 'avatarImgIdStr': '18578447976302361', 'avatarImgId_str': '18578447976302361', 'birthday': 938877230755, 'remarkName': None, 'accountStatus': 0, 'description': '', 'backgroundImgIdStr': '18759867394891789', 'province': 420000, 'nickname': 'wow-麻美', 'avatarImgId': 18578447976302361, 'expertTags': ['日语', 'ACG', '流行'], 'avatarUrl': 'http://p1.music.126.net/lIh_qz8w7_F-TSbKUwElEQ==/18578447976302361.jpg'}