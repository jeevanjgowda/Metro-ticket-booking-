import { useNavigate } from "react-router-dom";

function RouteCard(props) {
  const navigate = useNavigate();

  const getBadgeColor = (line) => {
    switch (line.toLowerCase()) {
      case "red line":
        return "#e63946";
      case "blue line":
        return "#1d3557";
      case "green line":
        return "#2a9d8f";
      case "purple line":
        return "#7209b7";
      default:
        return "#182b49";
    }
  };

  const badgeStyle = {
    backgroundColor: getBadgeColor(props.line),
    color: "#ffffff",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    display: "inline-block",
    marginBottom: "12px",
    textTransform: "uppercase"
  };

  const handleBookClick = () => {
    navigate("/booking", {
      state: {
        line: props.line,
        route: `${props.origin} → ${props.destination}`
      }
    });
  };

  return (
    <div className="route-card">
      <span style={badgeStyle}>{props.line}</span>
      <h2>
        {props.origin} ➔ {props.destination}
      </h2>
      <p>🕒 <strong>Hours:</strong> {props.hours}</p>
      <p>💰 <strong>Fare:</strong> ₹{props.fare} / passenger</p>
      <button onClick={handleBookClick}>Book Ticket</button>
    </div>
  );
}

export default RouteCard;
