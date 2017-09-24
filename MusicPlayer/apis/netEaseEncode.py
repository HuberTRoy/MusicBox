# 加密参数相关。
# 具体http://s3.music.126.net/sep/s/2/core.js?5d6f8e4d01b4103ec9f246a2ef70e6d1在这个js中可以查看。
# 好吧，其实不用分析这个js，在这个git中可以找到https://github.com/xiyouMc/ncmbot，不过他是for python2的。
# 针对pyton3做了修改。

import os
import json
import base64
import random
import hashlib
import binascii

try:
    from Cryptodome.Cipher import AES
except:
    from Crypto.Cipher import AES
    
modulus = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
nonce = b'0CoJUm6Qyw8W8jud'
pubKey = '010001'


def aesEncrypt(text, secKey):

    pad = 16 - len(text) % 16

    # aes加密需要byte类型。
    # 因为调用两次，下面还要进行补充位数。
    # 直接用try与if差不多。

    try:
        text = text.decode()
    except:
        pass

    text = text + pad * chr(pad)
    try:
        text = text.encode()
    except:
        pass

    encryptor = AES.new(secKey, 2, bytes('0102030405060708', 'utf-8'))
    ciphertext = encryptor.encrypt(text)
    ciphertext = base64.b64encode(ciphertext)
    return ciphertext


def createSecretKey(size):
    # 2中 os.urandom返回是个字符串。3中变成bytes。
    # 不过加密的目的是需要一个字符串。
    # 因为密钥之后会被加密到rsa中一起发送出去。
    # 所以即使是个固定的密钥也是可以的。

    # return (''.join(map(lambda xx: (hex(ord(xx))[2:]), os.urandom(size))))[0:16]
    return bytes(''.join(random.sample('1234567890qwertyuipasdfghjklzxcvbnm', 16)), 'utf-8')


def rsaEncrypt(text, pubKey, modulus):
    text = text[::-1]
    # 3中将字符串转成hex的函数变成了binascii.hexlify, 2中可以直接 str.encode('hex')
    rs = int(binascii.hexlify(text), 16) ** int(pubKey, 16) % int(modulus, 16)

    return format(rs, 'x').zfill(256)


def encrypted_request(text):

    # 这边是加密过程。
    text = json.dumps(text)
    secKey = createSecretKey(16)
    encText = aesEncrypt(aesEncrypt(text, nonce), secKey)
    encSecKey = rsaEncrypt(secKey, pubKey, modulus)
    # 在那个js中也可以找到。

    # params加密后是个byte，解下码。
    data = {
        'params': encText.decode(),
        'encSecKey': encSecKey
    }
    return data

