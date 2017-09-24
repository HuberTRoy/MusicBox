__author__ = 'cyrbuzz'

"""
提供用于将函数包装成异步的基本功能。
"""
import asyncio


def aAsync(func, *args, **kwargs):
    """
    future 用于将任意函数包装成一个awaitable对象。
    例：
    future = aAsync(requests.get, 'http://www.xxx.com', headers=headers)
    data = yield from future
    """
    
    # run_in_evecutor不支持**kwargs.
    # args是个元组，kwargs是个字典。
    # 再用到时 run_in_evecutor(None, makeUp, args, kwargs)
    # 注意这边不要带*，带*为解包，不要解包。
    def makeUp(args, kwargs):
        return func(*args, **kwargs)

    eventLoop = asyncio.get_event_loop()
    future = eventLoop.run_in_executor(None, makeUp, args, kwargs)

    return future


def toTask(func):
    """
        一个将普通函数包装成异步函数的装饰器。
        例：
        @toTask
        def test(x):

            future = aAsync(requests.get, 'http://www.xxx.com', headers=headers)
            print(x)
            data = yield from future

            print(data)

        在运行test时(test())就会变成一个异步函数，
        里面I/O部分就会由asyncio提供的事件循环处理。
        >>> for i in range(5):
                test(x)
        ```
        0
        1
        2
        3
        4
        <Response [200]>
        <Response [200]>
        <Response [200]>
        <Response [200]>
        <Response [200]>
        ```
    """
    def makeUp(*args, **kwargs):
        eventLoop = asyncio.get_event_loop()
        future = eventLoop.create_task(func(*args, **kwargs))

        return future

    return makeUp


def toTaskWCb(func):
    """
    一个将普通函数包装成异步函数并添加回调的装饰器。
    """
    def makeUp(callback):
        def makeUps(*args, **kwargs):
            eventLoop = asyncio.get_event_loop()
            future = eventLoop.create_task(func(*args, **kwargs))
            
            future.add_done_callback(callback)

            return future
        
        return makeUps

    return makeUp


if __name__ == '__main__':
    help(aAsync)
    print('\n')
    help(toTask)