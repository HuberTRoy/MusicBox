"""获取网易云音乐的API。"""


__author__ = 'cyrbuzz'

import json
import urllib.parse

from apiRequestsBase import HttpRequest
from netEaseEncode import encrypted_request

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

    def search(self, s, offset=0, limit=100, stype=1):
        """
            搜索.
            type类型: 单曲(1), 专辑(10), 歌手(100), 歌单(1000), 用户(1002)
            2017/7/15更新API.
        """
        # url = 'http://music.163.com/api/search/get/web'
        url = 'http://music.163.com/weapi/cloudsearch/get/web'
        data = encrypted_request({
            's': s,
            'offset': str(offset),
            'limit': str(limit),
            'type': str(stype)
        })

        html = self.httpRequest(url, method='POST', data=data)
        try:
            return html['result']
        except:
            return "Not Found!"

    def singsUrl(self, ids:list):
        """
        2017/7/14更新。
        返回歌曲的URL。
        """

        data = encrypted_request({'csrf_token': '', 'ids': ids, 'br': 999000})
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


if __name__ == '__main__':
    pass
    # import json
    # import os
    # import random
    # import binascii
    # from Cryptodome.Cipher import AES
    # import base64
    # modulus = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
    # nonce = b'0CoJUm6Qyw8W8jud'
    # pubKey = '010001'

    # def createSecretKey(size):

    #     # return (''.join(map(lambda xx: (hex(ord(xx))[2:]), os.urandom(size))))[0:16]
    #     return bytes(''.join(random.sample('1234567890qwertyuipasdfghjklzxcvbnm', 16)), 'utf-8')

    # def aesEncrypt(text, secKey):

    #     pad = 16 - len(text) % 16
    #     try:
    #         text = text.decode()
    #     except:
    #         pass

    #     text = text + pad * chr(pad)
    #     try:
    #         text = text.encode()
    #     except:
    #         pass

    #     encryptor = AES.new(secKey, 2, bytes('0102030405060708', 'utf-8'))
    #     ciphertext = encryptor.encrypt(text)
    #     ciphertext = base64.b64encode(ciphertext)
    #     return ciphertext

    # def rsaEncrypt(text, pubKey, modulus):
    #     text = text[::-1]
    #     rs = int(binascii.hexlify(text), 16) ** int(pubKey, 16) % int(modulus, 16)
    #     return format(rs, 'x').zfill(256)

    # def encrypted_request(text):
    #     text = json.dumps(text)
    #     secKey = createSecretKey(16)
    #     encText = aesEncrypt(aesEncrypt(text, nonce), secKey)

    #     # secKey = secKey.decode()
    #     encSecKey = rsaEncrypt(secKey, pubKey, modulus)
    #     data = {
    #         'params': encText.decode(),
    #         'encSecKey': encSecKey
    #     }
    #     return data

    # data = encrypted_request({'csrf_token': '', 'ids': [139357], 'br': 999000})
    # # data = {'encSecKey': 'd53b10328a0d5dc51b40f0eb562bad633e2597b01ec9abc96f10269189c156f7b1d04cb607a8fdf4a0f588ba941ead598c6bcb67c147fcd957f33fd22a0377212be14cebefe18fb74d6e75ab8e0526523981f3d3cfd5102632d622320e0c529494b6ed28b1156128a43b85d48dc7afac673b2c0c7c3584229cd3c4fff39081d9', 'params': 'jPPhxJu7mgqjwcprjH2zQ+Gy/+s4NbdP1elAG1fxX9rtAQpwxGdI6guQQ0am68S8tHBcoB6Zxb4nQwn84DEMOgDTIi8YTT4Sp3wqZFomSPaNenbD+9Cn84G/SO++mqSy'}
    
    # headers = {
    #         'Accept':
    #         '*/*',
    #         'Accept-Language':
    #         'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
    #         'Connection':
    #         'keep-alive',
    #         'Content-Type':
    #         'application/x-www-form-urlencoded',
    #         'Referer':
    #         'http://music.163.com',
    #         'Host':
    #         'music.163.com',
    #         'User-Agent':
    #         'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36'
    # }

    # import requests

    # req = requests.post('http://music.163.com/weapi/song/enhance/player/url', headers=headers, data=data)
    # print(req.text)

    main = NetEaseWebApi()
    # req = main.details_search([139357])
    # print(req)
    # req = main.all_playlist()
    # print(req)
    # req = main.details_playlist(566527372)
    # print(req)
    # req = main.all_playlist(offset=30)
    req = main.search("理想三旬")

    for i in req['songs']:
        print(i)
        print('\n')
    # print(req['result']['songCount'])
    # print(req[0])
    # for i in req:
        # print(i)
        # print(req[i])
    # print(req['creator'])