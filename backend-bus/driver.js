import fs from "fs";
import { io } from "socket.io-client";
const tripId = process.argv[2];
const routeFile = process.argv[3];
if (!tripId) {
  console.error("TripId not inputted");
  process.exit(1);
}

const route = routeFile
  ? JSON.parse(fs.readFileSync(routeFile)) //include route like ./test-rout1.json
  : [
      { lat: 40.7128, lng: -74.006 }, //hardcoded-dummy values for no routes.json file
      { lat: 40.7138, lng: -74.005 },
      { lat: 40.7148, lng: -74.004 },
      { lat: 40.7158, lng: -74.003 },
    ];

const socket = io("http://localhost:3000");

let index = 0;

socket.on("connect", () => {
  console.log("Simulator connected to backend");

  const interval = setInterval(() => {
    if (index >= route.length) {
      index = 0; //keeps looping between co-ordinates
    }

    const { lat, lng } = route[index];
    socket.emit("location-update", { tripId, lat, lng });
    console.log(`Sent location: ${lat}, ${lng}`);
    index++;
  }, 2000);
});
