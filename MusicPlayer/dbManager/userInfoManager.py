import os
import os.path

from dbManager import DbManager

home = os.path.expanduser('~')

if '.musicplayer' not in os.listdir(home):
    os.mkdir(os.path.join(home, '.musicplayer'))

dbPath = os.path.join(home, '.musicplayer', 'userData.db')

createTableString = """
CREATE TABLE IF NOT EXISTS playhistory(
    id INTEGER PRIMARY KEY autoincrement,
    name TEXT,
    author TEXT,
    playTimes INTEGER default 1    
)"""


# 粗略设计
# 所有平台的id号都归为一类，
# 但推荐时使用的网易云系统。
class UserDbManager(DbManager):

    def __init__(self, database=dbPath, *args):
        super().__init__(database, *args)
        self.initDb()

    def initDb(self):
        self.createTable(createTableString)

    def getSongByPlayTimes(self, maxes=5) -> list:
        """
            返回前5个播放次数最多的歌曲信息。
        """
        fetchedData = self.cursor.execute("""SELECT id FROM playhistory 
            ORDER BY playTimes DESC 
            LIMIT {}""".format(maxes))

        # TODO
        # 错误过滤
        return [i[0] for i in fetchedData]

    def addPlayTimesById(self, songId, name='Test', author='Test'):
        """
            给songId所标示的数据playTimes + 1
        """
        try:
            insertData = self.cursor.execute("""INSERT INTO playhistory 
                (id, name, author) VALUES 
                ({0}, '{1}', '{2}')
                """.format(songId, name, author))
        except:
            # 暂时不知道sqlite中如何进行
            # 无此数据时创建，有此数据时将某个值在其基础上增加或减少。
            # 目前的思路是在初始化时进行一次查询，然后将数据次数都保存在内存中进行增减，
            # 这样可以减少数据库操作。
            # 但数据量较小，不是主要考虑目标。

            updateData = self.cursor.execute("""UPDATE playhistory 
                SET playTimes = playTimes + 1
                WHERE id = {}
                """.format(songId))

        self.db.commit()

if __name__ == '__main__':
    
    userDb = UserDbManager()

    # userDb.addPlayTimesById(7, '5', '6')
    userDb.cursor.execute("""SELECT * from playhistory""")
    print(userDb.cursor.fetchall())
    for i in userDb.cursor.fetchall():
        print(i)

    # print(userDb.getSongByPlayTimes())