# __coding:utf8__
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    print(1)
    return render_template('alihanniba.html')


@app.route('/log')
def log():
    return render_template('log.html')


@app.route('/movie')
def about():
    return render_template('movie.html')


if __name__ == '__main__':
    app.run(debug=True)
