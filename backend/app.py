
from flask import Flask
from flask_cors import CORS
from routes.dashboard import dashboard_bp

from routes.upload import upload_bp
from routes.train import train_bp
from routes.forecast import forecast_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(upload_bp)
app.register_blueprint(train_bp)
app.register_blueprint(forecast_bp)
app.register_blueprint(dashboard_bp)

@app.route("/")
def home():
    return {"message": "AI Sales Forecasting Backend Running"}

if __name__ == "__main__":
    print("Registered routes:")
    print(app.url_map)
    app.run(debug=True)
