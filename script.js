// ============================================================
// AeroRescue — AI Hospital Routing & Smart Traffic Signals
// ============================================================

// ============================
// HOSPITAL DATABASE
// ============================
const hospitalDatabase = [
    {
        id: "HSP-001", name: "Wockhardt Hospitals",
        coords: [19.9800, 73.7800],
        address: "Wadala Naka, Nashik",
        beds: { total: 150, available: 14 },
        doctors: { total: 45, available: 12 },
        specialties: ["Trauma", "Cardiac", "Neurology", "General"],
        loadPercent: 65
    },
    {
        id: "HSP-002", name: "Sahyadri Hospitals",
        coords: [19.9891, 73.7933],
        address: "Dwarka Circle, Nashik",
        beds: { total: 100, available: 6 },
        doctors: { total: 30, available: 8 },
        specialties: ["Cardiac", "Pediatrics", "Trauma", "General"],
        loadPercent: 78
    },
    {
        id: "HSP-003", name: "Apollo Hospitals",
        coords: [20.0120, 73.8160],
        address: "Panchavati, Nashik",
        beds: { total: 120, available: 20 },
        doctors: { total: 40, available: 10 },
        specialties: ["Neurology", "General", "Orthopedics", "Cardiac"],
        loadPercent: 55
    },
    {
        id: "HSP-004", name: "Civil Hospital",
        coords: [19.9969, 73.7781],
        address: "Ashok Stambh Area, Nashik",
        beds: { total: 300, available: 32 },
        doctors: { total: 80, available: 25 },
        specialties: ["Trauma", "Burns", "Neurology", "Orthopedics", "Pediatrics", "General"],
        loadPercent: 88
    },
    {
        id: "HSP-005", name: "Synergy Hospital",
        coords: [20.0350, 73.8050],
        address: "Dindori Road, Mhasrul, Nashik",
        beds: { total: 80, available: 10 },
        doctors: { total: 25, available: 5 },
        specialties: ["General", "Cardiac"],
        loadPercent: 42
    },
    {
        id: "HSP-006", name: "Ashoka Medicover",
        coords: [19.9735, 73.7914],
        address: "Indira Nagar, Nashik",
        beds: { total: 180, available: 15 },
        doctors: { total: 55, available: 14 },
        specialties: ["Neurology", "Cardiac", "Orthopedics", "General"],
        loadPercent: 85
    },
    {
        id: "HSP-007", name: "Magnum Hospitals",
        coords: [19.9960, 73.7660],
        address: "Canada Corner, Nashik",
        beds: { total: 60, available: 5 },
        doctors: { total: 20, available: 3 },
        specialties: ["Cardiac", "General"],
        loadPercent: 92
    },
    {
        id: "HSP-008", name: "Gravity Hospital",
        coords: [20.0180, 73.8150],
        address: "Panchavati, Nashik",
        beds: { total: 50, available: 12 },
        doctors: { total: 15, available: 4 },
        specialties: ["Trauma", "General"],
        loadPercent: 40
    },
    {
        id: "HSP-009", name: "Nine Pearl hospital",
        coords: [19.9650, 73.7850],
        address: "Vallabh Nagar, Nashik",
        beds: { total: 70, available: 8 },
        doctors: { total: 20, available: 6 },
        specialties: ["Pediatrics", "General", "Orthopedics"],
        loadPercent: 60
    }
];

// ============================
// TRAFFIC SIGNALS DATABASE
// ============================
const trafficSignals = [
    { id: "SIG-01", name: "CBS Junction", coords: [20.0061, 73.8022], state: "red", overridden: false },
    { id: "SIG-02", name: "Ashok Stambh", coords: [20.0036, 73.8092], state: "red", overridden: false },
    { id: "SIG-03", name: "Dwarka Circle", coords: [20.0006, 73.7992], state: "red", overridden: false },
    { id: "SIG-04", name: "Rajiv Gandhi Bhavan", coords: [20.0051, 73.8052], state: "red", overridden: false },
    { id: "SIG-05", name: "Trimbak Naka", coords: [20.0096, 73.7872], state: "red", overridden: false },
    { id: "SIG-06", name: "Mumbai Naka", coords: [19.9956, 73.7721], state: "red", overridden: false },
    { id: "SIG-07", name: "Bapu Pul", coords: [19.9876, 73.7872], state: "red", overridden: false },
    { id: "SIG-08", name: "Shalini Wada", coords: [20.0066, 73.8152], state: "red", overridden: false },
    { id: "SIG-09", name: "Raviwar Karanja", coords: [20.0026, 73.8012], state: "red", overridden: false },
    { id: "SIG-10", name: "Bhosala Military School Jct", coords: [19.9946, 73.8132], state: "red", overridden: false }
];

// ============================
// INCIDENT TYPE → SPECIALTY MAP
// ============================
const incidentSpecialtyMap = {
    "Cardiac Arrest": "Cardiac",
    "Heart Attack": "Cardiac",
    "Stroke": "Neurology",
    "Traffic Collision": "Trauma",
    "Fall Trauma": "Orthopedics",
    "Burns": "Burns",
    "Pediatric Emergency": "Pediatrics",
    "Gunshot Wound": "Trauma",
    "Breathing Difficulty": "General",
    "default": "General"
};

// ============================
// MOCK INCIDENTS & DATA
// ============================
let mockIncidents = [
    {
        id: "REQ-0992", phone: "+91 9876543210", 
        type: "Cardiac Arrest", time: "Just now", 
        location: "142 MG Road, Nashik",
        victim: "Male, 54yrs. History of hypertension.",
        status: "critical", coords: [20.0075, 73.7998]
    },
    {
        id: "REQ-0993", phone: "+91 7766554433", 
        type: "Traffic Collision", time: "2 mins ago", 
        location: "Mumbai-Agra Highway",
        victim: "Multi-vehicle, trapped occupants.",
        status: "severe", coords: [19.9776, 73.7842]
    }
];

// Aadhaar Database Mock mapping by phone
const aadhaarDB = {
    "+91 9876543210": { name: "Rajesh Kumar", city: "Nashik", area: "Gangapur Road", photo: "https://ui-avatars.com/api/?name=R+K&background=475569&color=fff" },
    "+91 7766554433": { name: "Sunita Sharma", city: "Nashik", area: "Indira Nagar", photo: "https://ui-avatars.com/api/?name=S+S&background=475569&color=fff" }
};

// Available units
const availableUnits = [
    { id: "AMB-104", type: "ALS Ambulance", distanceStr: "2.1 km", availableFor: "REQ-0992", coords: [20.0126, 73.8092], driver: "Vikram Singh", plate: "MH-12-AB-1234" },
    { id: "AMB-207", type: "BLS Ambulance", distanceStr: "3.5 km", availableFor: "REQ-0993", coords: [19.9826, 73.7792], driver: "Amit Patel", plate: "MH-14-GH-9999" }
];

let dispatchHistory = [
    { id: "REQ-0980", type: "Stroke Protocol", loc: "Nashik Road", unit: "AMB-112", hospital: "Nashik Civil Hospital Emergency Wing", timeTaken: "8 min", status: "completed" },
    { id: "REQ-0985", type: "Fall Trauma", loc: "City Center Mall", unit: "AMB-098", hospital: "City Trauma Center", timeTaken: "12 min", status: "completed" }
];

// Active services — each now stores hospital, ambulance sim state, etc.
let activeServices = [];

let activeIncident = null;
let mapLayers = [];
let hospitalMapLayers = [];
let signalMapLayers = [];
let map;
let driverMap = null;
let driverMapLayers = [];

// ============================
// DOM ELEMENTS
// ============================
const incidentListEl = document.getElementById('incident-list');
const dispatchDetailsEl = document.getElementById('selected-incident-details');
const historyTbody = document.getElementById('history-tbody');
const activeServicesContainer = document.getElementById('active-services-container');
const liveRequestsBadge = document.getElementById('live-requests-badge');
const trafficOverrideBadge = document.getElementById('traffic-override-badge');
const trafficOverrideCount = document.getElementById('traffic-override-count');
const ringtoneMock = document.getElementById('ringtone-mock');

// ============================
// INIT
// ============================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMap();
    renderHospitalsOnMap();
    renderSignalsOnMap();
    renderIncidentQueue();
    renderActiveServices();
    renderHistory();
    initAnalyticsChart();
    initAutoDispatch();
});

// ============================
// MAP INIT
// ============================
function initMap() {
    map = L.map('map-frame').setView([19.9975, 73.7898], 12);
    L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3'], attribution: '© Google Maps' }).addTo(map);
}

function clearMapLayers() {
    mapLayers.forEach(layer => map.removeLayer(layer));
    mapLayers = [];
}

// ============================
// HOSPITAL MARKERS ON MAP
// ============================
function renderHospitalsOnMap() {
    hospitalMapLayers.forEach(l => map.removeLayer(l));
    hospitalMapLayers = [];
    
    hospitalDatabase.forEach(h => {
        const isAvailable = h.beds.available > 0 && h.doctors.available > 0;
        const markerClass = isAvailable ? 'available' : 'full';
        
        const icon = L.divIcon({
            className: 'custom-map-icon hospital-icon',
            html: `
                <div class="marker-pin ${isAvailable ? 'blue-pin' : 'gray-pin'}"><span class="material-icons-round">local_hospital</span></div>
                <div class="marker-label" style="${!isAvailable ? 'color: var(--text-secondary);' : ''}">${h.name}</div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });
        
        const marker = L.marker(h.coords, { icon: icon }).addTo(map);
        
        marker.bindPopup(`
            <div class="hospital-popup">
                <div class="hp-name">${h.name}</div>
                <div class="hp-row"><span>Beds Available:</span> <strong>${h.beds.available}/${h.beds.total}</strong></div>
                <div class="hp-row"><span>Doctors On-Call:</span> <strong>${h.doctors.available}/${h.doctors.total}</strong></div>
                <div class="hp-row"><span>Load:</span> <strong>${h.loadPercent}%</strong></div>
                <div class="hp-specialty">Specialties: ${h.specialties.join(', ')}</div>
            </div>
        `);
        
        hospitalMapLayers.push(marker);
    });
}

// ============================
// TRAFFIC SIGNALS ON MAP
// ============================
function createSignalIcon(signal) {
    const lightClass = signal.overridden ? 'green' : 'red';
    const alertHtml = signal.overridden 
        ? `<div class="signal-alert-banner">🚑 AMBULANCE ON THE WAY</div>` 
        : '';
    
    return L.divIcon({
        className: 'traffic-signal-marker',
        html: `
            <div style="position:relative;">
                ${alertHtml}
                <div class="signal-light ${lightClass}"></div>
            </div>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
    });
}

function renderSignalsOnMap() {
    signalMapLayers.forEach(l => map.removeLayer(l));
    signalMapLayers = [];
    
    trafficSignals.forEach(sig => {
        const icon = createSignalIcon(sig);
        const marker = L.marker(sig.coords, { icon: icon, zIndexOffset: sig.overridden ? 800 : 100 }).addTo(map);
        
        const statusClass = sig.overridden ? 'cleared' : 'normal';
        const statusText = sig.overridden ? '🟢 CLEARED' : '🔴 Normal';
        marker.bindPopup(`
            <div class="signal-popup">
                <div class="sp-name">${sig.name}</div>
                <div class="sp-status ${statusClass}">${statusText}</div>
            </div>
        `);
        
        sig._marker = marker;
        signalMapLayers.push(marker);
    });
}

function updateSignalMarker(sig) {
    if (sig._marker) {
        sig._marker.setIcon(createSignalIcon(sig));
    }
}

// ============================
// AI HOSPITAL SELECTION ENGINE
// ============================
function getDistanceKm(coords1, coords2) {
    // Haversine formula
    const R = 6371;
    const dLat = (coords2[0] - coords1[0]) * Math.PI / 180;
    const dLon = (coords2[1] - coords1[1]) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(coords1[0] * Math.PI / 180) * Math.cos(coords2[0] * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function findBestHospital(incidentType, patientCoords, searchRadiusKm = 50) {
    const neededSpecialty = incidentSpecialtyMap[incidentType] || incidentSpecialtyMap["default"];
    
    // Filter hospitals with available beds & doctors
    let candidates = hospitalDatabase.filter(h => 
        h.beds.available > 0 && h.doctors.available > 0
    );
    
    if (candidates.length === 0) {
        // Absolute fallback — hospital with most beds even if 0 (edge case)
        candidates = [...hospitalDatabase].sort((a, b) => b.beds.available - a.beds.available);
    }
    
    // Score each candidate
    const scored = candidates.map(h => {
        const dist = getDistanceKm(patientCoords, h.coords);
        if (dist > searchRadiusKm) return null;
        
        let score = 0;
        
        // Distance score (closer = better, max 50 points to ensure shortest route)
        score += Math.max(0, 50 - (dist * 5));
        
        // Bed availability score (max 25 points)
        const bedRatio = h.beds.available / h.beds.total;
        score += bedRatio * 25;
        
        // Doctor availability score (max 20 points)
        const docRatio = h.doctors.available / h.doctors.total;
        score += docRatio * 20;
        
        // Specialty match score (max 15 points)
        if (h.specialties.includes(neededSpecialty)) {
            score += 15;
        } else if (h.specialties.includes("General")) {
            score += 5;
        }
        
        // Load score (lower load = better, max 10 points)
        score += (100 - h.loadPercent) / 10;
        
        return { hospital: h, score: Math.round(score * 10) / 10, distance: Math.round(dist * 100) / 100, specialty: neededSpecialty };
    }).filter(Boolean);
    
    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);
    
    return scored; // Returns all ranked hospitals, best first
}

function getETAMinutes(distKm) {
    // Assume ambulance speed ~40 km/h in city
    return Math.round((distKm / 40) * 60);
}

// ============================
// AUTO DISPATCH LOGIC
// ============================
function initAutoDispatch() {
    const toggle = document.getElementById('auto-dispatch-toggle');
    if (!toggle) return;
    
    toggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            window.autoDispatchInterval = setInterval(() => {
                if (mockIncidents.length > 0) {
                    const inc = mockIncidents[0];
                    const unitForIncident = availableUnits.find(u => u.availableFor === inc.id) || availableUnits[0];
                    if (unitForIncident) {
                        activeIncident = inc;
                        window.dispatchUnit(unitForIncident.id);
                        
                        // Toast notification for auto dispatch
                        const toast = document.createElement('div');
                        toast.style.position = 'fixed';
                        toast.style.bottom = '24px';
                        toast.style.right = '24px';
                        toast.style.background = 'var(--accent-green)';
                        toast.style.color = '#fff';
                        toast.style.padding = '12px 20px';
                        toast.style.borderRadius = '8px';
                        toast.style.zIndex = '9999';
                        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                        toast.style.fontWeight = '600';
                        toast.innerHTML = `<span class="material-icons-round" style="font-size:16px; vertical-align:middle; margin-right:8px;">auto_mode</span> AI Auto-Dispatched Unit ${unitForIncident.id}`;
                        document.body.appendChild(toast);
                        setTimeout(() => toast.remove(), 4000);
                    }
                }
            }, 3000); // Check queue every 3s
        } else {
            if (window.autoDispatchInterval) clearInterval(window.autoDispatchInterval);
        }
    });
}

// ============================
// VIEW & TAB NAVIGATION
// ============================
function initNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.querySelectorAll('.view-section').forEach(view => view.classList.remove('active-view'));
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active-view');
            
            if(targetId === 'view-dashboard') { setTimeout(() => map.invalidateSize(), 200); }
            if(targetId === 'view-driver') { 
                renderDriverView();
                if(driverMap) setTimeout(() => driverMap.invalidateSize(), 200);
            }
        });
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.querySelectorAll('.tab-content').forEach(pane => pane.classList.remove('active-tab'));
            const targetTab = btn.getAttribute('data-tab');
            document.getElementById(targetTab).classList.add('active-tab');
        });
    });
}

// ============================
// RENDER INCIDENT QUEUE
// ============================
function renderIncidentQueue() {
    incidentListEl.innerHTML = '';
    liveRequestsBadge.innerText = `${mockIncidents.length} Active`;
    
    mockIncidents.forEach((inc, index) => {
        const card = document.createElement('div');
        card.className = `incident-card ${index === 0 ? 'pulse' : ''}`;
        card.innerHTML = `
            <div style="font-size:9px; color:var(--text-secondary); text-transform:uppercase; margin-bottom: 4px; letter-spacing: 0.5px;">Emergency Request</div>
            <div class="ic-header">
                <span class="ic-title">${inc.type}</span>
                <span class="ic-time">${inc.time}</span>
            </div>
            <div class="ic-loc"><span class="material-icons-round" style="font-size:14px">place</span> ${inc.location}</div>
        `;
        card.addEventListener('click', () => selectIncident(inc));
        incidentListEl.appendChild(card);
    });
    
    if(mockIncidents.length === 0) {
        incidentListEl.innerHTML = `<p style="color:var(--text-secondary); text-align:center; padding:20px 0;">No active requests.</p>`;
    }
}

// ============================
// SELECT INCIDENT → AI HOSPITAL + DISPATCH
// ============================
function selectIncident(incident) {
    activeIncident = incident;
    document.querySelectorAll('.incident-card').forEach(c => c.classList.remove('pulse'));
    document.querySelector('[data-tab="tab-dispatch"]').click();
    dispatchDetailsEl.classList.remove('empty-state');

    clearMapLayers();
    let patientIcon = L.divIcon({
        className: 'custom-map-icon patient-icon',
        html: `
            <div class="marker-pin red-pin"><span class="material-icons-round">emergency</span></div>
            <div class="marker-label pulse-label">Patient</div>
        `, iconSize: [40, 40], iconAnchor: [20, 20]
    });
    let patientMarker = L.marker(incident.coords, {icon: patientIcon}).addTo(map);
    mapLayers.push(patientMarker);

    const unitForIncident = availableUnits.find(u => u.availableFor === incident.id);
    
    // --- AI HOSPITAL SELECTION ---
    const rankedHospitals = findBestHospital(incident.type, incident.coords);
    const bestMatch = rankedHospitals[0];
    const alternatives = rankedHospitals.slice(1, 4);
    
    // Aadhaar Mock UI
    const callerID = aadhaarDB[incident.phone] || { name: "Unknown Caller", city: "Unknown", area: "Unknown", photo: "https://ui-avatars.com/api/?name=U&background=475569&color=fff" };

    // Hospital AI Card
    let hospitalHtml = '';
    if (bestMatch) {
        const h = bestMatch.hospital;
        const eta = getETAMinutes(bestMatch.distance);
        
        // Highlight selected hospital on map
        let hospIcon = L.divIcon({
            className: 'custom-map-icon hospital-icon',
            html: `
                <div class="marker-pin blue-pin"><span class="material-icons-round">local_hospital</span></div>
                <div class="marker-label">${h.name}</div>
            `, iconSize: [40, 40], iconAnchor: [20, 20]
        });
        let selectedHospMarker = L.marker(h.coords, {icon: hospIcon}).addTo(map);
        mapLayers.push(selectedHospMarker);
        
        hospitalHtml = `
            <div class="hospital-ai-card">
                <h4><span class="material-icons-round" style="font-size:14px;">psychology</span> <span class="ai-label">AI-Selected Hospital</span>
                    <span class="ai-score-badge" style="margin-left:auto;">Score: ${bestMatch.score}</span>
                </h4>
                <div style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; margin-bottom: 2px;">Patient Name</div>
                <div style="font-weight:600; font-size:12px; margin-bottom: 8px;">${callerID.name}</div>
                <div style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; margin-bottom: 2px;">Hospital Assignment</div>
                <div class="hospital-name">${h.name}</div>
                <div style="font-size:11px; color:var(--text-secondary);">${h.address} · <span style="color:var(--accent-cyan);">${bestMatch.specialty}</span></div>
                <div class="hospital-stats">
                    <div class="hospital-stat">
                        <span class="stat-value beds">${h.beds.available}</span>
                        <span class="stat-label">Beds Free</span>
                    </div>
                    <div class="hospital-stat">
                        <span class="stat-value doctors">${h.doctors.available}</span>
                        <span class="stat-label">Doctors</span>
                    </div>
                    <div class="hospital-stat">
                        <span class="stat-value distance">${bestMatch.distance}</span>
                        <span class="stat-label">km Away</span>
                    </div>
                    <div class="hospital-stat">
                        <span class="stat-value eta">${eta} min</span>
                        <span class="stat-label">ETA</span>
                    </div>
                </div>
                ${alternatives.length > 0 ? `
                <div class="hospital-alternatives">
                    <h5>Alternatives</h5>
                    ${alternatives.map(a => `
                        <div class="alt-hospital-row">
                            <span class="alt-name">${a.hospital.name}</span>
                            <span class="alt-dist">${a.distance}km · ${a.hospital.beds.available} beds</span>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
            </div>
        `;
    }

    // Unit dispatch section
    let dispatchHtml = '';
    if (unitForIncident) {
        let ambIcon = L.divIcon({
            className: 'custom-map-icon ambulance-icon',
            html: `
                <div class="marker-pin green-pin"><span class="material-icons-round">local_shipping</span></div>
                <div class="marker-label">${unitForIncident.id}</div>
            `, iconSize: [40, 40], iconAnchor: [20, 20]
        });
        let unitMarker = L.marker(unitForIncident.coords, {icon: ambIcon}).addTo(map);
        mapLayers.push(unitMarker);
        
        let unitIdQuoted = "'" + unitForIncident.id + "'";
        
        dispatchHtml = `
            <div class="unit-dispatch-row">
                <div class="detail-block" style="border-left: 3px solid var(--accent-green); margin-bottom:8px;">
                    <h4><span class="material-icons-round" style="font-size:14px;">local_shipping</span> Closest Unit</h4>
                    <div class="info-row"><span class="info-label">Unit</span> <span class="info-val" style="color:var(--accent-green)">${unitForIncident.id}</span></div>
                    <div class="info-row"><span class="info-label">Driver</span> <span class="info-val">${unitForIncident.driver}</span></div>
                    <div class="info-row"><span class="info-label">Distance</span> <span class="info-val">${unitForIncident.distanceStr}</span></div>
                </div>
                <button class="btn primary-btn" onclick="dispatchUnit(${unitIdQuoted})"><span class="material-icons-round" style="font-size:18px;">local_shipping</span> Dispatch Now</button>
            </div>
        `;

        // Route lines: unit → patient → hospital
        getOSRMRoutePoints(unitForIncident.coords, incident.coords).then(points => {
            let routeUnitToPatient = L.polyline(points, {color: '#10b981', weight: 4, dashArray: '5, 10'}).addTo(map);
            mapLayers.push(routeUnitToPatient);
            if (!bestMatch) map.fitBounds(L.featureGroup(mapLayers).getBounds().pad(0.2));
        });
        
        if (bestMatch) {
            getOSRMRoutePoints(incident.coords, bestMatch.hospital.coords).then(points => {
                let routePatientToHosp = L.polyline(points, {color: '#6366f1', weight: 4, opacity: 0.5}).addTo(map);
                mapLayers.push(routePatientToHosp);
                map.fitBounds(L.featureGroup(mapLayers).getBounds().pad(0.2));
            });
        }
    }

    dispatchDetailsEl.innerHTML = `
        <div class="dispatch-compact-header">
            <div class="dch-incident" style="border-left: 4px solid var(--accent-red);">
                <div style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; margin-bottom: 6px; letter-spacing: 0.5px;">Emergency Details</div>
                <div class="dch-top">
                    <span class="dch-id">${incident.id}</span>
                    <span class="dch-type">${incident.type}</span>
                </div>
                <div class="dch-loc">${incident.location}</div>
                <div class="dch-victim">${incident.victim}</div>
            </div>
            <div class="dch-caller">
                <div style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; margin-bottom: 6px; letter-spacing: 0.5px;">Patient Name / Caller Info</div>
                <div class="dch-caller-content">
                    <img src="${callerID.photo}" class="dch-photo" />
                    <div class="dch-caller-info">
                        <div class="dch-caller-name">${callerID.name}</div>
                        <div class="dch-caller-meta">${incident.phone}</div>
                        <div class="dch-caller-meta">${callerID.city}, ${callerID.area}</div>
                    </div>
                </div>
            </div>
        </div>
        ${hospitalHtml}
        ${dispatchHtml}
    `;
}

// ============================
// DISPATCH UNIT
// ============================
window.dispatchUnit = function(unitName) {
    if(!activeIncident) return;
    
    const unitAsset = availableUnits.find(u => u.id === unitName);
    
    // AI select hospital
    const rankedHospitals = findBestHospital(activeIncident.type, activeIncident.coords);
    const bestHospital = rankedHospitals[0];
    
    let newService = {
        inc: activeIncident,
        unit: unitAsset,
        hospital: bestHospital ? bestHospital.hospital : hospitalDatabase[0],
        hospitalScore: bestHospital ? bestHospital.score : 0,
        hospitalDistance: bestHospital ? bestHospital.distance : 0,
        rankedHospitals: rankedHospitals,
        chat: [
            {from: 'system', text: `Unit ${unitName} dispatched. Route locked.`},
            {from: 'system', text: `🏥 AI selected: ${bestHospital ? bestHospital.hospital.name : 'N/A'} (Score: ${bestHospital ? bestHospital.score : 0})`}
        ],
        callActive: false,
        callTime: 0,
        callInterval: null,
        // Ambulance simulation state
        ambulancePos: [...unitAsset.coords],
        ambulancePhase: 'to-patient', // 'to-patient' or 'to-hospital'
        simulationInterval: null,
        ambulanceMarker: null,
        routeLayer: null,
        signalsCleared: []
    };
    
    activeServices.push(newService);
    
    // Decrease hospital beds by 1 (reserved)
    if (bestHospital) {
        bestHospital.hospital.beds.available = Math.max(0, bestHospital.hospital.beds.available - 1);
        renderHospitalsOnMap();
    }

    dispatchDetailsEl.classList.add('empty-state');
    dispatchDetailsEl.innerHTML = `
        <span class="material-icons-round empty-icon" style="color:var(--accent-green)">check_circle</span>
        <p>Unit <strong>${unitName}</strong> dispatched to ${activeIncident.id}.<br>
        Hospital: <strong>${bestHospital ? bestHospital.hospital.name : 'Unknown'}</strong><br>
        Track in Comms Tab or Driver View.</p>
    `;

    // Remove from queue
    const index = mockIncidents.findIndex(i => i.id === activeIncident.id);
    if(index > -1) mockIncidents.splice(index, 1);
    
    activeIncident = null;
    
    renderIncidentQueue();
    renderActiveServices();
    startAmbulanceSimulation(activeServices.length - 1);
    
    // Auto-switch to Comms tab
    document.querySelector('[data-tab="tab-comms"]').click();
};

// ============================
// AMBULANCE MOVEMENT SIMULATION
// ============================
function interpolatePosition(from, to, fraction) {
    return [
        from[0] + (to[0] - from[0]) * fraction,
        from[1] + (to[1] - from[1]) * fraction
    ];
}

async function getOSRMRoutePoints(from, to) {
    try {
        const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.routes && data.routes.length > 0) {
            return data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]); // Lon,Lat -> Lat,Lon
        }
    } catch (e) {
        console.error('OSRM route failed:', e);
    }
    
    // Fallback to synthetic points if API fails
    const points = [from];
    for (let i = 1; i < 15; i++) {
        const frac = i / 15;
        const base = interpolatePosition(from, to, frac);
        const jitter = 0.001 * (Math.random() - 0.5);
        points.push([base[0] + jitter, base[1] + jitter]);
    }
    points.push(to);
    return points;
}

async function startAmbulanceSimulation(serviceIdx) {
    const srv = activeServices[serviceIdx];
    if (!srv) return;
    
    // Generate real route points using OSRM APIs
    const routeToPatient = await getOSRMRoutePoints(srv.unit.coords, srv.inc.coords);
    const routeToHospital = await getOSRMRoutePoints(srv.inc.coords, srv.hospital.coords);
    
    srv.routeToPatient = routeToPatient;
    srv.routeToHospital = routeToHospital;
    srv.currentRouteIdx = 0;
    if (routeToPatient.length > 0) srv.ambulancePos = routeToPatient[0];
    
    let currentRoute = routeToPatient;
    let stepIndex = 0;
    
    // Create ambulance marker on map
    const ambIcon = L.divIcon({
        className: 'custom-map-icon ambulance-icon',
        html: `
            <div class="marker-pin green-pin"><span class="material-icons-round">local_shipping</span></div>
            <div class="marker-label">${srv.unit.id} En Route</div>
        `, iconSize: [40, 40], iconAnchor: [20, 20]
    });
    
    srv.ambulanceMarker = L.marker(srv.unit.coords, { icon: ambIcon, zIndexOffset: 1000 }).addTo(map);
    mapLayers.push(srv.ambulanceMarker);
    
    // Visualize route
    srv.routeLayer = L.polyline(routeToPatient, {color: '#10b981', weight: 5, dashArray: '10, 15', className: 'animated-route-fast', opacity: 0.9}).addTo(map);
    mapLayers.push(srv.routeLayer);
    
    srv.simulationInterval = setInterval(() => {
        stepIndex++;
        
        if (stepIndex >= currentRoute.length) {
            if (srv.ambulancePhase === 'to-patient') {
                // Reached patient → switch to hospital route
                srv.ambulancePhase = 'to-hospital';
                srv.chat.push({from: 'system', text: '📍 Reached patient location. Heading to hospital.'});
                currentRoute = routeToHospital;
                stepIndex = 0;
                
                // Update route line
                if (srv.routeLayer) map.removeLayer(srv.routeLayer);
                srv.routeLayer = L.polyline(routeToHospital, {color: '#6366f1', weight: 5, dashArray: '10, 15', className: 'animated-route-fast', opacity: 0.9}).addTo(map);
                
                // Update marker label to Target
                const ambIconHosp = L.divIcon({
                    className: 'custom-map-icon ambulance-icon',
                    html: `
                        <div class="marker-pin blue-pin"><span class="material-icons-round">local_shipping</span></div>
                        <div class="marker-label">${srv.unit.id} to Hospital</div>
                    `, iconSize: [40, 40], iconAnchor: [20, 20]
                });
                if (srv.ambulanceMarker) srv.ambulanceMarker.setIcon(ambIconHosp);
                mapLayers.push(srv.routeLayer);
                
                renderActiveServices();
                return;
            } else {
                // Reached hospital — stop simulation
                clearInterval(srv.simulationInterval);
                srv.simulationInterval = null;
                srv.chat.push({from: 'system', text: '🏥 Arrived at hospital. Patient delivered safely.'});
                
                // Reset all overridden signals
                resetServiceSignals(srv);
                renderActiveServices();
                renderDriverView();
                return;
            }
        }
        
        const newPos = currentRoute[stepIndex];
        srv.ambulancePos = newPos;
        srv.currentRouteIdx = stepIndex;
        srv.ambulanceMarker.setLatLng(newPos);
        
        // Update traffic signals
        updateTrafficSignalsForAmbulance(srv, currentRoute, stepIndex);
        
        // Update driver view if visible
        if (driverMap && document.getElementById('view-driver').classList.contains('active-view')) {
            renderDriverView();
        }
        
    }, 2000); // Move every 2 seconds
}

// ============================
// TRAFFIC SIGNAL MANAGEMENT
// ============================
function updateTrafficSignalsForAmbulance(srv, route, currentStep) {
    const ambulancePos = srv.ambulancePos;
    let overriddenCount = 0;
    
    // Reset previously overridden signals by this service
    srv.signalsCleared.forEach(sigId => {
        const sig = trafficSignals.find(s => s.id === sigId);
        if (sig) {
            sig.overridden = false;
            sig.state = 'red';
            updateSignalMarker(sig);
        }
    });
    srv.signalsCleared = [];
    
    // Find signals within 2km ahead on the route
    const remainingRoute = route.slice(currentStep);
    
    trafficSignals.forEach(sig => {
        const distToAmbulance = getDistanceKm(ambulancePos, sig.coords);
        
        // Check: is the signal within 2km AND roughly ahead on the route?
        if (distToAmbulance <= 2) {
            // Check if signal is ahead (not behind) by checking distance to remaining route points
            let isAhead = false;
            for (let i = 0; i < remainingRoute.length; i++) {
                const distToRoutePoint = getDistanceKm(sig.coords, remainingRoute[i]);
                if (distToRoutePoint < 0.5) { // within 500m of route
                    isAhead = true;
                    break;
                }
            }
            
            if (isAhead || distToAmbulance <= 1.5) { // within 1.5km always clear
                sig.overridden = true;
                sig.state = 'green';
                srv.signalsCleared.push(sig.id);
                overriddenCount++;
                updateSignalMarker(sig);
            }
        }
    });
    
    // Update traffic badge
    const totalOverridden = trafficSignals.filter(s => s.overridden).length;
    if (totalOverridden > 0) {
        trafficOverrideBadge.style.display = 'flex';
        trafficOverrideBadge.classList.add('active-override');
        trafficOverrideCount.textContent = totalOverridden;
    } else {
        trafficOverrideBadge.style.display = 'none';
        trafficOverrideBadge.classList.remove('active-override');
    }
    
    // Re-render signals
    renderSignalsOnMap();
}

function resetServiceSignals(srv) {
    srv.signalsCleared.forEach(sigId => {
        const sig = trafficSignals.find(s => s.id === sigId);
        if (sig) {
            sig.overridden = false;
            sig.state = 'red';
        }
    });
    srv.signalsCleared = [];
    
    const totalOverridden = trafficSignals.filter(s => s.overridden).length;
    if (totalOverridden === 0) {
        trafficOverrideBadge.style.display = 'none';
        trafficOverrideBadge.classList.remove('active-override');
    }
    
    renderSignalsOnMap();
}

// ============================
// RENDER ACTIVE SERVICES (COMMS TAB)
// ============================
function renderActiveServices() {
    if(activeServices.length === 0) {
        activeServicesContainer.innerHTML = `
            <div id="no-active-services" class="empty-state">
                <span class="material-icons-round empty-icon">assignment_turned_in</span>
                <p>No active pending services. Dispatched units will be tracked here until they reach the hospital.</p>
            </div>
        `;
        return;
    }
    
    activeServicesContainer.innerHTML = '';
    
    activeServices.forEach((srv, index) => {
        let card = document.createElement('div');
        card.className = 'active-service-card';
        
        let chatHtml = srv.chat.map(m => `<div class="chat-msg ${m.from}">${m.text}</div>`).join('');
        
        // Timer display
        let m = Math.floor(srv.callTime/60).toString().padStart(2, '0');
        let s = (srv.callTime%60).toString().padStart(2, '0');
        let timerDisplay = `${m}:${s}`;
        
        // Hospital select options
        const availableHospitals = hospitalDatabase.filter(h => h.beds.available > 0 || h.id === srv.hospital.id);
        let hospitalOptions = availableHospitals.map(h => 
            `<option value="${h.id}" ${h.id === srv.hospital.id ? 'selected' : ''}>${h.name} (${h.beds.available} beds)</option>`
        ).join('');
        
        const phaseLabel = srv.ambulancePhase === 'to-patient' ? '🔴 En Route to Patient' : '🔵 En Route to Hospital';
        
        card.innerHTML = `
            <div class="asc-header" onclick="toggleAccordion('asc-body-${index}')">
                <span><span style="color:var(--accent-red); margin-right:8px;">●</span> ${srv.inc.id} (${srv.unit.id}) — ${phaseLabel}</span>
                <span class="material-icons-round">expand_more</span>
            </div>
            
            <div class="asc-body" id="asc-body-${index}" style="display:none;">
                
                <!-- Hospital Assignment -->
                <div class="inner-section" style="border-left: 3px solid var(--accent-green);">
                    <h4><span class="material-icons-round" style="font-size:14px;">local_hospital</span> Hospital Assignment (AI Selected)</h4>
                    <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                        <span style="font-weight:600; color:white;">${srv.hospital.name}</span>
                        <span class="ai-score-badge">Score: ${srv.hospitalScore}</span>
                    </div>
                    <div style="font-size:12px; color:var(--text-secondary); margin-bottom:8px;">
                        Beds: ${srv.hospital.beds.available} free · Doctors: ${srv.hospital.doctors.available} on-call · Load: ${srv.hospital.loadPercent}%
                    </div>
                    <div class="hospital-select-wrapper">
                        <select onchange="changeHospital(${index}, this.value)">
                            ${hospitalOptions}
                        </select>
                    </div>
                </div>
                
                <!-- Telecom & Call -->
                <div class="inner-section">
                    <div class="call-header">
                        <h4>Voice Line: Patient</h4>
                        <div class="call-status ${srv.callActive ? 'active' : ''}">${srv.callActive ? 'Active' : 'Standby'}</div>
                    </div>
                    ${srv.callActive 
                        ? `<button class="btn btn-sm" style="background:#dc2626;" onclick="toggleServiceCall(${index})"><span class="material-icons-round">call_end</span> End Call (${timerDisplay})</button>`
                        : `<button class="btn btn-sm secondary-btn" onclick="toggleServiceCall(${index})"><span class="material-icons-round">call</span> Call Patient/Unit</button>`
                    }
                </div>

                <!-- Asset Tracking Module -->
                <div class="inner-section asset-tracker">
                    <h4>Unit Telemetry</h4>
                    <p><span>Patient Name:</span> <span style="font-weight:600; color:white;">${aadhaarDB[srv.inc.phone] ? aadhaarDB[srv.inc.phone].name : "Unknown Caller"}</span></p>
                    <p><span>Driver Name:</span> <span style="font-weight:600; color:white;">${srv.unit.driver}</span></p>
                    <p><span>License Plate:</span> <span style="font-weight:600; color:white;">${srv.unit.plate}</span></p>
                    <p><span>Live Position:</span> <span style="font-weight:600; color:white;">${srv.ambulancePos[0].toFixed(4)}, ${srv.ambulancePos[1].toFixed(4)}</span></p>
                    <p><span>Phase:</span> <span style="font-weight:600; color:white;">${srv.ambulancePhase === 'to-patient' ? 'Moving to Patient' : 'Moving to Hospital'}</span></p>
                    <p><span>Signals Cleared:</span> <span style="font-weight:600; color:var(--accent-green);">${srv.signalsCleared.length} active</span></p>
                </div>

                <!-- Messaging Chatbox -->
                <div class="inner-section">
                    <h4>Messaging & Logs</h4>
                    <div class="chat-box" id="cb-${index}">${chatHtml}</div>
                    <div class="chat-input-area" style="margin-top:8px;">
                        <input type="text" id="ci-${index}" placeholder="Type a message...">
                        <button class="send-btn" onclick="sendServiceChat(${index})"><span class="material-icons-round">send</span></button>
                    </div>
                </div>

                <!-- Pre-Arrival & Closure -->
                <button class="btn btn-sm success-btn" onclick="closeService(${index})" style="margin-top:12px;">
                    <span class="material-icons-round">task_alt</span> Reached Hospital (Close Permanently)
                </button>
            </div>
        `;
        activeServicesContainer.appendChild(card);
    });
}

// ============================
// CHANGE HOSPITAL MID-DISPATCH
// ============================
window.changeHospital = function(serviceIdx, hospitalId) {
    const srv = activeServices[serviceIdx];
    if (!srv) return;
    
    const newHospital = hospitalDatabase.find(h => h.id === hospitalId);
    if (!newHospital || newHospital.id === srv.hospital.id) return;
    
    // Restore bed to old hospital
    srv.hospital.beds.available = Math.min(srv.hospital.beds.total, srv.hospital.beds.available + 1);
    
    // Assign new hospital
    srv.hospital = newHospital;
    srv.hospitalDistance = getDistanceKm(srv.inc.coords, newHospital.coords);
    
    // Decrease bed at new hospital
    newHospital.beds.available = Math.max(0, newHospital.beds.available - 1);
    
    // Recalculate score
    const ranked = findBestHospital(srv.inc.type, srv.inc.coords);
    const match = ranked.find(r => r.hospital.id === newHospital.id);
    srv.hospitalScore = match ? match.score : 0;
    
    srv.chat.push({from: 'system', text: `🔄 Hospital changed to: ${newHospital.name}`});
    
    renderHospitalsOnMap();
    renderActiveServices();
    renderDriverView();
    
    // If currently in to-hospital phase, regenerate route
    if (srv.ambulancePhase === 'to-hospital' && srv.simulationInterval) {
        clearInterval(srv.simulationInterval);
        // Restart simulation from current position to new hospital
        restartSimulationToHospital(serviceIdx);
    }
};

async function restartSimulationToHospital(serviceIdx) {
    const srv = activeServices[serviceIdx];
    if (!srv) return;
    
    const routeToHospital = await getOSRMRoutePoints(srv.ambulancePos, srv.hospital.coords);
    srv.routeToHospital = routeToHospital;
    srv.currentRouteIdx = 0;
    
    let stepIndex = 0;
    
    if (srv.routeLayer) map.removeLayer(srv.routeLayer);
    srv.routeLayer = L.polyline(routeToHospital, {color: '#6366f1', weight: 5, dashArray: '10, 15', className: 'animated-route-fast', opacity: 0.9}).addTo(map);
    mapLayers.push(srv.routeLayer);
    
    srv.simulationInterval = setInterval(() => {
        stepIndex++;
        
        if (stepIndex >= routeToHospital.length) {
            clearInterval(srv.simulationInterval);
            srv.simulationInterval = null;
            srv.chat.push({from: 'system', text: '🏥 Arrived at hospital. Patient delivered safely.'});
            resetServiceSignals(srv);
            renderActiveServices();
            renderDriverView();
            return;
        }
        
        const newPos = routeToHospital[stepIndex];
        srv.ambulancePos = newPos;
        srv.currentRouteIdx = stepIndex;
        if (srv.ambulanceMarker) srv.ambulanceMarker.setLatLng(newPos);
        
        updateTrafficSignalsForAmbulance(srv, routeToHospital, stepIndex);
        
        if (driverMap && document.getElementById('view-driver').classList.contains('active-view')) {
            renderDriverView();
        }
    }, 2000);
}

// ============================
// ACCORDION, CALL, CHAT, CLOSE
// ============================
window.toggleAccordion = function(id) {
    let el = document.getElementById(id);
    el.style.display = el.style.display === 'none' ? 'flex' : 'none';
}

window.toggleServiceCall = function(idx) {
    let srv = activeServices[idx];
    
    if(!srv.callActive) {
        srv.callActive = true;
        srv.callInterval = setInterval(() => {
            srv.callTime++;
            if(srv.callTime % 2 === 0) renderActiveServices();
        }, 1000);
        srv.chat.push({from: 'system', text: 'Voice channel opened.'});
    } else {
        srv.callActive = false;
        clearInterval(srv.callInterval);
        srv.chat.push({from: 'system', text: `Voice channel closed (${srv.callTime}s).`});
        srv.callTime = 0;
    }
    renderActiveServices();
    
    setTimeout(() => {
        let el = document.getElementById(`asc-body-${idx}`);
        if(el) el.style.display = 'flex';
    }, 50);
}

window.sendServiceChat = function(idx) {
    let input = document.getElementById(`ci-${idx}`);
    if(!input || !input.value.trim()) return;
    activeServices[idx].chat.push({from: 'operator', text: input.value.trim()});
    renderActiveServices();
    
    setTimeout(() => {
        let body = document.getElementById(`asc-body-${idx}`);
        if(body) body.style.display = 'flex';
        let box = document.getElementById(`cb-${idx}`);
        if(box) box.scrollTop = box.scrollHeight;
    }, 50);
}

// Close Service Permanently
window.closeService = function(idx) {
    let srv = activeServices[idx];
    
    // Add to history with hospital info
    dispatchHistory.unshift({
        id: srv.inc.id,
        type: srv.inc.type,
        loc: srv.inc.location,
        unit: srv.unit.id,
        hospital: srv.hospital.name,
        timeTaken: "11 mins",
        status: "completed",
        phone: srv.inc.phone
    });
    
    // Cleanup
    if(srv.callActive) clearInterval(srv.callInterval);
    if(srv.simulationInterval) clearInterval(srv.simulationInterval);
    
    // Remove ambulance marker
    if(srv.ambulanceMarker) map.removeLayer(srv.ambulanceMarker);
    if(srv.routeLayer) map.removeLayer(srv.routeLayer);
    
    // Restore bed
    srv.hospital.beds.available = Math.min(srv.hospital.beds.total, srv.hospital.beds.available + 1);
    
    // Reset signals
    resetServiceSignals(srv);
    
    activeServices.splice(idx, 1);
    
    renderActiveServices();
    renderHistory();
    renderHospitalsOnMap();
    renderDriverView();
    clearMapLayers();
}

// ============================
// DRIVER VIEW
// ============================
function renderDriverView() {
    const container = document.getElementById('driver-view-content');
    
    if (activeServices.length === 0) {
        container.className = 'driver-empty-state';
        container.innerHTML = `
            <span class="material-icons-round">local_shipping</span>
            <h2>No Active Dispatches</h2>
            <p>Dispatch an ambulance from the Active Dispatch view to see the Driver View with live hospital routing and traffic signal management.</p>
        `;
        return;
    }
    
    // Show first active service in driver view
    const srv = activeServices[0];
    const eta = getETAMinutes(getDistanceKm(srv.ambulancePos, srv.hospital.coords));
    const distToHosp = getDistanceKm(srv.ambulancePos, srv.hospital.coords).toFixed(1);
    const clearedSignals = srv.signalsCleared.length;
    
    container.className = 'driver-view-layout';
    container.innerHTML = `
        <!-- Left: Driver Map -->
        <div class="driver-map-container glassmorphism">
            <div class="map-header">
                <h2>🚑 Live Route</h2>
                <div class="map-badges">
                    <span class="badge" style="background:rgba(16,185,129,0.15);color:#34d399;border-color:rgba(16,185,129,0.3)">
                        ${srv.ambulancePhase === 'to-patient' ? '→ Patient' : '→ Hospital'}
                    </span>
                </div>
            </div>
            <div class="map-frame-wrapper" id="driver-map-frame"></div>
        </div>
        
        <!-- Right: Driver Info -->
        <div class="driver-info-panel">
            <!-- Hospital Card -->
            <div class="driver-hospital-card">
                <div class="dhc-label"><span class="material-icons-round" style="font-size:16px;">psychology</span> AI-ASSIGNED HOSPITAL</div>
                <div class="dhc-name">${srv.hospital.name}</div>
                <div class="dhc-address">${srv.hospital.address}</div>
                <div class="dhc-stats">
                    <div class="dhc-stat">
                        <span class="val" style="color:var(--accent-green);">${srv.hospital.beds.available}</span>
                        <span class="lbl">Beds Free</span>
                    </div>
                    <div class="dhc-stat">
                        <span class="val" style="color:var(--accent-cyan);">${srv.hospital.doctors.available}</span>
                        <span class="lbl">Doctors</span>
                    </div>
                    <div class="dhc-stat">
                        <span class="val" style="color:var(--accent-amber);">${distToHosp}</span>
                        <span class="lbl">km Away</span>
                    </div>
                </div>
            </div>
            
            <!-- ETA Display -->
            <div class="driver-eta-card">
                <div class="eta-label">ESTIMATED TIME OF ARRIVAL</div>
                <div class="eta-value">${eta} <span class="min">min</span></div>
                <div class="eta-sub">${srv.ambulancePhase === 'to-patient' ? 'TO PATIENT LOCATION' : 'TO HOSPITAL'}</div>
            </div>
            
            <!-- Traffic Signal Status -->
            <div class="driver-traffic-card">
                <div class="dtc-icon ${clearedSignals > 0 ? 'cleared' : ''}">
                    <span class="material-icons-round">${clearedSignals > 0 ? 'traffic' : 'stop'}</span>
                </div>
                <div class="dtc-info">
                    <h4>${clearedSignals > 0 ? `${clearedSignals} Signals Cleared` : 'No Signals Overridden'}</h4>
                    <p>${clearedSignals > 0 ? 'Traffic signals within 2 km turned green. "AMBULANCE ON THE WAY" displayed.' : 'Signals will auto-clear as ambulance approaches.'}</p>
                </div>
            </div>
            
            <!-- Incident & Caller Info -->
            <div class="driver-patient-card">
                <div class="dch-caller" style="background:var(--bg-panel-solid); border:none; padding:8px;">
                    <img src="${aadhaarDB[srv.inc.phone] ? aadhaarDB[srv.inc.phone].photo : 'https://ui-avatars.com/api/?name=U&background=475569&color=fff'}" class="dch-photo" />
                    <div class="dch-caller-info">
                        <div class="dch-caller-name">${aadhaarDB[srv.inc.phone] ? aadhaarDB[srv.inc.phone].name : "Unknown Caller"}</div>
                        <div class="dch-caller-meta" style="color:var(--accent-red); font-weight:600;">${srv.inc.phone}</div>
                    </div>
                </div>
                
                <div class="detail-block" style="border-left: 4px solid var(--accent-red); margin-bottom:0;">
                    <h4><span class="material-icons-round" style="font-size:14px;">emergency</span> Patient Info</h4>
                    <div class="info-row"><span class="info-label">ID</span> <span class="info-val">${srv.inc.id}</span></div>
                    <div class="info-row"><span class="info-label">Type</span> <span class="info-val" style="color:var(--text-primary); font-weight:600;">${srv.inc.type}</span></div>
                    <div class="info-row"><span class="info-label">Location</span> <span class="info-val" style="font-size:11px;">${srv.inc.location}</span></div>
                </div>
                
                <!-- Reroute Button -->
                <button class="btn btn-reroute" style="background:var(--accent-amber); color:#000; font-weight:700; width:100%; border:none; padding:12px; border-radius:8px; display:flex; justify-content:center; align-items:center; gap:8px; cursor:pointer;" onclick="openRerouteFromDriver()">
                    <span class="material-icons-round">alt_route</span> Request Reroute
                </button>
            </div>
        </div>
    `;
    
    // Initialize driver map
    setTimeout(() => {
        const driverMapEl = document.getElementById('driver-map-frame');
        if (!driverMapEl) return;
        
        // Destroy and recreate
        if (driverMap) {
            driverMap.remove();
            driverMap = null;
        }
        
        driverMap = L.map('driver-map-frame').setView(srv.ambulancePos, 14);
        L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3'], attribution: '© Google Maps' }).addTo(driverMap);
        
        // Style the driver map tiles dark
        const driverMapContainer = driverMapEl;
        const tiles = driverMapContainer.querySelectorAll('.leaflet-layer');
        tiles.forEach(t => t.style.filter = 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)');
        
        // Ambulance marker
        const ambIcon = L.divIcon({
            className: 'custom-map-icon ambulance-icon',
            html: `
                <div class="marker-pin ${srv.ambulancePhase === 'to-patient' ? 'green-pin' : 'blue-pin'}"><span class="material-icons-round">local_shipping</span></div>
                <div class="marker-label">YOU</div>
            `, iconSize: [40, 40], iconAnchor: [20, 20]
        });
        L.marker(srv.ambulancePos, { icon: ambIcon, zIndexOffset: 1000 }).addTo(driverMap);
        
        // Hospital marker
        const hospIcon = L.divIcon({
            className: 'custom-map-icon hospital-icon',
            html: `
                <div class="marker-pin blue-pin"><span class="material-icons-round">local_hospital</span></div>
                <div class="marker-label">Target: ${srv.hospital.name}</div>
            `, iconSize: [40, 40], iconAnchor: [20, 20]
        });
        L.marker(srv.hospital.coords, { icon: hospIcon }).addTo(driverMap).bindPopup(`<b>${srv.hospital.name}</b>`);
        
        // Patient marker
        if (srv.ambulancePhase === 'to-patient') {
            const patientIcon = L.divIcon({
                className: 'custom-map-icon patient-icon',
                html: `
                    <div class="marker-pin red-pin"><span class="material-icons-round">emergency</span></div>
                    <div class="marker-label pulse-label">Patient</div>
                `, iconSize: [40, 40], iconAnchor: [20, 20]
            });
            L.marker(srv.inc.coords, {icon: patientIcon}).addTo(driverMap);
        }
        
        // Route line
        const target = srv.ambulancePhase === 'to-patient' ? srv.inc.coords : srv.hospital.coords;
        const routeColor = srv.ambulancePhase === 'to-patient' ? '#10b981' : '#6366f1';
        const currentRoute = srv.ambulancePhase === 'to-patient' ? srv.routeToPatient : srv.routeToHospital;
        
        if (currentRoute) {
            const stepIdx = srv.currentRouteIdx || 0;
            const remainingRoute = currentRoute.slice(stepIdx);
            if (remainingRoute.length > 0) {
                L.polyline(remainingRoute, {color: routeColor, weight: 6, dashArray: '10, 15', className: 'animated-route', opacity: 0.9}).addTo(driverMap);
            }
        }
        
        // Traffic signals on driver map
        trafficSignals.forEach(sig => {
            const icon = createSignalIcon(sig);
            L.marker(sig.coords, { icon: icon, zIndexOffset: sig.overridden ? 800 : 100 }).addTo(driverMap);
        });
        
        // Fit to show ambulance and target
        if (currentRoute && currentRoute.slice(srv.currentRouteIdx || 0).length > 0) {
            driverMap.fitBounds(L.latLngBounds(currentRoute.slice(srv.currentRouteIdx || 0)).pad(0.3));
        } else {
            driverMap.fitBounds(L.latLngBounds([srv.ambulancePos, target]).pad(0.3));
        }
        
    }, 100);
}

window.openRerouteFromDriver = function() {
    if (activeServices.length === 0) return;
    
    const srv = activeServices[0];
    const ranked = findBestHospital(srv.inc.type, srv.ambulancePos);
    const alternatives = ranked.filter(r => r.hospital.id !== srv.hospital.id).slice(0, 3);
    
    if (alternatives.length === 0) {
        alert('No alternative hospitals with available beds found.');
        return;
    }
    
    let msg = 'AI-Ranked Alternative Hospitals:\n\n';
    alternatives.forEach((a, i) => {
        msg += `${i+1}. ${a.hospital.name}\n   Distance: ${a.distance} km · Beds: ${a.hospital.beds.available} · Score: ${a.score}\n\n`;
    });
    msg += 'Enter number to reroute (or cancel):';
    
    const choice = prompt(msg);
    if (choice && alternatives[parseInt(choice) - 1]) {
        const newHosp = alternatives[parseInt(choice) - 1].hospital;
        window.changeHospital(0, newHosp.id);
    }
};

// ============================
// RENDER HISTORY TABLE
// ============================
function renderHistory() {
    historyTbody.innerHTML = '';
    dispatchHistory.forEach((h, index) => {
        const patientName = h.phone ? (aadhaarDB[h.phone] ? aadhaarDB[h.phone].name : "Unknown") : "Unknown";
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${h.id}</strong></td>
            <td><strong style="color:var(--text-primary);">${patientName}</strong></td>
            <td>${h.type}</td>
            <td>${h.loc}</td>
            <td>${h.unit}</td>
            <td style="color:var(--accent-green); font-weight:500;">${h.hospital || '—'}</td>
            <td>${h.timeTaken}</td>
            <td><span class="status-badge ${h.status === 'completed' ? 'status-completed' : 'status-active'}">${h.status.toUpperCase()}</span></td>
            <td>
                <button class="action-icon-btn" onclick="callbackHistory('${h.id}')" title="Call Back patient">
                    <span class="material-icons-round" style="font-size:16px;">phone_callback</span>
                </button>
            </td>
        `;
        historyTbody.appendChild(tr);
    });
}

window.callbackHistory = function(id) {
    alert(`Calling back closed incident ${id}... System will connect operator to client's phone number.`);
}

// ============================
// ANALYTICS CHART
// ============================
function initAnalyticsChart() {
    const ctx = document.getElementById('responseTimeChart').getContext('2d');
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = "'Inter', sans-serif";
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{ label: 'Avg Response Time (minutes)', data: [8.5, 7.2, 9.1, 6.8, 7.5, 10.2, 8.0], borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderWidth: 3, fill: true, tension: 0.4 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } }
        }
    });
}


