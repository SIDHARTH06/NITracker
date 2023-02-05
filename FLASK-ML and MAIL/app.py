import os
from flask import Flask, session
from application.config import DevelopConfig
from flask_cors import CORS, cross_origin

app=None

def create_app():
    app=Flask(__name__)
    print("Starting Development")
    CORS(app)
    cors=CORS(app,resources={r"/*": {"origins": "*"}}, support_credentials=True)
    app.config.from_object(DevelopConfig)
    app.app_context().push()
    return app

app=create_app()

from application.controllers import *

if __name__=='__main__':
    app.run(host='0.0.0.0',port=9000)