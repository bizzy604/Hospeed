// Smooth scrolling to sections
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Fetch simulated hospital traffic data
fetch('/hospital_traffic')
    .then(response => response.json())
    .then(data => {
        displayHospitalTraffic(data.traffic_data);
    });

// Function to display hospital traffic data
function displayHospitalTraffic(data) {
    const hospitalList = document.getElementById('traffic-dashboard');
    hospitalList.innerHTML = '';

    data.forEach(hospital => {
        const hospitalItem = document.createElement('div');
        hospitalItem.classList.add('hospital-item');

        const trafficClass = getTrafficClass(hospital.traffic);

        hospitalItem.innerHTML = `
            <h3>${hospital.name}</h3>
            <p>${hospital.address}</p>
            <p class="traffic-level ${trafficClass}">Traffic: ${hospital.traffic} patients</p>
        `;

        hospitalList.appendChild(hospitalItem);
    });
}

// Function to determine the traffic class based on the number of patients
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
document.getElementById('find-hospitals').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

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
