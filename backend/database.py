import sqlite3
import os
import json
from datetime import datetime, timezone, timedelta
from typing import List, Dict, Any, Optional

try:
    from zoneinfo import ZoneInfo
    IST = ZoneInfo("Asia/Kolkata")
except Exception:
    IST = timezone(timedelta(hours=5, minutes=30))

DB_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(DB_DIR, "landguard.db")

def get_db_connection():
    """Create and return a thread-safe connection to the SQLite database with Row factory."""
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db(force_reseed: bool = False):
    """Initialize database schema and populate realistic seed data for all 8 NER states."""
    conn = get_db_connection()
    cursor = conn.cursor()

    if force_reseed:
        cursor.executescript("""
            DROP TABLE IF EXISTS reports;
            DROP TABLE IF EXISTS alerts;
            DROP TABLE IF EXISTS roads;
            DROP TABLE IF EXISTS risk_zones;
            DROP TABLE IF EXISTS sensor_data;
            DROP TABLE IF EXISTS weather_data;
            DROP TABLE IF EXISTS villages;
            DROP TABLE IF EXISTS buildings;
            DROP TABLE IF EXISTS shelters;
        """)

    # 1. Reports table (Section 28)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS reports (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hazard_type TEXT NOT NULL,
            description TEXT,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            state TEXT NOT NULL,
            filename TEXT,
            created_at TEXT NOT NULL,
            status TEXT DEFAULT 'NEW',
            is_ner INTEGER DEFAULT 1
        )
    """)

    # 2. Alerts table (Section 28)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS alerts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            severity TEXT NOT NULL,
            state TEXT NOT NULL,
            location TEXT NOT NULL,
            risk_score INTEGER NOT NULL,
            factors TEXT NOT NULL,
            action TEXT NOT NULL,
            created_at TEXT NOT NULL,
            is_active INTEGER DEFAULT 1
        )
    """)

    # 3. Roads table (Section 28)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS roads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            state TEXT NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            coordinates TEXT NOT NULL,
            distance_km REAL,
            status TEXT NOT NULL,
            severity TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
    """)

    # 4. Risk zones table (Section 28)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS risk_zones (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            state TEXT NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            risk_score INTEGER NOT NULL,
            risk_level TEXT NOT NULL,
            rainfall REAL NOT NULL,
            soil_moisture REAL NOT NULL,
            slope REAL NOT NULL,
            radius_m INTEGER NOT NULL,
            major_factors TEXT NOT NULL,
            nearby_road_status TEXT,
            nearby_village_count INTEGER,
            nearby_building_count INTEGER,
            updated_at TEXT NOT NULL
        )
    """)

    # 5. Sensor data table (Section 28)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS sensor_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sensor_id TEXT NOT NULL,
            location TEXT NOT NULL,
            state TEXT NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            soil_moisture REAL NOT NULL,
            slope_movement REAL NOT NULL,
            ground_vibration TEXT NOT NULL,
            water_level REAL NOT NULL,
            status TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            is_simulated INTEGER DEFAULT 1
        )
    """)

    # 6. Weather data table (cache & fallback)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS weather_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            location_name TEXT NOT NULL,
            state TEXT NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            temperature REAL,
            precipitation REAL,
            wind_speed REAL,
            wind_direction REAL,
            humidity REAL,
            weather_condition TEXT,
            risk_level TEXT,
            fetched_at TEXT
        )
    """)

    # 7. Vulnerable Villages (Section 28)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS villages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            state TEXT NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            population INTEGER,
            risk_level TEXT,
            nearby_road TEXT,
            distance_from_hazard_m INTEGER,
            recommended_action TEXT,
            evacuation_status TEXT
        )
    """)

    # 8. Vulnerable Buildings (Section 28)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS buildings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT NOT NULL,
            name TEXT NOT NULL,
            state TEXT NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            risk_level TEXT,
            distance_hazard_m INTEGER,
            building_type TEXT
        )
    """)

    # 9. Emergency Shelters (Section 28)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS shelters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            state TEXT NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            capacity INTEGER,
            current_occupancy INTEGER,
            contact_phone TEXT,
            status TEXT
        )
    """)

    conn.commit()

    # Check if we need to seed
    cursor.execute("SELECT COUNT(*) FROM risk_zones")
    zone_count = cursor.fetchone()[0]
    if zone_count == 0:
        seed_ner_data(cursor, conn)

    conn.close()

def seed_ner_data(cursor, conn):
    """Seed comprehensive realistic demonstration data across all 8 NER states."""
    now_str = datetime.now(IST).strftime("%d %b %Y, %I:%M %p IST")

    # 1. RISK ZONES (Across all 8 NER states)
    # Fields: name, state, latitude, longitude, risk_score, risk_level, rainfall, soil_moisture, slope, radius_m, major_factors, nearby_road_status, nearby_village_count, nearby_building_count, updated_at
    risk_zones = [
        # Arunachal Pradesh
        ("Tawang Sela Pass Scarp", "Arunachal Pradesh", 27.5859, 91.8594, 89, "CRITICAL", 168.0, 93.5, 44.0, 1800,
         json.dumps(["Continuous Himalayan torrential rainfall", "High soil moisture saturation (93%)", "Steep 44° slope angle", "Sub-zero freeze-thaw rock fracturing"]),
         "BLOCKED", 3, 24, now_str),
        ("Bhalukpong Chute Debris Cone", "Arunachal Pradesh", 27.0167, 92.6500, 74, "HIGH", 112.0, 84.2, 38.5, 1400,
         json.dumps(["Intense monsoon runoff into Kameng gorge", "Active slope creep recorded", "Loose colluvium deposit"]),
         "PARTIALLY BLOCKED", 2, 18, now_str),
        ("Subansiri Valley Spur", "Arunachal Pradesh", 27.9833, 94.2167, 58, "HIGH", 78.0, 78.0, 32.0, 1200,
         json.dumps(["Monsoon embankment erosion", "Moderate soil displacement"]),
         "OPEN", 2, 12, now_str),

        # Assam
        ("Dima Hasao Haflong Sinking Zone", "Assam", 25.1764, 93.0232, 86, "CRITICAL", 185.0, 91.8, 36.0, 2000,
         json.dumps(["Extreme cumulative precipitation (210mm/48h)", "Unconsolidated shale bedrock deformation", "Railway track foundation subsidence"]),
         "BLOCKED", 5, 45, now_str),
        ("Guwahati Nilachal Hill Escarpment", "Assam", 26.1667, 91.7056, 62, "HIGH", 94.0, 82.5, 34.0, 1100,
         json.dumps(["Urban slope undercut", "High drainage runoff velocity", "Loose red soil saturation"]),
         "PARTIALLY BLOCKED", 4, 38, now_str),
        ("Karbi Anglong Diphu Ghat", "Assam", 25.8450, 93.4320, 45, "MODERATE", 52.0, 68.0, 24.0, 900,
         json.dumps(["Moderate intermittent rainfall", "Vegetated slope retaining stability"]),
         "OPEN", 3, 16, now_str),

        # Manipur
        ("Tupul Noney Railway Slide Zone", "Manipur", 24.7797, 93.6369, 92, "CRITICAL", 220.0, 95.0, 45.0, 2200,
         json.dumps(["Catastrophic rainfall exceeding threshold", "Ijei river damming hazard", "Complete topsoil liquefaction", "Severe historical debris avalanche"]),
         "BLOCKED", 4, 36, now_str),
        ("Senapati Highway Bluff", "Manipur", 25.2680, 94.0180, 71, "HIGH", 108.0, 83.0, 37.0, 1300,
         json.dumps(["Continuous seepage through weathered shale", "Creep velocity 11mm/day", "Highway retaining wall tilt"]),
         "PARTIALLY BLOCKED", 3, 22, now_str),
        ("Tamenglong Ridge Slopes", "Manipur", 24.9850, 93.4950, 55, "HIGH", 84.0, 76.5, 30.0, 1000,
         json.dumps(["Drainage blockage in culverts", "Monsoon gullying"]),
         "OPEN", 2, 14, now_str),

        # Meghalaya
        ("Cherrapunji Sohra Escarpment Rim", "Meghalaya", 25.2702, 91.7323, 88, "CRITICAL", 280.0, 96.0, 48.0, 2400,
         json.dumps(["Highest global precipitation rate (340mm/48h)", "Limestone karst collapse hazard", "Vertical gorge headward erosion", "Citizen reports of widening ground fissures"]),
         "BLOCKED", 4, 32, now_str),
        ("Mawsynram Valley Chute", "Meghalaya", 25.2970, 91.5830, 83, "CRITICAL", 260.0, 94.2, 42.0, 1900,
         json.dumps(["Torrential cloudburst bursts", "Pore-water pressure exceeding structural limit", "Downslope mud avalanche"]),
         "DAMAGED", 3, 21, now_str),
        ("Shillong Peak Northern Escarpment", "Meghalaya", 25.5450, 91.8750, 68, "HIGH", 125.0, 85.0, 35.0, 1500,
         json.dumps(["Steep metamorphic phyllite slope", "Urban hillside surcharge", "Blocked stormwater bypasses"]),
         "PARTIALLY BLOCKED", 6, 52, now_str),
        ("Nongstoin Valley Terrace", "Meghalaya", 25.5180, 91.2680, 38, "MODERATE", 45.0, 62.0, 20.0, 800,
         json.dumps(["Controlled forest cover", "Baseline slope moisture"]),
         "OPEN", 2, 10, now_str),

        # Mizoram
        ("Aizawl Laipuitlang Crest Fracture", "Mizoram", 23.7420, 92.7210, 84, "CRITICAL", 165.0, 90.5, 41.0, 1600,
         json.dumps(["Historical reactivation zone", "Deep tension crack propagation", "Saturated sandstone-shale bedding dipping towards valley"]),
         "BLOCKED", 5, 48, now_str),
        ("Hunthar Fault Sinking Sector", "Mizoram", 23.7550, 92.7050, 79, "CRITICAL", 152.0, 88.0, 39.0, 1700,
         json.dumps(["Active continuous road subsidence", "Subsurface water piping", "Structural damage to multi-story buildings"]),
         "DAMAGED", 4, 30, now_str),
        ("Lunglei Western Valley Slopes", "Mizoram", 22.8850, 92.7420, 59, "HIGH", 88.0, 79.0, 33.0, 1100,
         json.dumps(["Valley slope creep", "Intermittent heavy showers"]),
         "PARTIALLY BLOCKED", 3, 19, now_str),

        # Nagaland
        ("Dzüdza Paglapahar Sinking Corridor", "Nagaland", 25.7500, 93.9500, 90, "CRITICAL", 195.0, 94.0, 46.0, 2100,
         json.dumps(["Infamous NH-29 sinking geology", "Disung mudflow active discharge", "Total loss of toe support due to swollen river", "High ground vibration"]),
         "BLOCKED", 4, 28, now_str),
        ("Kohima Town Fault Scarp", "Nagaland", 25.6751, 94.1086, 72, "HIGH", 118.0, 84.5, 36.0, 1400,
         json.dumps(["Urban slope overload", "Creep velocity 8.5mm/day", "Old landslide deposits reactivation"]),
         "PARTIALLY BLOCKED", 6, 60, now_str),
        ("Mokokchung Ghat Pass", "Nagaland", 26.3250, 94.5250, 48, "MODERATE", 60.0, 70.0, 25.0, 950,
         json.dumps(["Moderate slope saturation", "Paved drainage functioning"]),
         "OPEN", 3, 15, now_str),

        # Sikkim
        ("Dikchu Mangan Teesta Chute", "Sikkim", 27.4985, 88.5307, 94, "CRITICAL", 235.0, 97.0, 49.0, 2500,
         json.dumps(["Glacial lake / high river discharge erosion", "Severe rock mass disintegration", "Active mud-boulder avalanche across highway", "Multiple ground cracks reported"]),
         "BLOCKED", 4, 35, now_str),
        ("Teesta River Basin Singtam Spur", "Sikkim", 27.2340, 88.4980, 85, "CRITICAL", 190.0, 92.0, 43.0, 1800,
         json.dumps(["Toe scour along NH-10", "High pore pressure in mica-schist", "Saturated debris cone"]),
         "DAMAGED", 3, 26, now_str),
        ("Gangtok Burtuk Slide Corridor", "Sikkim", 27.3520, 88.6180, 66, "HIGH", 105.0, 83.0, 35.0, 1300,
         json.dumps(["Historical creeping slide", "Monsoon stormwater saturation"]),
         "PARTIALLY BLOCKED", 5, 42, now_str),

        # Tripura
        ("Jampui Hills Orange Ridge", "Tripura", 23.9500, 92.2833, 64, "HIGH", 110.0, 82.0, 31.0, 1200,
         json.dumps(["Lateritic soil softening under persistent rain", "Escarpment slip along village path"]),
         "PARTIALLY BLOCKED", 3, 16, now_str),
        ("Atharamura Range Hill Cut", "Tripura", 23.8800, 91.7500, 52, "HIGH", 85.0, 75.0, 28.0, 1000,
         json.dumps(["Road-widening slope destabilization", "Drainage overflows"]),
         "PARTIALLY BLOCKED", 2, 11, now_str),
        ("Teliamura Lowland Margin", "Tripura", 23.8350, 91.6250, 22, "LOW", 30.0, 50.0, 12.0, 700,
         json.dumps(["Gentle topography", "Stable alluvial sediments"]),
         "OPEN", 4, 30, now_str)
    ]
    cursor.executemany("""
        INSERT INTO risk_zones (name, state, latitude, longitude, risk_score, risk_level, rainfall, soil_moisture, slope, radius_m, major_factors, nearby_road_status, nearby_village_count, nearby_building_count, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, risk_zones)

    # 2. ROADS (Across all 8 NER states + Sample National Corridor)
    # Fields: name, state, latitude, longitude, coordinates, distance_km, status, severity, updated_at
    roads = [
        # Arunachal Pradesh
        ("Balipara-Charduar-Tawang (BCT) Highway", "Arunachal Pradesh", 27.4500, 92.2000,
         json.dumps([[27.0167, 92.6500], [27.2500, 92.4200], [27.4500, 92.2000], [27.5859, 91.8594]]),
         68.5, "BLOCKED", "CRITICAL", now_str),
        ("Trans-Arunachal Highway NH-13 (Itanagar-Ziro)", "Arunachal Pradesh", 27.2500, 93.7500,
         json.dumps([[27.0844, 93.6053], [27.2000, 93.7000], [27.3500, 93.8000], [27.5500, 93.8300]]),
         45.2, "PARTIALLY BLOCKED", "MODERATE", now_str),
        ("Naharlagun-Itanagar Twin City Link", "Arunachal Pradesh", 27.1000, 93.6800,
         json.dumps([[27.0844, 93.6053], [27.1000, 93.6800], [27.1080, 93.7000]]),
         14.0, "OPEN", "LOW", now_str),

        # Assam
        ("Haflong-Silchar Lumding Hill Corridor", "Assam", 25.1000, 93.0000,
         json.dumps([[25.1764, 93.0232], [25.0800, 92.9500], [24.9500, 92.8800], [24.8300, 92.8000]]),
         42.0, "BLOCKED", "CRITICAL", now_str),
        ("Guwahati-Shillong Highway NH-27 (Assam Section)", "Assam", 26.0500, 91.8000,
         json.dumps([[26.1445, 91.7362], [26.0800, 91.7800], [25.9500, 91.8200], [25.8500, 91.8500]]),
         36.0, "OPEN", "LOW", now_str),
        ("Kamakhya Hill Temple Access Road", "Assam", 26.1667, 91.7056,
         json.dumps([[26.1600, 91.7200], [26.1667, 91.7056], [26.1700, 91.6980]]),
         4.8, "PARTIALLY BLOCKED", "HIGH", now_str),

        # Manipur
        ("NH-37 Imphal-Jiribam Lifeline Highway", "Manipur", 24.7800, 93.5500,
         json.dumps([[24.8170, 93.9368], [24.7900, 93.7500], [24.7797, 93.6369], [24.7600, 93.4500]]),
         58.0, "BLOCKED", "CRITICAL", now_str),
        ("NH-2 Imphal-Kohima Highway (Manipur Section)", "Manipur", 25.1000, 93.9800,
         json.dumps([[24.8170, 93.9368], [24.9500, 93.9600], [25.1500, 93.9900], [25.3000, 94.0200]]),
         52.0, "PARTIALLY BLOCKED", "MODERATE", now_str),
        ("Imphal East Valley Emergency Bypass", "Manipur", 24.8300, 93.9600,
         json.dumps([[24.8100, 93.9200], [24.8300, 93.9600], [24.8600, 93.9800]]),
         16.5, "OPEN", "LOW", now_str),

        # Meghalaya
        ("NH-6 Shillong-Silchar Mountain Lifeline", "Meghalaya", 25.4000, 92.1500,
         json.dumps([[25.5788, 91.8933], [25.4500, 92.0500], [25.3500, 92.2000], [25.1800, 92.3500]]),
         62.4, "BLOCKED", "CRITICAL", now_str),
        ("Sohra-Shella Scenic Ghat Pass", "Meghalaya", 25.2200, 91.7000,
         json.dumps([[25.2702, 91.7323], [25.2400, 91.7100], [25.2000, 91.6800], [25.1700, 91.6500]]),
         22.1, "DAMAGED", "HIGH", now_str),
        ("Shillong Western Ridge Safe Evacuation Bypass", "Meghalaya", 25.5600, 91.8500,
         json.dumps([[25.5200, 91.8200], [25.5500, 91.8400], [25.5800, 91.8600], [25.6200, 91.8900]]),
         18.6, "OPEN", "LOW", now_str),
        ("Mawphlang Sacred Forest Road", "Meghalaya", 25.4500, 91.7600,
         json.dumps([[25.5500, 91.8500], [25.4800, 91.8000], [25.4500, 91.7600]]),
         15.2, "OPEN", "LOW", now_str),

        # Mizoram
        ("Hunthar Subsidence Bypass Route", "Mizoram", 23.7550, 92.7050,
         json.dumps([[23.7300, 92.7200], [23.7450, 92.7100], [23.7550, 92.7050]]),
         6.2, "BLOCKED", "CRITICAL", now_str),
        ("NH-54 Aizawl-Lunglei Highway", "Mizoram", 23.3000, 92.7300,
         json.dumps([[23.7271, 92.7176], [23.5000, 92.7250], [23.2000, 92.7350], [22.8850, 92.7420]]),
         84.0, "PARTIALLY BLOCKED", "HIGH", now_str),
        ("Aizawl North Highland Ridge Road", "Mizoram", 23.7600, 92.7300,
         json.dumps([[23.7271, 92.7176], [23.7600, 92.7300], [23.7900, 92.7450]]),
         12.0, "OPEN", "LOW", now_str),

        # Nagaland
        ("NH-29 Paglapahar-Dzüdza Lifeline Corridor", "Nagaland", 25.7500, 93.9500,
         json.dumps([[25.9000, 93.7500], [25.8200, 93.8500], [25.7500, 93.9500], [25.6751, 94.1086]]),
         48.0, "BLOCKED", "CRITICAL", now_str),
        ("Kohima-Wokha North Bypass", "Nagaland", 25.8500, 94.1800,
         json.dumps([[25.6751, 94.1086], [25.8000, 94.1500], [25.9500, 94.2200]]),
         38.5, "OPEN", "LOW", now_str),
        ("Mokokchung-Mariani Hill Road", "Nagaland", 26.4000, 94.4000,
         json.dumps([[26.3250, 94.5250], [26.4500, 94.3500], [26.5800, 94.2500]]),
         32.0, "PARTIALLY BLOCKED", "MODERATE", now_str),

        # Sikkim
        ("NH-10 Siliguri-Gangtok Lifeline Highway", "Sikkim", 27.2000, 88.5000,
         json.dumps([[27.0500, 88.5200], [27.1800, 88.5100], [27.2340, 88.4980], [27.3389, 88.6065]]),
         54.0, "DAMAGED", "CRITICAL", now_str),
        ("Mangan-Chungthang Northern Access Highway", "Sikkim", 27.5500, 88.5800,
         json.dumps([[27.4985, 88.5307], [27.5600, 88.5700], [27.6000, 88.6200]]),
         28.0, "BLOCKED", "CRITICAL", now_str),
        ("Gangtok-Rumtek Elevated Safe Bypass", "Sikkim", 27.3100, 88.5800,
         json.dumps([[27.3389, 88.6065], [27.3100, 88.5800], [27.2900, 88.5500]]),
         11.8, "OPEN", "LOW", now_str),

        # Tripura
        ("Jampui Hills Ridge Access Ghat Road", "Tripura", 23.9500, 92.2833,
         json.dumps([[23.8500, 92.2000], [23.9000, 92.2400], [23.9500, 92.2833]]),
         19.5, "PARTIALLY BLOCKED", "MODERATE", now_str),
        ("NH-8 Agartala-Churaibari Lifeline (Tripura Spine)", "Tripura", 23.9000, 91.5000,
         json.dumps([[23.8315, 91.2868], [23.8800, 91.6000], [23.9500, 91.9000], [24.1500, 92.1500]]),
         78.0, "OPEN", "LOW", now_str),

        # Non-NER Global Demo Road (India National Corridor)
        ("Delhi-Gurugram Expressway NH-48", "Delhi", 28.5000, 77.1000,
         json.dumps([[28.6139, 77.2090], [28.5200, 77.1200], [28.4500, 77.0500]]),
         24.0, "OPEN", "LOW", now_str)
    ]
    cursor.executemany("""
        INSERT INTO roads (name, state, latitude, longitude, coordinates, distance_km, status, severity, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, roads)

    # 3. VILLAGES (Section 19 & 28)
    # Fields: name, state, latitude, longitude, population, risk_level, nearby_road, distance_from_hazard_m, recommended_action, evacuation_status
    villages = [
        # Arunachal Pradesh
        ("Jang Alpine Hamlet", "Arunachal Pradesh", 27.5750, 91.8700, 480, "CRITICAL", "Balipara-Charduar-Tawang (BLOCKED)", 140, "Immediate evacuation to Tawang relief camp", "Evacuating"),
        ("Bhalukpong River Colony", "Arunachal Pradesh", 27.0200, 92.6450, 850, "HIGH", "Trans-Arunachal Highway", 260, "Standby for flash flood and debris alert", "High Alert"),
        ("Dirang Valley Eco Settlement", "Arunachal Pradesh", 27.3500, 92.2400, 1200, "LOW", "Dirang Elevated Bypass", 1800, "Precautionary watch; hillsides stable", "Normal"),

        # Assam
        ("Jatinga Valley Ridge Village", "Assam", 25.1500, 93.0300, 720, "CRITICAL", "Haflong-Silchar Corridor (BLOCKED)", 95, "Mandatory evacuation to Haflong Sports Stadium", "Evacuating"),
        ("Haflong Old Hill Settlement", "Assam", 25.1800, 93.0150, 1600, "HIGH", "Haflong Urban Bypass", 210, "Relocate elderly and children to high ground", "Relocation Advised"),
        ("Dispur Safe Urban Sector", "Assam", 26.1400, 91.7800, 6500, "LOW", "Guwahati-Shillong Highway NH-27", 3500, "Safe destination cluster", "Safe Base"),

        # Manipur
        ("Tupul Railway Hamlet", "Manipur", 24.7750, 93.6320, 560, "CRITICAL", "NH-37 Imphal-Jiribam (BLOCKED)", 60, "Immediate relocation away from Ijei riverbed", "Emergency Evacuation"),
        ("Marangching Slope Colony", "Manipur", 24.7850, 93.6450, 420, "CRITICAL", "NH-37 Corridor", 80, "High ground evacuation to Noney center", "Evacuating"),
        ("Senapati Hilltown Ward 3", "Manipur", 25.2650, 94.0200, 1850, "HIGH", "NH-2 Imphal-Kohima", 310, "Prepare emergency go-bags", "Warning"),

        # Meghalaya
        ("Mawmluh Village Sohra", "Meghalaya", 25.2650, 91.7250, 910, "CRITICAL", "Sohra-Shella Ghat (DAMAGED)", 75, "Relocate from gorge scarp to Sohra Central Camp", "Mandatory Evacuation"),
        ("Laitryngew Cliff Hamlet", "Meghalaya", 25.3200, 91.7500, 680, "HIGH", "NH-6 Shillong-Silchar (BLOCKED)", 180, "Avoid downhill footpaths and culverts", "High Alert"),
        ("Pomlakrai Upper Ridge", "Meghalaya", 25.5300, 91.8600, 1400, "HIGH", "Shillong Western Ridge Bypass", 350, "Maintain alert; watch hillside runoff", "Relocation Advised"),
        ("Mawphlang Heritage Village", "Meghalaya", 25.4550, 91.7550, 1100, "LOW", "Mawphlang Sacred Forest Road", 2200, "Stable bedrock safe enclave", "Safe Base"),

        # Mizoram
        ("Hunthar Veng Subsidance Hamlet", "Mizoram", 23.7580, 92.7020, 1150, "CRITICAL", "Hunthar Subsidence Bypass (BLOCKED)", 80, "Evacuate cracked multi-story residences", "Evacuating"),
        ("Laipuitlang Crest Ward", "Mizoram", 23.7440, 92.7230, 890, "CRITICAL", "Aizawl North Ridge Road", 110, "Relocate to Vanapa Hall Relief Shelter", "Evacuation Standby"),
        ("Durtlang Elevated Ridge", "Mizoram", 23.7850, 92.7380, 2400, "LOW", "Aizawl North Highland Ridge Road", 2500, "Designated safe elevated refuge", "Safe Base"),

        # Nagaland
        ("Dzüdza Riverfront Settlement", "Nagaland", 25.7480, 93.9520, 620, "CRITICAL", "NH-29 Lifeline (BLOCKED)", 50, "Move to Medziphema high-ground relief camp", "Mandatory Evacuation"),
        ("Phesama Hill Village", "Nagaland", 25.6400, 94.1000, 1300, "HIGH", "Kohima Bypass", 240, "Clear drainage channels; monitor slope cracks", "Warning"),
        ("Medziphema Safe Valley Base", "Nagaland", 25.7600, 93.8500, 3100, "LOW", "Kohima-Wokha North Bypass", 3200, "Central reception shelter", "Safe Base"),

        # Sikkim
        ("Dikchu Hydel Colony", "Sikkim", 27.5020, 88.5280, 780, "CRITICAL", "Mangan Northern Access (BLOCKED)", 70, "Evacuate valley floor immediately due to dam burst risk", "Emergency Evacuation"),
        ("Singtam Riverside Sector", "Sikkim", 27.2300, 88.4950, 1950, "CRITICAL", "NH-10 Lifeline (DAMAGED)", 90, "Move to high-altitude shelter at Rumtek", "Evacuating"),
        ("Gangtok Burtuk Ward", "Sikkim", 27.3550, 88.6200, 2100, "HIGH", "Gangtok-Rumtek Elevated Bypass", 220, "Watch for retaining wall bulging", "Relocation Advised"),

        # Tripura
        ("Vanghmun Village Jampui", "Tripura", 23.9520, 92.2850, 860, "HIGH", "Jampui Hills Ridge Access", 190, "Relocate from unstable road slopes", "High Alert"),
        ("Teliamura Lowland Safe Zone", "Tripura", 23.8300, 91.6200, 4200, "LOW", "NH-8 Agartala-Churaibari", 3000, "District relief distribution center", "Safe Base")
    ]
    cursor.executemany("""
        INSERT INTO villages (name, state, latitude, longitude, population, risk_level, nearby_road, distance_from_hazard_m, recommended_action, evacuation_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, villages)

    # 4. BUILDINGS (Section 19 & 28)
    # Fields: code, name, state, latitude, longitude, risk_level, distance_hazard_m, building_type
    buildings = [
        # Arunachal Pradesh
        ("BLD-AR01", "Tawang District Hospital & Trauma Center", "Arunachal Pradesh", 27.5880, 91.8620, "CRITICAL", 120, "Healthcare / Lifeline"),
        ("BLD-AR02", "Sela Tunnel Emergency Maintenance Post", "Arunachal Pradesh", 27.5050, 92.1050, "HIGH", 190, "Transport Infrastructure"),
        ("BLD-AR03", "Dirang Valley Higher Secondary School", "Arunachal Pradesh", 27.3520, 92.2420, "LOW", 1400, "Educational / Safe Refuge"),

        # Assam
        ("BLD-AS01", "Haflong Hill Railway Operations Hub", "Assam", 25.1780, 93.0210, "CRITICAL", 85, "Transport Infrastructure"),
        ("BLD-AS02", "Dima Hasao Civil Hospital Annex", "Assam", 25.1720, 93.0280, "HIGH", 160, "Healthcare Facility"),
        ("BLD-AS03", "Assam State Disaster Management HQ Dispur", "Assam", 26.1420, 91.7850, "LOW", 4200, "Emergency Coordination HQ"),

        # Manipur
        ("BLD-MN01", "Tupul Railway Station Construction HQ", "Manipur", 24.7780, 93.6350, "CRITICAL", 45, "Commercial / Transport"),
        ("BLD-MN02", "Noney Community Health Center", "Manipur", 24.7820, 93.6500, "HIGH", 175, "Healthcare Facility"),
        ("BLD-MN03", "Imphal Regional Medical College Complex", "Manipur", 24.8190, 93.9400, "LOW", 3800, "Healthcare / Safe HQ"),

        # Meghalaya
        ("BLD-ML01", "Cherrapunji Community Health Centre", "Meghalaya", 25.2720, 91.7300, "CRITICAL", 95, "Healthcare Facility"),
        ("BLD-ML02", "Sohra Ramakrishna Mission Higher Secondary School", "Meghalaya", 25.2680, 91.7340, "CRITICAL", 110, "Educational Complex"),
        ("BLD-ML03", "Meghalaya Civil Secretariat Main Building Shillong", "Meghalaya", 25.5760, 91.8900, "MODERATE", 650, "Administrative HQ"),
        ("BLD-ML04", "Shillong Civil Hospital Emergency Wing", "Meghalaya", 25.5720, 91.8850, "LOW", 1200, "Healthcare / Regional Hospital"),

        # Mizoram
        ("BLD-MZ01", "Hunthar Government Primary School", "Mizoram", 23.7560, 92.7040, "CRITICAL", 70, "Educational / Public"),
        ("BLD-MZ02", "Aizawl Civil Hospital Emergency Ward", "Mizoram", 23.7290, 92.7190, "HIGH", 210, "Healthcare Facility"),
        ("BLD-MZ03", "Durtlang Synod Hospital Safe Wing", "Mizoram", 23.7880, 92.7400, "LOW", 2600, "Healthcare / Safe Refuge"),

        # Nagaland
        ("BLD-NL01", "Dzüdza Highway Inspection Toll Post", "Nagaland", 25.7510, 93.9480, "CRITICAL", 40, "Transport Infrastructure"),
        ("BLD-NL02", "Kohima Science College Campus", "Nagaland", 25.6800, 94.1120, "HIGH", 185, "Educational Institution"),
        ("BLD-NL03", "Indira Gandhi Stadium Disaster Coordination Cell", "Nagaland", 25.7100, 94.1200, "LOW", 2900, "Emergency Relief HQ"),

        # Sikkim
        ("BLD-SK01", "Dikchu NHPC Hydroelectric Powerhouse Complex", "Sikkim", 27.5000, 88.5290, "CRITICAL", 55, "Critical Power Grid"),
        ("BLD-SK02", "Mangan District Administrative Complex", "Sikkim", 27.4950, 88.5350, "CRITICAL", 90, "Administrative Center"),
        ("BLD-SK03", "Gangtok STNM Multi-Speciality Hospital", "Sikkim", 27.3320, 88.6020, "LOW", 1800, "Apex Healthcare Safe Base"),

        # Tripura
        ("BLD-TR01", "Jampui Hills Vanghmun Tourist Lodge (Emergency Base)", "Tripura", 23.9510, 92.2840, "HIGH", 130, "Public Infrastructure"),
        ("BLD-TR02", "Agartala Government Medical College Hospital", "Tripura", 23.8350, 91.2900, "LOW", 3400, "Healthcare / Apex Center")
    ]
    cursor.executemany("""
        INSERT INTO buildings (code, name, state, latitude, longitude, risk_level, distance_hazard_m, building_type)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, buildings)

    # 5. SHELTERS (Emergency Safe Destinations in all 8 NER states)
    # Fields: name, state, latitude, longitude, capacity, current_occupancy, contact_phone, status
    shelters = [
        # Arunachal Pradesh
        ("Tawang Community Indoor Stadium Relief Base", "Arunachal Pradesh", 27.5920, 91.8650, 600, 185, "+91 3794 222221", "OPEN - SAFE ELEVATED"),
        ("Dirang Sports Complex Relief Enclave", "Arunachal Pradesh", 27.3550, 92.2450, 450, 92, "+91 3794 222222", "OPEN - SAFE BASE"),

        # Assam
        ("Haflong District Sports Stadium Relief Shelter", "Assam", 25.1850, 93.0250, 850, 410, "+91 3673 236220", "OPEN - HIGH CAPACITY"),
        ("Dispur State Emergency Relief Camp #1", "Assam", 26.1450, 91.7900, 1200, 240, "+91 361 2237000", "OPEN - CENTRAL BASE"),

        # Manipur
        ("Noney District Emergency Community Center", "Manipur", 24.7860, 93.6550, 500, 310, "+91 3874 233111", "OPEN - ACTIVE RELIEF"),
        ("Senapati Multi-Purpose Relief Hall", "Manipur", 25.2700, 94.0250, 400, 120, "+91 3871 222204", "OPEN - SAFE ELEVATED"),

        # Meghalaya
        ("Shillong State Central Library Emergency Shelter", "Meghalaya", 25.5740, 91.8870, 750, 215, "+91 364 2224150", "OPEN - OPERATIONAL HQ"),
        ("Sohra Elevated Government Relief Hall", "Meghalaya", 25.2750, 91.7380, 350, 190, "+91 364 2224151", "OPEN - SAFE HIGH GROUND"),
        ("Mawphlang Community Safe Enclave", "Meghalaya", 25.4600, 91.7620, 400, 65, "+91 364 2224152", "OPEN - RESERVE BASE"),

        # Mizoram
        ("Aizawl Vanapa Hall Central Relief Center", "Mizoram", 23.7310, 92.7180, 900, 380, "+91 389 2322241", "OPEN - CENTRAL BASE"),
        ("Durtlang Highland Community Camp", "Mizoram", 23.7900, 92.7420, 500, 85, "+91 389 2322242", "OPEN - SAFE ELEVATED"),

        # Nagaland
        ("Kohima Indira Gandhi Stadium Relief Camp", "Nagaland", 25.7120, 94.1220, 1000, 290, "+91 370 2290050", "OPEN - HIGH CAPACITY"),
        ("Medziphema Agricultural Transit Center", "Nagaland", 25.7650, 93.8550, 450, 110, "+91 370 2290051", "OPEN - SAFE BASE"),

        # Sikkim
        ("Gangtok Paljor Indoor Stadium Relief Complex", "Sikkim", 27.3350, 88.6100, 1100, 430, "+91 3592 202230", "OPEN - CENTRAL BASE"),
        ("Rumtek Elevated High Ground Shelter", "Sikkim", 27.3050, 88.5750, 400, 95, "+91 3592 202231", "OPEN - SAFE ELEVATED"),

        # Tripura
        ("Agartala Netaji Subhash Stadium Shelter", "Tripura", 23.8380, 91.2850, 800, 140, "+91 381 2325555", "OPEN - SAFE BASE"),
        ("Kanchanpur Community Evacuation Hall", "Tripura", 23.9000, 92.2000, 350, 75, "+91 381 2325556", "OPEN - HILL BASE")
    ]
    cursor.executemany("""
        INSERT INTO shelters (name, state, latitude, longitude, capacity, current_occupancy, contact_phone, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, shelters)

    # 6. SENSORS (Section 17: soil moisture, slope movement, ground vibration, water level)
    # Fields: sensor_id, location, state, latitude, longitude, soil_moisture, slope_movement, ground_vibration, water_level, status, updated_at, is_simulated
    sensors = [
        # Arunachal Pradesh
        ("SENS-AR01", "Tawang Sela Crest Geotechnical Node", "Arunachal Pradesh", 27.5859, 91.8594, 93.5, 14.2, "CRITICAL", 88.0, "CRITICAL", now_str, 1),
        ("SENS-AR02", "Bhalukpong Gorge Inclinometer", "Arunachal Pradesh", 27.0167, 92.6500, 84.2, 7.8, "ELEVATED", 72.5, "HIGH", now_str, 1),

        # Assam
        ("SENS-AS01", "Haflong Sinking Zone Deep Piezometer", "Assam", 25.1764, 93.0232, 91.8, 12.6, "HIGH", 85.4, "CRITICAL", now_str, 1),
        ("SENS-AS02", "Guwahati Nilachal Hill Surface Strain Node", "Assam", 26.1667, 91.7056, 82.5, 5.1, "MODERATE", 68.0, "HIGH", now_str, 1),

        # Manipur
        ("SENS-MN01", "Tupul Ijei Basin Mudflow Trigger Node", "Manipur", 24.7797, 93.6369, 95.0, 18.5, "CRITICAL", 94.0, "CRITICAL", now_str, 1),
        ("SENS-MN02", "Senapati Highway Retaining Wall Sensor", "Manipur", 25.2680, 94.0180, 83.0, 6.9, "ELEVATED", 74.2, "HIGH", now_str, 1),

        # Meghalaya
        ("SENS-ML01", "Cherrapunji Karst Escarpment Hydro-Node", "Meghalaya", 25.2702, 91.7323, 96.0, 15.4, "CRITICAL", 98.2, "CRITICAL", now_str, 1),
        ("SENS-ML02", "Mawsynram Chute Borehole Extensometer", "Meghalaya", 25.2970, 91.5830, 94.2, 11.8, "HIGH", 92.0, "CRITICAL", now_str, 1),
        ("SENS-ML03", "Shillong Peak Weather-Slope Station", "Meghalaya", 25.5450, 91.8750, 85.0, 5.6, "MODERATE", 70.0, "HIGH", now_str, 1),

        # Mizoram
        ("SENS-MZ01", "Hunthar Sinking Sector Multi-Level Node", "Mizoram", 23.7550, 92.7050, 88.0, 13.1, "HIGH", 82.0, "CRITICAL", now_str, 1),
        ("SENS-MZ02", "Aizawl Laipuitlang Crest Crack Monitor", "Mizoram", 23.7420, 92.7210, 90.5, 10.4, "HIGH", 86.5, "CRITICAL", now_str, 1),

        # Nagaland
        ("SENS-NL01", "Dzüdza River Scour Inclinometer", "Nagaland", 25.7500, 93.9500, 94.0, 16.8, "CRITICAL", 91.0, "CRITICAL", now_str, 1),
        ("SENS-NL02", "Kohima Fault Scarp Geophone Array", "Nagaland", 25.6751, 94.1086, 84.5, 7.2, "MODERATE", 73.0, "HIGH", now_str, 1),

        # Sikkim
        ("SENS-SK01", "Dikchu Teesta Valley Torrent Node", "Sikkim", 27.4985, 88.5307, 97.0, 19.1, "CRITICAL", 96.5, "CRITICAL", now_str, 1),
        ("SENS-SK02", "Singtam Teesta Basin Riverbank Piezometer", "Sikkim", 27.2340, 88.4980, 92.0, 12.0, "HIGH", 88.0, "CRITICAL", now_str, 1),

        # Tripura
        ("SENS-TR01", "Jampui Hills Ridge Topsoil Moisture Sensor", "Tripura", 23.9500, 92.2833, 82.0, 4.2, "LOW", 62.0, "HIGH", now_str, 1),
        ("SENS-TR02", "Atharamura Range Roadcut Inclinometer", "Tripura", 23.8800, 91.7500, 75.0, 3.1, "NORMAL", 54.0, "MODERATE", now_str, 1)
    ]
    cursor.executemany("""
        INSERT INTO sensor_data (sensor_id, location, state, latitude, longitude, soil_moisture, slope_movement, ground_vibration, water_level, status, updated_at, is_simulated)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, sensors)

    # 7. ALERTS (Section 20: HIGH and CRITICAL alerts for NER)
    # Fields: title, severity, state, location, risk_score, factors, action, created_at, is_active
    alerts = [
        ("🚨 CRITICAL LANDSLIDE ALERT: SIKKIM TEESTA BASIN", "CRITICAL", "Sikkim", "Dikchu-Mangan Teesta Chute (Sikkim)", 94,
         "Heavy torrential rainfall (235mm/48h) + saturated soil (97%) + steep Himalayan slope (49°)",
         "Immediate mandatory evacuation of low-lying valley hamlets. Avoid NH-10 and Mangan northern corridor completely.",
         now_str, 1),

        ("🚨 CRITICAL LANDSLIDE ALERT: MEGHALAYA SOHRA GORGE", "CRITICAL", "Meghalaya", "Cherrapunji Sohra Escarpment (Meghalaya)", 88,
         "Extreme cloudburst bursts (280mm/48h) + limestone karst destabilization + widening ground fissures",
         "Avoid the affected rim area and follow local emergency instructions. Relocate to designated high-ground shelters.",
         now_str, 1),

        ("🚨 CRITICAL LANDSLIDE ALERT: MANIPUR TUPUL VALLEY", "CRITICAL", "Manipur", "Tupul Noney Corridor (Manipur)", 92,
         "Intense monsoonal downpour + active mudflow triggering + Ijei river debris blockage risk",
         "Evacuate vulnerable valleys immediately. Restrict all transit along NH-37 mountain pass.",
         now_str, 1),

        ("🚨 CRITICAL LANDSLIDE ALERT: NAGALAND DZÜDZA SINKING ZONE", "CRITICAL", "Nagaland", "Dzüdza Paglapahar NH-29 (Nagaland)", 90,
         "Sinking roadbed deformation (16.8mm/day) + swollen river toe scour + saturated slope colluvium",
         "Total closure of NH-29 Paglapahar section. Divert heavy vehicles to northern bypass.",
         now_str, 1),

        ("⚠️ HIGH RISK ALERT: ARUNACHAL PRADESH TAWANG PASS", "HIGH", "Arunachal Pradesh", "Sela Pass-Tawang Ridge (Arunachal Pradesh)", 89,
         "Continuous rainfall + freeze-thaw fractured bedrock + boulder fall danger",
         "Halt night travel on BCT highway. Maintain emergency communication with district disaster desk.",
         now_str, 1),

        ("⚠️ HIGH RISK ALERT: ASSAM DIMA HASAO HAFLONG", "HIGH", "Assam", "Haflong Sinking Scarp (Assam)", 86,
         "Excessive soil pore saturation (91.8%) + railway alignment subsidence",
         "Standby for evacuation orders. Stay clear of natural drainage channels and railway escarpments.",
         now_str, 1),

        ("⚠️ HIGH RISK ALERT: MIZORAM AIZAWL HUNTHAR FAULT", "HIGH", "Mizoram", "Hunthar Sinking Zone (Mizoram)", 79,
         "Active foundation settlement in multi-story houses + road crack widening",
         "Vacate structural buildings showing tension cracks. Utilize Vanapa Hall relief center.",
         now_str, 1)
    ]
    cursor.executemany("""
        INSERT INTO alerts (title, severity, state, location, risk_score, factors, action, created_at, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, alerts)

    # 8. CITIZEN REPORTS (Section 15 & 16: Geo-tagged reports inside NER and outside NER)
    # Fields: hazard_type, description, latitude, longitude, state, filename, created_at, status, is_ner
    reports = [
        ("Landslide", "Major mud and rockslide blocking both lanes of NH-6 near Sonapur tunnel. Trapped vehicles diverted.", 25.4000, 92.1500, "Meghalaya", None, now_str, "VERIFIED", 1),
        ("Ground Cracks", "20cm wide tension cracks running across residential terrace in Hunthar Veng.", 23.7550, 92.7050, "Mizoram", None, now_str, "VERIFIED", 1),
        ("Slope Movement", "Active soil creep and tilted electricity poles along Dzüdza bridge approach.", 25.7500, 93.9500, "Nagaland", None, now_str, "VERIFIED", 1),
        ("Blocked Road", "BCT Highway blocked by heavy debris 5km before Sela Pass summit. Do not attempt transit.", 27.5859, 91.8594, "Arunachal Pradesh", None, now_str, "VERIFIED", 1),
        ("Flash Flood", "Teesta tributary overflow carrying muddy slurry and logs near Dikchu hydel gate.", 27.4985, 88.5307, "Sikkim", None, now_str, "VERIFIED", 1),
        ("Damaged Building", "Foundations of government school building cracked after 48-hour continuous rain.", 24.7797, 93.6369, "Manipur", None, now_str, "NEW", 1),
        # Global outside-NER demonstration report (Delhi)
        ("Blocked Road", "Urban road waterlogging under Minto Bridge after heavy monsoon downpour.", 28.6139, 77.2090, "Delhi", None, now_str, "VERIFIED", 0)
    ]
    cursor.executemany("""
        INSERT INTO reports (hazard_type, description, latitude, longitude, state, filename, created_at, status, is_ner)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, reports)

    conn.commit()

# -------------------------------------------------------------
# DATABASE QUERY & PERSISTENCE HELPERS
# -------------------------------------------------------------

def fetch_all_risk_zones(state: Optional[str] = None) -> List[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    if state and state.upper() != "ALL":
        cursor.execute("SELECT * FROM risk_zones WHERE UPPER(state) = UPPER(?) ORDER BY risk_score DESC", (state,))
    else:
        cursor.execute("SELECT * FROM risk_zones ORDER BY risk_score DESC")
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    for r in rows:
        try:
            r["major_factors"] = json.loads(r["major_factors"])
        except Exception:
            r["major_factors"] = [r["major_factors"]]
    return rows

def fetch_all_roads(state: Optional[str] = None) -> List[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    if state and state.upper() != "ALL":
        cursor.execute("SELECT * FROM roads WHERE UPPER(state) = UPPER(?) ORDER BY id ASC", (state,))
    else:
        cursor.execute("SELECT * FROM roads ORDER BY id ASC")
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    for r in rows:
        try:
            r["coordinates"] = json.loads(r["coordinates"])
        except Exception:
            r["coordinates"] = []
    return rows

def fetch_all_villages(state: Optional[str] = None) -> List[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    if state and state.upper() != "ALL":
        cursor.execute("SELECT * FROM villages WHERE UPPER(state) = UPPER(?) ORDER BY id ASC", (state,))
    else:
        cursor.execute("SELECT * FROM villages ORDER BY id ASC")
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows

def fetch_all_buildings(state: Optional[str] = None) -> List[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    if state and state.upper() != "ALL":
        cursor.execute("SELECT * FROM buildings WHERE UPPER(state) = UPPER(?) ORDER BY id ASC", (state,))
    else:
        cursor.execute("SELECT * FROM buildings ORDER BY id ASC")
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows

def fetch_all_shelters(state: Optional[str] = None) -> List[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    if state and state.upper() != "ALL":
        cursor.execute("SELECT * FROM shelters WHERE UPPER(state) = UPPER(?) ORDER BY id ASC", (state,))
    else:
        cursor.execute("SELECT * FROM shelters ORDER BY id ASC")
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows

def fetch_all_sensors(state: Optional[str] = None) -> List[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    if state and state.upper() != "ALL":
        cursor.execute("SELECT * FROM sensor_data WHERE UPPER(state) = UPPER(?) ORDER BY id ASC", (state,))
    else:
        cursor.execute("SELECT * FROM sensor_data ORDER BY id ASC")
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows

def fetch_all_alerts(active_only: bool = True, state: Optional[str] = None) -> List[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    query = "SELECT * FROM alerts WHERE 1=1"
    params = []
    if active_only:
        query += " AND is_active = 1"
    if state and state.upper() != "ALL":
        query += " AND UPPER(state) = UPPER(?)"
        params.append(state)
    query += " ORDER BY risk_score DESC, id DESC"
    cursor.execute(query, params)
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows

def insert_alert(title: str, severity: str, state: str, location: str, risk_score: int, factors: str, action: str) -> int:
    conn = get_db_connection()
    cursor = conn.cursor()
    now_str = datetime.now(IST).strftime("%d %b %Y, %I:%M %p IST")
    cursor.execute("""
        INSERT INTO alerts (title, severity, state, location, risk_score, factors, action, created_at, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    """, (title, severity, state, location, risk_score, factors, action, now_str))
    new_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return new_id

def fetch_all_reports(state: Optional[str] = None, ner_only: Optional[bool] = None) -> List[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    query = "SELECT * FROM reports WHERE 1=1"
    params = []
    if state and state.upper() != "ALL":
        query += " AND UPPER(state) = UPPER(?)"
        params.append(state)
    if ner_only is True:
        query += " AND is_ner = 1"
    elif ner_only is False:
        query += " AND is_ner = 0"
    query += " ORDER BY id DESC"
    cursor.execute(query, params)
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows

def insert_report(hazard_type: str, description: str, latitude: float, longitude: float, state: str, filename: Optional[str], is_ner: bool) -> int:
    conn = get_db_connection()
    cursor = conn.cursor()
    now_str = datetime.now(IST).strftime("%d %b %Y, %I:%M %p IST")
    cursor.execute("""
        INSERT INTO reports (hazard_type, description, latitude, longitude, state, filename, created_at, status, is_ner)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'NEW', ?)
    """, (hazard_type, description, latitude, longitude, state, filename, now_str, 1 if is_ner else 0))
    new_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return new_id

def save_weather_cache(location_name: str, state: str, lat: float, lon: float, temp: float, precip: float, wind: float, wind_dir: float, hum: float, cond: str, risk: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    now_str = datetime.now(IST).strftime("%d %b %Y, %I:%M %p IST")
    cursor.execute("""
        INSERT INTO weather_data (location_name, state, latitude, longitude, temperature, precipitation, wind_speed, wind_direction, humidity, weather_condition, risk_level, fetched_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (location_name, state, lat, lon, temp, precip, wind, wind_dir, hum, cond, risk, now_str))
    conn.commit()
    conn.close()

def fetch_latest_weather(state: Optional[str] = None) -> Optional[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    if state and state.upper() != "ALL":
        cursor.execute("SELECT * FROM weather_data WHERE UPPER(state) = UPPER(?) ORDER BY id DESC LIMIT 1", (state,))
    else:
        cursor.execute("SELECT * FROM weather_data ORDER BY id DESC LIMIT 1")
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None
