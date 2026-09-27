import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>🚆 Metro Transit Express</h2>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/routes">Metro Routes</Link>
        <Link to="/booking">Book Ticket</Link>
        <Link to="/history">Booking History</Link>
      </div>
    </nav>
  );
}

export default Navbar;
