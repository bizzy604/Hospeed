from flask import Flask, render_template, jsonify, request, Blueprint

# app = Flask(__name__)
main = Blueprint("main", __name__)

# Simulated hospital traffic data
hospital_traffic_data = [
    {"name": "Hospital A", "address": "123 Main St", "traffic": 20},
    {"name": "Hospital B", "address": "456 Elm St", "traffic": 5},
    {"name": "Hospital C", "address": "789 Oak St", "traffic": 32},
    {"name": "Hospital D", "address": "123 Main St", "traffic": 1},
    {"name": "Hospital E", "address": "456 Elm St", "traffic": 90}
]

@main.route('/')
def home():
    return render_template('index.html')

@main.route('/hospital_traffic')
def hospital_traffic():
    return jsonify({"traffic_data": hospital_traffic_data})

@main.route('/find_hospitals', methods=['POST'])
def find_hospitals():
    data = request.json
    latitude = data.get('latitude')
    longitude = data.get('longitude')

    # Simulate finding hospitals based on location (static data for now)
    hospitals = [
        {"name": "Nearby Hospital 1", "address": "101 Nearby St", "rating": 4.2, "user_ratings_total": 120},
        {"name": "Nearby Hospital 2", "address": "202 Nearby St", "rating": 4.5, "user_ratings_total": 90},
    ]

    return jsonify({"hospitals": hospitals})
