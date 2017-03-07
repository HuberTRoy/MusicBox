"""获取网易云音乐的API。"""


__author__ = 'cyrbuzz'

import json
import urllib.parse


from apiRequestsBase import HttpRequest


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
        self.headers['Host'] = 'music.163.com'

    def httpRequest(self, *args, **kwargs):
        html = super(NetEaseWebApi, self).httpRequest(*args, **kwargs)

        return json.loads(html.text)


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