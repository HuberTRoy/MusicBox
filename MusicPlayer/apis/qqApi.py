# coding = utf-8

import json
import logging
import urllib.parse

from apiRequestsBase import HttpRequest, ignored


logger = logging.getLogger(__name__)


class QQApi(HttpRequest):

    default_timeout = 3.05

    def __init__(self):
        super(QQApi, self).__init__()

        self.headers['Host'] = 'c.y.qq.com'
        self.headers['Referer'] = 'https://y.qq.com/portal/playlist.html'

        self.playlistHeaders = self.headers.copy()
        self.playlistHeaders['Host'] = 'shc.y.qq.com'

        self.tokenHeaders = self.headers.copy()
        self.tokenHeaders['Host'] = 'base.music.qq.com'
        self.tokenHeaders.pop('Referer')

        self.token = self._get_qqtoken()
        self.key = self.token.get('key')
        self.sip = self.token.get('sip')[0]
        # 随便写一个就可以，原本是根据cookies里一个根据时间变化的参数确定的。
        self.guid = 3768717388
        if not self.sip:
            logger.info("获取QQToken失败。当前key: {0}, 当前sip: {1}".format(
                self.key, self.sip))
            print('QQ 播放地址获取失败，请勿播放QQ音乐。')

    def httpRequest(self, *args, **kwargs):
        html = super(QQApi, self).httpRequest(*args, **kwargs)

        logger.info("进行QQ Url请求, args: {0}, kwargs: {1}".format(args, kwargs))
        with ignored():
            return html.text

        logger.info("url: {0} 请求失败. Header: {1}".format(
            args[0], kwargs.get('headers')))
        return ''

    def _get_qqtoken(self):
        """
            更新后的不需要再获取token, sip变为固定URL:
            http://dl.stream.qqmusic.qq.com/
        """
        # token_url = 'http://base.music.qq.com/fcgi-bin/fcg_musicexpress.fcg?' + \
        #     'json=3&guid=3768717388&g_tk=938407465&loginUin=0&hostUin=0&' + \
        #     'format=jsonp&inCharset=GB2312&outCharset=GB2312&notice=0&' + \
        #     'platform=yqq&jsonpCallback=jsonCallback&needNewCode=0'

        # data = self.httpRequest(token_url, method='GET',
        #                         headers=self.tokenHeaders)

        # with ignored():
        #     data = data[len("jsonCallback("):-2]

        #     return json.loads(data)
        return {'key': '1', 'sip': ['http://dl.stream.qqmusic.qq.com/']}

    def _getImgUrl(self, mid):
        imgUrl = 'https://y.gtimg.cn/music/photo_new/'
        return imgUrl + 'T002R300x300M000' + mid + '.jpg'

    def _getSongUrl(self, mid):
        vkey = self._getSongUrlVkey(mid)

        if not vkey:
            vkey = '000'

        return '{0}C400{1}.m4a?vkey={2}&guid={3}&uin=0&fromtag=66'.format(self.sip, mid, vkey, self.guid)

    def _getSongUrlVkey(self, mid):
        # 获取得到QQ音乐歌曲地址所需的vkey。
        # 返回的是vkey。

        vkey_url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
        params = {
            'g_tk': '5381',
            'jsonpCallback': 'MusicJsonCallback8571665793949388',
            'loginUin': '0',
            'hostUin': '0',
            'format': 'json',
            'inCharset': 'utf8',
            'outCharset': 'utf-8',
            'notice': '0',
            'platform': 'yqq',
            'needNewCode': '0',
            'cid': '205361747',
            'callback': 'MusicJsonCallback8571665793949388',
            'uin': '0',
            'songmid': mid,
            'filename': 'C400' + mid + '.m4a',
            'guid': '{}'.format(self.guid)
        }

        response = self.httpRequest(vkey_url, method="GET", headers=self.headers, params=params)

        with ignored():
            data = json.loads(response[response.find("{"):-1])

            return data['data']['items'][0]['vkey']

        return False

    def _fromSongUrlGetSongMid(self, songUrl):
        # 根据一个完整的歌曲Url,获取出它的mid。
        # 'http://dl.stream.qqmusic.qq.com/
        # C400 0000ASDASD.m4a
        # ?vkey=' + vkey + '&guid=7133372870&uin=0&fromtag=66'

        songUrl = songUrl.split("?")[0]

        return songUrl[songUrl.find('C400')+4:-4]

    def getSongUrl(self, songUrl):
        # songUrl格式：
        #  1. 歌曲mid: 000xkbLI2QEKE9 这样的形式。
        #  2. 完整URL，上次授权后得到的URL，但已过期需要重新获取。

        mid = songUrl
        if 'http' in songUrl:
            mid = self._fromSongUrlGetSongMid(songUrl)

        return self._getSongUrl(mid)

    def playList(self, ein=29):
        """
        ein控制返回的歌单。
        29, 59, 89....
        """
        url = 'https://c.y.qq.com/splcloud/fcgi-bin/' +\
            'fcg_get_diss_by_tag.fcg?rnd=0.5136307078685405&g_tk=5381&' +\
            'jsonpCallback=getPlaylist&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8' +\
            '&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&categoryId=10000000&' +\
            'sortId=5&sin=30&ein={0}'.format(ein)

        response = self.httpRequest(url, method='GET', headers=self.headers)

        with ignored():
            data = json.loads(response[len('getPlaylist('):-1])

            return data['data']['list']

        return False

    def getPlaylist(self, ids):
        url = 'https://shc.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0' +\
            '&disstid={0}&format=jsonp&g_tk=5381&jsonpCallback=playlistinfoCallback&loginUin=0&hostUin=0&'.format(ids) +\
            'format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0'

        response = self.httpRequest(
            url, method='GET', headers=self.playlistHeaders)
        with ignored():
            data = json.loads(response[len('playlistinfoCallback('):-len(')')])
            data = data['cdlist'][0]

            newDatas = {}
            newDatas['trackCount'] = data['total_song_num']
            newDatas['name'] = data['dissname']
            newDatas['creator'] = {'nickname': data['nick']}
            newDatas['description'] = data['desc']
            songs = data['songlist']

            # imgUrl = 'https://y.gtimg.cn/music/photo_new/'

            for i in songs:
                i['name'] = i['songname']
                i['artists'] = [
                    {'name': ';'.join([x['name'] for x in i['singer']])}]
                i['duration'] = int(i['interval']) * 1000
                # i['album'] = {'blurPicUrl': imgUrl + 'T002R300x300M000' + i['albummid'] + '.jpg'}
                i['album'] = {'blurPicUrl': self._getImgUrl(i['albummid'])}
                # i['mp3Url'] = '{0}C400{1}.m4a?vkey={2}&guid={3}'.format(self.sip, i['songmid'], self.key, self.guid)
                i['mp3Url'] = self._getSongUrl(i['songmid'])
                i['lyric'] = 'qq'

            newDatas['tracks'] = songs

            return newDatas

        return False

    def search(self, key):
        url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&' +\
            'new_json=1&remoteplace=txt.yqq.center&searchid=43541888870417375&t=0&aggr=1' +\
            '&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=50&' +\
            'w={0}'.format(urllib.parse.quote(key)) +\
            '&g_tk=5381&jsonpCallback=searchCallbacksong6064&loginUin=0&hostUin=0&' +\
            'format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0'

        response = self.httpRequest(url, method='GET')

        with ignored():
            data = json.loads(
                response[len('searchCallbacksong6064('):-1])

            data = data['data']['song']

            newDatas = {}
            newDatas['songCount'] = data['curnum'] - 1
            songs = []
            for i in data['list']:
                songs.append({'name': i['name'],
                              'ar': [{'name': ';'.join([x['name'] for x in i['singer']])}],
                              'al': {'picUrl': self._getImgUrl(i['album']['mid'])},
                              'dt': i['interval'] * 1000,
                              'id': i['id'],
                              # 当然这里不是mp3，为了统一接口这样写。
                              'mp3Url': i['mid'],
                              'lyric': 'qq'
                              })
            newDatas['songs'] = songs

            return newDatas

        return False


qqApi = QQApi()


if __name__ == '__main__':
    help(qqApi)
