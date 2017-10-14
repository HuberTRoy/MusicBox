from qqApi import qqApi

from configNeteaseFeatures import ConfigNetEase


class ConfigQQ(ConfigNetEase):

    def __init__(self, parent):
        super(ConfigQQ, self).__init__(parent)

        self.api = qqApi
    
        self.ein = 29
    
    def getSings(self):
        result = self.api.playList(ein=self.ein)
        if not result:
            return 
            
        for i in result:
            self.result.append(i)
            self.singNames.append(i['dissname'])
            self.singPicUrls.append(i['imgurl'])
            self.playlistIds.append(int(i['dissid']))

        self.ein += 30
    
    def requestsDetail(self, ids):
        reqResult = self.api.getPlaylist(ids)
        self.reqResult = reqResult
        if not self.reqResult:
            print('QQ歌单获取失败，请重新获取。')
            return 
        self.singsIds = [i['songid'] for i in reqResult['tracks']]

        self.singsUrls = [i['mp3Url'] for i in reqResult['tracks']]
