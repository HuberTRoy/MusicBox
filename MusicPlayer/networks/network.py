"""主要是网络部分。"""
# 2017/7/26
# 这个文件目前基本无用，预留。
import os
import asyncio

from PyQt5.QtCore import QThread, QObject, QEventLoop, QByteArray, QRunnable, pyqtSignal, pyqtSlot

# 2017/7/25 尝试用协程进行设计。
# 测试发现会卡界面。
# 暂时保留不使用。
# try:
#     from gevent import monkey; monkey.patch_all()
#     from gevent import pool
#     import gevent
#     noGevent = False
# except:
#     noGevent = True
noGevent = True

import httpBase

Requests = httpBase.Requests()
Session = httpBase.Session()


class Pool(object):

    def spawn(self, *args, **kwargs):
        pass

    def join(self):
        pass

# 做成装饰器。
if noGevent:
    pool = Pool()
    def joinJobInGevent(func):

        def join(*args, **kwargs):

            func(*args, **kwargs)

        return join
else:
    pool = pool.Pool()
    def joinJobInGevent(func):

        def join(*args, **kwargs):
            
            pool.spawn(func, *args, **kwargs)

        return join


# class GeventNetWork(object):
    
#     def __new__(cls, *args, **kwargs):
#         """如果没有Gevent库就不要实例化这个类。"""
#         if noGevent:
#             pass
#         else:
#             return object.__new__(cls, *args, **kwargs)
        
#     def __init__(self):
#         pass
    
class ARequests(httpBase.Requests):
    """
    一个异步请求类，
    """
    def __init__(self, callback):
        super().__init__()
        self.callback = callback

    def __enter__(self):
        return self

    def __exit__(self, except_type, value, tb):
        
        return True

    def _httpRequest(self, method, url, kwargs):
        method = method.upper()
        if method == 'GET':
            data = super().get(url, **kwargs)
        elif method == 'POST':
            data = super().post(url, **kwargs)

        return data

    @asyncio.coroutine
    def _get(self, url, **kwargs):
        eventLoop = asyncio.get_event_loop()
        future = eventLoop.run_in_executor(None, self._httpRequest, 'GET', url, kwargs)

        data = yield from future

        return data

    @asyncio.coroutine
    def _post(self, url, **kwargs):
        eventLoop = asyncio.get_event_loop()
        future = eventLoop.run_in_executor(None, self._httpRequest, 'POST', url, kwargs)

        data = yield from future

        return data

    def get(self, url, **kwargs):
        eventLoop = asyncio.get_event_loop()
        future = eventLoop.create_task(self._get(url, **kwargs))
        future.add_done_callback(self.callback)

    def post(self, url, **kwargs):
        eventLoop = asyncio.get_event_loop()
        future = eventLoop.create_task(self._post(url, **kwargs))
        future.add_done_callback(self.callback)


if __name__ == '__main__':
    pass
    import sys
    import time
    import requests
    eventLoop = asyncio.get_event_loop()
    urls = ['https://www.v2ex.com/', 'http://www.baidu.com']*5
    from concurrent.futures import ThreadPoolExecutor

    # b = time.clock()
    with ThreadPoolExecutor(max_workers=5) as f:
        for i in urls:
            f.submit(requests.get, i)
    # def printData(future):
    #     print(future.result())
        
    #     urls.pop()
    #     if not urls:
    #         sys.exit()
    # http = ARequests(printData)
    
    # for i in urls:
    #     http.get(i)
    # eventLoop.run_forever()
