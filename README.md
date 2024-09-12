<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hospeed - Real-time Hospital Traffic</title>
    <link rel="icon" type="image/x-icon" href="{{ url_for('static', filename='favicon.png') }}">
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Navigation Bar -->
    <nav>
        <div class="container">
            <div class="logo">
                <h1>Hospeed</h1>
            </div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </nav>

    <!-- Hero Section -->
    <header class="hero" id="home">
        <div class="container">
            <h1>Your Real-time Hospital Traffic Assistant</h1>
            <p>Make informed decisions before visiting a hospital. Avoid long queues and get treated faster.</p>
            <a href="#location-search" class="cta-button">Check Traffic Now</a>
        </div>
    </header>

    <!-- Features Section -->
    <section class="features" id="features">
        <div class="container">
            <h2>Why Choose Hospeed?</h2>
            <div class="feature-cards">
                <div class="card">
                    <h3>Real-time Updates</h3>
                    <p>Get up-to-the-minute information on hospital traffic directly from hospital APIs.</p>
                </div>
                <div class="card">
                    <h3>Easy to Use</h3>
                    <p>No need to sign up. Just enter your location and get instant results.</p>
                </div>
                <div class="card">
                    <h3>Save Time</h3>
                    <p>Avoid overcrowded hospitals and save valuable time for yourself and your loved ones.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Hospital Traffic Dashboard Section -->
    <section class="dashboard" id="dashboard">
        <div class="container">
            <h2>Hospital Traffic Dashboard</h2>
            <div id="traffic-dashboard" class="dashboard-grid"></div>
        </div>
    </section>

    <!-- Search Section -->
    <section class="location-search" id="location-search">
        <div class="container">
            <h2>Find Hospitals Near You</h2>
            <button id="find-hospitals" class="cta-button">Find Nearby Hospitals</button>
            <div id="location-result"></div>
        </div>
    </section>

    <!-- Developer Story Section -->
  <section class="developer">
    <h2>Meet the Developer</h2>
    <p>I’m Amoni Kevin, a passionate software developer, experienced in building solutions that matter. Hospeed is a portfolio project developed to demonstrate my skills in full-stack development.</p>
    <a href="https://github.com/bizzy604/Hospeed" class="btn-secondary">View on GitHub</a>
  </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a></li>
                <a href="#">Support</a>
            </div>
            <p>&copy; 2024 Hospeed. All rights reserved.</p>
        </div>
    </footer>

    <script src="{{ url_for('static', filename='js/script.js') }}"></script>
</body>
</html>
