"""获取网易云音乐的API。"""
"""暂时没有整改的想法: 一方面旧的API可以用，另一方面逻辑较为简单，当前优先级不高。"""

__author__ = 'cyrbuzz'

import json
import urllib.parse

from apiRequestsBase import HttpRequest
from netEaseEncode import encrypted_request, hashlib


class NetEaseWebApi(HttpRequest):
    """
        2015年写的，函数名略混乱，不影响使用，暂时不修改。
    """
    cookies = {
            'appver': '2.0.3.131777',
            'os': 'pc',
        }
    
    default_timeout = 10
    

    def __init__(self):
        super(NetEaseWebApi, self).__init__()
        self.headers['Host'] = 'music.163.com'
        self.headers['Referer'] = 'http://music.163.com'
        self.headers['Content-Type'] = 'application/x-www-form-urlencoded'

    def httpRequest(self, *args, **kwargs):
        data = kwargs.get('data')
        if data:
            kwargs['data'] = encrypted_request(data)

        html = super(NetEaseWebApi, self).httpRequest(*args, **kwargs)

        try:
            return json.loads(html.text)
        except:
            return {'code':0}

    def login(self, username, password):
        """默认记住登陆。"""
        """
            phone 用的/weapi/login/cellphone?csrf_token=
            email 用的/weapi/login?csrf_token=

            还有验证码相关暂时不做。
        """
        password = password.encode()
        md5 = hashlib.md5()
        md5.update(password)
        password = md5.hexdigest()

        data = {'password': password, 'rememberLogin': 'true'}

        # email = data.update({'username': username}) if '@' in username else data.update({'phone': username})
        email = True if '@' in username else False
        if email:
            data['username'] = username
        else:
            data['phone'] = username

        urlEmail = 'http://music.163.com/weapi/login?csrf_token='
        urlPhone = 'http://music.163.com/weapi/login/cellphone?csrf_token='
        url = urlEmail if email else urlPhone

        html = self.httpRequest(url, method='POST', data=data)

        return html

    def user_playlist(self, uid, offset=0, limit=1000):
        """
            2017/8/12更新 新API.
            个人歌单。
            
        """
        # url = 'http://music.163.com/api/user/playlist/?offset=%s&limit=1000&uid=%s' % (offset, uid)
        # html = self.httpRequest(url, method='GET', cookies=self.cookies)
        # return html['playlist']
        data = {'offset': offset, 'uid': uid, 'limit': limit, 'csrf_token': ''}
        url = 'http://music.163.com/weapi/user/playlist'

        html = self.httpRequest(url, method='POST', data=data)

        try:
            return html['playlist']
        except:
            return {}

    def all_playlist(self, cat='全部歌单', types='all', offset=0, index=1):
        """
            全部歌单。列表字典形式。
        """
        url = 'http://music.163.com/api/playlist/list?cat=%s&type=%s&order=%s&offset=%d&total=true&limit=30&index=%d'\
            % (urllib.parse.quote(cat), types, types, offset, index)

        html = self.httpRequest(url, method='GET', cookies=self.cookies)

        try:
            return html['playlists']
        except:
            return {}

    def details_playlist(self, id):
        """
            歌单详情。
        """
        url = 'http://music.163.com/api/playlist/detail?id=%d' % (id)
        html = self.httpRequest(url, method="GET", cookies=self.cookies)
        return html['result']

    def search(self, s, offset=0, limit=100, stype=1):
        """
            搜索.
            type类型: 单曲(1), 专辑(10), 歌手(100), 歌单(1000), 用户(1002)
            2017/7/15更新API.
        """
        # url = 'http://music.163.com/api/search/get/web'
        url = 'http://music.163.com/weapi/cloudsearch/get/web'
        data = {
            's': s,
            'offset': str(offset),
            'limit': str(limit),
            'type': str(stype)
        }

        html = self.httpRequest(url, method='POST', data=data)
        try:
            return html['result']
        except:
            return {'songCount': 0, 'songs':[]}

    def singsUrl(self, ids:list):
        """
        2017/7/14更新。
        返回歌曲的URL。
        """

        data = {'csrf_token': '', 'ids': ids, 'br': 999000}
        url = "http://music.163.com/weapi/song/enhance/player/url"
        html = self.httpRequest(url, method='POST', data=data)

        return html['data']

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

    def lyric(self, ids):
        url = 'http://music.163.com/api/song/lyric?os=osx&id={0}&lv=-1&kv=-1&tv=-1'.format(
            ids)
        html = self.httpRequest(url, method='GET')

        try:
            return html['lrc']['lyric']
        except:
            return False


netease = NetEaseWebApi()


if __name__ == '__main__':
    pass

    main = NetEaseWebApi()
    req = main.lyric(29401164)
    # print(req.split('\n'))
    print(req)
    # req = {'bindings': [{'userId': 426586128, 'expiresIn': 2147483647, 'type': 1, 'refreshTime': 1502328860, 'url': '', 'id': 3193514993, 'expired': False, 'tokenJsonStr': '{"cellphone":"13792133179","hasPassword":true}'}], 'account': {'whitelistAuthority': 0, 'anonimousUser': False, 'vipType': 0, 'createTime': 1502328860867, 'userName': '1_13792133179', 'tokenVersion': 0, 'status': 0, 'donateVersion': 0, 'salt': '[B@11e3b4cd', 'id': 426586128, 'type': 1, 'ban': 0, 'baoyueVersion': 0, 'viptypeVersion': 0}, 'code': 200, 'profile': {'avatarImgIdStr': '18686200114669622', 'detailDescription': '', 'avatarImgId': 18686200114669622, 'vipType': 0, 'description': '', 'defaultAvatar': True, 'authority': 0, 'backgroundImgIdStr': '109951162868128395', 'birthday': -2209017600000, 'signature': '', 'avatarUrl': 'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg', 'followed': False, 'province': 370000, 'remarkName': None, 'city': 370900, 'accountStatus': 0, 'userId': 426586128, 'nickname': 'cyrbuzzi', 'mutual': False, 'expertTags': None, 'djStatus': 0, 'gender': 0, 'backgroundUrl': 'http://p1.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg', 'authStatus': 0, 'userType': 0, 'backgroundImgId': 109951162868128395, 'avatarImgId_str': '18686200114669622'}, 'loginType': 1}
    # req = main.user_playlist(426586128)
    # req = main.login()
    # print(req)
    # print(req)
    # for i in req:
        # print(i)
    # req = main.details_search([139357])
    # print(req)
    # req = main.all_playlist()
    # print(req)
    # req = main.details_playlist(566527372)
    # print(req)
    # req = main.all_playlist(offset=30)
    # req = main.search("理想三旬")

    # for i in req['songs']:
    #     print(i)
    #     print('\n')
    # print(req['result']['songCount'])
    # print(req[0])
    # for i in req:
        # print(i)
        # print(req[i])
    # print(req['creator'])