import requests


# TCP重传需要3秒。
default_timeout = 3.05

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


def requestsExceptionFilter(func):

    def _filter(*args, **kwargs):
        for i in range(3):
            try:
                return func(*args, **kwargs)
            except:
                continue
        else:
            return False
    
    return _filter


class Requests(object):
    def __init__(self):
        self.headers = headers.copy()

    @requestsExceptionFilter
    def get(self, url, **kwargs):
        if not kwargs.get('headers'):
            kwargs['headers'] = self.headers
        return requests.get(url, **kwargs)
    
    @requestsExceptionFilter
    def post(self, url, **kwargs):
        if not kwargs.get('headers'):
            kwargs['headers'] = self.headers

        return requests.post(url, **kwargs)  


class Session(object):
    
    def __init__(self):
        self.headers = headers.copy()
        self.session = requests.session()

    @requestsExceptionFilter
    def get(self, url, **kwargs):
        if not kwargs.get('headers'):
            kwargs['headers'] = self.headers

        return self.session.get(url, **kwargs)

    @requestsExceptionFilter
    def post(self, url, **kwargs):
        if not kwargs.get('headers'):
            kwargs['headers'] = self.headers

        return self.session.post(url, **kwargs)  


