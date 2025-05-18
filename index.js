import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const trips = [];

//API Endpoints
app.get("/", (req, res) => {
  res.send(
    "Hosted on render, pleaes visit https://github.com/amoreX/live-bus-tracker-lite-nihal for details!",
  );
});
app.get("/trips", (req, res) => {
  res.json(trips);
});

app.post("/trips", (req, res) => {
  const { id, currentLocation } = req.body;
  console.log(id, currentLocation);
  const newTrip = {
    id: id || `T-${trips.length}`,
    currentLocation: currentLocation || { lat: 40.7128, lng: -74.006 },
    status: "active",
  };
  trips.push(newTrip);
  res.json(newTrip);
  console.log(trips);
});

//Websocket part

io.on("connection", (socket) => {
  socket.on("join-trip", (tripId) => {
    socket.join(tripId);
  });

  socket.on("leave-trip", (tripId) => {
    socket.leave(tripId);
  });

  socket.on("location-update", ({ tripId, lat, lng }) => {
    try {
      const trip = trips.find((t) => t.id === tripId);
      if (trip) {
        trip.currentLocation = { lat, lng };
        io.to(tripId).emit("location-update", { tripId, lat, lng });
        console.log(` trip ${tripId}: lat=${lat}, lng=${lng}`);
      } else {
        console.warn(` Trip not found: ${tripId}`);
      }
    } catch (err) {
      console.error(` Error updating location:`, err);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running`);
});
