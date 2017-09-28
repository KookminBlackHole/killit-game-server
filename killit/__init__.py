from flask import Flask
from flask import request
from flask import Blueprint
from flask import render_template_string
from flask import jsonify

from flask_socketio import SocketIO
from flask_socketio import emit

from killit.config import Config

app = Flask(__name__)
app.config.from_object(Config)

socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template_string("<h1>Killit Game Server</h1><h2>Version 1.0.0</h2>")

@socketio.on('connect') 
def version_connect(): 
    send({'result': 0, 'version': '1.0.0'})

