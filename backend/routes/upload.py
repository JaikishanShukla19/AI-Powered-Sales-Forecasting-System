import os
import pandas as pd
from flask import Blueprint, request, jsonify

upload_bp = Blueprint("upload_bp", __name__)

UPLOAD_FOLDER = "uploads"

@upload_bp.route("/upload-data", methods=["POST"])
def upload_data():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    df = pd.read_csv(file_path)

    return jsonify({
        "message": "File uploaded successfully",
        "rows": df.shape[0],
        "columns": df.columns.tolist()
    })
