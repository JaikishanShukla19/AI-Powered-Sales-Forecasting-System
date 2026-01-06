from flask import Blueprint, jsonify
import os
import pandas as pd
dashboard_bp = Blueprint("dashboard_bp", __name__)
@dashboard_bp.route("/dashboard-metrics", methods=["GET"])
def dashboard_metrics():
    try:
        upload_dir = "uploads"
        files = os.listdir(upload_dir)

        if not files:
            return jsonify({"error": "No uploaded file found"}), 400

        latest_file = max(
            [os.path.join(upload_dir, f) for f in files],
            key=os.path.getctime
        )

        df = pd.read_csv(latest_file)

        # REQUIRED columns check
        required_cols = ["sales", "cost_per_unit", "units_sold", "profit"]
        for col in required_cols:
            if col not in df.columns:
                return jsonify({"error": f"Missing column: {col}"}), 400

        total_sales = df["sales"].sum()
        avg_daily_sales = df["sales"].mean()
        last_actual_sales = df["sales"].iloc[-1]

        total_profit = df["profit"].sum()
        total_cost = (df["cost_per_unit"] * df["units_sold"]).sum()

        return jsonify({
            "total_sales": float(total_sales),
            "average_daily_sales": float(avg_daily_sales),
            "last_actual_sales": float(last_actual_sales),
            "next_predicted_sales": None,
            "total_profit": float(total_profit),
            "total_cost": float(total_cost),
            "other_cost": float(total_sales - (total_profit + total_cost))
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
