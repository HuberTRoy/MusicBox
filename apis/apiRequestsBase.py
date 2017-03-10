"""
    提供封装好的持久连接的Http请求类。
    默认返回(cookies, jsonData),
    is_json参数为False时返回(cookies, text),
    不提供返回二进制。
"""

__author__ = 'cyrbuzz'

import requests


class HttpRequest(object):
    # 使用keep-alive，
    # keep-alive保持持久连接，没有必要开启很多个TCP链接，浪费资源。
    # 使用会话(session)来保持持久连接。
    sessions = requests.session()

    default_timeout = 10
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'Accept-Encoding': 'gzip,deflate,sdch',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36'
    }

    cookies = {}

    def httpRequest(self, action, method="GET", add=None, data=None, headers=None, cookies='',\
                    timeout=default_timeout, urlencode='utf-8', is_json=True):
        """
            默认以get方式请求，
            GET方式附加内容用add参数，POST方式提交内容用data参数。
            编码用urlencode参数，默认utf-8。
            默认cookies为空。
        """
        if not headers:
            headers = self.headers

        if method.upper() == 'GET':
            if add:
                html = self.sessions.get(action, params=add, headers=headers, cookies=cookies, timeout=timeout)
            else:
                html = self.sessions.get(action, headers=headers, cookies=cookies, timeout=timeout)
            html.encoding = urlencode

        elif method.upper() == 'POST':
            if data:
                html = self.sessions.post(action, data=data, headers=headers, cookies=cookies, timeout=timeout)
            else:
                html = self.sessions.post(action, headers=headers, cookies=cookies, timeout=timeout)
            html.encoding = urlencode

        return html