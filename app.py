import subprocess
import speedtest
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

def test_speed():
    st = speedtest.Speedtest()
    st.get_best_server()
    download_speed = st.download() / 1_000_000  # Convert to Mbps
    upload_speed = st.upload() / 1_000_000  # Convert to Mbps
    ping = st.results.ping

    return {
        "download": round(download_speed, 2),
        "upload": round(upload_speed, 2),
        "ping": ping
    }

def get_connected_devices():
    devices = subprocess.check_output("arp -a", shell=True, text=True)
    return devices

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/speedtest', methods=['GET'])
def speedtest_view():
    results = test_speed()
    return jsonify(results)

@app.route('/devices')
def devices_view():
    devices = get_connected_devices()
    # return jsonify({"devices": devices.splitlines()})
    return jsonify(devices=devices)

if __name__ == '__main__':
    # app.run(debug=True)
    app.run(host="0.0.0.0", port=5000)

