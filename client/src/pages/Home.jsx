import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">

      <section className="hero">
        <h1>Secure Your Future with InsureLife</h1>

        <p>
          Protect your family, vehicle and business with our trusted
          insurance solutions.
        </p>

        <div className="hero-buttons">
          <Link to="/login">
            <button>Login</button>
          </Link>

          <Link to="/register">
            <button className="register-btn">Register</button>
          </Link>
        </div>
      </section>

      <section className="features">

        <div className="feature-card">
          <h2>5000+</h2>
          <p>Happy Customers</p>
        </div>

        <div className="feature-card">
          <h2>24/7</h2>
          <p>Customer Support</p>
        </div>

        <div className="feature-card">
          <h2>100%</h2>
          <p>Secure Service</p>
        </div>

        <div className="feature-card">
          <h2>Fast</h2>
          <p>Claim Settlement</p>
        </div>

      </section>

      <section className="services">

        <h2>Our Services</h2>

        <div className="service-grid">

          <div className="service-card">
            <h3>🏥 Health Insurance</h3>
            <p>Comprehensive health coverage for you and your family.</p>
          </div>

          <div className="service-card">
            <h3>🚗 Vehicle Insurance</h3>
            <p>Protect your car and bike against accidents and damage.</p>
          </div>

          <div className="service-card">
            <h3>🏠 Home Insurance</h3>
            <p>Secure your home against unexpected losses.</p>
          </div>

          <div className="service-card">
            <h3>💼 Business Insurance</h3>
            <p>Reliable protection for your business and assets.</p>
          </div>

        </div>

      </section>

      <section className="why-us">

        <h2>Why Choose Us?</h2>

        <ul>
          <li>✔ Trusted Insurance Company</li>
          <li>✔ Affordable Premium Plans</li>
          <li>✔ Fast Claim Approval</li>
          <li>✔ Expert Customer Support</li>
        </ul>

      </section>

      <section className="reviews">

        <h2>Customer Reviews</h2>

        <div className="review-card">
          ⭐⭐⭐⭐⭐
          <p>"Excellent service and quick claim settlement."</p>
        </div>

        <div className="review-card">
          ⭐⭐⭐⭐⭐
          <p>"Very easy to manage insurance policies."</p>
        </div>

      </section>

      <footer>
        <p>© 2026 Insurance Management System | All Rights Reserved</p>
      </footer>

    </div>
  );
}

export default Home;