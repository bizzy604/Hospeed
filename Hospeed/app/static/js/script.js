#!/usr/bin/node

// Smooth scrolling to sections
// This script enables smooth scrolling when navigation links are clicked.
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        // Get the target section's ID from the href attribute
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        // Scroll to the target section smoothly
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Fetch simulated hospital traffic data
// This fetches data from the server to display hospital traffic on the dashboard.
fetch('/hospital_traffic')
    .then(response => response.json())
    .then(data => {
        // Call the function to display the fetched traffic data
        displayHospitalTraffic(data.traffic_data);
    });

// Function to display hospital traffic data
// This function dynamically creates and adds elements to the DOM to show hospital traffic.
function displayHospitalTraffic(data) {
    const hospitalList = document.getElementById('traffic-dashboard');
    hospitalList.innerHTML = ''; // Clear previous data

    data.forEach(hospital => {
        const hospitalItem = document.createElement('div');
        hospitalItem.classList.add('hospital-item');

        // Determine the traffic class based on the number of patients
        const trafficClass = getTrafficClass(hospital.traffic);

        // Set the inner HTML of the hospital item
        hospitalItem.innerHTML = `
            <h3>${hospital.name}</h3>
            <p>${hospital.address}</p>
            <p class="traffic-level ${trafficClass}">Traffic: ${hospital.traffic} patients</p>
        `;

        // Append the hospital item to the dashboard
        hospitalList.appendChild(hospitalItem);
    });
}

// Function to determine the traffic class based on the number of patients
// Returns a string representing the traffic level class ('high-traffic', 'medium-traffic', 'low-traffic').
function getTrafficClass(traffic) {
    if (traffic >= 30) {
        return 'high-traffic'; // Red
    } else if (traffic >= 10) {
        return 'medium-traffic'; // Blue
    } else {
        return 'low-traffic'; // Green
    }
}

// Geolocation and fetching nearby hospitals
// This script fetches the user's current location and retrieves nearby hospitals.
document.getElementById('find-hospitals').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Send the user's location to the server to find nearby hospitals
            fetch('/find_hospitals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ latitude, longitude }),
            })
            .then(response => response.json())
            .then(data => {
                const locationResult = document.getElementById('location-result');
                locationResult.innerHTML = ''; // Clear previous results
                if (data.hospitals && data.hospitals.length > 0) {
                    // Display each hospital's information
                    data.hospitals.forEach(hospital => {
                        const hospitalInfo = `
                            <div class="hospital-info">
                                <h3>${hospital.name}</h3>
                                <p>${hospital.address}</p>
                                <p>Rating: ${hospital.rating} (${hospital.user_ratings_total} reviews)</p>
                            </div>
                        `;
                        locationResult.innerHTML += hospitalInfo;
                    });
                } else {
                    locationResult.innerHTML = '<p>No hospitals found nearby.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching hospitals:', error);
            });
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

// Initialize Google Map
// This function initializes the Google Map and places markers for nearby hospitals.
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 37.7749, lng: -122.4194 }, // Default center coordinates
      zoom: 12
    });
  
    // Add event listener to find hospitals button
    document.getElementById('find-hospitals-btn').addEventListener('click', () => {
      // Hardcoded location (should be replaced with user's current location)
      const latitude = 37.7749; 
      const longitude = -122.4194; 
  
      // Send request to the server to find hospitals near the location
      fetch('/find_hospitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude })
      })
      .then(response => response.json())
      .then(data => {
        const hospitals = data.hospitals;
        // Add a marker for each hospital on the map
        hospitals.forEach(hospital => {
          const marker = new google.maps.Marker({
            position: { lat: hospital.latitude, lng: hospital.longitude },
            map: map,
            title: hospital.name
          });
        });
      });
    });
}
