#!/usr/bin/node

// Smooth scrolling to sections
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        scrollToSection(this.getAttribute('href').substring(1));
    });
});

// Helper function for smooth scrolling
function scrollToSection(targetId) {
    const targetSection = document.getElementById(targetId);
    window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
    });
}

// Fetch simulated hospital traffic data
fetch('/hospital_traffic')
    .then(response => response.json())
    .then(data => {
        displayHospitalTraffic(data.traffic_data);
    });

// Function to display hospital traffic data
function displayHospitalTraffic(data) {
    const hospitalList = document.getElementById('traffic-dashboard');
    hospitalList.innerHTML = ''; // Clear previous data

    data.forEach(hospital => {
        const hospitalItem = createHospitalItem(hospital);
        hospitalList.appendChild(hospitalItem);
    });
}

// Helper function to create a hospital item element
function createHospitalItem(hospital) {
    const hospitalItem = document.createElement('div');
    hospitalItem.classList.add('hospital-item');

    const trafficClass = getTrafficClass(hospital.traffic);

    hospitalItem.innerHTML = `
        <h3>${hospital.name}</h3>
        <p>${hospital.address}</p>
        <p class="traffic-level ${trafficClass}">Traffic: ${hospital.traffic} patients</p>
    `;

    return hospitalItem;
}

// Function to determine the traffic class based on the number of patients
function getTrafficClass(traffic) {
    if (traffic >= 30) {
        return 'high-traffic';
    } else if (traffic >= 10) {
        return 'medium-traffic';
    } else {
        return 'low-traffic';
    }
}

// Geolocation and fetching nearby hospitals
document.getElementById('find-hospitals').addEventListener('click', fetchNearbyHospitals);

function fetchNearbyHospitals() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            sendLocationToServer(latitude, longitude);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Send the user's location to the server to find nearby hospitals
function sendLocationToServer(latitude, longitude) {
    fetch('/find_hospitals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude, longitude }),
    })
        .then(response => response.json())
        .then(data => displayNearbyHospitals(data.hospitals))
        .catch(error => {
            console.error('Error fetching hospitals:', error);
        });
}

// Function to display nearby hospitals
function displayNearbyHospitals(hospitals) {
    const locationResult = document.getElementById('location-result');
    locationResult.innerHTML = ''; // Clear previous results

    if (hospitals && hospitals.length > 0) {
        hospitals.forEach(hospital => {
            locationResult.innerHTML += createHospitalInfo(hospital);
        });
    } else {
        locationResult.innerHTML = '<p>No hospitals found nearby.</p>';
    }
}

// Helper function to create hospital information HTML
function createHospitalInfo(hospital) {
    return `
        <div class="hospital-info">
            <h3>${hospital.name}</h3>
            <p>${hospital.address}</p>
            <p>Rating: ${hospital.rating} (${hospital.user_ratings_total} reviews)</p>
        </div>
    `;
}

// Initialize Google Map
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 12
    });

    document.getElementById('find-hospitals-btn').addEventListener('click', () => {
        const latitude = 37.7749; // Replace with dynamic location if needed
        const longitude = -122.4194;
        findHospitalsAndPlaceMarkers(map, latitude, longitude);
    });
}

// Find hospitals and place markers on the map
function findHospitalsAndPlaceMarkers(map, latitude, longitude) {
    fetch('/find_hospitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude })
    })
        .then(response => response.json())
        .then(data => {
            data.hospitals.forEach(hospital => {
                createMarker(map, hospital);
            });
        });
}

// Helper function to create a marker on the map
function createMarker(map, hospital) {
    new google.maps.Marker({
        position: { lat: hospital.latitude, lng: hospital.longitude },
        map: map,
        title: hospital.name
    });
}
