from flask import Flask, request, jsonify, render_template, request
# from flask.ext.scss import Scss
from flask_assets import Environment, Bundle

from images import get_images
import logging
import json


app = Flask(__name__)

assets = Environment(app)
assets.url = app.static_url_path
# assets.url = app.static_url_path
scss = Bundle('scss/main.scss', filters='pyscss', output='css/all.css')
assets.register('scss_all', scss)

# Scss(app, static_dir='static', asset_dir='assets')
app.debug = True


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/images/<int:start_index>')
def get_images_api(start_index):
    try:
        if start_index:
            start_index = int(start_index)
        else:
            start_index = 0
        images = get_images(start_index=start_index)
        return jsonify(data=images)
    except:
        logging.exception("error")
        raise

if __name__ == '__main__':
    app.run()
