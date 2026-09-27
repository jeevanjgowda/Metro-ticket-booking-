import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RoutesPage from "./pages/RoutesPage";
import Booking from "./pages/Booking";
import BookingHistory from "./pages/BookingHistory";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/history" element={<BookingHistory />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
