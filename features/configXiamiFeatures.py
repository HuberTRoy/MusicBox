# 虾米等其他的扩展与netease几乎没有区别，只是api的区别。
# 暂时让netease当基类。
import xiamiApi

from configNeteaseFeatures import ConfigNetEase


xiami = xiamiApi.XiamiApi()

class ConfigXiami(ConfigNetEase):

    def __init__(self, parent):
        super(ConfigXiami, self).__init__(parent)

        self.api = xiami
    
        self.page = 1
    
    def getSings(self):
        for i in self.api.playList(page=self.page):
            self.result.append(i)
            self.singNames.append(i['collect_name'])
            self.singPicUrls.append(i['logo'])
            self.playlistIds.append(i['list_id'])
    
        self.page +=1
    
    def requestsDetail(self, ids):
        reqResult = self.api.getPlaylist(ids)

        self.reqResult = reqResult

        self.singsIds = [i['song_id'] for i in reqResult['tracks']]

        self.singsUrls = [i['listen_file'] for i in reqResult['tracks']]