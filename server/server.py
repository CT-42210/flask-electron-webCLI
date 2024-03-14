from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import auth

app = Flask(__name__, template_folder='../templates', static_folder='../static')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def test(data):
    return {'response': 'data recived!', 'data': data}


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/test', methods=['POST'])
def auth():
    try:
        dataIN = request.get_json()
        dataOUT = test(dataIN)
        return jsonify(dataOUT)
    except Exception as e:
        return jsonify({'e': e})


@app.route('/auth', methods=['POST'])
def auth():
    try:
        dataIN = request.get_json()
        dataOUT = auth.Main.sessionAuth(dataIN)
        return jsonify(dataOUT)
    except Exception as e:
        return jsonify({'e': e})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
