import RouteCard from "../components/RouteCard";

function RoutesPage() {
  const sampleRoutes = [
    {
      id: 1,
      line: "Red Line",
      origin: "Central Terminal",
      destination: "Tech Park East",
      hours: "05:30 AM - 11:30 PM",
      fare: 35
    },
    {
      id: 2,
      line: "Blue Line",
      origin: "International Airport",
      destination: "City Center Junction",
      hours: "05:00 AM - 11:45 PM",
      fare: 60
    },
    {
      id: 3,
      line: "Green Line",
      origin: "North Suburbs",
      destination: "South Stadium",
      hours: "06:00 AM - 11:00 PM",
      fare: 30
    },
    {
      id: 4,
      line: "Purple Line",
      origin: "University Campus",
      destination: "Financial District",
      hours: "05:45 AM - 11:15 PM",
      fare: 45
    }
  ];

  return (
    <main className="routes-page">
      <h1>Active Metro Routes</h1>
      <p className="subtitle">Select a line to view operating schedule and instant booking</p>
      
      <div className="routes-grid">
        {sampleRoutes.map((route) => (
          <RouteCard
            key={route.id}
            line={route.line}
            origin={route.origin}
            destination={route.destination}
            hours={route.hours}
            fare={route.fare}
          />
        ))}
      </div>
    </main>
  );
}

export default RoutesPage;
