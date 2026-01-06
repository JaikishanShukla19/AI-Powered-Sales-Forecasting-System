# import os
# from flask import Blueprint, jsonify
# from ml.preprocess import preprocess_sales_data
# from ml.model import train_prophet_model

# train_bp = Blueprint("train_bp", __name__)
# UPLOAD_FOLDER = "uploads"

# @train_bp.route("/train-model", methods=["POST"])
# def train_model():
#     files = os.listdir(UPLOAD_FOLDER)

#     if not files:
#         return jsonify({"error": "No uploaded file found"}), 400

#     latest_file = max(
#         [os.path.join(UPLOAD_FOLDER, f) for f in files],
#         key=os.path.getctime
#     )

#     df = preprocess_sales_data(latest_file)
#     train_prophet_model(df)

#     return jsonify({
#         "message": "Prophet model trained successfully",
#         "rows_used": df.shape[0]
#     })




import os
from flask import Blueprint, jsonify
from ml.preprocess import preprocess_sales_data
from ml.model import train_prophet_model

train_bp = Blueprint("train_bp", __name__)

UPLOAD_FOLDER = "uploads"

@train_bp.route("/train-model", methods=["POST"])
def train_model():
    files = os.listdir(UPLOAD_FOLDER)

    if not files:
        return jsonify({"error": "No uploaded file found"}), 400

    latest_file = max(
        [os.path.join(UPLOAD_FOLDER, f) for f in files],
        key=os.path.getctime
    )

    df = preprocess_sales_data(latest_file)
    train_prophet_model(df)

    return jsonify({"message": "Model trained successfully"})
