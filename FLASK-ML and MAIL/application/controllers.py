import os
import sys
import json
from flask import request, redirect, render_template, url_for, flash, session
from flask import current_app as app
from similarsearch import search
from application.utils import get_lost, get_found,sendMail
import pprint
from flask_cors import cross_origin

@app.route("/mllost", methods=["GET"])
@cross_origin(supports_credentials=True,headers=['Content-Type'])
def mllost():
    query=request.json
    dataset=get_found()
    data=search(query, dataset)
    # data={'match': 'test', 'score': 0.9}
    #convert dictionary data returned from search function to json
    jsondata=json.dumps(data)
    print(jsondata)
    return jsondata

@app.route("/mlfound", methods=["GET"])
@cross_origin(supports_credentials=True,headers=['Content-Type'])
def mlfound():
    query=request.json
    dataset=get_lost()
    data=search(query, dataset)
    #convert dictionary data returned from search function to json
    jsondata=json.dumps(data)
    print(jsondata)
    return jsondata

@app.route("/sendmail",methods=["POST"])
@cross_origin(supports_credentials=True,headers=['Content-Type'])
def sendmail():
    print(request.json)
    email=request.json["email"]
    subject=request.json["subject"]
    body=request.json["body"]
    k=sendMail(email,subject,body)
    return k


# mllost(1, 2)