import alexnet_model
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for React connection

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def process_images(image_paths):
    return alexnet_model.deep_learning_prediction(image_paths)

@app.route("/upload", methods=["POST"])
def upload_files():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    files = request.files.getlist("file")  # Handle multiple files

    if not files or all(file.filename == "" for file in files):
        return jsonify({"error": "No selected files"}), 400

    image_paths = []
    for file in files:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)  # Save each image
        image_paths.append(file_path)

    result = process_images(image_paths)  # Process multiple images

    return jsonify({"result": result, "image_paths": image_paths})

if __name__ == "__main__":
    app.run(debug=True)
