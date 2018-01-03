# coding=utf-8
'''
xiami music provider.
'''
import re
import json
import logging
import urllib.parse

from apiRequestsBase import HttpRequest, ignored


logger = logging.getLogger(__name__)


# https://github.com/Flowerowl/xiami
def caesar(location):
    num = int(location[0])
    avg_len = int(len(location[1:]) / num)
    remainder = int(len(location[1:]) % num)
    result = [
        location[i * (avg_len + 1) + 1: (i + 1) * (avg_len + 1) + 1]
        for i in range(remainder)]
    result.extend(
        [
            location[(avg_len + 1) * remainder:]
            [i * avg_len + 1: (i + 1) * avg_len + 1]
            for i in range(num - remainder)])
    url = urllib.unquote(
        ''.join([
            ''.join([result[j][i] for j in range(num)])
            for i in range(avg_len)
        ]) +
        ''.join([result[r][-1] for r in range(remainder)])).replace('^', '0')
    return url


class XiamiApi(HttpRequest):

    default_timeout = 3.05

    def __init__(self):
        super(XiamiApi, self).__init__()
        self.lyricHeader = self.headers.copy()

        self.headers['Host'] = 'api.xiami.com'
        self.headers['Referer'] = 'http://m.xiami.com/'

        self.lyricHeader['Host'] = 'img.xiami.net'
        self.lyricHeader['Referer'] = 'http://img.xiami.net'

    def httpRequest(self, *args, **kwargs):
        html = super(XiamiApi, self).httpRequest(*args, **kwargs)

        logger.info("进行xiami Url请求, args: {0}, kwargs: {1}".format(args, kwargs))
       
        with ignored():
            return html.text
        
        logger.info("url: {0} 请求失败. Header: {1}".format(args[0], kwargs.get('headers')))
        return ''

    def playList(self, page=1):
        url = 'http://api.xiami.com/web?v=2.0&app_key=1&_ksTS=1459927525542_91' + \
            '&page={0}&limit=30&callback=jsonp92&r=collect/recommend'.format(page)
        
        response = self.httpRequest(url, method='GET')

        with ignored():
            response = json.loads(response[len('jsonp92('):-len(')')])
            return response['data']
        
        return False

    def getPlaylist(self, ids):
        url = 'http://api.xiami.com/web?v=2.0&app_key=1&id={0}'.format(ids) + \
        '&_ksTS=1459928471147_121&callback=jsonp122&r=collect/detail'
        response = self.httpRequest(url, 'GET')

        with ignored():
            response = json.loads(response[len('jsonp122('):-len(')')])
            # 修改下返回的信息，与之前的网易云对应，这样就不用修改太多即可做扩展。
            data = response['data']
            data['name'] = data['collect_name']
            data['creator'] = {'nickname': data['user_name']}
            data['description'] = ''
            data['trackCount'] = data['songs_count']
            songs = data['songs']
            for i in songs:
                i['name'] = i['song_name']
                i['artists'] = [{'name':i['singers']}]
                i['duration'] = int(i['length'])*1000
                i['album'] = {'blurPicUrl': i['album_logo']}

            data['tracks'] = songs
            return response['data']

        return False

    def search(self, keyword):
        keyword = urllib.parse.quote(keyword.encode("utf-8"))
        url = 'http://api.xiami.com/web?v=2.0&app_key=1&key=' + keyword \
        + '&page=1&limit=50&_ksTS=1459930568781_153&callback=jsonp154' + \
        '&r=search/songs'
        response = self.httpRequest(url, method='GET')
        response = json.loads(response[len('jsonp154('):-len(')')])
        # songs = response['data']['songs']
        response['data']['songCount'] = 50
        temp = []
        for songs in response['data']['songs']:
            temp.append({'name': songs['song_name'],
                                          'ar': [{'name': songs['artist_name']}],
                                          'al': {'picUrl': songs['album_logo']},
                                          # 虾米音乐搜索没有返回歌曲长度。
                                          'dt': 131400,
                                          'id': str(songs['song_id']),
                                          'mp3Url': songs['listen_file'],
                                          'lyric': songs['lyric']})

        response['data']['songs'] = temp

        return response['data']

    def lyric(self, url):
        lyric = self.httpRequest(url, method='GET', headers=self.lyricHeader)

        with ignored():
            lyric = lyric.split('[offset:0]')[1]
            lyric = re.sub(r'<\d*?>', '', lyric)
            return lyric

        with ignored():
            loadingLyric = {}
            lyricTimes = []
            for i in lyric.split('\n'):
                oneLyric = re.findall(r'[0-9:\.]+', i)
                if not oneLyric or oneLyric == [':']:
                    continue
                else:
                    for x in oneLyric:
                        i = i.replace('[{}]'.format(x), '')
                    for x in oneLyric:
                        loadingLyric[x] = i
                    lyricTimes.extend(oneLyric)

            return '\n'.join(['[{time}]{content}'.format(time=x, content=loadingLyric.get(x)) for x in sorted(lyricTimes)])

        return False


xiami = XiamiApi()


if __name__ == '__main__':
    a = xiami.get_url_by_id('326900802')

# def get_url_by_id(song_id):
#     url = 'http://www.xiami.com/song/playlist/id/%s' % song_id + \
#         '/object_name/default/object_id/0/cat/json'
#     response = h(url)
#     secret = json.loads(response)['data']['trackList'][0]['location']
#     url = caesar(secret)
#     return url