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
        'Upgrade-Insecure-Requests': '1',
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
        url = 'http://music.163.com/api/playlist/list?cat=%s&type=%s&order=%s&offset=%d&total=true&limit=30&index=%d'\
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
    # req = main.details_playlist(566527372)
    # print(req)
    req = main.all_playlist(offset=30)
    # print(req[0])
    # for i in req:
        # print(i)
        # print(req[i])
    # print(req['creator'])