# 🚑 AeroRescue: Emergency Ambulance Dispatch System

![AeroRescue Banner](https://via.placeholder.com/1200x400/0b0f19/cfd8dc?text=AeroRescue:+Next-Gen+Ambulance+Dispatch)

> **AeroRescue** is a state-of-the-art, web-based emergency dispatch simulation dashboard designed to triage incoming incidents, optimize ambulance routing, and dramatically reduce critical response times. Built specifically for modern urban infrastructure (currently modeled for Nashik, Maharashtra).

**🏆 Hackathon Submission Ready**

---

## 📖 Table of Contents
- [Inspiration](#-inspiration)
- [What It Does](#-what-it-does-core-features)
- [How It Works](#-how-it-works-under-the-hood)
- [Technical Stack](#%EF%B8%8F-technical-stack)
- [Installation & Setup](#-installation--setup)
- [Screenshots & UI](#-screenshots--ui)
- [Challenges We Ran Into](#-challenges-we-ran-into)
- [Future Scope](#-future-scope)
- [License](#-license)

---

## 💡 Inspiration
In critical emergencies, every second counts. Traditional dispatch systems often rely on manual routing and simplistic nearest-hospital metrics without considering actual road limits, hospital load, or traffic conditions. **AeroRescue** was born to bridge this gap, serving as a sophisticated "Mission Control" that acts autonomously or alongside human operators. 

---

## ⚡ What It Does (Core Features)

### 🤖 Intelligent AI Hospital Selection (Triage Algorithm)
AeroRescue uses a weighted **scoring algorithm** to evaluate the absolute best drop-off location based on:
- **Proximity:** Shortest physical driving distance over actual roads.
- **Resource Availability:** Real-time checking of free beds and available on-call doctors.
- **Specialty Matching:** e.g., A "Stroke" patient heavily biases towards hospitals with a "Neurology" specialty.
- **Hospital Load:** Evaluates current operational capacity to prevent bottlenecks and overcrowding.

### 🗺️ Live Dynamic Routing (OSRM Integration)
Instead of abstract straight-line (Euclidean) paths, AeroRescue queries the **Open Source Routing Machine (OSRM)** API.
- Calculates paths directly mapped over actual street infrastructure.
- Interactive rendered routes using SVG animations to display traffic flow direction.
- Real-time route recalculation during mid-transit manual reroutes.

### 🚦 Smart Traffic Signal Overrides
To prioritize emergency transport, the system scans upcoming traffic signals along the generated route. When the ambulance approaches within specific proximity, the system automatically triggers a simulated **Signal Override to Green**, reverting safely after the intersection is cleared.

### 🪄 Operator Interface (Dark Mode Glassmorphism)
Multi-tab oversight layout tailored for low-latency cognitive processing:
- **Dispatch Hub:** The main queue. Operators manage live distress calls, view Aadhaar-linked verification stats, and see AI hospital assignments.
- **Live Assets (Comms):** Tracks moving units on dynamic maps. Allows operators to manually *Reroute* mid-transit.
- **Driver View (HUD):** Localized GPS navigation locking to the ambulance coordinates for turn-by-turn tracking.
- **Analytics Dashboard:** Visual metric display monitoring System Load, Average Response Time, and Heatmaps.

### ⚙️ Automated AI Dispatch Engine
Operators can toggle an **"Auto-Dispatch" function** during high-volume spikes. The system automatically processes the oldest queue request, pairs it with the smartest hospital and closest ambulance, and launches the mission entirely autonomously.

---

## ⚙️ How It Works (Under The Hood)
1. **Event Ingestion:** System generates or receives mock emergency events (cardiac arrest, trauma, etc.).
2. **Evaluation:** The AI calculates `(Distance Weight) + (Specialty Weight) + (Capacity Weight)` for all registered urban hospitals.
3. **Dispatch:** Recommends optimal ambulance deployment.
4. **Transit & Telemetry:** OSRM decodes the Polyline path while Leaflet animates the asset token step-by-step. Map bounds adjust per tick.
5. **Analytics:** Logs resolution times to the global `Chart.js` arrays for dashboard rendering.

---

## 🛠️ Technical Stack
**Frontend / Client Side**
- **HTML5 & CSS3:** Responsive grid/flex properties with custom Glassmorphism aesthetic.
- **JavaScript (ES6+):** Complete logic handling from AI calculations to DOM rendering.
- **Leaflet.js:** Advanced map rendering & token movement.
- **Google Maps Tiles:** Custom raster overlay parameters imported for dark aesthetic.
- **Chart.js:** Robust reporting tools and data visualization.
- **Google Material Icons:** Iconography & visually coherent styling.

**Web Services & APIs**
- **OSRM (Open Source Routing Machine) API:** Turn-by-turn spatial directions and route decoding.

---

## 🚀 Installation & Setup

Because **AeroRescue** heavily leverages vanilla web technologies, the setup is incredibly straightforward without heavy dependencies.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/aerorescue-dispatch.git
   cd aerorescue-dispatch
   ```

2. **Launch the application:**
   - **Option A (VS Code):** Use the `Live Server` extension to serve `index.html`.
   - **Option B (Node):** Use any local static server like `npx serve .` or `python -m http.server 8000`.
   - **Option C (Direct):** Simply open `index.html` in your modern web browser (Edge/Chrome/Firefox).

*(Note: Requires an active internet connection to load Map Tiles and hit the OSRM Routing API.)*

---

## 📸 Screenshots & UI

*(Add your screenshots here before submission!)*

- **Dashboard View:** `![Dashboard Queue](assets/dashboard.png)`
- **Dynamic Routing:** `![Map Routing](assets/routing.png)`
- **Analytics Profile:** `![Data Charts](assets/analytics.png)`

---

## 🚧 Challenges We Ran Into
- **Precise Geo-Routing:** Mapping ambulances on a clean Euclidean plane is simple, but snapping their coordinates perfectly to meandering city streets required deep integration with OSRM and manual decoding of encoded polylines.
- **Real-Time UI Synchronization:** Managing multiple simultaneous events (live clocks, moving ambulances, tracking logic, queue updates) solely in vanilla JavaScript required writing a solid custom tick-loop and interval orchestrator.
- **Aesthetic vs Performance:** Implementing heavy CSS backdrop blurs (Glassmorphism) over dynamically rerendering map tiles impacted frame rates initially. We optimized DOM reflows by caching elements and abstracting chart updates.

---

## 🔭 Future Scope
- **Backend Port & Database:** Migrating the simulation states to a Node/Express backend connected to MongoDB/PostgreSQL for persistent histories.
- **IoT Integration:** Connecting simulated GPS pulses to actual physical ambulance hardware.
- **Mobile Companion App:** Creating an interface exclusively for the ambulance driver to receive the turn-by-turn dispatch.
- **Machine Learning Forecasts:** Implementing Python-based prediction models to preemptively stage ambulances at historical incident hotspots before calls occur.

---

## 📝 License
This project is open-source and available under the [MIT License](LICENSE). 

*Built with ❤️ for rapid emergency response.*
