#!usr/bin/python3
from flask import Flask, render_template, jsonify, request, Blueprint

# Create a Blueprint for the main application routes
main = Blueprint("main", __name__)

# Simulated hospital traffic data
# This is a static list of dictionaries representing hospitals and their traffic data.
hospital_traffic_data = [
    {"name": "Hospital A", "address": "123 Main St", "traffic": 20},
    {"name": "Hospital B", "address": "456 Elm St", "traffic": 5},
    {"name": "Hospital C", "address": "789 Oak St", "traffic": 32},
    {"name": "Hospital D", "address": "123 Main St", "traffic": 1},
    {"name": "Hospital E", "address": "456 Elm St", "traffic": 90}
]

@main.route('/')
def home():
    """
    Route to render the home page.
    This route serves the main page of the application where the frontend is rendered.
    """
    return render_template('index.html')

@main.route('/hospital_traffic')
def hospital_traffic():
    """
    Route to return hospital traffic data in JSON format.
    This route provides the simulated traffic data to the frontend, 
    which can be used to display traffic levels in hospitals.
    """
    return jsonify({"traffic_data": hospital_traffic_data})

@main.route('/find_hospitals', methods=['POST'])
def find_hospitals():
    """
    Route to find nearby hospitals based on user's location.
    This route accepts a POST request containing latitude and longitude,
    and returns a list of hospitals near the provided location.
    """
    data = request.json
    latitude = data.get('latitude')
    longitude = data.get('longitude')

    # Simulate finding hospitals based on location
    # In a real application, this would involve querying a database or an external API.
    hospitals = [
        {
            "name": "Nearby Hospital A", 
            "address": "101 Nearby St", 
            "rating": 4.2, 
            "user_ratings_total": 120, 
            "latitude": 37.7859, 
            "longitude": -122.4364
        },
        {
            "name": "Nearby Hospital B", 
            "address": "202 Nearby St", 
            "rating": 4.5, 
            "user_ratings_total": 90, 
            "latitude": 37.7963, 
            "longitude": -122.4092
        },
    ]

    # Return the found hospitals in JSON format
    return jsonify({"hospitals": hospitals})
