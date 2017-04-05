from weatherApp import weather_page
from flask import render_template


@weather_page.route('/')
def my_weather():
    return render_template('index.html')
