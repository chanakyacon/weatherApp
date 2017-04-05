from flask import Flask

weather_page = Flask(__name__)

from weatherApp import views
