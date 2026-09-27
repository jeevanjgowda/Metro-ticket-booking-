import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <h1>Welcome to Metro Transit Express 🚆</h1>
        <p>Fast, comfortable, and reliable city travel at your fingertips.</p>
        <div className="hero-buttons">
          <Link to="/routes" className="btn btn-primary">View Metro Routes</Link>
          <Link to="/booking" className="btn btn-secondary">Book Ticket Now</Link>
        </div>
      </section>

      <section className="features-grid">
        <div className="feature-card">
          <h3>⚡ Quick Ticketing</h3>
          <p>Instant QR tickets & passes generated without waiting in line at station counters.</p>
        </div>
        <div className="feature-card">
          <h3>🗺️ Multiple Lines</h3>
          <p>Seamless connectivity across Red Line, Blue Line, Green Line, and Purple Line corridors.</p>
        </div>
        <div className="feature-card">
          <h3>💳 Safe & Easy Payment</h3>
          <p>Integrated database records and real-time history tracking for all your travel bookings.</p>
        </div>
      </section>
    </main>
  );
}

export default Home;
