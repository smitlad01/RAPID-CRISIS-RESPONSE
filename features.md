# AeroRescue: Emergency Ambulance Dispatch System

**AeroRescue** is a state-of-the-art, web-based emergency dispatch simulation dashboard designed to triage incoming incidents, optimize ambulance routing, and dramatically reduce critical response times in Nashik, Maharashtra.

This tool functions as a sophisticated "Mission Control" for emergency operators, integrating intelligent AI-assisted hospital selection with live navigation map rendering.

## Core Features & How They Work

### 1. Intelligent AI Hospital Selection (Triage Algorithm)
When a distress call is received, the system evaluates all hospitals within the city database. It does not just look for the closest building; it uses a weighted **scoring algorithm** to evaluate the absolute best drop-off location based on:
- **Proximity:** The physical driving distance calculated to prioritize the shortest possible route.
- **Resource Availability:** Checks if the hospital has free beds and available on-call doctors.
- **Specialty Matching:** If a patient suffered a "Stroke", hospitals with a "Neurology" specialty receive a heavy point boost.
- **Hospital Load:** Evaluates current operational capacity to prevent overcrowding.

### 2. Live Dynamic Routing (OSRM Integration)
AeroRescue actively queries the **Open Source Routing Machine (OSRM)** API. Instead of drawing abstract straight lines, the map calculates the actual shortest/fastest route by mapping vectors directly over the physical road and street infrastructure of Nashik.
- Routes are rendered dynamically using animated SVG dash sequences that indicate the direction of flow.
- Instantly regenerates paths if a hospital reroute is triggered mid-transit.

### 3. Smart Traffic Signal Overrides
To ensure emergency transport moves seamlessly, the tracking engine actively scans traffic signals along the generated road route. As the dispatched ambulance approaches a junction (within ~1.5 - 2km), the system will automatically override the signal node to "Green" allowing rapid transit, resetting it once the ambulance has safely cleared the intersection.

### 4. Interactive Operator Interface (Glassmorphism UI)
The entire layout is styled using premium, dark-mode glassmorphism. It is split into interactive tabs that give dispatchers multi-level oversight:
- **Dispatch Hub:** The main queue. Operators can accept live requests, view mock Caller ID (simulated Aadhaar lookups), inspect patient histories, and review the AI's hospital assignment.
- **Live Assets (Comms):** Manages actively moving units. Allows the operator to alter the assigned destination mid-route using the *Reroute* function, generating new ETAs in real time.
- **Driver View (HUD):** A localized, dark-themed GPS turn-by-turn navigation map that tracks alongside the ambulance, locking onto the exact coordinates and adjusting camera bounds automatically.
- **Analytics Dashboard:** Uses `Chart.js` to showcase system performance metrics like Average Response Time, Hospital Load distribution, and incident volume mapping.

### 5. Automated AI Dispatch Toggle
For high-volume scenarios, operators can toggle the "Auto-Dispatch" function. This operates on an interval, automatically popping the oldest distress call from the queue, calculating the AI optimal route, and dispatching the nearest valid ambulance completely autonomously without manual intervention.

---

## Technical Stack
- **Frontend Code:** Vanilla JavaScript ES6, HTML5, Vanilla CSS3 (Custom properties, flexbox grids, keyframe animations).
- **Mapping Engine:** Leaflet.js rendering Google Maps raster tile layers.
- **Routing Engine:** Hosted OSRM driving APIs returning precise GeoJSON road coordinates.
- **Charts:** Chart.js for data visualization.
- **Icons & Typography:** Google Material Icons Round, Inter/Outfit Google Fonts.
