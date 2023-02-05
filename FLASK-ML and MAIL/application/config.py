import os

basedir=os.path.abspath(os.path.dirname(__file__))

class Config():
    DEBUG=False
    SECRET_KEY=None
    CORS_HEADERS = None
    
class DevelopConfig(Config):

    DEBUG=True
    SECRET_KEY="fgdmgfdgnmddrmdfmngndsm"
    CORS_HEADERS = ['Content-Type','x-access-token']