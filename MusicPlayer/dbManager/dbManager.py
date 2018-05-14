import sqlite3


class DbManager(object):

    def __init__(self, *args):
        self.db = sqlite3.connect(*args)
        self.cursor = self.db.cursor()

    def __enter__(self):

        return self.cursor

    def __exit__(self, types, value, traceback):
        self.db.commit()

        return False

    def __del__(self):
    	self.db.commit()
    	self.db.close()

    def switchDb(self, *args):
        self.db.close()

        self.db = sqlite3.connect(*args)
        self.cursor = self.db.cursor()

    def createTable(self, tableString):
        self.cursor.execute(tableString)
        self.db.commit()

    def commitAndClose(self):
    	self.db.commit()
    	self.db.close()