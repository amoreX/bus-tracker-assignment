# Backend Bus Tracking API

This is the backend server for a real-time bus tracking system. It provides API endpoints to create and manage trips, and uses WebSocket to broadcast live location updates.

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/amoreX/bus-tracker-assignment.git
cd bus-tracker-assignment
```

### 2.Install dependancies
```bash
npm i
```

### 3.How to Use
## Step 1: Visit the Frontend
    Open the frontend app in your browser .
    👉Link : https://frontend-bustracker.vercel.app/

## Step 2: Create a Trip
    Use the frontend to create a new trip.

**IMPORTANT**:

    - Click Track Trip before starting the driver
    - After creating a trip, make sure to click the "Track Trip" button on the frontend.
    - This enables the frontend to listen to live location updates for your trip.

## Step 3: Start the Driver Simulator

    Open a new terminal and run:
    node driver.js T-0
    replace T-0 with the tripId from Frontend

## Step 4: Custom Routes

    - open and modify "test-route1.json" with custom routes
    - open a new terminal and run
    - node driver.js T-0 ./test-route1.json
    - replace ./test-route1.json with your custom routes file if need be
