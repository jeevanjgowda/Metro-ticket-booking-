import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [selectedLine, setSelectedLine] = useState("All");
  const [loading, setLoading] = useState(false);

  async function getBookings() {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*");

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Failed to retrieve bookings");
      return;
    }

    setBookings(data || []);
  }

  useEffect(() => {
    getBookings();
  }, []);

  const filteredBookings = selectedLine === "All"
    ? bookings
    : bookings.filter((b) => b.line === selectedLine);

  return (
    <main className="history-page">
      <h1>Booking History</h1>
      <p className="subtitle">View and filter all retrieved ticket bookings</p>

      <div className="history-controls">
        <button className="history-button" onClick={getBookings} disabled={loading}>
          {loading ? "Refreshing..." : "🔄 Refresh Bookings"}
        </button>

        <div className="filter-group">
          <label htmlFor="filterLine">Filter by Line: </label>
          <select
            id="filterLine"
            value={selectedLine}
            onChange={(e) => setSelectedLine(e.target.value)}
          >
            <option value="All">All Lines</option>
            <option value="Red Line">Red Line</option>
            <option value="Blue Line">Blue Line</option>
            <option value="Green Line">Green Line</option>
            <option value="Purple Line">Purple Line</option>
          </select>
        </div>
      </div>

      <div className="history-table-wrapper">
        {filteredBookings.length === 0 ? (
          <div className="no-bookings">
            <p>No bookings found {selectedLine !== "All" ? `for ${selectedLine}` : ""}.</p>
          </div>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Passenger</th>
                <th>Metro Line</th>
                <th>Route</th>
                <th>Tickets</th>
                <th>Type</th>
                <th>Total Fare</th>
                <th>Booked At</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.name}</td>
                  <td>
                    <span className={`line-tag line-${booking.line ? booking.line.toLowerCase().replace(" ", "-") : "default"}`}>
                      {booking.line}
                    </span>
                  </td>
                  <td>{booking.route}</td>
                  <td>{booking.tickets}</td>
                  <td>{booking.ticket_type}</td>
                  <td>₹{booking.total_fare}</td>
                  <td>{booking.created_at ? new Date(booking.created_at).toLocaleDateString() : "Just now"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}

export default BookingHistory;
