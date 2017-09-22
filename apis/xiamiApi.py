# coding=utf-8
'''
xiami music provider.
'''
import json

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
        self.headers['Host'] = 'api.xiami.com'
        self.headers['Referer'] = 'http://m.xiami.com/'

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

    # def  getPlaylist(self, ids):
    #     url = 'http://www.xiami.com/song/playlist/id/{0}'.format(ids) + \
    #     '/object_name/default/object_id/0/cat/json'

    #     response = self.httpRequest(url, method='GET')
    #     print(response)
    #     # with ignored():
    #     response = json.loads(response)['data']['trackList'][0]['location']
    #     response = caesar(response) 
            
    #     return response

    #     return False

if __name__ == '__main__':
    req = XiamiApi()
    # result = req.getPlaylist(355127986)
    # # print(result)
    # for i in result:
    #     print(i)
    #     print(result[i])

    # for i in result['songs']:
    #     print(i)
    a = {'demo': 0, 'artist_logo': 'http://pic.xiami.net/images/artistlogo/33/14262395532333_1.jpg', 'lyric_file': '', 'album_id': 11165, 'purview_roles': [{'quality': 'e', 'operation_list': [{'purpose': 1, 'upgrade_role': 0}, {'purpose': 2, 'upgrade_role': 4}]}, {'quality': 'f', 'operation_list': [{'purpose': 1, 'upgrade_role': 0}, {'purpose': 2, 'upgrade_role': 4}]}, {'quality': 'l', 'operation_list': [{'purpose': 1, 'upgrade_role': 0}, {'purpose': 2, 'upgrade_role': 4}]}, {'quality': 'h', 'operation_list': [{'purpose': 1, 'upgrade_role': 4}, {'purpose': 2, 'upgrade_role': 4}]}, {'quality': 's', 'operation_list': [{'purpose': 1, 'upgrade_role': 4}, {'purpose': 2, 'upgrade_role': 4}]}], 'song_name': '梦田', 'play_seconds': 0, 'album_name': '回声 三毛作品第15号', 'album_logo': 'http://pic.xiami.net/images/album/img37/2037/111651383655947_1.jpg', 'singers': '齐豫;潘越云', 'need_pay_flag': 2, 'artist_name': '潘越云', 'length': 185, 'listen_file': 'http://m128.xiami.net/37/2037/11165/386404_21130_l.mp3?auth_key=1506654000-0-0-70a07b045b65c9c9e465bf1721a5e808', 'play_counts': 0, 'recommends': 0, 'song_id': 386404, 'artist_id': 2037, 'name': '', 'lyric': 'http://img.xiami.net/lyric/4/386404_1448013680_8037.trc', 'title': '', 'logo': ''}
    for i in a:
        print(i)
        print(a[i])
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