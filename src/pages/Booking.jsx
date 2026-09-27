import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../supabase";

function Booking() {
  const location = useLocation();

  const [name, setName] = useState("");
  const [tickets, setTickets] = useState(1);
  const [line, setLine] = useState("");
  const [route, setRoute] = useState("");
  const [ticketType, setTicketType] = useState("Single Journey");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill fields if coming from RouteCard click
  useEffect(() => {
    if (location.state) {
      if (location.state.line) setLine(location.state.line);
      if (location.state.route) setRoute(location.state.route);
    }
  }, [location.state]);

  const farePerTicketMap = {
    "Red Line": 35,
    "Blue Line": 60,
    "Green Line": 30,
    "Purple Line": 45
  };

  const getBaseFare = () => {
    return farePerTicketMap[line] || 30;
  };

  const calculateTotalFare = () => {
    const base = getBaseFare();
    const count = Number(tickets) || 0;
    let multiplier = 1;
    if (ticketType === "Return Pass") multiplier = 1.8;
    if (ticketType === "Day Unlimited Pass") multiplier = 3.0;
    return Math.round(base * count * multiplier);
  };

  async function handleBooking(e) {
    if (e) e.preventDefault();

    if (!name || !tickets || !line || !route || !ticketType) {
      alert("Please fill all the details before booking.");
      return;
    }

    if (Number(tickets) < 1) {
      alert("Number of tickets must be at least 1.");
      return;
    }

    setIsSubmitting(true);
    const totalFare = calculateTotalFare();

    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          name: name.trim(),
          tickets: Number(tickets),
          line: line,
          route: route,
          ticket_type: ticketType,
          total_fare: totalFare
        }
      ]);

    setIsSubmitting(false);

    if (error) {
      console.error(error);
      alert("Booking failed. Please try again.");
      return;
    }

    alert(`🎉 Ticket booked successfully for ${name}! Total Fare: ₹${totalFare}`);
    // Clear form
    setName("");
    setTickets(1);
    setLine("");
    setRoute("");
    setTicketType("Single Journey");
  }

  return (
    <main className="booking-page">
      <h1>Book Your Metro Ticket</h1>
      <p className="subtitle">Select your line, travel route, and ticket options</p>

      <div className="booking-form-container">
        <form className="booking-form" onSubmit={handleBooking}>
          <label htmlFor="name">Passenger Full Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />

          <label htmlFor="line">Select Metro Line</label>
          <select
            id="line"
            value={line}
            onChange={(e) => {
              setLine(e.target.value);
              setRoute("");
            }}
            required
          >
            <option value="">-- Select Line --</option>
            <option value="Red Line">Red Line</option>
            <option value="Blue Line">Blue Line</option>
            <option value="Green Line">Green Line</option>
            <option value="Purple Line">Purple Line</option>
          </select>

          <label htmlFor="route">Select Station Route</label>
          <select
            id="route"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
            required
          >
            <option value="">-- Select Route --</option>
            {line === "Red Line" && (
              <>
                <option value="Central Terminal → Tech Park East">Central Terminal → Tech Park East</option>
                <option value="Tech Park East → Central Terminal">Tech Park East → Central Terminal</option>
              </>
            )}
            {line === "Blue Line" && (
              <>
                <option value="International Airport → City Center">International Airport → City Center</option>
                <option value="City Center → International Airport">City Center → International Airport</option>
              </>
            )}
            {line === "Green Line" && (
              <>
                <option value="North Suburbs → South Stadium">North Suburbs → South Stadium</option>
                <option value="South Stadium → North Suburbs">South Stadium → North Suburbs</option>
              </>
            )}
            {line === "Purple Line" && (
              <>
                <option value="University Campus → Financial District">University Campus → Financial District</option>
                <option value="Financial District → University Campus">Financial District → University Campus</option>
              </>
            )}
            {!line && <option value="" disabled>Please select a line first</option>}
          </select>

          <label htmlFor="tickets">Number of Passengers / Tickets</label>
          <input
            id="tickets"
            type="number"
            min="1"
            max="10"
            value={tickets}
            onChange={(e) => setTickets(e.target.value)}
            placeholder="Enter number of tickets"
            required
          />

          <label htmlFor="ticketType">Ticket Type</label>
          <select
            id="ticketType"
            value={ticketType}
            onChange={(e) => setTicketType(e.target.value)}
          >
            <option value="Single Journey">Single Journey Token</option>
            <option value="Return Pass">Return Pass (Round Trip)</option>
            <option value="Day Unlimited Pass">Day Unlimited Pass</option>
          </select>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Confirm & Book Ticket"}
          </button>
        </form>

        <section className="booking-details">
          <h3>📋 Live Ticket Summary</h3>
          <p>Passenger: <strong>{name || "-"}</strong></p>
          <p>Metro Line: <strong>{line || "-"}</strong></p>
          <p>Route: <strong>{route || "-"}</strong></p>
          <p>Tickets: <strong>{tickets || "0"}</strong></p>
          <p>Ticket Type: <strong>{ticketType}</strong></p>
          <hr />
          <p className="total-fare">
            Estimated Fare: <strong>₹{calculateTotalFare()}</strong>
          </p>
        </section>
      </div>
    </main>
  );
}

export default Booking;
