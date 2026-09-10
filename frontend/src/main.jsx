import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import {
  MapContainer,
  TileLayer,
  Circle,
  Polyline,
  Marker,
  Popup,
  useMap
} from 'react-leaflet';
import L from 'leaflet';
import {
  Shield,
  ShieldAlert,
  AlertTriangle,
  Radio,
  MapPin,
  Compass,
  Wind,
  Droplets,
  Activity,
  Layers,
  PhoneCall,
  Volume2,
  VolumeX,
  RefreshCw,
  Camera,
  CheckCircle,
  Clock,
  TrendingUp,
  Building,
  Home,
  Navigation,
  Globe,
  Satellite,
  Wifi,
  WifiOff,
  ChevronRight,
  Info,
  Search,
  Eye,
  Maximize2,
  Minimize2,
  Crosshair,
  AlertOctagon,
  FileText,
  Send,
  X,
  Map as MapIcon
} from 'lucide-react';

import './style.css';
import {
  STATE_RISK_PROFILES,
  DEFAULT_ZONES,
  DEFAULT_ROADS,
  DEFAULT_SENSORS,
  DEFAULT_SHELTERS,
  DEFAULT_ALERTS,
  DEFAULT_VILLAGES,
  DEFAULT_REPORTS,
  fetchDirectOpenMeteo
} from './mockData.js';

// Fix Leaflet marker icon asset resolution in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom SVG map icons
const createCustomIcon = (color, symbol) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 13px; box-shadow: 0 4px 10px rgba(0,0,0,0.4); border: 2px solid #ffffff;">${symbol}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });
};

const ICONS = {
  report: createCustomIcon('#f43f5e', '⚠️'),
  sensor: createCustomIcon('#0ea5e9', '📡'),
  village: createCustomIcon('#8b5cf6', '🏘️'),
  building: createCustomIcon('#64748b', '🏛️'),
  shelter: createCustomIcon('#10b981', '🛡️'),
  userPin: createCustomIcon('#3b82f6', '📍')
};

// -------------------------------------------------------------
// 6-LANGUAGE COMPREHENSIVE TRANSLATIONS DICTIONARY
// (English, Tamil, Malayalam, Telugu, Kannada, Hindi)
// -------------------------------------------------------------
const TRANSLATIONS = {
  en: {
    app_title: "LANDGUARD AI",
    app_subtitle: "NER Landslide Early Warning & Emergency Response",
    nav_dashboard: "Dashboard",
    nav_map: "GIS Map",
    nav_reports: "Reports",
    nav_alerts: "Alerts",
    nav_emergency: "Emergency",
    online: "ONLINE",
    offline: "OFFLINE",
    offline_banner: "Offline mode active – displaying latest available cached information.",
    outside_ner_alert: "LANDSLIDE RISK ANALYSIS IS AVAILABLE ONLY FOR THE NER REGION.",
    outside_ner_desc: "The selected location is outside the 8 North Eastern Region states. Live Open-Meteo weather is active, but landslide hazard calculations are strictly focused on NER.",
    overall_ner_risk: "NER OVERALL RISK",
    risk_score: "Risk Score",
    risk_severity: "Risk Severity",
    critical_areas: "Critical Areas",
    high_risk_areas: "High Risk Areas",
    moderate_risk_areas: "Moderate Risk",
    active_alerts: "Active Alerts",
    blocked_roads: "Blocked Roads",
    citizen_reports: "Citizen Reports",
    sensor_alerts: "Sensor Alerts",
    priority_areas: "NER PRIORITY RISK AREAS",
    top_factors: "Major Contributing Risk Factors",
    recommended_action: "Recommended Action",
    priority_score: "Priority Score",
    weather_title: "Live Meteorological Monitor (Open-Meteo)",
    temp: "Temperature",
    rainfall: "Rainfall",
    precipitation: "Precipitation",
    wind_speed: "Wind Speed",
    wind_direction: "Wind Direction",
    humidity: "Humidity",
    weather_condition: "Weather Condition",
    weather_risk: "Weather Risk",
    weather_contrib: "Weather Contribution",
    prototype_weather_notice: "Prototype weather-risk calculation.",
    prototype_risk_notice: "Prototype risk model – not an official government warning.",
    road_connectivity: "ROAD CONNECTIVITY",
    open_roads: "Open Roads",
    partially_blocked: "Partially Blocked",
    blocked: "Blocked Roads",
    damaged: "Damaged Roads",
    critical_routes: "Critical Routes",
    connected_pct: "Connected",
    sensor_monitoring: "SENSOR MONITORING",
    demo_sensor_data: "DEMO SENSOR DATA",
    soil_moisture: "Soil Moisture",
    slope_movement: "Slope Movement",
    ground_vibration: "Ground Vibration",
    water_level: "Water Level",
    sensor_status: "Sensor Status",
    satellite_monitoring: "SATELLITE MONITORING",
    demo_satellite_data: "DEMO SATELLITE DATA",
    terrain_change: "Terrain Change",
    surface_movement: "Surface Movement",
    vegetation_change: "Vegetation Change",
    observation_time: "Observation Time",
    report_hazard: "REPORT HAZARD",
    hazard_type: "Hazard Type",
    hazard_ground_cracks: "Ground Cracks",
    hazard_slope_movement: "Slope Movement",
    hazard_blocked_road: "Blocked Road",
    hazard_landslide: "Landslide",
    hazard_damaged_building: "Damaged Building",
    hazard_flash_flood: "Flash Flood",
    hazard_other: "Other Hazard",
    description: "Observation Description",
    upload_media: "Upload Photo / Video",
    location: "Location",
    latitude: "Latitude",
    longitude: "Longitude",
    state: "State",
    timestamp: "Timestamp",
    submit_report: "Submit Report",
    report_submitted: "Report Submitted Successfully",
    report_failed: "Report Submission Failed",
    syncing_queue: "Syncing offline reports with server...",
    reports_saved_offline: "Report queued locally. Will synchronize automatically when online.",
    find_safe_route: "FIND SAFE ROUTE",
    safe_route_title: "Safe Evacuation Route Analysis",
    recommended_route: "Recommended Safe Route",
    alternative_route: "Alternative Route",
    no_safe_route: "NO SAFE ROUTE AVAILABLE",
    route_disclaimer: "This is a prototype route-analysis system and NOT a certified evacuation-routing system.",
    offline_alarm_btn: "🚨 OFFLINE EMERGENCY ALARM",
    stop_alarm: "STOP ALARM",
    alarm_active_title: "🚨 LOCAL EMERGENCY SIREN ACTIVATED",
    emergency_instructions: "Emergency Instructions",
    inst_1: "Avoid the affected area immediately and move away from steep slopes.",
    inst_2: "Do not attempt driving through moving slurry, flash water, or cracked roadbeds.",
    inst_3: "Head for nearest verified elevated relief center or high ground.",
    search_placeholder: "Search any city, place or coordinates globally...",
    locate_me: "Locate Me",
    layer_control: "Map Layers",
    layer_risk: "Landslide Risk",
    layer_roads: "Roads",
    layer_reports: "Citizen Reports",
    layer_sensors: "Sensors",
    layer_villages: "Villages",
    layer_buildings: "Buildings",
    layer_shelters: "Emergency Shelters",
    layer_routes: "Safe Routes",
    all_ner: "ALL NER",
    low: "LOW",
    moderate: "MODERATE",
    high: "HIGH",
    critical: "CRITICAL",
    call_112: "National Emergency 112",
    call_disaster: "State Disaster Ops 1070/1077",
    disclaimer_footer: "LANDGUARD AI is an academic and disaster-response prototype. Not an official government alert system."
  },
  ta: {
    app_title: "லேண்ட்கார்ட் AI",
    app_subtitle: "வடகிழக்கு பிராந்திய நிலச்சரிவு முன்னெச்சரிக்கை மற்றும் அவசரகால மீட்பு",
    nav_dashboard: "முகப்பு",
    nav_map: "வரைபடம்",
    nav_reports: "அறிக்கைகள்",
    nav_alerts: "எச்சரிக்கைகள்",
    nav_emergency: "அவசரநிலை",
    online: "இணைப்பில் உள்ளது",
    offline: "இணைப்பு இல்லை",
    offline_banner: "ஆஃப்லைன் பயன்முறை செயலில் உள்ளது – சேமிக்கப்பட்ட தரவு காட்டப்படுகிறது.",
    outside_ner_alert: "நிலச்சரிவு அபாய பகுப்பாய்வு வடகிழக்கு பிராந்தியத்திற்கு (NER) மட்டுமே கிடைக்கும்.",
    outside_ner_desc: "தேர்ந்தெடுக்கப்பட்ட இடம் வடகிழக்கு மாநிலங்களுக்கு வெளியே உள்ளது. நேரடி வானிலை காட்டப்படுகிறது, ஆனால் நிலச்சரிவு அபாய மதிப்பீடு NER-க்கு மட்டுமே உரியது.",
    overall_ner_risk: "ஒட்டுமொத்த NER அபாயம்",
    risk_score: "அபாய மதிப்பீடு",
    risk_severity: "அபாய தீவிரம்",
    critical_areas: "மிக ஆபத்தான பகுதிகள்",
    high_risk_areas: "அதிதீவிர பகுதிகள்",
    moderate_risk_areas: "மிதமான பகுதிகள்",
    active_alerts: "செயலில் உள்ள எச்சரிக்கைகள்",
    blocked_roads: "அடைக்கப்பட்ட சாலைகள்",
    citizen_reports: "குடிமக்கள் அறிக்கைகள்",
    sensor_alerts: "உணரி எச்சரிக்கைகள்",
    priority_areas: "முன்னுரிமை அபாய பகுதிகள்",
    top_factors: "முக்கிய பங்களிக்கும் காரணிகள்",
    recommended_action: "பரிந்துரைக்கப்பட்ட நடவடிக்கை",
    priority_score: "முன்னுரிமை மதிப்பெண்",
    weather_title: "நேரடி வானிலை கண்காணிப்பு",
    temp: "வெப்பநிலை",
    rainfall: "மழைப்பொழிவு",
    precipitation: "மழை அளவு",
    wind_speed: "காற்றின் வேகம்",
    wind_direction: "காற்றின் திசை",
    humidity: "காற்றின் ஈரப்பதம்",
    weather_condition: "வானிலை நிலை",
    weather_risk: "வானிலை அபாயம்",
    weather_contrib: "வானிலை பங்களிப்பு",
    prototype_weather_notice: "மாதிரி வானிலை-அபாய கணக்கீடு.",
    prototype_risk_notice: "மாதிரி அபாய திட்டம் – அதிகாரப்பூர்வ அரசு எச்சரிக்கை அல்ல.",
    road_connectivity: "சாலை இணைப்பு நிலை",
    open_roads: "திறந்த சாலைகள்",
    partially_blocked: "பகுதி அடைப்பு",
    blocked: "முழு அடைப்பு",
    damaged: "சேதமடைந்த சாலைகள்",
    critical_routes: "முக்கிய வழிகள்",
    connected_pct: "இணைப்பு",
    sensor_monitoring: "உணரி கண்காணிப்பு",
    demo_sensor_data: "மாதிரி உணரி தரவு",
    soil_moisture: "மண் ஈரப்பதம்",
    slope_movement: "சாய்வு நகர்வு",
    ground_vibration: "நில அதிர்வு",
    water_level: "நீர்மட்டம்",
    sensor_status: "உணரி நிலை",
    satellite_monitoring: "செயற்கைக்கோள் கண்காணிப்பு",
    demo_satellite_data: "மாதிரி செயற்கைக்கோள் தரவு",
    terrain_change: "நிலப்பரப்பு மாற்றம்",
    surface_movement: "மேற்பரப்பு இயக்கம்",
    vegetation_change: "தாவர மாற்றம்",
    observation_time: "கண்காணிப்பு நேரம்",
    report_hazard: "ஆபத்தை புகாரளிக்கவும்",
    hazard_type: "ஆபத்து வகை",
    hazard_ground_cracks: "தரை வெடிப்புகள்",
    hazard_slope_movement: "சாய்வு நகர்வு",
    hazard_blocked_road: "அடைக்கப்பட்ட சாலை",
    hazard_landslide: "நிலச்சரிவு",
    hazard_damaged_building: "சேதமடைந்த கட்டிடம்",
    hazard_flash_flood: "திடீர் வெள்ளம்",
    hazard_other: "பிற ஆபத்து",
    description: "விளக்கம்",
    upload_media: "புகைப்படம் / வீடியோ பதிவேற்றவும்",
    location: "இடம்",
    latitude: "அட்சரேகை",
    longitude: "தீர்க்கரேகை",
    state: "மாநிலம்",
    timestamp: "நேரம்",
    submit_report: "அறிக்கையை சமர்ப்பிக்கவும்",
    report_submitted: "அறிக்கை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது",
    report_failed: "சமர்ப்பித்தல் தோல்வியடைந்தது",
    syncing_queue: "சேமிக்கப்பட்ட அறிக்கைகள் பதிவேற்றப்படுகின்றன...",
    reports_saved_offline: "அறிக்கை சேமிக்கப்பட்டது. இணையம் வந்ததும் தானாக சமர்ப்பிக்கப்படும்.",
    find_safe_route: "பாதுகாப்பான பாதையை கண்டறியவும்",
    safe_route_title: "பாதுகாப்பான வெளியேற்ற பாதை பகுப்பாய்வு",
    recommended_route: "பரிந்துரைக்கப்பட்ட பாதை",
    alternative_route: "மாற்றுப்பாதை",
    no_safe_route: "பாதுகாப்பான பாதை கிடைக்கவில்லை",
    route_disclaimer: "இது மாதிரி பாதை அமைப்பாகும், சான்றளிக்கப்பட்ட வெளியேற்ற அமைப்பு அல்ல.",
    offline_alarm_btn: "🚨 ஆஃப்லைன் அவசர அலாரம்",
    stop_alarm: "அலாரத்தை நிறுத்து",
    alarm_active_title: "🚨 அவசரகால எச்சரிக்கை ஒலி இயங்குகிறது",
    emergency_instructions: "அவசரகால பாதுகாப்பு வழிமுறைகள்",
    inst_1: "பாதிக்கப்பட்ட பகுதியை விட்டு உடனடியாக வெளியேறி மலைச்சரிவுகளைத் தவிர்க்கவும்.",
    inst_2: "சேறு, வெள்ளம் அல்லது உடைந்த சாலைகள் வழியே வாகனம் ஓட்ட முயற்சிக்காதீர்கள்.",
    inst_3: "அருகிலுள்ள உயரமான நிவாரண முகாமுக்கு செல்லவும்.",
    search_placeholder: "உலகில் எந்த இடத்தையும் தேடுங்கள்...",
    locate_me: "எனது இருப்பிடம்",
    layer_control: "வரைபட அடுக்குகள்",
    layer_risk: "நிலச்சரிவு அபாயம்",
    layer_roads: "சாலைகள்",
    layer_reports: "அறிக்கைகள்",
    layer_sensors: "உணரிகள்",
    layer_villages: "கிராமங்கள்",
    layer_buildings: "கட்டிடங்கள்",
    layer_shelters: "பாதுகாப்பு முகாம்கள்",
    layer_routes: "பாதுகாப்பான பாதைகள்",
    all_ner: "அனைத்து NER",
    low: "குறைவு",
    moderate: "மிதமானது",
    high: "அதிகம்",
    critical: "மிக ஆபத்தானது",
    call_112: "தேசிய அவசர உதவி 112",
    call_disaster: "மாநில பேரிடர் உதவி 1070",
    disclaimer_footer: "லேண்ட்கார்ட் AI ஒரு ஆராய்ச்சி மாதிரி. அரசு அதிகாரப்பூர்வ எச்சரிக்கைகளை பின்பற்றவும்."
  },
  ml: {
    app_title: "ലാൻഡ്‌ഗാർഡ് AI",
    app_subtitle: "വടക്കുകിഴക്കൻ മേഖല മണ്ണിടിച്ചിൽ മുന്നറിയിപ്പും അടിയന്തര പ്രതികരണവും",
    nav_dashboard: "ഡാഷ്‌ബോർഡ്",
    nav_map: "ഭൂപടം",
    nav_reports: "റിപ്പോർട്ടുകൾ",
    nav_alerts: "മുന്നറിയിപ്പുകൾ",
    nav_emergency: "അടിയന്തരാവസ്ഥ",
    online: "ഓൺലൈൻ",
    offline: "ഓഫ്‌ലൈൻ",
    offline_banner: "ഓഫ്‌ലൈൻ മോഡ് സജീവം – ലഭ്യമായ ഏറ്റവും പുതിയ വിവരങ്ങൾ പ്രദർശിപ്പിക്കുന്നു.",
    outside_ner_alert: "മണ്ണിടിച്ചിൽ സാധ്യത വിശകലനം വടക്കുകിഴക്കൻ മേഖലയ്ക്ക് (NER) മാത്രമായി ലഭ്യമാണ്.",
    outside_ner_desc: "തിരഞ്ഞെടുത്ത സ്ഥലം 8 വടക്കുകിഴക്കൻ സംസ്ഥാനങ്ങൾക്ക് പുറത്താണ്. കാലാവസ്ഥ ലഭ്യമാണ്, എന്നാൽ മണ്ണിടിച്ചിൽ വിശകലനം NER-ന് മാത്രമുള്ളതാണ്.",
    overall_ner_risk: "NER മൊത്തം അപകടസാധ്യത",
    risk_score: "അപകട സ്കോർ",
    risk_severity: "തീവ്രത",
    critical_areas: "ഗുരുതരമായ മേഖലകൾ",
    high_risk_areas: "ഉയർന്ന അപകട മേഖലകൾ",
    moderate_risk_areas: "മിതമായ അപകട മേഖലകൾ",
    active_alerts: "സജീവ മുന്നറിയിപ്പുകൾ",
    blocked_roads: "തടസ്സപ്പെട്ട റോഡുകൾ",
    citizen_reports: "ജനകീയ റിപ്പോർട്ടുകൾ",
    sensor_alerts: "സെൻസർ മുന്നറിയിപ്പുകൾ",
    priority_areas: "മുൻഗണനാ അപകട മേഖലകൾ",
    top_factors: "പ്രധാന കാരണങ്ങൾ",
    recommended_action: "ശുപാർശ ചെയ്യുന്ന നടപടി",
    priority_score: "മുൻഗണനാ സ്കോർ",
    weather_title: "തത്സമയ കാലാവസ്ഥ നിരീക്ഷണം",
    temp: "താപനില",
    rainfall: "മഴ",
    precipitation: "മഴയുടെ തോത്",
    wind_speed: "കാറ്റിന്റെ വേഗത",
    wind_direction: "കാറ്റിന്റെ ദിശ",
    humidity: "ഈർപ്പം",
    weather_condition: "കാലാവസ്ഥ",
    weather_risk: "കാലാവസ്ഥാ അപകടം",
    weather_contrib: "കാലാവസ്ഥാ പങ്ക്",
    prototype_weather_notice: "മാതൃകാ കാലാവസ്ഥാ കണക്കുകൂട്ടൽ.",
    prototype_risk_notice: "ഗവേഷണ മാതൃക – ഔദ്യോഗിക സർക്കാർ മുന്നറിയിപ്പല്ല.",
    road_connectivity: "റോഡ് കണക്റ്റിവിറ്റി",
    open_roads: "തുറന്ന റോഡുകൾ",
    partially_blocked: "ഭാഗികമായി തടസ്സപ്പെട്ടവ",
    blocked: "തടസ്സപ്പെട്ടവ",
    damaged: "തകർന്ന റോഡുകൾ",
    critical_routes: "പ്രധാന വഴികൾ",
    connected_pct: "ബന്ധിപ്പിച്ചിരിക്കുന്നു",
    sensor_monitoring: "സെൻസർ നിരീക്ഷണം",
    demo_sensor_data: "ഡെമോ സെൻസർ വിവരങ്ങൾ",
    soil_moisture: "മണ്ണിലെ ഈർപ്പം",
    slope_movement: "ചരിവിന്റെ സ്ഥാനചലനം",
    ground_vibration: "ഭൂകമ്പനം",
    water_level: "ജലനിരപ്പ്",
    sensor_status: "സെൻസർ നില",
    satellite_monitoring: "ഉപഗ്രഹ നിരീക്ഷണം",
    demo_satellite_data: "ഡെമോ ഉപഗ്രഹ വിവരങ്ങൾ",
    terrain_change: "ഭൂപ്രകൃതി മാറ്റം",
    surface_movement: "ഉപരിതല ചലനം",
    vegetation_change: "സസ്യജാല മാറ്റം",
    observation_time: "നിരീക്ഷണ സമയം",
    report_hazard: "അപകടം റിപ്പോർട്ട് ചെയ്യുക",
    hazard_type: "അപകട തരം",
    hazard_ground_cracks: "ഭൂമിയിലെ വിള്ളലുകൾ",
    hazard_slope_movement: "ചരിവിന്റെ നീക്കം",
    hazard_blocked_road: "റോഡ് തടസ്സം",
    hazard_landslide: "മണ്ണിടിച്ചിൽ",
    hazard_damaged_building: "കെട്ടിട തകർച്ച",
    hazard_flash_flood: "പെട്ടെന്നുള്ള വെള്ളപ്പൊക്കം",
    hazard_other: "മറ്റ് അപകടങ്ങൾ",
    description: "വിവരണം",
    upload_media: "ചിത്രം / വീഡിയോ ചേർക്കുക",
    location: "സ്ഥലം",
    latitude: "അക്ഷാംശം",
    longitude: "രേഖാംശം",
    state: "സംസ്ഥാനം",
    timestamp: "സമയം",
    submit_report: "റിപ്പോർട്ട് സമർപ്പിക്കുക",
    report_submitted: "റിപ്പോർട്ട് വിജയകരമായി സമർപ്പിച്ചു",
    report_failed: "സമർപ്പിക്കൽ പരാജയപ്പെട്ടു",
    syncing_queue: "ഓഫ്‌ലൈൻ റിപ്പോർട്ടുകൾ സിങ്ക് ചെയ്യുന്നു...",
    reports_saved_offline: "റിപ്പോർട്ട് സേവ് ചെയ്തു. ഇന്റർനെറ്റ് ലഭിക്കുമ്പോൾ അപ്‌ലോഡ് ചെയ്യും.",
    find_safe_route: "സുരക്ഷിത പാത കണ്ടെത്തുക",
    safe_route_title: "സുരക്ഷിത പലായന പാത വിശകലനം",
    recommended_route: "ശുപാർശ ചെയ്യുന്ന സുരക്ഷിത പാത",
    alternative_route: "ഇതര പാത",
    no_safe_route: "സുരക്ഷിത പാത ലഭ്യമല്ല",
    route_disclaimer: "ഇതൊരു പരീക്ഷണാത്മക സംവിധാനമാണ്. ഔദ്യോഗിക ഒഴിപ്പിക്കൽ വഴിയല്ല.",
    offline_alarm_btn: "🚨 ഓഫ്‌ലൈൻ എമർജൻസി അലാറം",
    stop_alarm: "അലാറം നിർത്തുക",
    alarm_active_title: "🚨 അടിയന്തര സൈറൺ സജീവമാക്കി",
    emergency_instructions: "അടിയന്തര നിർദ്ദേശങ്ങൾ",
    inst_1: "ബാധിത പ്രദേശം ഉടനടി ഒഴിഞ്ഞ് ഉയർന്ന കേന്ദ്രങ്ങളിലേക്ക് മാറുക.",
    inst_2: "ഒഴുകുന്ന ചെളിയിലൂടെയോ വെള്ളത്തിലൂടെയോ വാഹനം ഓടിക്കാൻ ശ്രമിക്കരുത്.",
    inst_3: "അടുത്തുള്ള അംഗീകൃത ദുരിതാശ്വാസ ക്യാമ്പുകളിലേക്ക് മാറുക.",
    search_placeholder: "ലോകത്തെ ഏത് സ്ഥലവും തിരയുക...",
    locate_me: "എന്റെ സ്ഥാനം",
    layer_control: "ഭൂപട ലെയറുകൾ",
    layer_risk: "മണ്ണിടിച്ചിൽ അപകടസാധ്യത",
    layer_roads: "റോഡുകൾ",
    layer_reports: "റിപ്പോർട്ടുകൾ",
    layer_sensors: "സെൻസറുകൾ",
    layer_villages: "ഗ്രാമങ്ങൾ",
    layer_buildings: "കെട്ടിടങ്ങൾ",
    layer_shelters: "ദുരിതാശ്വാസ ക്യാമ്പുകൾ",
    layer_routes: "സുരക്ഷിത പാതകൾ",
    all_ner: "എല്ലാ NER",
    low: "കുറഞ്ഞത്",
    moderate: "മിതമായത്",
    high: "ഉയർന്നത്",
    critical: "ഗുരുതരം",
    call_112: "ദേശീയ അടിയന്തര നമ്പർ 112",
    call_disaster: "സംസ്ഥാന ദുരന്ത നിവാരണ കൺട്രോൾ റൂം 1070/1077",
    disclaimer_footer: "ലാൻഡ്‌ഗാർഡ് AI ഒരു ഗവേഷണ മാതൃകയാണ്. ഔദ്യോഗിക ദുരന്തനിവാരണ നിർദ്ദേശങ്ങൾ പാലിക്കുക."
  },
  te: {
    app_title: "ల్యాండ్‌గార్డ్ AI",
    app_subtitle: "ఈశాన్య ప్రాంత కొండచరియల ముందస్తు హెచ్చరిక & అత్యవసర స్పందన",
    nav_dashboard: "డాష్‌బోర్డ్",
    nav_map: "మ్యాప్",
    nav_reports: "నివేదికలు",
    nav_alerts: "హెచ్చరికలు",
    nav_emergency: "అత్యవసర పరిస్థితి",
    online: "ఆన్‌లైన్",
    offline: "ఆఫ్‌లైన్",
    offline_banner: "ఆఫ్‌లైన్ మోడ్ సక్రియంగా ఉంది – తాజా సమాచారం చూపబడుతోంది.",
    outside_ner_alert: "కొండచరియల విరిగిపడే ప్రమాద విశ్లేషణ ఈశాన్య ప్రాంతానికి (NER) మాత్రమే అందుబాటులో ఉంది.",
    outside_ner_desc: "ఎంచుకున్న ప్రదేశం ఈశాన్య 8 రాష్ట్రాల వెలుపల ఉంది. ప్రత్యక్ష వాతావరణం అందుబాటులో ఉంది, కానీ కొండచరియల ప్రమాద విశ్లేషణ NER కి మాత్రమే పరిమితం.",
    overall_ner_risk: "మొత్తం NER ప్రమాదం",
    risk_score: "ప్రమాద స్కోరు",
    risk_severity: "ప్రమాద తీవ్రత",
    critical_areas: "తీవ్రమైన ప్రాంతాలు",
    high_risk_areas: "అధిక ప్రమాద ప్రాంతాలు",
    moderate_risk_areas: "మధ్యస్థ ప్రమాద ప్రాంతాలు",
    active_alerts: "సక్రియ హెచ్చరికలు",
    blocked_roads: "మూసివేయబడిన రోడ్లు",
    citizen_reports: "పౌర నివేదికలు",
    sensor_alerts: "సెన్సార్ హెచ్చరికలు",
    priority_areas: "NER ప్రాధాన్యతా ప్రమాద ప్రాంతాలు",
    top_factors: "ప్రధాన ప్రమాద కారకాలు",
    recommended_action: "సిఫార్సు చేసిన చర్య",
    priority_score: "ప్రాధాన్యతా స్కోరు",
    weather_title: "ప్రత్యక్ష వాతావరణ పర్యవేక్షణ",
    temp: "ఉష్ణోగ్రత",
    rainfall: "వర్షపాతం",
    precipitation: "అవపాతం",
    wind_speed: "గాలి వేగం",
    wind_direction: "గాలి దిశ",
    humidity: "తేమ",
    weather_condition: "వాతావరణ స్థితి",
    weather_risk: "వాతావరణ ప్రమాదం",
    weather_contrib: "వాతావరణ భాగస్వామ్యం",
    prototype_weather_notice: "నమూనా వాతావరణ ప్రమాద లెక్కింపు.",
    prototype_risk_notice: "నమూనా ప్రమాద మోడల్ – అధికారిక ప్రభుత్వ హెచ్చరిక కాదు.",
    road_connectivity: "రోడ్డు కనెక్టివిటీ",
    open_roads: "తెరిచిన రోడ్లు",
    partially_blocked: "పాక్షికంగా మూసివేత",
    blocked: "పూర్తిగా మూసివేత",
    damaged: "దెబ్బతిన్న రోడ్లు",
    critical_routes: "ముఖ్యమైన మార్గాలు",
    connected_pct: "అనుసంధానం",
    sensor_monitoring: "సెన్సార్ పర్యవేక్షణ",
    demo_sensor_data: "డెమో సెన్సార్ డేటా",
    soil_moisture: "నేల తేమ",
    slope_movement: "వాలు కదలిక",
    ground_vibration: "భూమి కంపనం",
    water_level: "నీటి మట్టం",
    sensor_status: "సెన్సార్ స్థితి",
    satellite_monitoring: "ఉపగ్రహ పర్యవేక్షణ",
    demo_satellite_data: "డెమో ఉపగ్రహ డేటా",
    terrain_change: "భూభాగ మార్పు",
    surface_movement: "ఉపరితల కదలిక",
    vegetation_change: "వృక్షసంపద మార్పు",
    observation_time: "పరిశీలన సమయం",
    report_hazard: "ప్రమాదాన్ని నివేదించండి",
    hazard_type: "ప్రమాద రకం",
    hazard_ground_cracks: "నేల పగుళ్లు",
    hazard_slope_movement: "కొండ వాలు కదలిక",
    hazard_blocked_road: "రోడ్డు దిగ్బంధం",
    hazard_landslide: "కొండచరియలు విరిగిపడటం",
    hazard_damaged_building: "దెబ్బతిన్న భవనం",
    hazard_flash_flood: "ఆకస్మిక వరదలు",
    hazard_other: "ఇతర ప్రమాదం",
    description: "వివరణ",
    upload_media: "ఫోటో / వీడియో అప్‌లోడ్ చేయండి",
    location: "ప్రదేశం",
    latitude: "అక్షాంశం",
    longitude: "రేఖాంశం",
    state: "రాష్ట్రం",
    timestamp: "సమయం",
    submit_report: "నివేదికను సమర్పించండి",
    report_submitted: "నివేదిక విజయవంతంగా సమర్పించబడింది",
    report_failed: "సమర్పణ విఫలమైంది",
    syncing_queue: "ఆఫ్‌లైన్ నివేదికలు సింక్ చేయబడుతున్నాయి...",
    reports_saved_offline: "నివేదిక సేవ్ చేయబడింది. ఇంటర్నెట్ రాగానే అప్‌లోడ్ చేయబడుతుంది.",
    find_safe_route: "సురక్షిత మార్గాన్ని కనుగొనండి",
    safe_route_title: "సురక్షిత తరలింపు మార్గ విశ్లేషణ",
    recommended_route: "సిఫార్సు చేసిన సురక్షిత మార్గం",
    alternative_route: "ప్రత్యామ్నాయ మార్గం",
    no_safe_route: "సురక్షిత మార్గం అందుబాటులో లేదు",
    route_disclaimer: "ఇది నమూనా మార్గ వ్యవస్థ మాత్రమే, అధికారిక తరలింపు వ్యవస్థ కాదు.",
    offline_alarm_btn: "🚨 ఆఫ్‌లైన్ అత్యవసర అలారం",
    stop_alarm: "అలారం ఆపండి",
    alarm_active_title: "🚨 అత్యవసర సైరన్ మోగుతోంది",
    emergency_instructions: "అత్యవసర సూచనలు",
    inst_1: "ప్రభావిత ప్రాంతాన్ని తక్షణమే ఖాళీ చేసి ఎత్తైన ప్రదేశాలకు వెళ్లండి.",
    inst_2: "వరద లేదా బురద ప్రవహించే రోడ్లపై ప్రయాణించవద్దు.",
    inst_3: "సమీపంలోని సురక్షిత సహాయ శిబిరానికి చేరుకోండి.",
    search_placeholder: "ప్రపంచంలో ఏదైనా నగరం లేదా స్థలాన్ని శోధించండి...",
    locate_me: "నా స్థానం",
    layer_control: "మ్యాప్ లేయర్‌లు",
    layer_risk: "కొండచరియల ప్రమాదం",
    layer_roads: "రోడ్లు",
    layer_reports: "నివేదికలు",
    layer_sensors: "సెన్సార్లు",
    layer_villages: "గ్రామాలు",
    layer_buildings: "భవనాలు",
    layer_shelters: "రక్షణ శిబిరాలు",
    layer_routes: "సురక్షిత మార్గాలు",
    all_ner: "అన్ని NER",
    low: "తక్కువ",
    moderate: "మధ్యస్థం",
    high: "అధికం",
    critical: "తీవ్రం",
    call_112: "జాతీయ అత్యవసర సహాయం 112",
    call_disaster: "రాష్ట్ర విపత్తు కంట్రోల్ రూమ్ 1070",
    disclaimer_footer: "ల్యాండ్‌గార్డ్ AI ఒక పరిశోధనా నమూనా. అధికారిక ప్రభుత్వ సూచనలను పాటించండి."
  },
  kn: {
    app_title: "ಲ್ಯಾಂಡ್‌ಗಾರ್ಡ್ AI",
    app_subtitle: "ಈಶಾನ್ಯ ವಲಯ ಭೂಕುಸಿತ ಮುನ್ನೆಚ್ಚರಿಕೆ ಮತ್ತು ತುರ್ತು ಪ್ರತಿಕ್ರಿಯೆ",
    nav_dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    nav_map: "ನಕ್ಷೆ",
    nav_reports: "ವರದಿಗಳು",
    nav_alerts: "ಎಚ್ಚರಿಕೆಗಳು",
    nav_emergency: "ತುರ್ತು ಪರಿಸ್ಥಿತಿ",
    online: "ಆನ್‌ಲೈನ್",
    offline: "ಆಫ್‌ಲೈನ್",
    offline_banner: "ಆಫ್‌ಲೈನ್ ಮೋಡ್ ಸಕ್ರಿಯವಾಗಿದೆ – ಇತ್ತೀಚಿನ ಮಾಹಿತಿಯನ್ನು ಪ್ರದರ್ಶಿಸಲಾಗುತ್ತಿದೆ.",
    outside_ner_alert: "ಭೂಕುಸಿತದ ಅಪಾಯದ ವಿಶ್ಲೇಷಣೆ ಈಶಾನ್ಯ ಪ್ರದೇಶಕ್ಕೆ (NER) ಮಾತ್ರ ಲಭ್ಯವಿದೆ.",
    outside_ner_desc: "ಆಯ್ಕೆಮಾಡಿದ ಸ್ಥಳವು ಈಶಾನ್ಯದ 8 ರಾಜ್ಯಗಳ ಹೊರಗಿದೆ. ನೇರ ಹವಾಮಾನ ಲಭ್ಯವಿದೆ, ಆದರೆ ಭೂಕುಸಿತದ ಅಪಾಯದ ವಿಶ್ಲೇಷಣೆ NER ಗೆ ಮಾತ್ರ ಸೀಮಿತವಾಗಿದೆ.",
    overall_ner_risk: "NER ಒಟ್ಟಾರೆ ಅಪಾಯ",
    risk_score: "ಅಪಾಯ ಸ್ಕೋರ್",
    risk_severity: "ಅಪಾಯ ತೀವ್ರತೆ",
    critical_areas: "ಅತ್ಯಂತ ಅಪಾಯಕಾರಿ ಪ್ರದೇಶಗಳು",
    high_risk_areas: "ಹೆಚ್ಚಿನ ಅಪಾಯದ ಪ್ರದೇಶಗಳು",
    moderate_risk_areas: "ಮಧ್ಯಮ ಅಪಾಯದ ಪ್ರದೇಶಗಳು",
    active_alerts: "ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಗಳು",
    blocked_roads: "ಮುಚ್ಚಿದ ರಸ್ತೆಗಳು",
    citizen_reports: "ನಾಗರಿಕರ ವರದಿಗಳು",
    sensor_alerts: "ಸೆನ್ಸರ್ ಎಚ್ಚರಿಕೆಗಳು",
    priority_areas: "NER ಆದ್ಯತೆಯ ಅಪಾಯದ ಪ್ರದೇಶಗಳು",
    top_factors: "ಪ್ರಮುಖ ಕಾರಣಗಳು",
    recommended_action: "ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ",
    priority_score: "ಆದ್ಯತೆಯ ಸ್ಕೋರ್",
    weather_title: "ನೇರ ಹವಾಮಾನ ಮೇಲ್ವಿಚಾರಣೆ",
    temp: "ತಾಪಮಾನ",
    rainfall: "ಮಳೆ",
    precipitation: "ಮಳೆಯ ಪ್ರಮಾಣ",
    wind_speed: "ಗಾಳಿಯ ವೇಗ",
    wind_direction: "ಗಾಳಿಯ ದಿಕ್ಕು",
    humidity: "ಆರ್ದ್ರತೆ",
    weather_condition: "ಹವಾಮಾನ ಸ್ಥಿತಿ",
    weather_risk: "ಹವಾಮಾನ ಅಪಾಯ",
    weather_contrib: "ಹವಾಮಾನ ಕೊಡುಗೆ",
    prototype_weather_notice: "ಮಾದರಿ ಹವಾಮಾನ-ಅಪಾಯ ಲೆಕ್ಕಾಚಾರ.",
    prototype_risk_notice: "ಮಾದರಿ ವಿಶ್ಲೇಷಣೆ – ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಎಚ್ಚರಿಕೆಯಲ್ಲ.",
    road_connectivity: "ರಸ್ತೆ ಸಂಪರ್ಕ",
    open_roads: "ತೆರೆದ ರಸ್ತೆಗಳು",
    partially_blocked: "ಭಾಗಶಃ ಮುಚ್ಚಲ್ಪಟ್ಟಿದೆ",
    blocked: "ಸಂಪೂರ್ಣ ಮುಚ್ಚಲ್ಪಟ್ಟಿದೆ",
    damaged: "ಹಾಳಾದ ರಸ್ತೆಗಳು",
    critical_routes: "ಪ್ರಮುಖ ಮಾರ್ಗಗಳು",
    connected_pct: "ಸಂಪರ್ಕಗೊಂಡಿದೆ",
    sensor_monitoring: "ಸೆನ್ಸರ್ ಮೇಲ್ವಿಚಾರಣೆ",
    demo_sensor_data: "ಡೆಮೊ ಸೆನ್ಸರ್ ಡೇಟಾ",
    soil_moisture: "ಮಣ್ಣಿನ ತೇವಾಂಶ",
    slope_movement: "ಇಳಿಜಾರಿನ ಚಲನೆ",
    ground_vibration: "ಭೂಕಂಪನ",
    water_level: "ನೀರಿನ ಮಟ್ಟ",
    sensor_status: "ಸೆನ್ಸರ್ ಸ್ಥಿತಿ",
    satellite_monitoring: "ಉಪಗ್ರಹ ಮೇಲ್ವಿಚಾರಣೆ",
    demo_satellite_data: "ಡೆಮೊ ಉಪಗ್ರಹ ಡೇಟಾ",
    terrain_change: "ಭೂಪ್ರದೇಶ ಬದಲಾವಣೆ",
    surface_movement: "ಮೇಲ್ಮೈ ಚಲನೆ",
    vegetation_change: "ಸಸ್ಯವರ್ಗ ಬದಲಾವಣೆ",
    observation_time: "ವೀಕ್ಷಣಾ ಸಮಯ",
    report_hazard: "ಅಪಾಯವನ್ನು ವರದಿ ಮಾಡಿ",
    hazard_type: "ಅಪಾಯದ ಪ್ರಕಾರ",
    hazard_ground_cracks: "ನೆಲದ ಬಿರುಕುಗಳು",
    hazard_slope_movement: "ಇಳಿಜಾರಿನ ಚಲನೆ",
    hazard_blocked_road: "ರಸ್ತೆ ಬ್ಲಾಕ್",
    hazard_landslide: "ಭೂಕುಸಿತ",
    hazard_damaged_building: "ಹಾನಿಗೊಳಗಾದ ಕಟ್ಟಡ",
    hazard_flash_flood: "ಹಠಾತ್ ಪ್ರವಾಹ",
    hazard_other: "ಇತರ ಅಪಾಯ",
    description: "ವಿವರಣೆ",
    upload_media: "ಫೋಟೋ / ವೀಡಿಯೊ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    location: "ಸ್ಥಳ",
    latitude: "ಅಕ್ಷಾಂಶ",
    longitude: "ರೇಖಾಂಶ",
    state: "ರಾಜ್ಯ",
    timestamp: "ಸಮಯ",
    submit_report: "ವರದಿಯನ್ನು ಸಲ್ಲಿಸಿ",
    report_submitted: "ವರದಿ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಕೆಯಾಗಿದೆ",
    report_failed: "ಸಲ್ಲಿಕೆ ವಿಫಲವಾಗಿದೆ",
    syncing_queue: "ಆಫ್‌ಲೈನ್ ವರದಿಗಳು ಸಿಂಕ್ ಆಗುತ್ತಿವೆ...",
    reports_saved_offline: "ವರದಿ ಉಳಿಸಲಾಗಿದೆ. ನೆಟ್‌ವರ್ಕ್ ಬಂದಾಗ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಅಪ್‌ಲೋಡ್ ಆಗುತ್ತದೆ.",
    find_safe_route: "ಸುರಕ್ಷಿತ ಮಾರ್ಗವನ್ನು ಹುಡುಕಿ",
    safe_route_title: "ಸುರಕ್ಷಿತ ಸ್ಥಳಾಂತರ ಮಾರ್ಗ ವಿಶ್ಲೇಷಣೆ",
    recommended_route: "ಶಿಫಾರಸು ಮಾಡಲಾದ ಸುರಕ್ಷಿತ ಮಾರ್ಗ",
    alternative_route: "ಪರ್ಯಾಯ ಮಾರ್ಗ",
    no_safe_route: "ಯಾವುದೇ ಸುರಕ್ಷಿತ ಮಾರ್ಗ ಲಭ್ಯವಿಲ್ಲ",
    route_disclaimer: "ಇದು ಮಾದರಿ ಮಾರ್ಗ ವಿಶ್ಲೇಷಣೆಯಾಗಿದೆ, ಅಧಿಕೃತ ಸ್ಥಳಾಂತರ ವ್ಯವಸ್ಥೆಯಲ್ಲ.",
    offline_alarm_btn: "🚨 ಆಫ್‌ಲೈನ್ ತುರ್ತು ಎಚ್ಚರಿಕೆ ಅಲಾರಾಂ",
    stop_alarm: "ಅಲಾರಾಂ ನಿಲ್ಲಿಸಿ",
    alarm_active_title: "🚨 ತುರ್ತು ಸೈರನ್ ಸಕ್ರಿಯಗೊಂಡಿದೆ",
    emergency_instructions: "ತುರ್ತು ಸುರಕ್ಷತಾ ಸೂಚನೆಗಳು",
    inst_1: "ಬಾಧಿತ ಪ್ರದೇಶದಿಂದ ತಕ್ಷಣ ಹೊರಟು ಎತ್ತರದ ಪ್ರದೇಶಗಳಿಗೆ ತೆರಳಿ.",
    inst_2: "ಹರಿಯುವ ಕೆಸರು ಅಥವಾ ನೀರಿನ ರಸ್ತೆಗಳಲ್ಲಿ ವಾಹನ ಚಲಾಯಿಸಬೇಡಿ.",
    inst_3: "ಹತ್ತಿರದ ಸುರಕ್ಷಿತ ಪರಿಹಾರ ಕೇಂದ್ರಕ್ಕೆ ತೆರಳಿ.",
    search_placeholder: "ವಿಶ್ವದ ಯಾವುದೇ ನಗರ ಅಥವಾ ಸ್ಥಳವನ್ನು ಹುಡುಕಿ...",
    locate_me: "ನನ್ನ ಸ್ಥಳ",
    layer_control: "ನಕ್ಷೆಯ ಪದರಗಳು",
    layer_risk: "ಭೂಕುಸಿತದ ಅಪಾಯ",
    layer_roads: "ರಸ್ತೆಗಳು",
    layer_reports: "ವರದಿಗಳು",
    layer_sensors: "ಸೆನ್ಸರ್‌ಗಳು",
    layer_villages: "ಹಳ್ಳಿಗಳು",
    layer_buildings: "ಕಟ್ಟಡಗಳು",
    layer_shelters: "ಪರಿಹಾರ ಕೇಂದ್ರಗಳು",
    layer_routes: "ಸುರಕ್ಷಿತ ಮಾರ್ಗಗಳು",
    all_ner: "ಎಲ್ಲಾ NER",
    low: "ಕಡಿಮೆ",
    moderate: "ಮಧ್ಯಮ",
    high: "ಹೆಚ್ಚು",
    critical: "ಅತ್ಯಂತ ಅಪಾಯಕಾರಿ",
    call_112: "ರಾಷ್ಟ್ರೀಯ ತುರ್ತು ಸಹಾಯ 112",
    call_disaster: "ರಾಜ್ಯ ವಿಪತ್ತು ನಿಯಂತ್ರಣ ಕೊಠಡಿ 1070",
    disclaimer_footer: "ಲ್ಯಾಂಡ್‌ಗಾರ್ಡ್ AI ಸಂಶೋಧನಾ ಮಾದರಿಯಾಗಿದೆ. ಅಧಿಕೃತ ಸರ್ಕಾರದ ನಿರ್ದೇಶನಗಳನ್ನು ಪಾಲಿಸಿ."
  },
  hi: {
    app_title: "लैंडगार्ड AI",
    app_subtitle: "पूर्वोत्तर क्षेत्र भूस्खलन पूर्व चेतावनी एवं आपातकालीन प्रतिक्रिया",
    nav_dashboard: "डैशबोर्ड",
    nav_map: "मानचित्र",
    nav_reports: "रिपोर्ट्स",
    nav_alerts: "चेतावनी",
    nav_emergency: "आपातकाल",
    online: "ऑनलाइन",
    offline: "ऑफलाइन",
    offline_banner: "ऑफलाइन मोड सक्रिय है – नवीनतम उपलब्ध डेटा प्रदर्शित किया जा रहा है।",
    outside_ner_alert: "भूस्खलन जोखिम विश्लेषण केवल पूर्वोत्तर क्षेत्र (NER) के लिए उपलब्ध है।",
    outside_ner_desc: "चयनित स्थान पूर्वोत्तर के 8 राज्यों से बाहर है। लाइव मौसम उपलब्ध है, लेकिन भूस्खलन जोखिम विश्लेषण केवल पूर्वोत्तर (NER) तक सीमित है।",
    overall_ner_risk: "पूर्वोत्तर कुल जोखिम",
    risk_score: "जोखिम स्कोर",
    risk_severity: "जोखिम गंभीरता",
    critical_areas: "गंभीर क्षेत्र",
    high_risk_areas: "उच्च जोखिम क्षेत्र",
    moderate_risk_areas: "मध्यम जोखिम",
    active_alerts: "सक्रिय चेतावनियां",
    blocked_roads: "अवरुद्ध सड़कें",
    citizen_reports: "नागरिक रिपोर्ट",
    sensor_alerts: "सेंसर अलर्ट",
    priority_areas: "पूर्वोत्तर प्राथमिकता जोखिम क्षेत्र",
    top_factors: "प्रमुख योगदान कारक",
    recommended_action: "अनुशंसित कार्रवाई",
    priority_score: "प्राथमिकता स्कोर",
    weather_title: "लाइव मौसम निगरानी",
    temp: "तापमान",
    rainfall: "वर्षा",
    precipitation: "वर्षा दर",
    wind_speed: "हवा की गति",
    wind_direction: "हवा की दिशा",
    humidity: "आर्द्रता",
    weather_condition: "मौसम की स्थिति",
    weather_risk: "मौसम जोखिम",
    weather_contrib: "मौसम योगदान",
    prototype_weather_notice: "प्रोटोटाइप मौसम-जोखिम गणना।",
    prototype_risk_notice: "प्रोटोटाइप जोखिम मॉडल – आधिकारिक सरकारी चेतावनी नहीं।",
    road_connectivity: "सड़क संपर्क स्थिति",
    open_roads: "खुली सड़कें",
    partially_blocked: "आंशिक अवरुद्ध",
    blocked: "पूरी तरह अवरुद्ध",
    damaged: "क्षतिग्रस्त सड़कें",
    critical_routes: "महत्वपूर्ण मार्ग",
    connected_pct: "संपर्क दर",
    sensor_monitoring: "सेंसर निगरानी",
    demo_sensor_data: "डेमो सेंसर डेटा",
    soil_moisture: "मिट्टी की नमी",
    slope_movement: "ढलान विस्थापन",
    ground_vibration: "जमीनी कंपन",
    water_level: "जल स्तर",
    sensor_status: "सेंसर स्थिति",
    satellite_monitoring: "उपग्रह निगरानी",
    demo_satellite_data: "डेमो सैटेलाइट डेटा",
    terrain_change: "भू-भाग परिवर्तन",
    surface_movement: "सतह विस्थापन",
    vegetation_change: "वनस्पति परिवर्तन",
    observation_time: "निरीक्षण समय",
    report_hazard: "खतरे की रिपोर्ट करें",
    hazard_type: "खतरे का प्रकार",
    hazard_ground_cracks: "जमीन में दरारें",
    hazard_slope_movement: "ढलान खिसकना",
    hazard_blocked_road: "सड़क अवरोध",
    hazard_landslide: "भूस्खलन",
    hazard_damaged_building: "क्षतिग्रस्त इमारत",
    hazard_flash_flood: "अचानक बाढ़",
    hazard_other: "अन्य खतरा",
    description: "अवलोकन विवरण",
    upload_media: "फोटो / वीडियो अपलोड करें",
    location: "स्थान",
    latitude: "अक्षांश",
    longitude: "देशांतर",
    state: "राज्य",
    timestamp: "समय",
    submit_report: "रिपोर्ट सबमिट करें",
    report_submitted: "रिपोर्ट सफलतापूर्वक दर्ज की गई",
    report_failed: "सबमिशन विफल हुआ",
    syncing_queue: "ऑफलाइन रिपोर्ट सर्वर पर सिंक हो रही हैं...",
    reports_saved_offline: "रिपोर्ट स्थानीय रूप से सुरक्षित की गई। नेटवर्क आने पर स्वतः अपलोड होगी।",
    find_safe_route: "सुरक्षित मार्ग खोजें",
    safe_route_title: "सुरक्षित निकासी मार्ग विश्लेषण",
    recommended_route: "अनुशंसित सुरक्षित मार्ग",
    alternative_route: "वैकल्पिक मार्ग",
    no_safe_route: "कोई सुरक्षित मार्ग उपलब्ध नहीं है",
    route_disclaimer: "यह एक प्रोटोटाइप विश्लेषण प्रणाली है, प्रमाणित निकासी रूटिंग नहीं।",
    offline_alarm_btn: "🚨 ऑफलाइन आपातकालीन सायरन",
    stop_alarm: "सायरन बंद करें",
    alarm_active_title: "🚨 आपातकालीन सायरन चालू है",
    emergency_instructions: "आपातकालीन सुरक्षा निर्देश",
    inst_1: "प्रभावित घाटी को तुरंत खाली करें और खड़ी पहाड़ी ढलानों से दूर रहें।",
    inst_2: "बहते मलबे या पानी वाले रास्तों पर गाड़ी चलाने का प्रयास न करें।",
    inst_3: "निकटतम सुरक्षित राहत शिविर या ऊंचाई वाले क्षेत्र में शरण लें।",
    search_placeholder: "विश्व के किसी भी शहर या स्थान को खोजें...",
    locate_me: "मेरा स्थान",
    layer_control: "मानचित्र परतें",
    layer_risk: "भूस्खलन जोखिम",
    layer_roads: "सड़कें",
    layer_reports: "रिपोर्ट्स",
    layer_sensors: "सेंसर",
    layer_villages: "गांव",
    layer_buildings: "इमारतें",
    layer_shelters: "राहत शिविर",
    layer_routes: "सुरक्षित मार्ग",
    all_ner: "सभी पूर्वोत्तर (ALL NER)",
    low: "कम",
    moderate: "मध्यम",
    high: "उच्च",
    critical: "अत्यधिक गंभीर",
    call_112: "राष्ट्रीय आपातकालीन सेवा 112",
    call_disaster: "राज्य आपदा नियंत्रण कक्ष 1070",
    disclaimer_footer: "लैंडगार्ड AI एक शोध एवं आपातकालीन प्रोटोटाइप है। आधिकारिक सरकारी निर्देशों का पालन करें।"
  }
};

const NER_STATES = [
  "ALL NER",
  "Arunachal Pradesh",
  "Assam",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Sikkim",
  "Tripura"
];

const NER_STATE_COORDS = {
  "ALL NER": [26.15, 92.8, 7],
  "Arunachal Pradesh": [27.0844, 93.6053, 8],
  "Assam": [26.1445, 91.7362, 8],
  "Manipur": [24.8170, 93.9368, 8],
  "Meghalaya": [25.5788, 91.8933, 9],
  "Mizoram": [23.7271, 92.7176, 8],
  "Nagaland": [25.6751, 94.1086, 8],
  "Sikkim": [27.3389, 88.6065, 9],
  "Tripura": [23.8315, 91.2868, 9]
};

// Map controller helper for smooth programmatic pans
function MapFlyController({ target, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (target && target[0] && target[1]) {
      map.flyTo(target, zoom || map.getZoom(), { duration: 1.2 });
    }
  }, [target, zoom, map]);
  return null;
}

// Map Click Listener component
function MapClickWatcher({ onMapClick }) {
  const map = useMap();
  useEffect(() => {
    const handleClick = (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    };
    map.on('click', handleClick);
    return () => map.off('click', handleClick);
  }, [map, onMapClick]);
  return null;
}

export default function LandguardApp() {
  // 1. Language state with localStorage persistence
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('landguard_lang') || 'en';
  });

  const t = (key) => {
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key] || key;
  };

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem('landguard_lang', newLang);
  };

  // 2. Network connectivity state
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncingQueue, setSyncingQueue] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      processOfflineReportQueue();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 3. IST Clock (Updated every second)
  const [istTimeStr, setIstTimeStr] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Formatter for Asia/Kolkata
      const options = {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setIstTimeStr(now.toLocaleString('en-IN', options) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 4. Navigation Tab: 'dashboard', 'map', 'reports', 'alerts', 'emergency'
  const [activeTab, setActiveTab] = useState('dashboard');

  // 5. NER State Selector
  const [selectedState, setSelectedState] = useState('ALL NER');

  // 6. Coordinates & Location
  const [currentCoords, setCurrentCoords] = useState([25.5788, 91.8933]); // Shillong default
  const [mapCenter, setMapCenter] = useState([26.15, 92.8]);
  const [mapZoom, setMapZoom] = useState(7);
  const [isNerLocation, setIsNerLocation] = useState(true);
  const [selectedPlaceName, setSelectedPlaceName] = useState('Shillong, Meghalaya');

  // 7. Layer Toggles for GIS Map
  const [layers, setLayers] = useState({
    risk: true,
    roads: true,
    reports: true,
    sensors: true,
    villages: true,
    buildings: false,
    shelters: true,
    routes: true
  });
  const toggleLayer = (layerName) => {
    setLayers(prev => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  // 8. Data States from FastAPI backend (with autonomous Vercel/offline fallbacks)
  const [dashboardData, setDashboardData] = useState(() => STATE_RISK_PROFILES['ALL NER']);
  const [weatherData, setWeatherData] = useState(null);
  const [riskZones, setRiskZones] = useState(DEFAULT_ZONES);
  const [roads, setRoads] = useState(DEFAULT_ROADS);
  const [reports, setReports] = useState(DEFAULT_REPORTS);
  const [sensors, setSensors] = useState(DEFAULT_SENSORS);
  const [villages, setVillages] = useState(DEFAULT_VILLAGES);
  const [buildings, setBuildings] = useState([]);
  const [shelters, setShelters] = useState(DEFAULT_SHELTERS);
  const [alerts, setAlerts] = useState(DEFAULT_ALERTS);
  const [safeRouteData, setSafeRouteData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Command Center States
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [alertFilter, setAlertFilter] = useState('ALL');
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState({});
  const [alarmConfirmModal, setAlarmConfirmModal] = useState(false);

  // 9. Search Bar State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  // 10. Hazard Reporting Form State
  const [hazardForm, setHazardForm] = useState({
    hazard_type: 'Landslide',
    description: '',
    latitude: 25.5788,
    longitude: 91.8933,
    state: 'Meghalaya'
  });
  const [reportFile, setReportFile] = useState(null);
  const [submittingReport, setSubmittingReport] = useState(false);
  const [reportSuccessMsg, setReportSuccessMsg] = useState('');
  const [reportErrorMsg, setReportErrorMsg] = useState('');

  // 11. Offline Audio Alarm Synthesizer (Web Audio API)
  const [alarmActive, setAlarmActive] = useState(false);
  const audioCtxRef = useRef(null);
  const oscillator1Ref = useRef(null);
  const oscillator2Ref = useRef(null);
  const gainNodeRef = useRef(null);
  const sirenIntervalRef = useRef(null);

  const startEmergencyAlarm = () => {
    try {
      if (alarmActive) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sine';

      // Initial siren frequencies
      osc1.frequency.setValueAtTime(750, ctx.currentTime);
      osc2.frequency.setValueAtTime(1100, ctx.currentTime);

      gain.gain.setValueAtTime(0.35, ctx.currentTime);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      oscillator1Ref.current = osc1;
      oscillator2Ref.current = osc2;
      gainNodeRef.current = gain;

      // Modulate frequency to create alarming wailing police/disaster siren
      let high = false;
      sirenIntervalRef.current = setInterval(() => {
        if (!audioCtxRef.current) return;
        const now = audioCtxRef.current.currentTime;
        if (high) {
          osc1.frequency.linearRampToValueAtTime(720, now + 0.35);
          osc2.frequency.linearRampToValueAtTime(950, now + 0.35);
        } else {
          osc1.frequency.linearRampToValueAtTime(1180, now + 0.35);
          osc2.frequency.linearRampToValueAtTime(1420, now + 0.35);
        }
        high = !high;
      }, 400);

      setAlarmActive(true);
    } catch (err) {
      console.error("Audio alarm activation failed:", err);
      setAlarmActive(true); // Still open full emergency modal
    }
  };

  const stopEmergencyAlarm = () => {
    try {
      if (sirenIntervalRef.current) clearInterval(sirenIntervalRef.current);
      if (oscillator1Ref.current) {
        oscillator1Ref.current.stop();
        oscillator1Ref.current.disconnect();
      }
      if (oscillator2Ref.current) {
        oscillator2Ref.current.stop();
        oscillator2Ref.current.disconnect();
      }
      if (gainNodeRef.current) gainNodeRef.current.disconnect();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    } catch (err) {
      console.warn("Alarm stop cleanup:", err);
    } finally {
      audioCtxRef.current = null;
      oscillator1Ref.current = null;
      oscillator2Ref.current = null;
      setAlarmActive(false);
    }
  };

  // 12. Fetch Core API Data with Autonomous Client-Side Fallback for Vercel
  const fetchData = async (stateFilter = selectedState, lat = currentCoords[0], lon = currentCoords[1]) => {
    setLoading(true);
    const backendState = stateFilter === 'ALL NER' ? 'ALL' : stateFilter;

    // 1. Immediately apply the selected state's profile so Vercel & offline mode ALWAYS work dynamically
    const stateProfile = STATE_RISK_PROFILES[stateFilter] || STATE_RISK_PROFILES['ALL NER'];
    if (stateProfile) {
      setDashboardData(stateProfile);
      setIsNerLocation(stateProfile.is_ner);
    }

    // 2. Filter local mock data by state immediately
    const filterState = stateFilter === 'ALL NER' ? null : stateFilter;
    if (filterState) {
      setSensors(DEFAULT_SENSORS.filter(s => s.state === filterState));
      setRoads(DEFAULT_ROADS.filter(r => r.state === filterState));
      setRiskZones(DEFAULT_ZONES.filter(z => z.state === filterState));
      setShelters(DEFAULT_SHELTERS.filter(sh => sh.state === filterState));
      setAlerts(DEFAULT_ALERTS.filter(al => al.state === filterState));
      setVillages(DEFAULT_VILLAGES.filter(v => v.state === filterState));
    } else {
      setSensors(DEFAULT_SENSORS);
      setRoads(DEFAULT_ROADS);
      setRiskZones(DEFAULT_ZONES);
      setShelters(DEFAULT_SHELTERS);
      setAlerts(DEFAULT_ALERTS);
      setVillages(DEFAULT_VILLAGES);
    }

    try {
      // 1. Dashboard summary (Local FastAPI if available)
      const dashResp = await fetch(`/api/dashboard?state=${encodeURIComponent(backendState)}&lat=${lat}&lon=${lon}`).catch(() => null);
      if (dashResp && dashResp.ok) {
        const data = await dashResp.json();
        setDashboardData(data);
        setIsNerLocation(data.is_ner);
        localStorage.setItem('landguard_cache_dashboard', JSON.stringify(data));
      }

      // 2. Weather: Try backend first, otherwise fetch DIRECTLY from Open-Meteo on Vercel
      let weatherUpdated = false;
      const weatherResp = await fetch(`/api/weather?latitude=${lat}&longitude=${lon}`).catch(() => null);
      if (weatherResp && weatherResp.ok) {
        const wData = await weatherResp.json();
        setWeatherData(wData);
        localStorage.setItem('landguard_cache_weather', JSON.stringify(wData));
        weatherUpdated = true;
      }
      
      if (!weatherUpdated) {
        const directW = await fetchDirectOpenMeteo(lat, lon, stateProfile ? stateProfile.is_ner : true);
        if (directW) {
          setWeatherData(directW);
          localStorage.setItem('landguard_cache_weather', JSON.stringify(directW));
        }
      }

      // 3. Risk zones
      const zonesResp = await fetch(`/api/risk-zones?state=${encodeURIComponent(backendState)}`).catch(() => null);
      if (zonesResp && zonesResp.ok) {
        const zData = await zonesResp.json();
        setRiskZones(zData);
      }

      // 4. Roads
      const roadsResp = await fetch(`/api/roads?state=${encodeURIComponent(backendState)}`).catch(() => null);
      if (roadsResp && roadsResp.ok) {
        const rData = await roadsResp.json();
        setRoads(rData);
      }

      // 5. Citizen Reports
      const reportsResp = await fetch(`/api/reports?state=${encodeURIComponent(backendState)}`).catch(() => null);
      if (reportsResp && reportsResp.ok) {
        const repData = await reportsResp.json();
        setReports(repData);
      }

      // 6. Sensors
      const sensorsResp = await fetch(`/api/sensors?state=${encodeURIComponent(backendState)}`).catch(() => null);
      if (sensorsResp && sensorsResp.ok) {
        const sData = await sensorsResp.json();
        setSensors(sData.stations || []);
      }

      // 7. Villages
      const vilResp = await fetch(`/api/villages?state=${encodeURIComponent(backendState)}`).catch(() => null);
      if (vilResp && vilResp.ok) {
        const vData = await vilResp.json();
        setVillages(vData);
      }

      // 8. Shelters
      const shResp = await fetch(`/api/shelters?state=${encodeURIComponent(backendState)}`).catch(() => null);
      if (shResp && shResp.ok) {
        const shData = await shResp.json();
        setShelters(shData);
      }

      // 9. Alerts
      const alResp = await fetch(`/api/alerts?state=${encodeURIComponent(backendState)}`).catch(() => null);
      if (alResp && alResp.ok) {
        const alData = await alResp.json();
        setAlerts(alData);
      }

      // 10. Safe Route
      const routeResp = await fetch(`/api/routes/safe?state=${encodeURIComponent(backendState)}&start_lat=${lat}&start_lon=${lon}`).catch(() => null);
      if (routeResp && routeResp.ok) {
        const rtData = await routeResp.json();
        setSafeRouteData(rtData);
      }
    } catch (err) {
      console.warn("Backend unavailable or offline. Using autonomous edge mode:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadCachedData = () => {
    try {
      const cachedDash = localStorage.getItem('landguard_cache_dashboard');
      if (cachedDash) setDashboardData(JSON.parse(cachedDash));

      const cachedWeather = localStorage.getItem('landguard_cache_weather');
      if (cachedWeather) setWeatherData(JSON.parse(cachedWeather));

      const cachedZones = localStorage.getItem('landguard_cache_zones');
      if (cachedZones) setRiskZones(JSON.parse(cachedZones));

      const cachedRoads = localStorage.getItem('landguard_cache_roads');
      if (cachedRoads) setRoads(JSON.parse(cachedRoads));

      const cachedReports = localStorage.getItem('landguard_cache_reports');
      if (cachedReports) setReports(JSON.parse(cachedReports));

      const cachedSensors = localStorage.getItem('landguard_cache_sensors');
      if (cachedSensors) setSensors(JSON.parse(cachedSensors));

      const cachedVillages = localStorage.getItem('landguard_cache_villages');
      if (cachedVillages) setVillages(JSON.parse(cachedVillages));

      const cachedShelters = localStorage.getItem('landguard_cache_shelters');
      if (cachedShelters) setShelters(JSON.parse(cachedShelters));

      const cachedAlerts = localStorage.getItem('landguard_cache_alerts');
      if (cachedAlerts) setAlerts(JSON.parse(cachedAlerts));
    } catch (e) {
      console.error("Error restoring cached disaster data:", e);
    }
  };

  // Initial load
  useEffect(() => {
    fetchData('ALL NER', currentCoords[0], currentCoords[1]);
  }, []);

  // Handle State Selector Click
  const handleSelectState = (stateName) => {
    setSelectedState(stateName);
    const target = NER_STATE_COORDS[stateName] || NER_STATE_COORDS['ALL NER'];
    setMapCenter([target[0], target[1]]);
    setMapZoom(target[2]);
    setCurrentCoords([target[0], target[1]]);
    setSelectedPlaceName(stateName === 'ALL NER' ? 'All North Eastern Region' : stateName);

    // Immediately update state profile so risk score changes instantaneously
    const stateProfile = STATE_RISK_PROFILES[stateName] || STATE_RISK_PROFILES['ALL NER'];
    if (stateProfile) {
      setDashboardData(stateProfile);
      setIsNerLocation(stateProfile.is_ner);
    }

    fetchData(stateName, target[0], target[1]);
  };

  // Map Click Handler: Global navigation click
  const handleMapClick = async (lat, lon) => {
    setCurrentCoords([lat, lon]);
    setHazardForm(prev => ({ ...prev, latitude: parseFloat(lat.toFixed(4)), longitude: parseFloat(lon.toFixed(4)) }));
    
    // Strict NER Geofence check
    const inNer = (lat >= 21.8 && lat <= 29.6 && lon >= 88.0 && lon <= 97.5);
    setIsNerLocation(inNer);

    if (!inNer) {
      setSelectedPlaceName(`Location [${lat.toFixed(3)}, ${lon.toFixed(3)}]`);
      setDashboardData({
        is_ner: false,
        overall_risk: {
          risk_score: null,
          risk_severity: null,
          color: '#94a3b8',
          recommended_action: 'Selected coordinate is outside the 8 North Eastern Region states. Landslide hazard analysis is strictly limited to NER.'
        },
        main_metrics: { critical_areas: 0, high_risk_areas: 0, moderate_risk_areas: 0, active_alerts: 0, blocked_roads: 0, citizen_reports: 0, sensor_alerts: 0 },
        road_connectivity: { connected_percentage: 100, open: 0, partially_blocked: 0, blocked: 0, damaged: 0 }
      });
    } else {
      setSelectedPlaceName(`NER Coordinate [${lat.toFixed(3)}, ${lon.toFixed(3)}]`);
    }

    try {
      const wResp = await fetch(`/api/weather?latitude=${lat}&longitude=${lon}`).catch(() => null);
      if (wResp && wResp.ok) {
        const wData = await wResp.json();
        setWeatherData(wData);
      } else {
        const directW = await fetchDirectOpenMeteo(lat, lon, inNer);
        if (directW) setWeatherData(directW);
      }
    } catch (e) {
      const directW = await fetchDirectOpenMeteo(lat, lon, inNer);
      if (directW) setWeatherData(directW);
    }
  };

  // Search Location Handler (OpenStreetMap Nominatim Geocoding)
  const handleSearchLocation = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchLoading(true);
    setSearchError('');
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery.trim())}&limit=1`;
      const resp = await fetch(url, { headers: { 'Accept': 'application/json' } });
      const results = await resp.json();
      if (results && results.length > 0) {
        const lat = parseFloat(results[0].lat);
        const lon = parseFloat(results[0].lon);
        const displayName = results[0].display_name;

        setCurrentCoords([lat, lon]);
        setMapCenter([lat, lon]);
        setMapZoom(11);
        setSelectedPlaceName(displayName);

        // Check if inside NER
        const checkResp = await fetch(`/api/check-ner?lat=${lat}&lon=${lon}`);
        if (checkResp.ok) {
          const checkData = await checkResp.json();
          setIsNerLocation(checkData.is_ner);
        }

        // Fetch dynamic weather & risk
        const wResp = await fetch(`/api/weather?latitude=${lat}&longitude=${lon}`);
        if (wResp.ok) {
          setWeatherData(await wResp.json());
        }
        const rResp = await fetch(`/api/risk?lat=${lat}&lon=${lon}`);
        if (rResp.ok) {
          const rData = await rResp.json();
          if (dashboardData) {
            setDashboardData(prev => ({ ...prev, overall_risk: rData, is_ner: rData.is_ner }));
          }
        }
      } else {
        setSearchError('Place not found. Please try another query.');
      }
    } catch (err) {
      setSearchError('Search service currently unreachable.');
    } finally {
      setSearchLoading(false);
    }
  };

  // Browser GPS Locate Me
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setCurrentCoords([lat, lon]);
        setMapCenter([lat, lon]);
        setMapZoom(12);
        setSelectedPlaceName(`GPS Coordinate [${lat.toFixed(4)}, ${lon.toFixed(4)}]`);
        handleMapClick(lat, lon);
      },
      (err) => {
        alert("GPS location permission denied or unavailable.");
      },
      { enableHighAccuracy: true }
    );
  };

  // Submit Citizen Report with File Upload & Offline Queue
  const handleSubmitReport = async (e) => {
    e.preventDefault();
    setSubmittingReport(true);
    setReportSuccessMsg('');
    setReportErrorMsg('');

    const formData = new FormData();
    formData.append('hazard_type', hazardForm.hazard_type);
    formData.append('description', hazardForm.description);
    formData.append('latitude', hazardForm.latitude);
    formData.append('longitude', hazardForm.longitude);
    formData.append('state', hazardForm.state);
    if (reportFile) {
      formData.append('file', reportFile);
    }

    if (!navigator.onLine) {
      // Save locally to offline queue
      const offlineItem = {
        hazard_type: hazardForm.hazard_type,
        description: hazardForm.description,
        latitude: hazardForm.latitude,
        longitude: hazardForm.longitude,
        state: hazardForm.state,
        created_at: istTimeStr || new Date().toISOString(),
        status: 'NEW (Offline Queue)'
      };
      const existingQueue = JSON.parse(localStorage.getItem('landguard_offline_reports') || '[]');
      existingQueue.push(offlineItem);
      localStorage.setItem('landguard_offline_reports', JSON.stringify(existingQueue));
      setReportSuccessMsg(t('reports_saved_offline'));
      setSubmittingReport(false);
      return;
    }

    try {
      const resp = await fetch('/api/reports', {
        method: 'POST',
        body: formData
      });
      if (resp.ok) {
        const data = await resp.json();
        setReportSuccessMsg(t('report_submitted'));
        // Refresh reports
        const rResp = await fetch('/api/reports');
        if (rResp.ok) setReports(await rResp.json());
        // Reset form
        setHazardForm(prev => ({ ...prev, description: '' }));
        setReportFile(null);
      } else {
        const err = await resp.json();
        setReportErrorMsg(err.detail || t('report_failed'));
      }
    } catch (err) {
      // Network failed during send -> queue offline
      const offlineItem = {
        hazard_type: hazardForm.hazard_type,
        description: hazardForm.description,
        latitude: hazardForm.latitude,
        longitude: hazardForm.longitude,
        state: hazardForm.state,
        created_at: istTimeStr || new Date().toISOString(),
        status: 'NEW (Offline Queue)'
      };
      const existingQueue = JSON.parse(localStorage.getItem('landguard_offline_reports') || '[]');
      existingQueue.push(offlineItem);
      localStorage.setItem('landguard_offline_reports', JSON.stringify(existingQueue));
      setReportSuccessMsg(t('reports_saved_offline'));
    } finally {
      setSubmittingReport(false);
    }
  };

  // Sync Offline Report Queue
  const processOfflineReportQueue = async () => {
    const queue = JSON.parse(localStorage.getItem('landguard_offline_reports') || '[]');
    if (queue.length === 0) return;
    setSyncingQueue(true);
    for (const item of queue) {
      try {
        const fd = new FormData();
        fd.append('hazard_type', item.hazard_type);
        fd.append('description', item.description);
        fd.append('latitude', item.latitude);
        fd.append('longitude', item.longitude);
        fd.append('state', item.state);
        await fetch('/api/reports', { method: 'POST', body: fd });
      } catch (err) {
        console.warn("Queue item sync error:", err);
      }
    }
    localStorage.removeItem('landguard_offline_reports');
    setSyncingQueue(false);
    // Refresh reports
    const rResp = await fetch('/api/reports');
    if (rResp.ok) setReports(await rResp.json());
  };

  // Helper for status badge colors
  const getSeverityBadgeClass = (severity) => {
    switch (severity) {
      case 'CRITICAL': return 'badge-critical';
      case 'HIGH': return 'badge-high';
      case 'MODERATE': return 'badge-moderate';
      default: return 'badge-low';
    }
  };

  // -------------------------------------------------------------
  // RENDER COMPONENT
  // -------------------------------------------------------------
  return (
    <div className="app-container">
      {/* 1. TOP APP HEADER */}
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-logo-wrap">
            <ShieldAlert className="brand-icon" />
          </div>
          <div>
            <h1 className="brand-title">{t('app_title')}</h1>
            <p className="brand-subtitle">{t('app_subtitle')}</p>
          </div>
        </div>

        <div className="header-meta">
          {/* Live IST Clock */}
          <div className="ist-clock">
            <Clock className="meta-icon" />
            <span className="clock-text">{istTimeStr || 'IST Loading...'}</span>
          </div>

          {/* Network Status Badge */}
          <div className={`network-badge ${isOnline ? 'online' : 'offline'}`}>
            {isOnline ? <Wifi className="badge-icon" /> : <WifiOff className="badge-icon" />}
            <span>{isOnline ? t('online') : t('offline')}</span>
          </div>

          {/* Multilingual Selector */}
          <div className="lang-picker">
            <Globe className="lang-icon" />
            <select
              value={lang}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="lang-select"
              aria-label="Language Selector"
            >
              <option value="en">English</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="ml">മലയാളം (Malayalam)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
              <option value="hi">हिन्दी (Hindi)</option>
            </select>
          </div>
        </div>
      </header>

      {/* Offline Alert Banner */}
      {!isOnline && (
        <div className="offline-banner">
          <WifiOff className="banner-icon" />
          <span>{t('offline_banner')}</span>
        </div>
      )}

      {/* Syncing Queue Notification */}
      {syncingQueue && (
        <div className="sync-banner">
          <RefreshCw className="banner-icon spin" />
          <span>{t('syncing_queue')}</span>
        </div>
      )}

      {/* 2. NER STATE SELECTOR BAR */}
      <nav className="state-selector-bar" aria-label="NER State Selector">
        <div className="state-pills-container">
          {NER_STATES.map((st) => (
            <button
              key={st}
              onClick={() => handleSelectState(st)}
              className={`state-pill ${selectedState === st ? 'active' : ''}`}
            >
              {st === 'ALL NER' ? t('all_ner') : st}
            </button>
          ))}
        </div>
      </nav>

      {/* Location Context Banner (Especially if outside NER) */}
      {!isNerLocation && (
        <div className="outside-ner-notice">
          <Info className="notice-icon" />
          <div>
            <strong>{t('outside_ner_alert')}</strong>
            <p>{t('outside_ner_desc')}</p>
          </div>
        </div>
      )}

      {/* 3. MAIN CONTENT TABS */}
      <main className="tab-viewport">
        {/* ========================================================= */}
        {/* TAB 1: DASHBOARD                                          */}
        {/* ========================================================= */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-layout">
            {/* Row 1: Overall NER Risk Card & Key Metrics Grid */}
            <div className="risk-overview-grid">
              {/* Overall Risk Card */}
              <div className="card overall-risk-card">
                <div className="card-header">
                  <div>
                    <span className="card-category">{selectedState}</span>
                    <h2 className="card-title">{t('overall_ner_risk')}</h2>
                  </div>
                  {isNerLocation && dashboardData?.overall_risk?.risk_severity && (
                    <span className={`severity-badge ${getSeverityBadgeClass(dashboardData.overall_risk.risk_severity)}`}>
                      {t(dashboardData.overall_risk.risk_severity.toLowerCase()) || dashboardData.overall_risk.risk_severity}
                    </span>
                  )}
                </div>

                <div className="risk-score-display">
                  {isNerLocation ? (
                    <div className="score-num-wrap">
                      <span className="score-num" style={{ color: dashboardData?.overall_risk?.color || '#ef4444' }}>
                        {dashboardData?.overall_risk?.risk_score ?? 78}
                      </span>
                      <span className="score-max">/ 100</span>
                    </div>
                  ) : (
                    <div className="outside-score-placeholder">
                      <span className="outside-tag">N/A</span>
                      <p className="outside-caption">{t('outside_ner_alert')}</p>
                    </div>
                  )}

                  <div className="risk-meter-track">
                    <div
                      className="risk-meter-fill"
                      style={{
                        width: isNerLocation ? `${dashboardData?.overall_risk?.risk_score || 78}%` : '0%',
                        backgroundColor: dashboardData?.overall_risk?.color || '#ef4444'
                      }}
                    />
                  </div>
                </div>

                {isNerLocation && (
                  <div className="risk-advisory-box">
                    <AlertTriangle className="advisory-icon" />
                    <p className="advisory-text">
                      <strong>{t('recommended_action')}: </strong>
                      {dashboardData?.overall_risk?.recommended_action || "Maintain heightened alert. Avoid steep mountain road passes."}
                    </p>
                  </div>
                )}

                {/* Explainable AI (XAI) Evidence Panel */}
                {isNerLocation && dashboardData?.overall_risk?.factors && (
                  <div className="xai-panel">
                    <div className="xai-header">
                      <span className="xai-badge">
                        <Activity size={12} /> AI Risk Evidence & Drivers
                      </span>
                      <span className="xai-confidence-tag">
                        Confidence: {dashboardData?.overall_risk?.risk_score >= 80 ? '91%' : dashboardData?.overall_risk?.risk_score >= 60 ? '88%' : '84%'} High
                      </span>
                    </div>

                    <div className="xai-drivers-grid">
                      {dashboardData.overall_risk.factors.map((f, fIdx) => {
                        const getBarColor = (pct) => {
                          if (pct >= 85) return '#ef4444';
                          if (pct >= 70) return '#f97316';
                          if (pct >= 50) return '#f59e0b';
                          return '#10b981';
                        };
                        return (
                          <div key={fIdx} className="xai-driver-card">
                            <div className="xai-driver-top">
                              <span>{f.factor}</span>
                              <span className="xai-driver-val">{f.percentage}%</span>
                            </div>
                            <div className="xai-progress-track">
                              <div
                                className="xai-progress-fill"
                                style={{ width: `${f.percentage}%`, backgroundColor: getBarColor(f.percentage) }}
                              />
                            </div>
                            <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>
                              {f.detail}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="xai-directive-box">
                      <AlertOctagon size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <strong>Geotechnical AI Directive: </strong>
                        {dashboardData?.overall_risk?.risk_score >= 80
                          ? 'Terzaghi Effective Stress limit breached. Mandatory evacuation of toe slopes and diversion of heavy transit.'
                          : dashboardData?.overall_risk?.risk_score >= 60
                          ? 'Precipitation saturation elevating pore-water pressure. Restrict night passage through mountain passes.'
                          : 'Nominal geotechnical stability. Continuous sensor baseline monitoring active.'}
                      </div>
                    </div>
                  </div>
                )}

                <p className="prototype-note">{t('prototype_risk_notice')}</p>
              </div>

              {/* Main Metrics 2x4 Grid */}
              <div className="card metrics-grid-card">
                <h3 className="card-title-sm">Operational Metrics</h3>
                <div className="metrics-grid">
                  <div className="metric-cell critical">
                    <span className="metric-val">{dashboardData?.main_metrics?.critical_areas ?? 5}</span>
                    <span className="metric-label">{t('critical_areas')}</span>
                  </div>
                  <div className="metric-cell high">
                    <span className="metric-val">{dashboardData?.main_metrics?.high_risk_areas ?? 8}</span>
                    <span className="metric-label">{t('high_risk_areas')}</span>
                  </div>
                  <div className="metric-cell moderate">
                    <span className="metric-val">{dashboardData?.main_metrics?.moderate_risk_areas ?? 12}</span>
                    <span className="metric-label">{t('moderate_risk_areas')}</span>
                  </div>
                  <div className="metric-cell alert">
                    <span className="metric-val">{dashboardData?.main_metrics?.active_alerts ?? alerts.length}</span>
                    <span className="metric-label">{t('active_alerts')}</span>
                  </div>
                  <div className="metric-cell road">
                    <span className="metric-val">{dashboardData?.main_metrics?.blocked_roads ?? 6}</span>
                    <span className="metric-label">{t('blocked_roads')}</span>
                  </div>
                  <div className="metric-cell reports">
                    <span className="metric-val">{dashboardData?.main_metrics?.citizen_reports ?? reports.length}</span>
                    <span className="metric-label">{t('citizen_reports')}</span>
                  </div>
                  <div className="metric-cell sensor">
                    <span className="metric-val">{dashboardData?.main_metrics?.sensor_alerts ?? 9}</span>
                    <span className="metric-label">{t('sensor_alerts')}</span>
                  </div>
                  <div className="metric-cell connectivity">
                    <span className="metric-val">{dashboardData?.road_connectivity?.connected_percentage ?? 72}%</span>
                    <span className="metric-label">{t('connected_pct')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Live Weather (Open-Meteo) & Road Connectivity */}
            <div className="secondary-dash-grid">
              {/* Weather Card */}
              <div className="card weather-card">
                <div className="card-header">
                  <div>
                    <span className="card-category">Open-Meteo Dynamic Feed</span>
                    <h3 className="card-title">{t('weather_title')}</h3>
                  </div>
                  {weatherData?.weather_risk && isNerLocation && (
                    <span className={`severity-badge ${getSeverityBadgeClass(weatherData.weather_risk)}`}>
                      {weatherData.weather_risk}
                    </span>
                  )}
                </div>

                <div className="weather-stats-row">
                  <div className="weather-primary">
                    <div className="weather-temp-wrap">
                      <span className="weather-temp">{weatherData?.temperature_c?.toFixed(1) ?? '21.5'}°C</span>
                      <span className="weather-cond">{weatherData?.weather_condition ?? 'Heavy Monsoonal Rain'}</span>
                    </div>
                  </div>
                  <div className="weather-pills-col">
                    <div className="weather-pill">
                      <Droplets className="w-icon" />
                      <span>{t('rainfall')}: <strong>{weatherData?.precipitation_mm ?? '18.4'} mm</strong></span>
                    </div>
                    <div className="weather-pill">
                      <Wind className="w-icon" />
                      <span>{t('wind_speed')}: <strong>{weatherData?.wind_speed_kmh ?? '22'} km/h</strong></span>
                    </div>
                    <div className="weather-pill">
                      <Activity className="w-icon" />
                      <span>{t('humidity')}: <strong>{weatherData?.humidity_pct ?? '88'}%</strong></span>
                    </div>
                  </div>
                </div>

                {isNerLocation ? (
                  <div className="weather-analysis-bar">
                    <span className="contrib-tag">{t('weather_contrib')}:</span>
                    <span className="contrib-desc">{weatherData?.risk_analysis || "Rainfall saturation elevates hillside pore water pressure."}</span>
                  </div>
                ) : (
                  <p className="outside-notice-inline">{t('outside_ner_alert')}</p>
                )}

                <p className="prototype-note">{t('prototype_weather_notice')}</p>
              </div>

              {/* Road Connectivity Card */}
              <div className="card road-card">
                <div className="card-header">
                  <div>
                    <span className="card-category">Lifelines & Corridors</span>
                    <h3 className="card-title">{t('road_connectivity')}</h3>
                  </div>
                  <span className="connectivity-badge">
                    {dashboardData?.road_connectivity?.connected_percentage ?? 72}% {t('connected_pct')}
                  </span>
                </div>

                <div className="road-breakdown-row">
                  <div className="road-stat open">
                    <span className="r-num">{dashboardData?.road_connectivity?.open ?? 14}</span>
                    <span className="r-lbl">{t('open_roads')}</span>
                  </div>
                  <div className="road-stat partial">
                    <span className="r-num">{dashboardData?.road_connectivity?.partially_blocked ?? 5}</span>
                    <span className="r-lbl">{t('partially_blocked')}</span>
                  </div>
                  <div className="road-stat blocked">
                    <span className="r-num">{dashboardData?.road_connectivity?.blocked ?? 4}</span>
                    <span className="r-lbl">{t('blocked')}</span>
                  </div>
                  <div className="road-stat damaged">
                    <span className="r-num">{dashboardData?.road_connectivity?.damaged ?? 2}</span>
                    <span className="r-lbl">{t('damaged')}</span>
                  </div>
                </div>

                <div className="road-action-hint">
                  <Navigation className="hint-icon" />
                  <span>Road conditions actively configure evacuation safe-routes.</span>
                </div>
              </div>
            </div>

            {/* Row 3: Priority Risk Areas with Factor Prioritization */}
            <div className="card priority-areas-card">
              <div className="card-header">
                <div>
                  <span className="card-category">Multi-Factor Assessment</span>
                  <h3 className="card-title">{t('priority_areas')}</h3>
                </div>
                <span className="tag-simulated">Simulated Prototype Model</span>
              </div>

              <div className="priority-list">
                {riskZones.slice(0, 5).map((zone, idx) => (
                  <div key={zone.id || idx} className="priority-item">
                    <div className="priority-rank-col">
                      <span className="rank-badge">#{idx + 1}</span>
                    </div>

                    <div className="priority-info-col">
                      <div className="priority-header-line">
                        <h4 className="zone-name">{zone.name}</h4>
                        <span className="zone-state-badge">{zone.state}</span>
                        <span className={`severity-badge ${getSeverityBadgeClass(zone.risk_level)}`}>
                          {zone.risk_score}/100 • {t(zone.risk_level.toLowerCase()) || zone.risk_level}
                        </span>
                      </div>

                      <div className="zone-factors">
                        <strong className="factors-title">{t('top_factors')}:</strong>
                        <ul className="factors-bullet-list">
                          {(Array.isArray(zone.major_factors) ? zone.major_factors : [zone.major_factors]).map((fac, fIdx) => (
                            <li key={fIdx}>{fac}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="zone-meta-line">
                        <span>Nearby Road: <strong>{zone.nearby_road_status}</strong></span>
                        <span>Villages at Risk: <strong>{zone.nearby_village_count}</strong></span>
                        <span>Key Buildings: <strong>{zone.nearby_building_count}</strong></span>
                      </div>

                      <div className="zone-actions-row">
                        <button
                          onClick={() => {
                            setActiveTab('map');
                            setMapCenter([zone.latitude, zone.longitude]);
                            setMapZoom(12);
                            setSelectedEntity({ type: 'zone', data: zone });
                          }}
                          className="btn-zone-map"
                        >
                          <MapPin size={12} /> View on Map
                        </button>
                        <button
                          onClick={() => setActiveTab('emergency')}
                          className="btn-zone-action"
                        >
                          <ShieldAlert size={12} /> Response Action →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 4: Geotechnical Sensors & Satellite Surveillance */}
            <div className="telemetry-grid">
              <div className="card sensor-card">
                <div className="card-header">
                  <div>
                    <span className="card-category">In-Situ Telemetry Array</span>
                    <h3 className="card-title">{t('sensor_monitoring')}</h3>
                  </div>
                  <span className="tag-demo">{t('demo_sensor_data')}</span>
                </div>

                <div className="sensor-summary-stats">
                  <div className="s-stat">
                    <span className="s-num">{dashboardData?.sensor_summary?.average_soil_moisture ?? 89.2}%</span>
                    <span className="s-lbl">{t('soil_moisture')}</span>
                  </div>
                  <div className="s-stat">
                    <span className="s-num">{dashboardData?.sensor_summary?.max_slope_displacement ?? 16.8} mm/d</span>
                    <span className="s-lbl">{t('slope_movement')}</span>
                  </div>
                  <div className="s-stat">
                    <span className="s-num">{sensors.length}</span>
                    <span className="s-lbl">Active Stations</span>
                  </div>
                </div>

                <div className="sensor-list-snippet">
                  {sensors.slice(0, 3).map((sn, i) => (
                    <div key={sn.id || i} className="sensor-snippet-row">
                      <Radio className="sensor-pulse-icon" />
                      <div className="sensor-row-content">
                        <strong>{sn.location} ({sn.state})</strong>
                        <div className="sensor-specs">
                          <span>Moisture: {sn.soil_moisture}%</span>
                          <span>Creep: {sn.slope_movement} mm/d</span>
                          <span className={`sensor-tag ${sn.status.toLowerCase()}`}>{sn.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card satellite-card">
                <div className="card-header">
                  <div>
                    <span className="card-category">Copernicus Sentinel-1 InSAR</span>
                    <h3 className="card-title">{t('satellite_monitoring')}</h3>
                  </div>
                  <span className="tag-demo">{t('demo_satellite_data')}</span>
                </div>

                <div className="satellite-metrics-col">
                  <div className="sat-row">
                    <Satellite className="sat-icon" />
                    <div>
                      <span className="sat-lbl">{t('terrain_change')}:</span>
                      <strong className="sat-val">Active Scarp Widening Detected (+18.4 mm/wk)</strong>
                    </div>
                  </div>
                  <div className="sat-row">
                    <Activity className="sat-icon" />
                    <div>
                      <span className="sat-lbl">{t('surface_movement')}:</span>
                      <strong className="sat-val">Elevated Disung & Teesta Chutes</strong>
                    </div>
                  </div>
                  <div className="sat-row">
                    <Eye className="sat-icon" />
                    <div>
                      <span className="sat-lbl">{t('vegetation_change')}:</span>
                      <strong className="sat-val">Monsoon Gully Gullying Loss (-14%)</strong>
                    </div>
                  </div>
                </div>
                <p className="sat-timestamp">Observation: {dashboardData?.satellite?.observation_time || istTimeStr}</p>
                <p className="prototype-note">Prepared for ISRO Bhoovan / Copernicus API integration.</p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: GIS MAP (GLOBALLY NAVIGABLE + NER RISK LAYERS)     */}
        {/* ========================================================= */}
        {activeTab === 'map' && (
          <div className="map-view-container">
            {/* Map Search & Control Overlay */}
            <div className="map-search-bar-wrap">
              <form onSubmit={handleSearchLocation} className="search-form">
                <Search className="search-input-icon" />
                <input
                  type="text"
                  placeholder={t('search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="btn-search" disabled={searchLoading}>
                  {searchLoading ? '...' : <ChevronRight />}
                </button>
              </form>

              <button onClick={handleLocateMe} className="btn-locate" title={t('locate_me')}>
                <Crosshair className="locate-icon" />
              </button>
            </div>

            {searchError && (
              <div className="search-error-toast">
                <span>{searchError}</span>
                <button onClick={() => setSearchError('')} className="btn-close-toast"><X size={14} /></button>
              </div>
            )}

            {/* Layer Control Drawer */}
            <div className="layer-control-panel">
              <div className="layer-header">
                <Layers className="layer-icon" />
                <span>{t('layer_control')}</span>
              </div>
              <div className="layer-buttons-grid">
                <button
                  onClick={() => toggleLayer('risk')}
                  className={`layer-btn ${layers.risk ? 'active' : ''}`}
                >
                  {t('layer_risk')} (NER)
                </button>
                <button
                  onClick={() => toggleLayer('roads')}
                  className={`layer-btn ${layers.roads ? 'active' : ''}`}
                >
                  {t('layer_roads')}
                </button>
                <button
                  onClick={() => toggleLayer('reports')}
                  className={`layer-btn ${layers.reports ? 'active' : ''}`}
                >
                  {t('layer_reports')}
                </button>
                <button
                  onClick={() => toggleLayer('sensors')}
                  className={`layer-btn ${layers.sensors ? 'active' : ''}`}
                >
                  {t('layer_sensors')}
                </button>
                <button
                  onClick={() => toggleLayer('villages')}
                  className={`layer-btn ${layers.villages ? 'active' : ''}`}
                >
                  {t('layer_villages')}
                </button>
                <button
                  onClick={() => toggleLayer('shelters')}
                  className={`layer-btn ${layers.shelters ? 'active' : ''}`}
                >
                  {t('layer_shelters')}
                </button>
                <button
                  onClick={() => toggleLayer('routes')}
                  className={`layer-btn ${layers.routes ? 'active' : ''}`}
                >
                  {t('layer_routes')}
                </button>
              </div>
            </div>

            {/* GIS Map Canvas (Leaflet) */}
            <div className="leaflet-map-wrapper">
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                scrollWheelZoom={true}
                className="leaflet-full-canvas"
              >
                <MapFlyController target={mapCenter} zoom={mapZoom} />
                <MapClickWatcher onMapClick={handleMapClick} />

                {/* OpenStreetMap Base Tiles */}
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Layer 1: Landslide Risk Heatmap Circles (NER ONLY) */}
                {layers.risk && riskZones.map((zone) => {
                  const getZoneColor = (lvl) => {
                    if (lvl === 'CRITICAL') return '#ef4444';
                    if (lvl === 'HIGH') return '#f97316';
                    if (lvl === 'MODERATE') return '#f59e0b';
                    return '#10b981';
                  };
                  return (
                    <Circle
                      key={`zone-${zone.id}`}
                      center={[zone.latitude, zone.longitude]}
                      radius={zone.radius_m || 1500}
                      pathOptions={{
                        color: getZoneColor(zone.risk_level),
                        fillColor: getZoneColor(zone.risk_level),
                        fillOpacity: 0.35,
                        weight: 2
                      }}
                      eventHandlers={{
                        click: () => setSelectedEntity({ type: 'zone', data: zone })
                      }}
                    >
                      <Popup>
                        <div className="map-popup">
                          <h4 className="popup-title">{zone.name}</h4>
                          <span className={`severity-badge ${getSeverityBadgeClass(zone.risk_level)}`}>
                            {zone.risk_score} / 100 • {zone.risk_level}
                          </span>
                          <p className="popup-state">State: {zone.state}</p>
                          <div className="popup-stats">
                            <span>Rainfall: {zone.rainfall} mm</span>
                            <span>Moisture: {zone.soil_moisture}%</span>
                            <span>Slope: {zone.slope}°</span>
                          </div>
                          <div className="popup-factors">
                            <strong>Key Factors:</strong>
                            <ul>
                              {(Array.isArray(zone.major_factors) ? zone.major_factors : [zone.major_factors]).map((f, i) => (
                                <li key={i}>{f}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Popup>
                    </Circle>
                  );
                })}

                {/* Layer 2: Roads Polylines */}
                {layers.roads && roads.map((road) => {
                  const getRoadColor = (status) => {
                    if (status === 'BLOCKED') return '#ef4444';
                    if (status === 'DAMAGED') return '#f97316';
                    if (status === 'PARTIALLY BLOCKED') return '#f59e0b';
                    return '#10b981';
                  };
                  return (
                    <Polyline
                      key={`road-${road.id}`}
                      positions={road.coordinates}
                      pathOptions={{
                        color: getRoadColor(road.status),
                        weight: road.status === 'BLOCKED' ? 5 : 4,
                        opacity: 0.85
                      }}
                      eventHandlers={{
                        click: () => setSelectedEntity({ type: 'road', data: road })
                      }}
                    >
                      <Popup>
                        <div className="map-popup">
                          <h4 className="popup-title">{road.name}</h4>
                          <span className={`road-status-badge ${road.status.toLowerCase().replace(' ', '-')}`}>
                            {road.status}
                          </span>
                          <p>State: {road.state}</p>
                          <p>Distance: {road.distance_km} km</p>
                          <p className="popup-time">Updated: {road.updated_at}</p>
                        </div>
                      </Popup>
                    </Polyline>
                  );
                })}

                {/* Layer 3: Citizen Hazard Reports */}
                {layers.reports && reports.map((rep) => (
                  <Marker
                    key={`rep-${rep.id}`}
                    position={[rep.latitude, rep.longitude]}
                    icon={ICONS.report}
                  >
                    <Popup>
                      <div className="map-popup">
                        <h4 className="popup-title">⚠️ {rep.hazard_type}</h4>
                        <p className="popup-desc">{rep.description}</p>
                        <p className="popup-state">Location: {rep.state} {rep.is_ner ? '(NER)' : '(Outside NER)'}</p>
                        <span className={`report-status-badge ${rep.status.toLowerCase()}`}>{rep.status}</span>
                        {rep.filename && (
                          <div className="popup-media-box">
                            <a href={`/uploads/${rep.filename}`} target="_blank" rel="noreferrer" className="media-link">
                              View Attached Media Evidence
                            </a>
                          </div>
                        )}
                        <p className="popup-time">{rep.created_at}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Layer 4: Geotechnical Sensors */}
                {layers.sensors && sensors.map((sensor) => (
                  <Marker
                    key={`sens-${sensor.id}`}
                    position={[sensor.latitude, sensor.longitude]}
                    icon={ICONS.sensor}
                    eventHandlers={{
                      click: () => setSelectedEntity({ type: 'sensor', data: sensor })
                    }}
                  >
                    <Popup>
                      <div className="map-popup">
                        <h4 className="popup-title">📡 {sensor.location}</h4>
                        <p className="sensor-id">Station ID: {sensor.sensor_id} ({sensor.state})</p>
                        <div className="sensor-readings">
                          <div>Soil Moisture: <strong>{sensor.soil_moisture}%</strong></div>
                          <div>Slope Creep: <strong>{sensor.slope_movement} mm/day</strong></div>
                          <div>Ground Vibration: <strong>{sensor.ground_vibration}</strong></div>
                          <div>Water Level: <strong>{sensor.water_level}%</strong></div>
                        </div>
                        <span className={`sensor-tag ${sensor.status.toLowerCase()}`}>{sensor.status}</span>
                        <p className="popup-time">Telemetry: {sensor.updated_at}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Layer 5: Vulnerable Villages */}
                {layers.villages && villages.map((vil) => (
                  <Marker
                    key={`vil-${vil.id}`}
                    position={[vil.latitude, vil.longitude]}
                    icon={ICONS.village}
                  >
                    <Popup>
                      <div className="map-popup">
                        <h4 className="popup-title">🏘️ {vil.name}</h4>
                        <p>State: {vil.state}</p>
                        <p>Population: <strong>{vil.population}</strong></p>
                        <p>Risk Level: <strong className={vil.risk_level.toLowerCase()}>{vil.risk_level}</strong></p>
                        <p>Evacuation: <strong>{vil.evacuation_status}</strong></p>
                        <p>Action: {vil.recommended_action}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Layer 6: Shelters */}
                {layers.shelters && shelters.map((sh) => (
                  <Marker
                    key={`sh-${sh.id}`}
                    position={[sh.latitude, sh.longitude]}
                    icon={ICONS.shelter}
                  >
                    <Popup>
                      <div className="map-popup">
                        <h4 className="popup-title">🛡️ {sh.name}</h4>
                        <p>State: {sh.state}</p>
                        <p>Capacity: {sh.current_occupancy} / {sh.capacity} persons</p>
                        <p>Status: <strong className="safe-tag">{sh.status}</strong></p>
                        <p>Contact: <strong>{sh.contact_phone}</strong></p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Layer 7: Safe Evacuation Routes */}
                {layers.routes && safeRouteData?.recommended_route?.coordinates && (
                  <>
                    <Polyline
                      positions={safeRouteData.recommended_route.coordinates}
                      pathOptions={{
                        color: '#06b6d4',
                        weight: 5,
                        dashArray: null,
                        opacity: 0.95
                      }}
                    >
                      <Popup>
                        <div className="map-popup">
                          <h4 className="popup-title">⭐ Recommended Safe Route</h4>
                          <p>Distance: {safeRouteData.recommended_route.distance_km} km</p>
                          <p>Est. Time: {safeRouteData.recommended_route.estimated_minutes} mins</p>
                          <p className="route-rating">{safeRouteData.recommended_route.safety_rating}</p>
                        </div>
                      </Popup>
                    </Polyline>

                    {safeRouteData?.alternative_route?.coordinates && (
                      <Polyline
                        positions={safeRouteData.alternative_route.coordinates}
                        pathOptions={{
                          color: '#f59e0b',
                          weight: 4,
                          dashArray: '8, 8',
                          opacity: 0.8
                        }}
                      >
                        <Popup>
                          <div className="map-popup">
                            <h4 className="popup-title">Alternative Evacuation Bypass</h4>
                            <p>Distance: {safeRouteData.alternative_route.distance_km} km</p>
                            <p>Est. Time: {safeRouteData.alternative_route.estimated_minutes} mins</p>
                          </div>
                        </Popup>
                      </Polyline>
                    )}
                  </>
                )}

                {/* User Current Click Marker */}
                <Marker position={currentCoords} icon={ICONS.userPin}>
                  <Popup>
                    <div className="map-popup">
                      <h4 className="popup-title">{selectedPlaceName}</h4>
                      <p>Lat: {currentCoords[0].toFixed(4)}, Lon: {currentCoords[1].toFixed(4)}</p>
                      <p className={isNerLocation ? 'ner-active-tag' : 'ner-outside-tag'}>
                        {isNerLocation ? '✓ NER Landslide Monitoring Active' : t('outside_ner_alert')}
                      </p>
                      {weatherData && (
                        <div className="popup-weather-mini">
                          <span>{weatherData.temperature_c}°C</span>
                          <span>{weatherData.precipitation_mm}mm Rain</span>
                          <span>{weatherData.weather_condition}</span>
                        </div>
                      )}
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

            {/* Risk Heatmap Legend Overlay */}
            <div className="map-legend-overlay">
              <span className="legend-title">Landslide Risk Legend (NER)</span>
              <div className="legend-items">
                <span className="legend-badge low">0–25 LOW</span>
                <span className="legend-badge moderate">26–50 MODERATE</span>
                <span className="legend-badge high">51–75 HIGH</span>
                <span className="legend-badge critical">76–100 CRITICAL</span>
              </div>
            </div>

            {/* Tactical Mission Control Drawer on Map */}
            {selectedEntity && (
              <div className="tactical-drawer">
                <div className="drawer-header">
                  <div>
                    <span className="card-category">TACTICAL COMMAND INSPECT</span>
                    <h4 className="drawer-title">{selectedEntity.data.name || selectedEntity.data.location}</h4>
                  </div>
                  <button onClick={() => setSelectedEntity(null)} className="btn-drawer-close" title="Close">
                    <X size={14} />
                  </button>
                </div>

                <div className="drawer-stat-grid">
                  <div className="drawer-stat-card">
                    <span className="drawer-stat-lbl">Risk Assessment</span>
                    <span className="drawer-stat-val" style={{ color: '#ef4444' }}>
                      {selectedEntity.data.risk_score ? `${selectedEntity.data.risk_score}/100` : selectedEntity.data.status || 'ACTIVE'}
                    </span>
                  </div>
                  <div className="drawer-stat-card">
                    <span className="drawer-stat-lbl">Soil Moisture</span>
                    <span className="drawer-stat-val">
                      {selectedEntity.data.soil_moisture ? `${selectedEntity.data.soil_moisture}%` : '89.4%'}
                    </span>
                  </div>
                  <div className="drawer-stat-card">
                    <span className="drawer-stat-lbl">Displacement / Gradient</span>
                    <span className="drawer-stat-val">
                      {selectedEntity.data.slope_movement ? `${selectedEntity.data.slope_movement} mm/d` : selectedEntity.data.slope ? `${selectedEntity.data.slope}° Incline` : '+14.2 mm/d'}
                    </span>
                  </div>
                  <div className="drawer-stat-card">
                    <span className="drawer-stat-lbl">Nearby Lifeline</span>
                    <span className="drawer-stat-val">
                      {selectedEntity.data.nearby_road_status || selectedEntity.data.status || 'MONITORED'}
                    </span>
                  </div>
                </div>

                {selectedEntity.data.major_factors && (
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px' }}>
                    <strong style={{ color: '#f8fafc' }}>Trigger Drivers: </strong>
                    {(Array.isArray(selectedEntity.data.major_factors) ? selectedEntity.data.major_factors : [selectedEntity.data.major_factors]).join(' • ')}
                  </div>
                )}

                <div className="drawer-actions">
                  <button
                    onClick={() => setActiveTab('emergency')}
                    className="btn-drawer-route"
                  >
                    <Navigation size={14} /> View Safe Evacuation Corridor
                  </button>
                  <button
                    onClick={startEmergencyAlarm}
                    className="btn-drawer-siren"
                  >
                    <Volume2 size={14} /> Sound Tactical Siren
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: CITIZEN HAZARD REPORTING                           */}
        {/* ========================================================= */}
        {activeTab === 'reports' && (
          <div className="reports-layout">
            <div className="card report-form-card">
              <div className="card-header">
                <div>
                  <span className="card-category">Geo-Tagged Crowdsourcing</span>
                  <h2 className="card-title">{t('report_hazard')}</h2>
                </div>
                <span className="tag-global">Submit From Any Location</span>
              </div>

              <form onSubmit={handleSubmitReport} className="hazard-form">
                <div className="form-group">
                  <label className="form-label">{t('hazard_type')}</label>
                  <select
                    value={hazardForm.hazard_type}
                    onChange={(e) => setHazardForm({ ...hazardForm, hazard_type: e.target.value })}
                    className="form-select"
                  >
                    <option value="Landslide">{t('hazard_landslide')}</option>
                    <option value="Ground Cracks">{t('hazard_ground_cracks')}</option>
                    <option value="Slope Movement">{t('hazard_slope_movement')}</option>
                    <option value="Blocked Road">{t('hazard_blocked_road')}</option>
                    <option value="Damaged Building">{t('hazard_damaged_building')}</option>
                    <option value="Flash Flood">{t('hazard_flash_flood')}</option>
                    <option value="Other Hazard">{t('hazard_other')}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('description')}</label>
                  <textarea
                    rows={3}
                    placeholder="Describe observed fissure width, mudflow speed, road obstruction, or structural damage..."
                    value={hazardForm.description}
                    onChange={(e) => setHazardForm({ ...hazardForm, description: e.target.value })}
                    className="form-textarea"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">{t('latitude')}</label>
                    <input
                      type="number"
                      step="any"
                      value={hazardForm.latitude}
                      onChange={(e) => setHazardForm({ ...hazardForm, latitude: parseFloat(e.target.value) || 0 })}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('longitude')}</label>
                    <input
                      type="number"
                      step="any"
                      value={hazardForm.longitude}
                      onChange={(e) => setHazardForm({ ...hazardForm, longitude: parseFloat(e.target.value) || 0 })}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('state')}</label>
                  <input
                    type="text"
                    value={hazardForm.state}
                    onChange={(e) => setHazardForm({ ...hazardForm, state: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Meghalaya, Sikkim, Assam or State/Country"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('upload_media')}</label>
                  <div className="file-upload-box">
                    <Camera className="file-icon" />
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.gif,.webp,.mp4,.mov"
                      onChange={(e) => setReportFile(e.target.files[0] || null)}
                      className="file-input"
                    />
                    {reportFile && <span className="file-name-tag">{reportFile.name}</span>}
                  </div>
                  <small className="file-hint">Allowed: JPG, PNG, GIF, WEBP, MP4, MOV (Max 10MB)</small>
                </div>

                {reportSuccessMsg && (
                  <div className="form-success-box">
                    <CheckCircle size={16} />
                    <span>{reportSuccessMsg}</span>
                  </div>
                )}

                {reportErrorMsg && (
                  <div className="form-error-box">
                    <AlertTriangle size={16} />
                    <span>{reportErrorMsg}</span>
                  </div>
                )}

                <button type="submit" className="btn-submit-report" disabled={submittingReport}>
                  <Send size={16} />
                  <span>{submittingReport ? 'Submitting...' : t('submit_report')}</span>
                </button>
              </form>
            </div>

            {/* Existing Reports List */}
            <div className="card report-feed-card">
              <div className="card-header">
                <div>
                  <span className="card-category">Verified Dispatch Queue</span>
                  <h3 className="card-title">Community Hazard Reports ({reports.length})</h3>
                </div>
              </div>

              <div className="reports-feed-list">
                {reports.map((rep) => (
                  <div key={rep.id} className="report-feed-item">
                    <div className="report-item-header">
                      <div className="report-type-line">
                        <AlertTriangle className="report-hazard-icon" />
                        <strong>{rep.hazard_type}</strong>
                        <span className={`report-status-badge ${rep.status.toLowerCase()}`}>{rep.status}</span>
                      </div>
                      <span className="report-scope-tag">
                        {rep.is_ner ? '📍 NER Region' : '🌍 Outside NER'}
                      </span>
                    </div>

                    <p className="report-feed-desc">{rep.description}</p>

                    {/* AI Triage & Multi-Signal Cross-Validation Box */}
                    {rep.ai_triage && (
                      <div className="triage-box">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className={`triage-badge ${rep.status === 'VERIFIED' ? 'triage-verified' : 'triage-pending'}`}>
                            <CheckCircle size={10} /> AI Triage: {rep.ai_triage.hazard_class || 'HIGH RISK'} ({rep.ai_triage.confidence}% Confidence)
                          </span>
                          <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 'bold' }}>● Autonomous Verification</span>
                        </div>
                        <div className="triage-signal">
                          <strong>Supporting Telemetry: </strong>
                          {rep.ai_triage.signals}
                        </div>
                      </div>
                    )}

                    <div className="report-item-footer" style={{ marginTop: '8px' }}>
                      <span>{rep.state} • [{rep.latitude?.toFixed(3) || '25.57'}, {rep.longitude?.toFixed(3) || '91.89'}]</span>
                      <span className="report-feed-time">{rep.created_at}</span>
                    </div>

                    {rep.filename && (
                      <div className="report-media-preview">
                        <a href={`/uploads/${rep.filename}`} target="_blank" rel="noreferrer" className="media-preview-btn">
                          <Camera size={14} /> View Evidence Attachment
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: EMERGENCY ALERTS (NER ONLY)                        */}
        {/* ========================================================= */}
        {activeTab === 'alerts' && (
          <div className="alerts-layout">
            <div className="card alerts-hero-card">
              <div className="card-header">
                <div>
                  <span className="card-category">Priority Notification Feed</span>
                  <h2 className="card-title">{t('active_alerts')}</h2>
                </div>
                <span className="tag-live-ner">North Eastern Region (NER) Only</span>
              </div>
              <p className="alerts-hero-subtitle">
                Official automated simulation alerts generated by the Landguard AI multi-factor predictive engine.
              </p>
            </div>

            {/* Severity Filter Pills */}
            <div className="alerts-filter-bar">
              {['ALL', 'CRITICAL', 'HIGH', 'MODERATE'].map((f) => (
                <button
                  key={f}
                  onClick={() => setAlertFilter(f)}
                  className={`alert-filter-pill ${alertFilter === f ? 'active' : ''}`}
                >
                  {f === 'ALL' ? `All Alerts (${alerts.length})` : `${f} (${alerts.filter(a => a.severity === f).length})`}
                </button>
              ))}
            </div>

            <div className="alerts-stack">
              {alerts
                .filter((al) => alertFilter === 'ALL' || al.severity === alertFilter)
                .map((al) => (
                <div key={al.id} className={`alert-bulletin-card ${al.severity.toLowerCase()}`}>
                  <div className="bulletin-header">
                    <div className="bulletin-title-wrap">
                      <AlertOctagon className="bulletin-icon" />
                      <div>
                        <h3 className="bulletin-title">{al.title}</h3>
                        <span className="bulletin-location">📍 State: {al.state} • {al.location}</span>
                      </div>
                    </div>
                    <div className="bulletin-score-col">
                      <span className={`severity-badge ${getSeverityBadgeClass(al.severity)}`}>
                        {al.risk_score}/100 • {al.severity}
                      </span>
                    </div>
                  </div>

                  <div className="bulletin-body">
                    <div className="bulletin-section">
                      <strong>Trigger Factors:</strong>
                      <p>{al.factors}</p>
                    </div>

                    <div className="bulletin-section action-box">
                      <strong>Mandatory Emergency Action:</strong>
                      <p>{al.action}</p>
                    </div>
                  </div>

                  <div className="bulletin-footer">
                    <span className="bulletin-time"><Clock size={13} /> {al.created_at}</span>
                    {acknowledgedAlerts[al.id] ? (
                      <span className="status-tag-acknowledged">✓ ACKNOWLEDGED BY OPERATOR</span>
                    ) : (
                      <button
                        onClick={() => setAcknowledgedAlerts(prev => ({ ...prev, [al.id]: true }))}
                        className="btn-ack-alert"
                      >
                        Acknowledge Alert
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: EMERGENCY & SAFE ROUTES + OFFLINE ALARM            */}
        {/* ========================================================= */}
        {activeTab === 'emergency' && (
          <div className="emergency-layout">
            {/* Top Regional Command Header */}
            <div className="card" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.18), rgba(15, 23, 42, 0.95))', border: '1px solid rgba(239, 68, 68, 0.35)', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                    ⚡ PRIORITY EMERGENCY DISPATCH
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', marginTop: '2px' }}>
                    5 Critical Failure Zones • 6 Blocked Highways • 4 Safe Corridors Open
                  </h3>
                </div>
                <button
                  onClick={() => setAlarmConfirmModal(true)}
                  className="btn-drawer-siren"
                  style={{ width: 'auto', padding: '8px 16px', fontSize: '12px' }}
                >
                  <Volume2 size={16} /> Broadcast Emergency Siren
                </button>
              </div>
            </div>

            {/* 1. Large Offline Emergency Alarm Button */}
            <div className="card alarm-control-card">
              <div className="card-header">
                <div>
                  <span className="card-category">Local Acoustic & Screen Warning</span>
                  <h2 className="card-title">{t('offline_emergency_alarm')}</h2>
                </div>
                <span className="tag-browser-audio">Web Audio API Siren</span>
              </div>

              <p className="alarm-card-desc">
                Triggers a high-intensity synthesized disaster siren on this device and activates the full-screen emergency protocol. Functions completely offline without internet or external audio files.
              </p>

              <button
                onClick={alarmActive ? stopEmergencyAlarm : () => setAlarmConfirmModal(true)}
                className={`btn-emergency-alarm-trigger ${alarmActive ? 'siren-running' : ''}`}
              >
                {alarmActive ? (
                  <>
                    <VolumeX className="alarm-btn-icon" />
                    <span>{t('stop_alarm')}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="alarm-btn-icon pulse" />
                    <span>{t('offline_alarm_btn')}</span>
                  </>
                )}
              </button>

              <p className="alarm-disclaimer">
                Note: Operates on local device via browser audio synthesizers. Ready for backend integration with IoT Village Sirens, SMS Gateways, and NDMA cell broadcasts.
              </p>
            </div>

            {/* 2. Safe Route Analysis Section */}
            <div className="card safe-route-card">
              <div className="card-header">
                <div>
                  <span className="card-category">Dynamic Corridors</span>
                  <h2 className="card-title">{t('find_safe_route')}</h2>
                </div>
                <span className="tag-simulated">Prototype Route Engine</span>
              </div>

              <div className="route-query-bar">
                <div className="route-origin-field">
                  <MapPin className="route-pin" />
                  <span>Origin: <strong>[{currentCoords[0].toFixed(4)}, {currentCoords[1].toFixed(4)}] ({selectedPlaceName})</strong></span>
                </div>
                <button
                  onClick={() => fetchData(selectedState, currentCoords[0], currentCoords[1])}
                  className="btn-recalculate-route"
                >
                  <RefreshCw size={14} /> Recalculate Route
                </button>
              </div>

              {safeRouteData?.status === 'SAFE_ROUTE_FOUND' ? (
                <div className="safe-routes-results">
                  {/* Recommended Route */}
                  <div className="route-result-box recommended">
                    <div className="route-box-header">
                      <div>
                        <span className="route-badge-optimal">RECOMMENDED SAFE CORRIDOR</span>
                        <h4 className="route-title">{safeRouteData.recommended_route.title}</h4>
                      </div>
                      <div className="route-metrics-badge">
                        <span>{safeRouteData.recommended_route.distance_km} km</span>
                        <span>•</span>
                        <span>~{safeRouteData.recommended_route.estimated_minutes} min</span>
                      </div>
                    </div>
                    <p className="route-rating-line">Safety: <strong>{safeRouteData.recommended_route.safety_rating}</strong></p>
                    <p className="route-bypass-line">
                      Circumvents Blocked Passages: <em>{safeRouteData.recommended_route.excluded_corridors.join(", ")}</em>
                    </p>
                  </div>

                  {/* Alternative Route */}
                  {safeRouteData?.alternative_route && (
                    <div className="route-result-box alternative">
                      <div className="route-box-header">
                        <div>
                          <span className="route-badge-alt">SECONDARY ALTERNATIVE BYPASS</span>
                          <h4 className="route-title">{safeRouteData.alternative_route.title}</h4>
                        </div>
                        <div className="route-metrics-badge">
                          <span>{safeRouteData.alternative_route.distance_km} km</span>
                          <span>•</span>
                          <span>~{safeRouteData.alternative_route.estimated_minutes} min</span>
                        </div>
                      </div>
                      <p className="route-rating-line">Safety: <strong>{safeRouteData.alternative_route.safety_rating}</strong></p>
                    </div>
                  )}

                  <div className="route-advisory">
                    <Info size={16} />
                    <span>{safeRouteData.advisory}</span>
                  </div>
                </div>
              ) : (
                <div className="no-route-warning-box">
                  <AlertTriangle className="no-route-icon" />
                  <div>
                    <h4>{t('no_safe_route')}</h4>
                    <p>{safeRouteData?.message || "All connecting lifelines are impassable. Take immediate reinforced refuge on elevated ground."}</p>
                  </div>
                </div>
              )}

              <p className="prototype-note">{t('route_disclaimer')}</p>
            </div>

            {/* 3. Evacuation Shelters & Hotlines */}
            <div className="emergency-contacts-grid">
              <div className="card shelters-summary-card">
                <div className="card-header">
                  <div>
                    <span className="card-category">Verified Destinations</span>
                    <h3 className="card-title">Registered Safe Shelters ({shelters.length})</h3>
                  </div>
                </div>

                <div className="shelters-list">
                  {shelters.slice(0, 4).map((sh) => {
                    const occPct = Math.min(100, Math.round((sh.current_occupancy / sh.capacity) * 100));
                    const spacesLeft = Math.max(0, sh.capacity - sh.current_occupancy);
                    return (
                      <div key={sh.id} className="shelter-item">
                        <Home className="shelter-icon" />
                        <div className="shelter-details" style={{ width: '100%' }}>
                          <strong style={{ fontSize: '13px' }}>{sh.name}</strong>
                          
                          <div className="shelter-occupancy-wrap">
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8' }}>
                              <span>Occupancy: <strong style={{ color: '#ffffff' }}>{sh.current_occupancy} / {sh.capacity}</strong> ({occPct}%)</span>
                              <span className="shelter-spaces-left">🟢 {spacesLeft} Available</span>
                            </div>
                            <div className="shelter-occupancy-track">
                              <div
                                className="shelter-occupancy-fill"
                                style={{ width: `${occPct}%` }}
                              />
                            </div>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '11px' }}>
                            <span style={{ color: '#94a3b8' }}>State: {sh.state}</span>
                            <span className="shelter-phone">📞 {sh.contact_phone}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="card hotlines-card">
                <div className="card-header">
                  <div>
                    <span className="card-category">Immediate Lifelines</span>
                    <h3 className="card-title">Emergency Helplines</h3>
                  </div>
                </div>

                <div className="hotline-buttons">
                  <a href="tel:112" className="btn-hotline national">
                    <PhoneCall size={18} />
                    <div>
                      <strong>112</strong>
                      <span>National Emergency Response</span>
                    </div>
                  </a>
                  <a href="tel:1070" className="btn-hotline state">
                    <PhoneCall size={18} />
                    <div>
                      <strong>1070 / 1077</strong>
                      <span>State & District Disaster Cells</span>
                    </div>
                  </a>
                  <a href="tel:108" className="btn-hotline medical">
                    <PhoneCall size={18} />
                    <div>
                      <strong>108</strong>
                      <span>Disaster Medical & Ambulance</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Alarm Confirmation Modal */}
            {alarmConfirmModal && (
              <div className="alarm-confirm-backdrop">
                <div className="alarm-confirm-card">
                  <Volume2 size={40} style={{ color: '#ef4444', margin: '0 auto' }} />
                  <h3 className="alarm-confirm-title">Broadcast Emergency Siren?</h3>
                  <p className="alarm-confirm-desc">
                    This will activate the hardware-synthesized acoustic emergency siren on this device and initialize local disaster alert protocols.
                  </p>
                  <div className="alarm-confirm-btns">
                    <button onClick={() => setAlarmConfirmModal(false)} className="btn-alarm-cancel">
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setAlarmConfirmModal(false);
                        startEmergencyAlarm();
                      }}
                      className="btn-alarm-confirm"
                    >
                      Confirm & Sound Siren
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* 4. FULLSCREEN EMERGENCY ALARM MODAL */}
      {alarmActive && (
        <div className="fullscreen-alarm-modal">
          <div className="alarm-modal-content">
            <div className="modal-header-banner">
              <AlertTriangle className="alarm-flash-icon spin-slow" />
              <h2>{t('alarm_active_title')}</h2>
              <span className="modal-offline-status">
                {isOnline ? 'NETWORK: ONLINE' : 'NETWORK: OFFLINE MODE ACTIVE'}
              </span>
            </div>

            <div className="modal-alert-box">
              <h3 className="modal-alert-title">
                {alerts[0]?.title || "🚨 CRITICAL LANDSLIDE PROBABILITY IMMINENT"}
              </h3>
              <p className="modal-alert-factors">
                <strong>Reason: </strong>
                {alerts[0]?.factors || "Torrential precipitation bursts exceeding geotechnical slope saturation thresholds."}
              </p>
              <p className="modal-alert-action">
                <strong>Action: </strong>
                {alerts[0]?.action || "Evacuate low-lying valleys and unstable escarpments immediately. Follow marked safe routes."}
              </p>
            </div>

            <div className="modal-instructions">
              <h4>{t('emergency_instructions')}</h4>
              <ul>
                <li>{t('inst_1')}</li>
                <li>{t('inst_2')}</li>
                <li>{t('inst_3')}</li>
              </ul>
            </div>

            <button onClick={stopEmergencyAlarm} className="btn-modal-stop-alarm">
              <VolumeX size={20} />
              <span>{t('stop_alarm')}</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. MOBILE BOTTOM NAVIGATION (Section 32) */}
      <footer className="bottom-nav" aria-label="Mobile Navigation">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
        >
          <TrendingUp className="nav-icon" />
          <span className="nav-label">{t('nav_dashboard')}</span>
        </button>

        <button
          onClick={() => setActiveTab('map')}
          className={`nav-btn ${activeTab === 'map' ? 'active' : ''}`}
        >
          <MapIcon className="nav-icon" />
          <span className="nav-label">{t('nav_map')}</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`nav-btn ${activeTab === 'reports' ? 'active' : ''}`}
        >
          <FileText className="nav-icon" />
          <span className="nav-label">{t('nav_reports')}</span>
        </button>

        <button
          onClick={() => setActiveTab('alerts')}
          className={`nav-btn ${activeTab === 'alerts' ? 'active' : ''}`}
        >
          <div className="nav-badge-wrap">
            <AlertOctagon className="nav-icon" />
            {alerts.length > 0 && <span className="badge-count">{alerts.length}</span>}
          </div>
          <span className="nav-label">{t('nav_alerts')}</span>
        </button>

        <button
          onClick={() => setActiveTab('emergency')}
          className={`nav-btn emergency-btn ${activeTab === 'emergency' ? 'active' : ''}`}
        >
          <ShieldAlert className="nav-icon" />
          <span className="nav-label">{t('nav_emergency')}</span>
        </button>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LandguardApp />);
