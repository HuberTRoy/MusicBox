"""获取网易云音乐的API。"""
"""暂时没有整改的想法: 一方面旧的API可以用，另一方面逻辑较为简单，当前优先级不高。"""
"""2018/03/18: 相当不RESTful..."""

__author__ = 'cyrbuzz'

import re
import json
import logging
import urllib.parse

from collections import namedtuple

from apiRequestsBase import HttpRequest, ignored
from netEaseEncode import encrypted_request, hashlib


logger = logging.getLogger(__name__)

SongInfo = namedtuple(
    'SongInfo', ['music_id', 'url', 'author', 'time', 'name', 'music_img', 'lyric'])


class NetEaseWebApi(HttpRequest):
    """
        2015年写的，函数名略混乱，不影响使用，暂时不修改。
    """
    cookies = {
        'appver': '2.1.2.184499',
        'os': 'pc',
        'channel': 'netease',
    }

    default_timeout = 10

    def __init__(self):
        super(NetEaseWebApi, self).__init__()
        self.headers['Host'] = 'music.163.com'
        self.headers['Referer'] = 'http://music.163.com'
        self.headers['Content-Type'] = 'application/x-www-form-urlencoded'

        self.vertifyHeaders = self.headers.copy()
        self.vertifyHeaders['Host'] = 'ac.dun.163yun.com'
        self.vertifyHeaders['Accept'] = 'image/png,image/*;q=0.8,*/*;q=0.5'
        self.vertifyHeaders['Content-Type'] = ''

        self.urlEamilHeaders = self.headers.copy()
        self.urlEamilHeaders['Referer'] = ''
        self.urlEamilHeaders['Origin'] = 'orpheus://orpheus'

    def httpRequest(self, *args, **kwargs):
        data = kwargs.get('data')
        if data:
            kwargs['data'] = encrypted_request(data)

        logger.info("进行网易云Url请求, args: {0}, kwargs: {1}".format(args, kwargs))
        html = super(NetEaseWebApi, self).httpRequest(*args, **kwargs)

        with ignored():
            return json.loads(html.text)

        logger.info("url: {0} 请求失败. Header: {1}".format(
            args[0], kwargs.get('headers')))
        return False

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
            # https://ac.dun.163yun.com/v1/d?d=nsHeOgdOdpeTDoF4zMLze4xEBfrKIZ2fQzMlHTn2VTgJt%2BkQAVDZ%2B9L5X1DQ%2BkjffAzVQgCLt0EE60l6qm4OGM%2F7FnsP7OO%2B3eZNebXpl6qZt7Q36oeUCUM%2BQcfaX1lsYvHM9vsVpXIJAok6el%2F9uwfX%2BtvF056U%5C8XllLj62g0K22jv2ZYZ8DNU7ws5YSYo%5CRGMRrcJisIyYtP8pbAqiGqi3ZnV%5CLM9568YMdDomJJZc77BTD%5CVwUsj%2Fgv76g%2FCT885OtsSfkOhMVmIESXztxyrLyxt52Vs1wOG%5CyIeR6x%2BaJsYmbjTJXQ2M2DlOv5jqe3PyqHBp0Ar%2FG1ueK5xJve3A0QAS9s4qMXG%2FIpiXvjUT6jA28GNxw3ZFzwNY1IinR%2FH4CooLpNP0bokXAq8Z%2FooRZRZg4uvPa9jHR7l2LlRaTO0oIYvAPvQshOyTq%5CAfUVuLtjyhmkPjgdJNpguxGOKVGqghlYwcrmKuTU8ytT2qxb5x0opJneyEbvGor1LcRC5m9%5CdKlhJ7KbLjdKQGX7l4nHdMe9OS2ViwGXaqHIVKS1Zrck2UsYu1AAjaVOXSOO0Y%2FqhTFHEdrT11vxAf6hRjEdZS8nJxHxv5zsvpx2XXUBUikMum81uF2cdwc0PF1YoITmlGA1IbwXGE3mUfV3Ggvk0%5C1djVd8o3C3F%2BOvQ89V0pq4mBbJ1OSiT4%2FV56qPjLYuIX7leuZGkNYlJIhFypeQDa7CvCh%2BBhVCh%2BO3pt%2FVwbFkrZlmoRM%2BdB22H3z%2F%2Bn%2FWW&cb=_jsonp_ssd1507090923068&x.js
            # https://ac.dun.163yun.com/v1/d?d=FvHNjq2CwM%2FgqdENT6g0AUjuRaNfeeO%5CkX64uXxNGYraS6AVKH0jrEFbxq1y%2BveQPiOClFtY0OqQ8G6OCQuK%2F4zKrVAsaT9XPiPS1%2BhrPj6TT1mX%2BBFFq%2FZafGazTvU13DluLC2Khhid80cbwi95%2BzO4CjubRjNlhJ9VYuoTGErCi8LlSkjUAYplAkfkATJOBQK%2FFg4RAysIEsUpbACTUFqlhQqVL5aBbR8XhN4HooPPOC9L0IY9TFMfI14hhgLc9AiXSq7S5wkjje5fc3tXrfVZqptla8s%2BhFPJNNyKw8IdNJ6Ik9p9aTC8tXkU1yk%2FZeicCMU48zgDvmTjBYVi1xeQ0xxzLZmvA%5C61rJOJNjqC%2Bh0M%2BCy5HtoceoppxfyC4o80YP%5CR3LP5yb03jL89sbqC48mf6a1aTu6d5MnCGnDl17o%2Frk8onMOYLN8YX0Qf3EORGP547CcNlp6ZA83VcwrYGzR%5CYoKbrlLR7dfMb%5CoMusuXm1cGakS6rInXZNQdE%2FFN2OUhlw%5CstCL0UIbw4IsvuwMXl2O5sZhGCejE%2F2%2F1lZ7u57FCHp9BQ4tG5QjJb%2FLQi6V%5CraQLMJxq%5CBuiKbJr7uZrUj4LIq4jsw7jMqmA7o4uM5JMHbzEdg7k%5CsFyM8x9hdeG7owXIDmFuCpfTqiH9wMCZa0DV%2F8m%2BCOuG8q%2F87cGDyvaFlRVoRgnuqQHVE5%2BV5Z6iAMYGtOFQH%2BBLvjPI1cF0yT1twyTR1e0FTnMI3tNjoHH%2Fy%2Fyb1hZCuuIJoJJP%2FWW&cb=_jsonp_ssd1507090962239&x.js
            # a = '1_ZfeoJYpgEKaPdueAuHxAz56XkZ28JiOG_hUOMgOEgFt1H0Azl4sFFeKjDBIbrhKWD'
            data['clientToken'] = "1_ZfeoJYpgEKaPdueAuHxAz56XkZ28JiOG_SrSyeuuSjQrobJdGvXFN2Jo4fzHb+oRQ"
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

    def details_playlist(self, ids):
        """
            歌单详情。
        """
        url = 'http://music.163.com/api/playlist/detail?id={0}' .format(ids)
        html = self.httpRequest(url, method="GET", cookies=self.cookies)
        with ignored():
            return html['result']
        return False

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
            return {'songCount': 0, 'songs': []}

    def singsUrl(self, ids: list):
        """
        2017/7/14更新。
        返回歌曲的URL。
        """

        data = {'csrf_token': '', 'ids': ids, 'br': 999000}
        url = "http://music.163.com/weapi/song/enhance/player/url"
        html = self.httpRequest(url, method='POST', data=data)
        with ignored():
            return html['data']

        logger.info('歌曲请求失败: ids {0}'.format(ids))

        return False

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

    def getContainedPlaylists(self, songId) -> set:
        """

            传入某个歌曲Id, 返回包含此歌曲的3个歌单。
            此功能需要直接解析HTMl文档.
            1. 获取·http://music.163.com/song?id=29953681·
            2. 提取出歌单的id。不想使用额外的包所以直接用正则了。
        """
        rawHtml = super().httpRequest(
            'http://music.163.com/song?id={}'.format(songId), method='GET')

        containedUl = re.findall(
            r'<ul class="m-rctlist f-cb">[.\s\S]+?</ul>', rawHtml.text)
        if not containedUl:
            containedUl = ''
        else:
            containedUl = containedUl[0]

        playlists = set(re.findall(r'data-res-id="(.+)"', containedUl))

        return playlists

    def getRandomSongFromPlaylist(self, playlistId) -> list:
        """
            只返回包含其中音乐信息的列表。
        """
        allSong = self.details_playlist(playlistId)
        if allSong:
            tracks = allSong['tracks']
            SongInfoList = []
            for i in tracks:
                songInfo = SongInfo(music_id=i['id'],
                                    music_img=i['album']['blurPicUrl'],
                                    url="http(0)",
                                    lyric=None,
                                    time=i['duration'],
                                    name=i['name'],
                                    author='-'.join([x['name']
                                                     for x in i['artists']])
                                    )
                SongInfoList.append(songInfo)

            return SongInfoList

        return False


netease = NetEaseWebApi()


if __name__ == '__main__':
    help(netease)
