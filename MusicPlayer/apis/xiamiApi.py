# coding=utf-8
'''
xiami music provider.
'''
import re
import json
import urllib.parse

from apiRequestsBase import HttpRequest, ignored


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

        # with ignored():
            # return json.loads(html.text[len('jsonp92('):-len(')')])
        return html.text

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
        return False


xiami = XiamiApi()


if __name__ == '__main__':
    req = XiamiApi()
    # a = req.lyric('http://img.xiami.net/lyric/86/27439286_1450892540942_6569.trc')
    a = req.lyric('http://img.xiami.net/lyric/86/1795766586_1491899170_2038.trc')
    # print(len(a))
    # for i in a:
    #     print(i)

    # a = {'artist_id': 2100026901, 'singer': '', 'song_name': '故梦', 'lyric': 'http://img.xiami.net/lyric/86/1795766586_1491899170_2038.trc', 'purview_roles': [{'operation_list': [{'upgrade_role': 0, 'purpose': 1}, {'upgrade_role': 0, 'purpose': 2}], 'quality': 'e'}, {'operation_list': [{'upgrade_role': 0, 'purpose': 1}, {'upgrade_role': 0, 'purpose': 2}], 'quality': 'f'}, {'operation_list': [{'upgrade_role': 0, 'purpose': 1}, {'upgrade_role': 0, 'purpose': 2}], 'quality': 'l'}, {'operation_list': [{'upgrade_role': 0, 'purpose': 1}, {'upgrade_role': 0, 'purpose': 2}], 'quality': 'h'}, {'operation_list': [{'upgrade_role': 1, 'purpose': 1}, {'upgrade_role': 1, 'purpose': 2}], 'quality': 's'}], 'is_play': 0, 'album_name': '笙声不息', 'artist_name': '双笙', 'album_logo': 'http://pic.xiami.net/images/album/img7/879807/92210241491879807_1.jpg', 'demo': 0, 'album_id': 2102730119, 'listen_file': 'http://m128.xiami.net/169/7169/2102730119/1795766586_1491880211009.mp3?auth_key=1506740400-0-0-522364b80280f2970854373a97039b42', 'song_id': 1795766586, 'artist_logo': 'http://pic.xiami.net/images/artistlogo/25/14882664173825_1.jpg', 'need_pay_flag': 0, 'play_counts': 0}

        # print(a[i])
    # result = req.getPlaylist(355127986)
    # # print(result)
    # for i in result:
    #     print(i)
    #     print(result[i])

    # for i in result['songs']:
    #     print(i)
    # for i in a:
        # print(i)
        # print(a[i])
    # for i in result:
        # print(i)
    #     data = json.loads(response[len('jsonp92('):-len(')')])
    #     result = []
    #     for l in data['data']:
    #         d = dict(
    #             cover_img_url=l['logo'],
    #             title=l['collect_name'],
    #             play_count=0,
    #             list_id='xmplaylist_' + str(l['list_id']),)
    #         result.append(d)
#     return result

# def filetype():
#     return '.mp3'


# def _xm_h(url, v=None):
#     '''
#     http request
#     '''
#     extra_headers = {
#         'Accept': '*/*',
#         'Accept-Encoding': 'gzip,deflate,sdch',
#         'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
#         'Connection': 'keep-alive',
#         'Content-Type': 'application/x-www-form-urlencoded',
#         'Host': 'api.xiami.com',
#         'Referer': 'http://m.xiami.com/',
#         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2)' +
#         ' AppleWebKit/537.36 (KHTML, like Gecko) Chrome' +
#         '/33.0.1750.152 Safari/537.36',
#     }
#     return h(url, v=v, extra_headers=extra_headers)


# def _gen_url_params(d):
#     for k, v in d.iteritems():
#         d[k] = unicode(v).encode('utf-8')
#     return urllib.urlencode(d)


# def _convert_song(song):
#     d = {
#         'id': 'xmtrack_' + str(song['song_id']),
#         'title': song['song_name'],
#         'artist': song['artist_name'],
#         'artist_id': 'xmartist_' + str(song['artist_id']),
#         'album': song['album_name'],
#         'album_id': 'xmalbum_' + str(song['album_id']),
#         'source': 'xiami',
#         'source_url': 'http://www.xiami.com/song/' + str(song['song_id']),
#     }
#     if 'logo' in song:
#         d['img_url'] = song['logo']
#     else:
#         d['img_url'] = ''
#     params = _gen_url_params(d)
#     d['url'] = '/track_file?' + params
#     return d


# def _retina_url(s):
#     return s[:-6] + s[-4:]


# # -------------standard interface part------------------


# def search_track(keyword):
#     '''
#     return matched qq music songs
#     '''
#     keyword = urllib2.quote(keyword.encode("utf8"))
#     search_url = 'http://api.xiami.com/web?v=2.0&app_key=1&key=' + keyword \
#         + '&page=1&limit=50&_ksTS=1459930568781_153&callback=jsonp154' + \
#         '&r=search/songs'
#     response = _xm_h(search_url)
#     json_string = response[len('jsonp154('):-len(')')]
#     data = json.loads(json_string)
#     result = []
#     for song in data['data']["songs"]:
#         result.append(_convert_song(song))
#     return result


# def list_playlist():
#     url = 'http://api.xiami.com/web?v=2.0&app_key=1&_ksTS=1459927525542_91' + \
#         '&page=1&limit=60&callback=jsonp92&r=collect/recommend'
#     response = _xm_h(url)
#     data = json.loads(response[len('jsonp92('):-len(')')])
#     result = []
#     for l in data['data']:
#         d = dict(
#             cover_img_url=l['logo'],
#             title=l['collect_name'],
#             play_count=0,
#             list_id='xmplaylist_' + str(l['list_id']),)
#         result.append(d)
#     return result


# def get_playlist(playlist_id):
#     url = 'http://api.xiami.com/web?v=2.0&app_key=1&id=%s' % playlist_id + \
#         '&_ksTS=1459928471147_121&callback=jsonp122&r=collect/detail'
#     response = _xm_h(url)
#     data = json.loads(response[len('jsonp122('):-len(')')])

#     info = dict(
#         cover_img_url=_retina_url(data['data']['logo']),
#         title=data['data']['collect_name'],
#         id='xmplaylist_' + playlist_id)
#     result = []
#     for song in data['data']['songs']:
#         result.append(_convert_song(song))
#     return dict(tracks=result, info=info)


# def get_artist(artist_id):
#     url = 'http://api.xiami.com/web?v=2.0&app_key=1&id=%s' % str(artist_id) + \
#         '&page=1&limit=20&_ksTS=1459931285956_216' + \
#         '&callback=jsonp217&r=artist/detail'
#     response = _xm_h(url)
#     data = json.loads(response[len('jsonp217('):-len(')')])
#     artist_name = data['data']['artist_name']
#     info = dict(
#         cover_img_url=_retina_url(data['data']['logo']),
#         title=artist_name,
#         id='xmartist_' + artist_id)

#     url = 'http://api.xiami.com/web?v=2.0&app_key=1&id=%s' % str(artist_id) + \
#         '&page=1&limit=20&_ksTS=1459931285956_216' + \
#         '&callback=jsonp217&r=artist/hot-songs'
#     response = _xm_h(url)
#     data = json.loads(response[len('jsonp217('):-len(')')])
#     result = []
#     for song in data['data']:
#         d = {
#             'id': 'xmtrack_' + str(song['song_id']),
#             'title': song['song_name'],
#             'artist': artist_name,
#             'artist_id': 'xmartist_' + artist_id,
#             'album': '',
#             'album_id': '',
#             'img_url': '',
#             'source': 'xiami',
#             'source_url': 'http://www.xiami.com/song/' + str(song['song_id']),
#         }
#         params = _gen_url_params(d)
#         d['url'] = '/track_file?' + params
#         result.append(d)
#     return dict(tracks=result, info=info)


# def get_album(album_id):
#     url = 'http://api.xiami.com/web?v=2.0&app_key=1&id=%s' % str(album_id) + \
#         '&page=1&limit=20&_ksTS=1459931285956_216' + \
#         '&callback=jsonp217&r=album/detail'
#     response = _xm_h(url)
#     data = json.loads(response[len('jsonp217('):-len(')')])
#     artist_name = data['data']['artist_name']
#     info = dict(
#         cover_img_url=_retina_url(data['data']['album_logo']),
#         title=data['data']['album_name'],
#         id='xmalbum_' + album_id)
#     result = []
#     for song in data['data']['songs']:
#         d = {
#             'id': 'xmtrack_' + str(song['song_id']),
#             'title': song['song_name'],
#             'artist': artist_name,
#             'artist_id': 'xmartist_' + str(song['artist_id']),
#             'album': song['album_name'],
#             'album_id': 'xmalbum_' + str(song['album_id']),
#             'img_url': song['album_logo'],
#             'source': 'xiami',
#             'source_url': 'http://www.xiami.com/song/' + str(song['song_id']),
#         }
#         params = _gen_url_params(d)
#         d['url'] = '/track_file?' + params
#         result.append(d)
#     return dict(tracks=result, info=info)


# def get_url_by_id(song_id):
#     url = 'http://www.xiami.com/song/playlist/id/%s' % song_id + \
#         '/object_name/default/object_id/0/cat/json'
#     response = h(url)
#     secret = json.loads(response)['data']['trackList'][0]['location']
#     url = caesar(secret)
#     return url