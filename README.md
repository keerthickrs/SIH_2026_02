# LANDGUARD AI

### NER Landslide Early Warning & Emergency Response Platform

LANDGUARD AI is a mobile-first web application designed specifically for **landslide monitoring and emergency response in the North Eastern Region (NER) of India**, while providing a **globally navigable GIS map** powered by Leaflet and OpenStreetMap.

---

## 🌍 1. Core Geographical Architecture

LANDGUARD AI is built with two distinct geographical scopes:

### A. Global GIS Map — All Locations
- **Globally Navigable**: Pan and zoom freely across the entire world, India, and all international locations.
- **Global Search**: Search any city, town, address, or country globally using integrated OpenStreetMap Nominatim geocoding.
- **Dynamic Weather**: Fetches real-time weather from Open-Meteo for any searched or clicked coordinate worldwide without API keys.
- **Global Citizen Reports**: Citizen hazard observations can be submitted from any location worldwide.

### B. Landslide Risk Analysis & Alerts — NER Only
The landslide risk analysis engine strictly focuses on the **8 North Eastern Region (NER) states**:
1. **Arunachal Pradesh**
2. **Assam**
3. **Manipur**
4. **Meghalaya**
5. **Mizoram**
6. **Nagaland**
7. **Sikkim**
8. **Tripura**

Only these 8 states receive:
- Landslide risk scores (0–100) and severity levels (LOW, MODERATE, HIGH, CRITICAL)
- Landslide risk heatmap and exclusion zones
- Risk factor prioritization
- Landslide prediction and emergency landslide alerts
- Integration into composite regional risk

If a user selects or searches a location outside NER, the system displays:
> **"LANDSLIDE RISK ANALYSIS IS AVAILABLE ONLY FOR THE NER REGION."**
*(No fake landslide risk scores are generated for locations outside NER).*

---

## 🌟 2. Key Features

1. **Disaster Management Dashboard**:
   - Live Indian Standard Time (IST) clock via Python's `zoneinfo.ZoneInfo("Asia/Kolkata")`.
   - State selector supporting **ALL NER** and each of the 8 individual NER states.
   - Overall NER Risk score meter, operational metrics (critical, high, moderate zones, active alerts, blocked roads, citizen reports, sensor alerts).
   - Priority risk areas with major contributing factor prioritization and recommended emergency action.
   - Road connectivity monitoring (Open, Partially Blocked, Blocked, Damaged).
   - Open-Meteo live weather integration with prototype weather contribution.
   - Geotechnical sensor network telemetry (*"DEMO SENSOR DATA"*).
   - InSAR satellite monitoring (*"DEMO SATELLITE DATA"*).

2. **Interactive Leaflet GIS Map**:
   - Layers: Base Map, Landslide Risk Heatmap (NER only), Roads, Citizen Reports, Sensors, Villages, Buildings, Shelters, Safe Routes.
   - Color-coded risk levels:
     - 0–25: **LOW** (Emerald Green)
     - 26–50: **MODERATE** (Amber Yellow)
     - 51–75: **HIGH** (Orange)
     - 76–100: **CRITICAL** (Red)
   - "Locate Me" GPS button and fullscreen view.

3. **6-Language Multilingual Interface**:
   - Full translation support for **English**, **Tamil** (தமிழ்), **Malayalam** (മലയാളം), **Telugu** (తెలుగు), **Kannada** (ಕನ್ನಡ), and **Hindi** (हिन्दी).
   - Localized navigation, metrics, risk factors, emergency alerts, offline instructions, and error messages.
   - Saved in `localStorage` and functional 100% offline without external translation APIs.

4. **Geo-Tagged Citizen Hazard Reporting**:
   - Report ground cracks, slope movement, blocked roads, landslides, damaged buildings, flash floods, or other hazards.
   - Browser geolocation and map-click coordinate autofill.
   - Media file upload (JPG, PNG, GIF, WEBP, MP4, MOV) with 10MB limit and server-side validation.
   - **Offline Queue**: Reports submitted offline are stored in `localStorage` and automatically synchronized when connection is restored.

5. **Safe Evacuation Route Analysis**:
   - Calculates bypass corridors to the nearest safe emergency shelter.
   - Actively avoids blocked roads, damaged corridors, and critical landslide hazard zones.
   - Displays Recommended Safe Route and Alternative Route.
   - Fallback warning: *"NO SAFE ROUTE AVAILABLE"* if all connecting lifelines are impassable.

6. **Offline Emergency Alarm**:
   - Large **🚨 OFFLINE EMERGENCY ALARM** button.
   - High-intensity dual-oscillator wailing siren using the browser Web Audio API (no external audio files required).
   - Full-screen emergency warning takeover modal with cached emergency bulletin and survival protocols.
   - Instant **STOP ALARM** button.

---

## 🛠️ 3. Quick Start & Execution

### Prerequisites
- **Python 3.10+** (e.g. `d:\tools\python\python.exe` or python in PATH)
- **Node.js 18+** & **npm**

---

### Step 1: Run the Backend (FastAPI + SQLite)

Open a terminal in `backend/`:

```powershell
cd landguard-ai/backend

# Optional virtual environment
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the API server
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

*(On Windows, you can also double-click `start_backend.bat`)*

- Backend API URL: `http://127.0.0.1:8000`
- Interactive Swagger Docs: `http://127.0.0.1:8000/docs`
- Health / Time API: `http://127.0.0.1:8000/api/time`

The SQLite database (`landguard.db`) and `uploads/` directory are **automatically created and seeded** on initial launch.

---

### Step 2: Run the Frontend (React + Vite)

Open a second terminal in `frontend/`:

```powershell
cd landguard-ai/frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

*(On Windows, you can also double-click `start_frontend.bat`)*

- Frontend Application URL: 👉 **`http://localhost:5173`**

Vite automatically proxies API requests (`/api/*` and `/uploads/*`) to `http://127.0.0.1:8000`.

---

## 📁 4. Project Structure

```
landguard-ai/
├── backend/
│   ├── database.py         # SQLite schema (reports, alerts, roads, risk_zones, sensors, weather, villages, buildings, shelters) + NER seeds
│   ├── main.py             # FastAPI endpoints, IST zoneinfo, Open-Meteo integration, NER geofencing, safe route engine
│   ├── requirements.txt    # fastapi, uvicorn, httpx, python-multipart, pydantic, tzdata
│   ├── landguard.db        # Auto-created SQLite database file
│   └── uploads/            # Secure directory for citizen media evidence
├── frontend/
│   ├── index.html          # HTML5 entry with mobile meta tags
│   ├── package.json        # React 18, Vite, Leaflet, React-Leaflet, Lucide-React
│   ├── vite.config.js      # Vite configuration & backend proxy
│   └── src/
│       ├── main.jsx        # Complete React application (6 languages, Leaflet GIS, offline siren, dashboard, reporting)
│       └── style.css       # Mobile-first disaster design system (no excessive card borders, responsive layout)
├── start_backend.bat       # Windows launch script for backend
├── start_frontend.bat      # Windows launch script for frontend
└── README.md               # Complete platform documentation
```

---

## 📡 5. REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/time` | Current date and time in IST (`Asia/Kolkata`) |
| `GET` | `/api/check-ner` | Check if coordinates fall within NER boundaries |
| `GET` | `/api/weather` | Live Open-Meteo weather for any global coordinate |
| `GET` | `/api/risk` | Composite landslide risk calculation (NER only) |
| `GET` | `/api/dashboard` | Aggregated dashboard data (supports `?state=` and `?lat=&lon=`) |
| `GET` | `/api/risk-zones` | List categorized geographical risk zones |
| `GET` | `/api/roads` | Mapped road segments with connectivity status |
| `GET` | `/api/villages` | Vulnerable villages with evacuation status |
| `GET` | `/api/buildings` | Critical infrastructure and institutions |
| `GET` | `/api/shelters` | Certified emergency evacuation relief shelters |
| `GET` | `/api/sensors` | In-situ geotechnical telemetry (*"DEMO SENSOR DATA"*) |
| `GET` | `/api/satellite` | Sentinel-1 InSAR deformation monitoring (*"DEMO SATELLITE DATA"*) |
| `GET` | `/api/reports` | Retrieve citizen hazard observations |
| `POST`| `/api/reports` | Submit geo-tagged report with optional photo/video |
| `GET` | `/api/alerts` | Active emergency warnings (CRITICAL and HIGH prioritized) |
| `POST`| `/api/alerts` | Post an emergency bulletin |
| `GET` | `/api/routes/safe` | Compute safe evacuation corridors avoiding blocked roads |

---

## ⚖️ 6. Prototype Disclaimers

- **LANDGUARD AI** is an academic research and disaster-response decision support prototype.
- Sensor feeds and satellite InSAR deformation layers are simulated demonstration models.
- The safe-route analysis is an algorithmic prototype and **not** a certified military or police evacuation routing system.
- In actual emergency conditions, citizens must always adhere to instructions from the **National Disaster Management Authority (NDMA)**, **State Disaster Management Authorities (SDMA)**, and local district disaster relief commissioners.
