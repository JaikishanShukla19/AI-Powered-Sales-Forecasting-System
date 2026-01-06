from flask import Blueprint, jsonify, request
from ml.model import generate_forecast
from ml.preprocess import preprocess_sales_data
import os
forecast_bp = Blueprint("forecast_bp", __name__)

@forecast_bp.route("/forecast", methods=["GET"])
def forecast():
    days = request.args.get("days", default=30, type=int)

    try:
        forecast_df = generate_forecast(periods=days)
    except FileNotFoundError:
        return jsonify({"error": "Model not trained yet"}), 400

    return jsonify({
        "days": days,
        "forecast": forecast_df.to_dict(orient="records")
    })
@forecast_bp.route("/actual-sales", methods=["GET"])
def actual_sales():
    files = os.listdir("uploads")
    latest_file = max(
        [os.path.join("uploads", f) for f in files],
        key=os.path.getctime
    )

    df = preprocess_sales_data(latest_file)

    data = df.reset_index()[["date", "sales"]].tail(30)
    data.rename(columns={"sales": "actual"}, inplace=True)

    return data.to_dict(orient="records")