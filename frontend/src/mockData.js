// Fallback Datasets & Client-Side Autonomous Engine
export const STATE_RISK_PROFILES = {
  "ALL NER": {
    "is_ner": true,
    "overall_risk": {
      "risk_score": 78,
      "risk_severity": "CRITICAL",
      "color": "#ef4444",
      "recommended_action": "Regional Highland Alert: Evacuate vulnerable valley settlements. Avoid transit through steep hill ghats.",
      "factors": [
        {
          "factor": "Heavy Rainfall & Moisture Saturation",
          "percentage": 92,
          "detail": "Average soil saturation at 84.5%"
        },
        {
          "factor": "Active Slope Displacement & Creep",
          "percentage": 80,
          "detail": "Peak slope velocity recorded at 9.4 mm/day"
        },
        {
          "factor": "Compromised Lifeline Roads",
          "percentage": 75,
          "detail": "6 mountain roads blocked or damaged"
        },
        {
          "factor": "Citizen Hazard Observations in NER",
          "percentage": 65,
          "detail": "14 real-time hazard reports confirmed in region"
        }
      ]
    },
    "main_metrics": {
      "critical_areas": 5,
      "high_risk_areas": 8,
      "moderate_risk_areas": 12,
      "active_alerts": 7,
      "blocked_roads": 6,
      "citizen_reports": 14,
      "sensor_alerts": 9
    },
    "road_connectivity": {
      "connected_percentage": 72,
      "open": 18,
      "partially_blocked": 5,
      "blocked": 4,
      "damaged": 2
    }
  },
  "Meghalaya": {
    "is_ner": true,
    "overall_risk": {
      "risk_score": 88,
      "risk_severity": "CRITICAL",
      "color": "#ef4444",
      "recommended_action": "Cherrapunji-Mawsynram pluvial saturation threshold exceeded. Immediate evacuation of lower valley hamlets.",
      "factors": [
        {
          "factor": "Extreme Pluvial Rainfall Saturation",
          "percentage": 98,
          "detail": "Cherrapunji moisture saturation at 94.2%"
        },
        {
          "factor": "Shillong Peak Slope Velocity",
          "percentage": 86,
          "detail": "Active creep at 12.1 mm/day"
        },
        {
          "factor": "NH-40 Bypass Debris Blockages",
          "percentage": 80,
          "detail": "Umiam-Shillong corridor partially restricted"
        },
        {
          "factor": "Ground Fissure Observations",
          "percentage": 70,
          "detail": "5 confirmed mudslide ground fissures"
        }
      ]
    },
    "main_metrics": {
      "critical_areas": 3,
      "high_risk_areas": 4,
      "moderate_risk_areas": 2,
      "active_alerts": 2,
      "blocked_roads": 3,
      "citizen_reports": 6,
      "sensor_alerts": 5
    },
    "road_connectivity": {
      "connected_percentage": 64,
      "open": 12,
      "partially_blocked": 3,
      "blocked": 2,
      "damaged": 1
    }
  },
  "Sikkim": {
    "is_ner": true,
    "overall_risk": {
      "risk_score": 84,
      "risk_severity": "CRITICAL",
      "color": "#ef4444",
      "recommended_action": "Teesta Gorge structural slip active. Restrict all civilian transit along NH-10 and evacuate cliffside clusters.",
      "factors": [
        {
          "factor": "Steep Topographic Gradient (42\u00b0)",
          "percentage": 95,
          "detail": "High shear stress along fragile rock interface"
        },
        {
          "factor": "Monsoonal Runoff Infiltration",
          "percentage": 88,
          "detail": "Gangtok ridge moisture at 89.0%"
        },
        {
          "factor": "NH-10 Lifeline Severed",
          "percentage": 85,
          "detail": "Teesta corridor closed due to active rockfall"
        },
        {
          "factor": "Extensometer Micro-Displacements",
          "percentage": 75,
          "detail": "Sensor S-SK01 velocity at 14.5 mm/day"
        }
      ]
    },
    "main_metrics": {
      "critical_areas": 2,
      "high_risk_areas": 3,
      "moderate_risk_areas": 3,
      "active_alerts": 2,
      "blocked_roads": 3,
      "citizen_reports": 4,
      "sensor_alerts": 4
    },
    "road_connectivity": {
      "connected_percentage": 58,
      "open": 8,
      "partially_blocked": 2,
      "blocked": 3,
      "damaged": 1
    }
  },
  "Nagaland": {
    "is_ner": true,
    "overall_risk": {
      "risk_score": 74,
      "risk_severity": "HIGH",
      "color": "#f97316",
      "recommended_action": "Kohima south bypass experiencing progressive slump. Reinforce culverts and avoid night driving.",
      "factors": [
        {
          "factor": "Active Road Bed Slumping",
          "percentage": 82,
          "detail": "Kohima bypass subsidence at 8.4 mm/day"
        },
        {
          "factor": "Sub-surface Pore Pressure",
          "percentage": 75,
          "detail": "Pore pressure at 44.5 kPa"
        },
        {
          "factor": "Restricted Mountain Passes",
          "percentage": 65,
          "detail": "2 secondary bypasses closed"
        },
        {
          "factor": "Citizen Ground Reports",
          "percentage": 60,
          "detail": "Road cracks reported by local wardens"
        }
      ]
    },
    "main_metrics": {
      "critical_areas": 1,
      "high_risk_areas": 3,
      "moderate_risk_areas": 4,
      "active_alerts": 1,
      "blocked_roads": 2,
      "citizen_reports": 3,
      "sensor_alerts": 3
    },
    "road_connectivity": {
      "connected_percentage": 68,
      "open": 11,
      "partially_blocked": 2,
      "blocked": 2,
      "damaged": 0
    }
  },
  "Assam": {
    "is_ner": true,
    "overall_risk": {
      "risk_score": 62,
      "risk_severity": "HIGH",
      "color": "#f97316",
      "recommended_action": "Dima Hasao hill rail corridors and Kamrup hillside settlements monitor for slope liquefaction.",
      "factors": [
        {
          "factor": "Heavy Valley Precipitation",
          "percentage": 78,
          "detail": "Rainfall accumulation at 28.5 mm"
        },
        {
          "factor": "Soil Liquefaction in Hill Slopes",
          "percentage": 68,
          "detail": "Haflong ridge moisture at 76.2%"
        },
        {
          "factor": "Culvert Blockages",
          "percentage": 55,
          "detail": "Debris deposition near railway cuttings"
        },
        {
          "factor": "Citizen Reports in Dima Hasao",
          "percentage": 45,
          "detail": "Mud slurry overspill reported"
        }
      ]
    },
    "main_metrics": {
      "critical_areas": 1,
      "high_risk_areas": 2,
      "moderate_risk_areas": 5,
      "active_alerts": 1,
      "blocked_roads": 1,
      "citizen_reports": 2,
      "sensor_alerts": 2
    },
    "road_connectivity": {
      "connected_percentage": 81,
      "open": 22,
      "partially_blocked": 3,
      "blocked": 1,
      "damaged": 0
    }
  },
  "Arunachal Pradesh": {
    "is_ner": true,
    "overall_risk": {
      "risk_score": 58,
      "risk_severity": "MODERATE",
      "color": "#f59e0b",
      "recommended_action": "Maintain standard vigilance along high-gradient mountain ghats. Clear road debris promptly.",
      "factors": [
        {
          "factor": "High Elevation Relief & Gradient",
          "percentage": 72,
          "detail": "Steep terrain along Subansiri drainage"
        },
        {
          "factor": "Moderate Rainfall Accumulation",
          "percentage": 60,
          "detail": "Rainfall at 18.2 mm/24h"
        },
        {
          "factor": "Isolated Boulder Fall",
          "percentage": 45,
          "detail": "Minor rock fall near Itanagar hills"
        },
        {
          "factor": "Ground Sensor Readings",
          "percentage": 40,
          "detail": "Inclinometers stable at 3.1 mm/day"
        }
      ]
    },
    "main_metrics": {
      "critical_areas": 0,
      "high_risk_areas": 2,
      "moderate_risk_areas": 6,
      "active_alerts": 1,
      "blocked_roads": 1,
      "citizen_reports": 2,
      "sensor_alerts": 2
    },
    "road_connectivity": {
      "connected_percentage": 76,
      "open": 16,
      "partially_blocked": 4,
      "blocked": 1,
      "damaged": 0
    }
  },
  "Mizoram": {
    "is_ner": true,
    "overall_risk": {
      "risk_score": 52,
      "risk_severity": "MODERATE",
      "color": "#f59e0b",
      "recommended_action": "Aizawl ridge settlements check household storm runoff outlets. No immediate evacuation required.",
      "factors": [
        {
          "factor": "Linear Ridge Weathering",
          "percentage": 65,
          "detail": "Shale beds showing normal wet season creep"
        },
        {
          "factor": "Intermittent Hillside Showers",
          "percentage": 55,
          "detail": "Precipitation at 16.4 mm"
        },
        {
          "factor": "Local Road Drainage",
          "percentage": 40,
          "detail": "Minor roadside ditch overflow"
        },
        {
          "factor": "Verified Reports",
          "percentage": 35,
          "detail": "Retaining wall inspection requested"
        }
      ]
    },
    "main_metrics": {
      "critical_areas": 0,
      "high_risk_areas": 1,
      "moderate_risk_areas": 4,
      "active_alerts": 0,
      "blocked_roads": 1,
      "citizen_reports": 1,
      "sensor_alerts": 1
    },
    "road_connectivity": {
      "connected_percentage": 79,
      "open": 14,
      "partially_blocked": 2,
      "blocked": 1,
      "damaged": 0
    }
  },
  "Manipur": {
    "is_ner": true,
    "overall_risk": {
      "risk_score": 46,
      "risk_severity": "MODERATE",
      "color": "#f59e0b",
      "recommended_action": "Foothill areas monitor streams. Hill transit corridors currently open.",
      "factors": [
        {
          "factor": "Moderate Soil Moisture",
          "percentage": 52,
          "detail": "Moisture content at 58.0%"
        },
        {
          "factor": "Foothill Runoff Drainage",
          "percentage": 48,
          "detail": "Streams flowing at 65% capacity"
        },
        {
          "factor": "Slope Stability",
          "percentage": 38,
          "detail": "Displacement rate normal at 2.4 mm/day"
        },
        {
          "factor": "Road Network Status",
          "percentage": 25,
          "detail": "All major arterial roads open"
        }
      ]
    },
    "main_metrics": {
      "critical_areas": 0,
      "high_risk_areas": 1,
      "moderate_risk_areas": 3,
      "active_alerts": 0,
      "blocked_roads": 0,
      "citizen_reports": 1,
      "sensor_alerts": 1
    },
    "road_connectivity": {
      "connected_percentage": 85,
      "open": 17,
      "partially_blocked": 2,
      "blocked": 0,
      "damaged": 0
    }
  },
  "Tripura": {
    "is_ner": true,
    "overall_risk": {
      "risk_score": 24,
      "risk_severity": "LOW",
      "color": "#10b981",
      "recommended_action": "Safe geological conditions. Low slope elevation with stable hillside soil conditions.",
      "factors": [
        {
          "factor": "Low Slope Elevation",
          "percentage": 25,
          "detail": "Gentle low-angle hills with dense vegetation"
        },
        {
          "factor": "Normal Baseline Moisture",
          "percentage": 22,
          "detail": "Soil moisture well below saturation (32%)"
        },
        {
          "factor": "Clear Highway Corridors",
          "percentage": 15,
          "detail": "All national highways fully clear"
        },
        {
          "factor": "Zero Critical Hazard Triggers",
          "percentage": 10,
          "detail": "No ground displacement recorded"
        }
      ]
    },
    "main_metrics": {
      "critical_areas": 0,
      "high_risk_areas": 0,
      "moderate_risk_areas": 1,
      "active_alerts": 0,
      "blocked_roads": 0,
      "citizen_reports": 0,
      "sensor_alerts": 0
    },
    "road_connectivity": {
      "connected_percentage": 94,
      "open": 19,
      "partially_blocked": 1,
      "blocked": 0,
      "damaged": 0
    }
  }
};

export const DEFAULT_ZONES = [
  {
    "id": 20,
    "name": "Dikchu Mangan Teesta Chute",
    "state": "Sikkim",
    "latitude": 27.4985,
    "longitude": 88.5307,
    "risk_score": 94,
    "risk_level": "CRITICAL",
    "rainfall": 235.0,
    "soil_moisture": 97.0,
    "slope": 49.0,
    "radius_m": 2500,
    "major_factors": [
      "Glacial lake / high river discharge erosion",
      "Severe rock mass disintegration",
      "Active mud-boulder avalanche across highway",
      "Multiple ground cracks reported"
    ],
    "nearby_road_status": "BLOCKED",
    "nearby_village_count": 4,
    "nearby_building_count": 35,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 7,
    "name": "Tupul Noney Railway Slide Zone",
    "state": "Manipur",
    "latitude": 24.7797,
    "longitude": 93.6369,
    "risk_score": 92,
    "risk_level": "CRITICAL",
    "rainfall": 220.0,
    "soil_moisture": 95.0,
    "slope": 45.0,
    "radius_m": 2200,
    "major_factors": [
      "Catastrophic rainfall exceeding threshold",
      "Ijei river damming hazard",
      "Complete topsoil liquefaction",
      "Severe historical debris avalanche"
    ],
    "nearby_road_status": "BLOCKED",
    "nearby_village_count": 4,
    "nearby_building_count": 36,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 17,
    "name": "Dz\u00fcdza Paglapahar Sinking Corridor",
    "state": "Nagaland",
    "latitude": 25.75,
    "longitude": 93.95,
    "risk_score": 90,
    "risk_level": "CRITICAL",
    "rainfall": 195.0,
    "soil_moisture": 94.0,
    "slope": 46.0,
    "radius_m": 2100,
    "major_factors": [
      "Infamous NH-29 sinking geology",
      "Disung mudflow active discharge",
      "Total loss of toe support due to swollen river",
      "High ground vibration"
    ],
    "nearby_road_status": "BLOCKED",
    "nearby_village_count": 4,
    "nearby_building_count": 28,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 1,
    "name": "Tawang Sela Pass Scarp",
    "state": "Arunachal Pradesh",
    "latitude": 27.5859,
    "longitude": 91.8594,
    "risk_score": 89,
    "risk_level": "CRITICAL",
    "rainfall": 168.0,
    "soil_moisture": 93.5,
    "slope": 44.0,
    "radius_m": 1800,
    "major_factors": [
      "Continuous Himalayan torrential rainfall",
      "High soil moisture saturation (93%)",
      "Steep 44\u00b0 slope angle",
      "Sub-zero freeze-thaw rock fracturing"
    ],
    "nearby_road_status": "BLOCKED",
    "nearby_village_count": 3,
    "nearby_building_count": 24,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 10,
    "name": "Cherrapunji Sohra Escarpment Rim",
    "state": "Meghalaya",
    "latitude": 25.2702,
    "longitude": 91.7323,
    "risk_score": 88,
    "risk_level": "CRITICAL",
    "rainfall": 280.0,
    "soil_moisture": 96.0,
    "slope": 48.0,
    "radius_m": 2400,
    "major_factors": [
      "Highest global precipitation rate (340mm/48h)",
      "Limestone karst collapse hazard",
      "Vertical gorge headward erosion",
      "Citizen reports of widening ground fissures"
    ],
    "nearby_road_status": "BLOCKED",
    "nearby_village_count": 4,
    "nearby_building_count": 32,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 4,
    "name": "Dima Hasao Haflong Sinking Zone",
    "state": "Assam",
    "latitude": 25.1764,
    "longitude": 93.0232,
    "risk_score": 86,
    "risk_level": "CRITICAL",
    "rainfall": 185.0,
    "soil_moisture": 91.8,
    "slope": 36.0,
    "radius_m": 2000,
    "major_factors": [
      "Extreme cumulative precipitation (210mm/48h)",
      "Unconsolidated shale bedrock deformation",
      "Railway track foundation subsidence"
    ],
    "nearby_road_status": "BLOCKED",
    "nearby_village_count": 5,
    "nearby_building_count": 45,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 21,
    "name": "Teesta River Basin Singtam Spur",
    "state": "Sikkim",
    "latitude": 27.234,
    "longitude": 88.498,
    "risk_score": 85,
    "risk_level": "CRITICAL",
    "rainfall": 190.0,
    "soil_moisture": 92.0,
    "slope": 43.0,
    "radius_m": 1800,
    "major_factors": [
      "Toe scour along NH-10",
      "High pore pressure in mica-schist",
      "Saturated debris cone"
    ],
    "nearby_road_status": "DAMAGED",
    "nearby_village_count": 3,
    "nearby_building_count": 26,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 14,
    "name": "Aizawl Laipuitlang Crest Fracture",
    "state": "Mizoram",
    "latitude": 23.742,
    "longitude": 92.721,
    "risk_score": 84,
    "risk_level": "CRITICAL",
    "rainfall": 165.0,
    "soil_moisture": 90.5,
    "slope": 41.0,
    "radius_m": 1600,
    "major_factors": [
      "Historical reactivation zone",
      "Deep tension crack propagation",
      "Saturated sandstone-shale bedding dipping towards valley"
    ],
    "nearby_road_status": "BLOCKED",
    "nearby_village_count": 5,
    "nearby_building_count": 48,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 11,
    "name": "Mawsynram Valley Chute",
    "state": "Meghalaya",
    "latitude": 25.297,
    "longitude": 91.583,
    "risk_score": 83,
    "risk_level": "CRITICAL",
    "rainfall": 260.0,
    "soil_moisture": 94.2,
    "slope": 42.0,
    "radius_m": 1900,
    "major_factors": [
      "Torrential cloudburst bursts",
      "Pore-water pressure exceeding structural limit",
      "Downslope mud avalanche"
    ],
    "nearby_road_status": "DAMAGED",
    "nearby_village_count": 3,
    "nearby_building_count": 21,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 15,
    "name": "Hunthar Fault Sinking Sector",
    "state": "Mizoram",
    "latitude": 23.755,
    "longitude": 92.705,
    "risk_score": 79,
    "risk_level": "CRITICAL",
    "rainfall": 152.0,
    "soil_moisture": 88.0,
    "slope": 39.0,
    "radius_m": 1700,
    "major_factors": [
      "Active continuous road subsidence",
      "Subsurface water piping",
      "Structural damage to multi-story buildings"
    ],
    "nearby_road_status": "DAMAGED",
    "nearby_village_count": 4,
    "nearby_building_count": 30,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 2,
    "name": "Bhalukpong Chute Debris Cone",
    "state": "Arunachal Pradesh",
    "latitude": 27.0167,
    "longitude": 92.65,
    "risk_score": 74,
    "risk_level": "HIGH",
    "rainfall": 112.0,
    "soil_moisture": 84.2,
    "slope": 38.5,
    "radius_m": 1400,
    "major_factors": [
      "Intense monsoon runoff into Kameng gorge",
      "Active slope creep recorded",
      "Loose colluvium deposit"
    ],
    "nearby_road_status": "PARTIALLY BLOCKED",
    "nearby_village_count": 2,
    "nearby_building_count": 18,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 18,
    "name": "Kohima Town Fault Scarp",
    "state": "Nagaland",
    "latitude": 25.6751,
    "longitude": 94.1086,
    "risk_score": 72,
    "risk_level": "HIGH",
    "rainfall": 118.0,
    "soil_moisture": 84.5,
    "slope": 36.0,
    "radius_m": 1400,
    "major_factors": [
      "Urban slope overload",
      "Creep velocity 8.5mm/day",
      "Old landslide deposits reactivation"
    ],
    "nearby_road_status": "PARTIALLY BLOCKED",
    "nearby_village_count": 6,
    "nearby_building_count": 60,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 8,
    "name": "Senapati Highway Bluff",
    "state": "Manipur",
    "latitude": 25.268,
    "longitude": 94.018,
    "risk_score": 71,
    "risk_level": "HIGH",
    "rainfall": 108.0,
    "soil_moisture": 83.0,
    "slope": 37.0,
    "radius_m": 1300,
    "major_factors": [
      "Continuous seepage through weathered shale",
      "Creep velocity 11mm/day",
      "Highway retaining wall tilt"
    ],
    "nearby_road_status": "PARTIALLY BLOCKED",
    "nearby_village_count": 3,
    "nearby_building_count": 22,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 12,
    "name": "Shillong Peak Northern Escarpment",
    "state": "Meghalaya",
    "latitude": 25.545,
    "longitude": 91.875,
    "risk_score": 68,
    "risk_level": "HIGH",
    "rainfall": 125.0,
    "soil_moisture": 85.0,
    "slope": 35.0,
    "radius_m": 1500,
    "major_factors": [
      "Steep metamorphic phyllite slope",
      "Urban hillside surcharge",
      "Blocked stormwater bypasses"
    ],
    "nearby_road_status": "PARTIALLY BLOCKED",
    "nearby_village_count": 6,
    "nearby_building_count": 52,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 22,
    "name": "Gangtok Burtuk Slide Corridor",
    "state": "Sikkim",
    "latitude": 27.352,
    "longitude": 88.618,
    "risk_score": 66,
    "risk_level": "HIGH",
    "rainfall": 105.0,
    "soil_moisture": 83.0,
    "slope": 35.0,
    "radius_m": 1300,
    "major_factors": [
      "Historical creeping slide",
      "Monsoon stormwater saturation"
    ],
    "nearby_road_status": "PARTIALLY BLOCKED",
    "nearby_village_count": 5,
    "nearby_building_count": 42,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 23,
    "name": "Jampui Hills Orange Ridge",
    "state": "Tripura",
    "latitude": 23.95,
    "longitude": 92.2833,
    "risk_score": 64,
    "risk_level": "HIGH",
    "rainfall": 110.0,
    "soil_moisture": 82.0,
    "slope": 31.0,
    "radius_m": 1200,
    "major_factors": [
      "Lateritic soil softening under persistent rain",
      "Escarpment slip along village path"
    ],
    "nearby_road_status": "PARTIALLY BLOCKED",
    "nearby_village_count": 3,
    "nearby_building_count": 16,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 5,
    "name": "Guwahati Nilachal Hill Escarpment",
    "state": "Assam",
    "latitude": 26.1667,
    "longitude": 91.7056,
    "risk_score": 62,
    "risk_level": "HIGH",
    "rainfall": 94.0,
    "soil_moisture": 82.5,
    "slope": 34.0,
    "radius_m": 1100,
    "major_factors": [
      "Urban slope undercut",
      "High drainage runoff velocity",
      "Loose red soil saturation"
    ],
    "nearby_road_status": "PARTIALLY BLOCKED",
    "nearby_village_count": 4,
    "nearby_building_count": 38,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 16,
    "name": "Lunglei Western Valley Slopes",
    "state": "Mizoram",
    "latitude": 22.885,
    "longitude": 92.742,
    "risk_score": 59,
    "risk_level": "HIGH",
    "rainfall": 88.0,
    "soil_moisture": 79.0,
    "slope": 33.0,
    "radius_m": 1100,
    "major_factors": [
      "Valley slope creep",
      "Intermittent heavy showers"
    ],
    "nearby_road_status": "PARTIALLY BLOCKED",
    "nearby_village_count": 3,
    "nearby_building_count": 19,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 3,
    "name": "Subansiri Valley Spur",
    "state": "Arunachal Pradesh",
    "latitude": 27.9833,
    "longitude": 94.2167,
    "risk_score": 58,
    "risk_level": "HIGH",
    "rainfall": 78.0,
    "soil_moisture": 78.0,
    "slope": 32.0,
    "radius_m": 1200,
    "major_factors": [
      "Monsoon embankment erosion",
      "Moderate soil displacement"
    ],
    "nearby_road_status": "OPEN",
    "nearby_village_count": 2,
    "nearby_building_count": 12,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 9,
    "name": "Tamenglong Ridge Slopes",
    "state": "Manipur",
    "latitude": 24.985,
    "longitude": 93.495,
    "risk_score": 55,
    "risk_level": "HIGH",
    "rainfall": 84.0,
    "soil_moisture": 76.5,
    "slope": 30.0,
    "radius_m": 1000,
    "major_factors": [
      "Drainage blockage in culverts",
      "Monsoon gullying"
    ],
    "nearby_road_status": "OPEN",
    "nearby_village_count": 2,
    "nearby_building_count": 14,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 24,
    "name": "Atharamura Range Hill Cut",
    "state": "Tripura",
    "latitude": 23.88,
    "longitude": 91.75,
    "risk_score": 52,
    "risk_level": "HIGH",
    "rainfall": 85.0,
    "soil_moisture": 75.0,
    "slope": 28.0,
    "radius_m": 1000,
    "major_factors": [
      "Road-widening slope destabilization",
      "Drainage overflows"
    ],
    "nearby_road_status": "PARTIALLY BLOCKED",
    "nearby_village_count": 2,
    "nearby_building_count": 11,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 19,
    "name": "Mokokchung Ghat Pass",
    "state": "Nagaland",
    "latitude": 26.325,
    "longitude": 94.525,
    "risk_score": 48,
    "risk_level": "MODERATE",
    "rainfall": 60.0,
    "soil_moisture": 70.0,
    "slope": 25.0,
    "radius_m": 950,
    "major_factors": [
      "Moderate slope saturation",
      "Paved drainage functioning"
    ],
    "nearby_road_status": "OPEN",
    "nearby_village_count": 3,
    "nearby_building_count": 15,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 6,
    "name": "Karbi Anglong Diphu Ghat",
    "state": "Assam",
    "latitude": 25.845,
    "longitude": 93.432,
    "risk_score": 45,
    "risk_level": "MODERATE",
    "rainfall": 52.0,
    "soil_moisture": 68.0,
    "slope": 24.0,
    "radius_m": 900,
    "major_factors": [
      "Moderate intermittent rainfall",
      "Vegetated slope retaining stability"
    ],
    "nearby_road_status": "OPEN",
    "nearby_village_count": 3,
    "nearby_building_count": 16,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 13,
    "name": "Nongstoin Valley Terrace",
    "state": "Meghalaya",
    "latitude": 25.518,
    "longitude": 91.268,
    "risk_score": 38,
    "risk_level": "MODERATE",
    "rainfall": 45.0,
    "soil_moisture": 62.0,
    "slope": 20.0,
    "radius_m": 800,
    "major_factors": [
      "Controlled forest cover",
      "Baseline slope moisture"
    ],
    "nearby_road_status": "OPEN",
    "nearby_village_count": 2,
    "nearby_building_count": 10,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 25,
    "name": "Teliamura Lowland Margin",
    "state": "Tripura",
    "latitude": 23.835,
    "longitude": 91.625,
    "risk_score": 22,
    "risk_level": "LOW",
    "rainfall": 30.0,
    "soil_moisture": 50.0,
    "slope": 12.0,
    "radius_m": 700,
    "major_factors": [
      "Gentle topography",
      "Stable alluvial sediments"
    ],
    "nearby_road_status": "OPEN",
    "nearby_village_count": 4,
    "nearby_building_count": 30,
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  }
];

export const DEFAULT_ROADS = [
  {
    "id": 1,
    "name": "Balipara-Charduar-Tawang (BCT) Highway",
    "state": "Arunachal Pradesh",
    "latitude": 27.45,
    "longitude": 92.2,
    "coordinates": [
      [
        27.0167,
        92.65
      ],
      [
        27.25,
        92.42
      ],
      [
        27.45,
        92.2
      ],
      [
        27.5859,
        91.8594
      ]
    ],
    "distance_km": 68.5,
    "status": "BLOCKED",
    "severity": "CRITICAL",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 2,
    "name": "Trans-Arunachal Highway NH-13 (Itanagar-Ziro)",
    "state": "Arunachal Pradesh",
    "latitude": 27.25,
    "longitude": 93.75,
    "coordinates": [
      [
        27.0844,
        93.6053
      ],
      [
        27.2,
        93.7
      ],
      [
        27.35,
        93.8
      ],
      [
        27.55,
        93.83
      ]
    ],
    "distance_km": 45.2,
    "status": "PARTIALLY BLOCKED",
    "severity": "MODERATE",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 3,
    "name": "Naharlagun-Itanagar Twin City Link",
    "state": "Arunachal Pradesh",
    "latitude": 27.1,
    "longitude": 93.68,
    "coordinates": [
      [
        27.0844,
        93.6053
      ],
      [
        27.1,
        93.68
      ],
      [
        27.108,
        93.7
      ]
    ],
    "distance_km": 14.0,
    "status": "OPEN",
    "severity": "LOW",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 4,
    "name": "Haflong-Silchar Lumding Hill Corridor",
    "state": "Assam",
    "latitude": 25.1,
    "longitude": 93.0,
    "coordinates": [
      [
        25.1764,
        93.0232
      ],
      [
        25.08,
        92.95
      ],
      [
        24.95,
        92.88
      ],
      [
        24.83,
        92.8
      ]
    ],
    "distance_km": 42.0,
    "status": "BLOCKED",
    "severity": "CRITICAL",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 5,
    "name": "Guwahati-Shillong Highway NH-27 (Assam Section)",
    "state": "Assam",
    "latitude": 26.05,
    "longitude": 91.8,
    "coordinates": [
      [
        26.1445,
        91.7362
      ],
      [
        26.08,
        91.78
      ],
      [
        25.95,
        91.82
      ],
      [
        25.85,
        91.85
      ]
    ],
    "distance_km": 36.0,
    "status": "OPEN",
    "severity": "LOW",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 6,
    "name": "Kamakhya Hill Temple Access Road",
    "state": "Assam",
    "latitude": 26.1667,
    "longitude": 91.7056,
    "coordinates": [
      [
        26.16,
        91.72
      ],
      [
        26.1667,
        91.7056
      ],
      [
        26.17,
        91.698
      ]
    ],
    "distance_km": 4.8,
    "status": "PARTIALLY BLOCKED",
    "severity": "HIGH",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 7,
    "name": "NH-37 Imphal-Jiribam Lifeline Highway",
    "state": "Manipur",
    "latitude": 24.78,
    "longitude": 93.55,
    "coordinates": [
      [
        24.817,
        93.9368
      ],
      [
        24.79,
        93.75
      ],
      [
        24.7797,
        93.6369
      ],
      [
        24.76,
        93.45
      ]
    ],
    "distance_km": 58.0,
    "status": "BLOCKED",
    "severity": "CRITICAL",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 8,
    "name": "NH-2 Imphal-Kohima Highway (Manipur Section)",
    "state": "Manipur",
    "latitude": 25.1,
    "longitude": 93.98,
    "coordinates": [
      [
        24.817,
        93.9368
      ],
      [
        24.95,
        93.96
      ],
      [
        25.15,
        93.99
      ],
      [
        25.3,
        94.02
      ]
    ],
    "distance_km": 52.0,
    "status": "PARTIALLY BLOCKED",
    "severity": "MODERATE",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 9,
    "name": "Imphal East Valley Emergency Bypass",
    "state": "Manipur",
    "latitude": 24.83,
    "longitude": 93.96,
    "coordinates": [
      [
        24.81,
        93.92
      ],
      [
        24.83,
        93.96
      ],
      [
        24.86,
        93.98
      ]
    ],
    "distance_km": 16.5,
    "status": "OPEN",
    "severity": "LOW",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 10,
    "name": "NH-6 Shillong-Silchar Mountain Lifeline",
    "state": "Meghalaya",
    "latitude": 25.4,
    "longitude": 92.15,
    "coordinates": [
      [
        25.5788,
        91.8933
      ],
      [
        25.45,
        92.05
      ],
      [
        25.35,
        92.2
      ],
      [
        25.18,
        92.35
      ]
    ],
    "distance_km": 62.4,
    "status": "BLOCKED",
    "severity": "CRITICAL",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 11,
    "name": "Sohra-Shella Scenic Ghat Pass",
    "state": "Meghalaya",
    "latitude": 25.22,
    "longitude": 91.7,
    "coordinates": [
      [
        25.2702,
        91.7323
      ],
      [
        25.24,
        91.71
      ],
      [
        25.2,
        91.68
      ],
      [
        25.17,
        91.65
      ]
    ],
    "distance_km": 22.1,
    "status": "DAMAGED",
    "severity": "HIGH",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 12,
    "name": "Shillong Western Ridge Safe Evacuation Bypass",
    "state": "Meghalaya",
    "latitude": 25.56,
    "longitude": 91.85,
    "coordinates": [
      [
        25.52,
        91.82
      ],
      [
        25.55,
        91.84
      ],
      [
        25.58,
        91.86
      ],
      [
        25.62,
        91.89
      ]
    ],
    "distance_km": 18.6,
    "status": "OPEN",
    "severity": "LOW",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 13,
    "name": "Mawphlang Sacred Forest Road",
    "state": "Meghalaya",
    "latitude": 25.45,
    "longitude": 91.76,
    "coordinates": [
      [
        25.55,
        91.85
      ],
      [
        25.48,
        91.8
      ],
      [
        25.45,
        91.76
      ]
    ],
    "distance_km": 15.2,
    "status": "OPEN",
    "severity": "LOW",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 14,
    "name": "Hunthar Subsidence Bypass Route",
    "state": "Mizoram",
    "latitude": 23.755,
    "longitude": 92.705,
    "coordinates": [
      [
        23.73,
        92.72
      ],
      [
        23.745,
        92.71
      ],
      [
        23.755,
        92.705
      ]
    ],
    "distance_km": 6.2,
    "status": "BLOCKED",
    "severity": "CRITICAL",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 15,
    "name": "NH-54 Aizawl-Lunglei Highway",
    "state": "Mizoram",
    "latitude": 23.3,
    "longitude": 92.73,
    "coordinates": [
      [
        23.7271,
        92.7176
      ],
      [
        23.5,
        92.725
      ],
      [
        23.2,
        92.735
      ],
      [
        22.885,
        92.742
      ]
    ],
    "distance_km": 84.0,
    "status": "PARTIALLY BLOCKED",
    "severity": "HIGH",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 16,
    "name": "Aizawl North Highland Ridge Road",
    "state": "Mizoram",
    "latitude": 23.76,
    "longitude": 92.73,
    "coordinates": [
      [
        23.7271,
        92.7176
      ],
      [
        23.76,
        92.73
      ],
      [
        23.79,
        92.745
      ]
    ],
    "distance_km": 12.0,
    "status": "OPEN",
    "severity": "LOW",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 17,
    "name": "NH-29 Paglapahar-Dz\u00fcdza Lifeline Corridor",
    "state": "Nagaland",
    "latitude": 25.75,
    "longitude": 93.95,
    "coordinates": [
      [
        25.9,
        93.75
      ],
      [
        25.82,
        93.85
      ],
      [
        25.75,
        93.95
      ],
      [
        25.6751,
        94.1086
      ]
    ],
    "distance_km": 48.0,
    "status": "BLOCKED",
    "severity": "CRITICAL",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 18,
    "name": "Kohima-Wokha North Bypass",
    "state": "Nagaland",
    "latitude": 25.85,
    "longitude": 94.18,
    "coordinates": [
      [
        25.6751,
        94.1086
      ],
      [
        25.8,
        94.15
      ],
      [
        25.95,
        94.22
      ]
    ],
    "distance_km": 38.5,
    "status": "OPEN",
    "severity": "LOW",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 19,
    "name": "Mokokchung-Mariani Hill Road",
    "state": "Nagaland",
    "latitude": 26.4,
    "longitude": 94.4,
    "coordinates": [
      [
        26.325,
        94.525
      ],
      [
        26.45,
        94.35
      ],
      [
        26.58,
        94.25
      ]
    ],
    "distance_km": 32.0,
    "status": "PARTIALLY BLOCKED",
    "severity": "MODERATE",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 20,
    "name": "NH-10 Siliguri-Gangtok Lifeline Highway",
    "state": "Sikkim",
    "latitude": 27.2,
    "longitude": 88.5,
    "coordinates": [
      [
        27.05,
        88.52
      ],
      [
        27.18,
        88.51
      ],
      [
        27.234,
        88.498
      ],
      [
        27.3389,
        88.6065
      ]
    ],
    "distance_km": 54.0,
    "status": "DAMAGED",
    "severity": "CRITICAL",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 21,
    "name": "Mangan-Chungthang Northern Access Highway",
    "state": "Sikkim",
    "latitude": 27.55,
    "longitude": 88.58,
    "coordinates": [
      [
        27.4985,
        88.5307
      ],
      [
        27.56,
        88.57
      ],
      [
        27.6,
        88.62
      ]
    ],
    "distance_km": 28.0,
    "status": "BLOCKED",
    "severity": "CRITICAL",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 22,
    "name": "Gangtok-Rumtek Elevated Safe Bypass",
    "state": "Sikkim",
    "latitude": 27.31,
    "longitude": 88.58,
    "coordinates": [
      [
        27.3389,
        88.6065
      ],
      [
        27.31,
        88.58
      ],
      [
        27.29,
        88.55
      ]
    ],
    "distance_km": 11.8,
    "status": "OPEN",
    "severity": "LOW",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 23,
    "name": "Jampui Hills Ridge Access Ghat Road",
    "state": "Tripura",
    "latitude": 23.95,
    "longitude": 92.2833,
    "coordinates": [
      [
        23.85,
        92.2
      ],
      [
        23.9,
        92.24
      ],
      [
        23.95,
        92.2833
      ]
    ],
    "distance_km": 19.5,
    "status": "PARTIALLY BLOCKED",
    "severity": "MODERATE",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 24,
    "name": "NH-8 Agartala-Churaibari Lifeline (Tripura Spine)",
    "state": "Tripura",
    "latitude": 23.9,
    "longitude": 91.5,
    "coordinates": [
      [
        23.8315,
        91.2868
      ],
      [
        23.88,
        91.6
      ],
      [
        23.95,
        91.9
      ],
      [
        24.15,
        92.15
      ]
    ],
    "distance_km": 78.0,
    "status": "OPEN",
    "severity": "LOW",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  },
  {
    "id": 25,
    "name": "Delhi-Gurugram Expressway NH-48",
    "state": "Delhi",
    "latitude": 28.5,
    "longitude": 77.1,
    "coordinates": [
      [
        28.6139,
        77.209
      ],
      [
        28.52,
        77.12
      ],
      [
        28.45,
        77.05
      ]
    ],
    "distance_km": 24.0,
    "status": "OPEN",
    "severity": "LOW",
    "updated_at": "09 Sep 2026, 03:49 PM IST"
  }
];

export const DEFAULT_SENSORS = [
  {
    "id": 1,
    "sensor_id": "SENS-AR01",
    "location": "Tawang Sela Crest Geotechnical Node",
    "state": "Arunachal Pradesh",
    "latitude": 27.5859,
    "longitude": 91.8594,
    "soil_moisture": 93.5,
    "slope_movement": 14.2,
    "ground_vibration": "CRITICAL",
    "water_level": 88.0,
    "status": "CRITICAL",
    "updated_at": "09 Sep 2026, 03:49 PM IST",
    "is_simulated": 1
  },
  {
    "id": 2,
    "sensor_id": "SENS-AR02",
    "location": "Bhalukpong Gorge Inclinometer",
    "state": "Arunachal Pradesh",
    "latitude": 27.0167,
    "longitude": 92.65,
    "soil_moisture": 84.2,
    "slope_movement": 7.8,
    "ground_vibration": "ELEVATED",
    "water_level": 72.5,
    "status": "HIGH",
    "updated_at": "09 Sep 2026, 03:49 PM IST",
    "is_simulated": 1
  },
  {
    "id": 3,
    "sensor_id": "SENS-AS01",
    "location": "Haflong Sinking Zone Deep Piezometer",
    "state": "Assam",
    "latitude": 25.1764,
    "longitude": 93.0232,
    "soil_moisture": 91.8,
    "slope_movement": 12.6,
    "ground_vibration": "HIGH",
    "water_level": 85.4,
    "status": "CRITICAL",
    "updated_at": "09 Sep 2026, 03:49 PM IST",
    "is_simulated": 1
  },
  {
    "id": 4,
    "sensor_id": "SENS-AS02",
    "location": "Guwahati Nilachal Hill Surface Strain Node",
    "state": "Assam",
    "latitude": 26.1667,
    "longitude": 91.7056,
    "soil_moisture": 82.5,
    "slope_movement": 5.1,
    "ground_vibration": "MODERATE",
    "water_level": 68.0,
    "status": "HIGH",
    "updated_at": "09 Sep 2026, 03:49 PM IST",
    "is_simulated": 1
  },
  {
    "id": 5,
    "sensor_id": "SENS-MN01",
    "location": "Tupul Ijei Basin Mudflow Trigger Node",
    "state": "Manipur",
    "latitude": 24.7797,
    "longitude": 93.6369,
    "soil_moisture": 95.0,
    "slope_movement": 18.5,
    "ground_vibration": "CRITICAL",
    "water_level": 94.0,
    "status": "CRITICAL",
    "updated_at": "09 Sep 2026, 03:49 PM IST",
    "is_simulated": 1
  },
  {
    "id": 6,
    "sensor_id": "SENS-MN02",
    "location": "Senapati Highway Retaining Wall Sensor",
    "state": "Manipur",
    "latitude": 25.268,
    "longitude": 94.018,
    "soil_moisture": 83.0,
    "slope_movement": 6.9,
    "ground_vibration": "ELEVATED",
    "water_level": 74.2,
    "status": "HIGH",
    "updated_at": "09 Sep 2026, 03:49 PM IST",
    "is_simulated": 1
  },
  {
    "id": 7,
    "sensor_id": "SENS-ML01",
    "location": "Cherrapunji Karst Escarpment Hydro-Node",
    "state": "Meghalaya",
    "latitude": 25.2702,
    "longitude": 91.7323,
    "soil_moisture": 96.0,
    "slope_movement": 15.4,
    "ground_vibration": "CRITICAL",
    "water_level": 98.2,
    "status": "CRITICAL",
    "updated_at": "09 Sep 2026, 03:49 PM IST",
    "is_simulated": 1
  },
  {
    "id": 8,
    "sensor_id": "SENS-ML02",
    "location": "Mawsynram Chute Borehole Extensometer",
    "state": "Meghalaya",
    "latitude": 25.297,
    "longitude": 91.583,
    "soil_moisture": 94.2,
    "slope_movement": 11.8,
    "ground_vibration": "HIGH",
    "water_level": 92.0,
    "status": "CRITICAL",
    "updated_at": "09 Sep 2026, 03:49 PM IST",
    "is_simulated": 1
  },
  {
    "id": 9,
    "sensor_id": "SENS-ML03",
    "location": "Shillong Peak Weather-Slope Station",
    "state": "Meghalaya",
    "latitude": 25.545,
    "longitude": 91.875,
    "soil_moisture": 85.0,
    "slope_movement": 5.6,
    "ground_vibration": "MODERATE",
    "water_level": 70.0,
    "status": "HIGH",
    "updated_at": "09 Sep 2026, 03:49 PM IST",
    "is_simulated": 1
  },
  {
    "id": 10,
    "sensor_id": "SENS-MZ01",
    "location": "Hunthar Sinking Sector Multi-Level Node",
    "state": "Mizoram",
    "latitude": 23.755,
    "longitude": 92.705,
    "soil_moisture": 88.0,
    "slope_movement": 13.1,
    "ground_vibration": "HIGH",
    "water_level": 82.0,
    "status": "CRITICAL",
    "updated_at": "09 Sep 2026, 03:49 PM IST",
    "is_simulated": 1
  },
  {
    "id": 11,
    "sensor_id": "SENS-MZ02",
    "location": "Aizawl Laipuitlang Crest Crack Monitor",
    "state": "Mizoram",
    "latitude": 23.742,
    "longitude": 92.721,
    "soil_moisture": 90.5,
    "slope_movement": 10.4,
    "ground_vibration": "HIGH",
    "water_level": 86.5,
    "status": "CRITICAL",
    "updated_at": "09 Sep 2026, 03:49 PM IST",
    "is_simulated": 1
  },
  {
    "id": 12,
    "sensor_id": "SENS-NL01",
    "location": "Dz\u00fcdza River Scour Inclinometer",
    "state": "Nagaland",
    "latitude": 25.75,
    "longitude": 93.95,
    "soil_moisture": 94.0,
    "slope_movement": 16.8,
    "ground_vibration": "CRITICAL",
    "water_level": 91.0,
    "status": "CRITICAL",
    "updated_at": "09 Sep 2026, 03:49 PM IST",
    "is_simulated": 1
  },
  {
    "id": 13,
    "sensor_id": "SENS-NL02",
    "location": "Kohima Fault Scarp Geophone Array",
    "state": "Nagaland",
    "latitude": 25.6751,
    "longitude": 94.1086,
    "soil_moisture": 84.5,
    "slope_movement": 7.2,
    "ground_vibration": "MODERATE",
    "water_level": 73.0,
    "status": "HIGH",
    "updated_at": "09 Sep 2026, 03:49 PM IST",
    "is_simulated": 1
  },
  {
    "id": 14,
    "sensor_id": "SENS-SK01",
    "location": "Dikchu Teesta Valley Torrent Node",
    "state": "Sikkim",
    "latitude": 27.4985,
    "longitude": 88.5307,
    "soil_moisture": 97.0,
    "slope_movement": 19.1,
    "ground_vibration": "CRITICAL",
    "water_level": 96.5,
    "status": "CRITICAL",
    "updated_at": "09 Sep 2026, 03:49 PM IST",
    "is_simulated": 1
  },
  {
    "id": 15,
    "sensor_id": "SENS-SK02",
    "location": "Singtam Teesta Basin Riverbank Piezometer",
    "state": "Sikkim",
    "latitude": 27.234,
    "longitude": 88.498,
    "soil_moisture": 92.0,
    "slope_movement": 12.0,
    "ground_vibration": "HIGH",
    "water_level": 88.0,
    "status": "CRITICAL",
    "updated_at": "09 Sep 2026, 03:49 PM IST",
    "is_simulated": 1
  },
  {
    "id": 16,
    "sensor_id": "SENS-TR01",
    "location": "Jampui Hills Ridge Topsoil Moisture Sensor",
    "state": "Tripura",
    "latitude": 23.95,
    "longitude": 92.2833,
    "soil_moisture": 82.0,
    "slope_movement": 4.2,
    "ground_vibration": "LOW",
    "water_level": 62.0,
    "status": "HIGH",
    "updated_at": "09 Sep 2026, 03:49 PM IST",
    "is_simulated": 1
  },
  {
    "id": 17,
    "sensor_id": "SENS-TR02",
    "location": "Atharamura Range Roadcut Inclinometer",
    "state": "Tripura",
    "latitude": 23.88,
    "longitude": 91.75,
    "soil_moisture": 75.0,
    "slope_movement": 3.1,
    "ground_vibration": "NORMAL",
    "water_level": 54.0,
    "status": "MODERATE",
    "updated_at": "09 Sep 2026, 03:49 PM IST",
    "is_simulated": 1
  }
];

export const DEFAULT_SHELTERS = [
  {
    "id": 1,
    "name": "Tawang Community Indoor Stadium Relief Base",
    "state": "Arunachal Pradesh",
    "latitude": 27.592,
    "longitude": 91.865,
    "capacity": 600,
    "current_occupancy": 185,
    "contact_phone": "+91 3794 222221",
    "status": "OPEN - SAFE ELEVATED"
  },
  {
    "id": 2,
    "name": "Dirang Sports Complex Relief Enclave",
    "state": "Arunachal Pradesh",
    "latitude": 27.355,
    "longitude": 92.245,
    "capacity": 450,
    "current_occupancy": 92,
    "contact_phone": "+91 3794 222222",
    "status": "OPEN - SAFE BASE"
  },
  {
    "id": 3,
    "name": "Haflong District Sports Stadium Relief Shelter",
    "state": "Assam",
    "latitude": 25.185,
    "longitude": 93.025,
    "capacity": 850,
    "current_occupancy": 410,
    "contact_phone": "+91 3673 236220",
    "status": "OPEN - HIGH CAPACITY"
  },
  {
    "id": 4,
    "name": "Dispur State Emergency Relief Camp #1",
    "state": "Assam",
    "latitude": 26.145,
    "longitude": 91.79,
    "capacity": 1200,
    "current_occupancy": 240,
    "contact_phone": "+91 361 2237000",
    "status": "OPEN - CENTRAL BASE"
  },
  {
    "id": 5,
    "name": "Noney District Emergency Community Center",
    "state": "Manipur",
    "latitude": 24.786,
    "longitude": 93.655,
    "capacity": 500,
    "current_occupancy": 310,
    "contact_phone": "+91 3874 233111",
    "status": "OPEN - ACTIVE RELIEF"
  },
  {
    "id": 6,
    "name": "Senapati Multi-Purpose Relief Hall",
    "state": "Manipur",
    "latitude": 25.27,
    "longitude": 94.025,
    "capacity": 400,
    "current_occupancy": 120,
    "contact_phone": "+91 3871 222204",
    "status": "OPEN - SAFE ELEVATED"
  },
  {
    "id": 7,
    "name": "Shillong State Central Library Emergency Shelter",
    "state": "Meghalaya",
    "latitude": 25.574,
    "longitude": 91.887,
    "capacity": 750,
    "current_occupancy": 215,
    "contact_phone": "+91 364 2224150",
    "status": "OPEN - OPERATIONAL HQ"
  },
  {
    "id": 8,
    "name": "Sohra Elevated Government Relief Hall",
    "state": "Meghalaya",
    "latitude": 25.275,
    "longitude": 91.738,
    "capacity": 350,
    "current_occupancy": 190,
    "contact_phone": "+91 364 2224151",
    "status": "OPEN - SAFE HIGH GROUND"
  },
  {
    "id": 9,
    "name": "Mawphlang Community Safe Enclave",
    "state": "Meghalaya",
    "latitude": 25.46,
    "longitude": 91.762,
    "capacity": 400,
    "current_occupancy": 65,
    "contact_phone": "+91 364 2224152",
    "status": "OPEN - RESERVE BASE"
  },
  {
    "id": 10,
    "name": "Aizawl Vanapa Hall Central Relief Center",
    "state": "Mizoram",
    "latitude": 23.731,
    "longitude": 92.718,
    "capacity": 900,
    "current_occupancy": 380,
    "contact_phone": "+91 389 2322241",
    "status": "OPEN - CENTRAL BASE"
  },
  {
    "id": 11,
    "name": "Durtlang Highland Community Camp",
    "state": "Mizoram",
    "latitude": 23.79,
    "longitude": 92.742,
    "capacity": 500,
    "current_occupancy": 85,
    "contact_phone": "+91 389 2322242",
    "status": "OPEN - SAFE ELEVATED"
  },
  {
    "id": 12,
    "name": "Kohima Indira Gandhi Stadium Relief Camp",
    "state": "Nagaland",
    "latitude": 25.712,
    "longitude": 94.122,
    "capacity": 1000,
    "current_occupancy": 290,
    "contact_phone": "+91 370 2290050",
    "status": "OPEN - HIGH CAPACITY"
  },
  {
    "id": 13,
    "name": "Medziphema Agricultural Transit Center",
    "state": "Nagaland",
    "latitude": 25.765,
    "longitude": 93.855,
    "capacity": 450,
    "current_occupancy": 110,
    "contact_phone": "+91 370 2290051",
    "status": "OPEN - SAFE BASE"
  },
  {
    "id": 14,
    "name": "Gangtok Paljor Indoor Stadium Relief Complex",
    "state": "Sikkim",
    "latitude": 27.335,
    "longitude": 88.61,
    "capacity": 1100,
    "current_occupancy": 430,
    "contact_phone": "+91 3592 202230",
    "status": "OPEN - CENTRAL BASE"
  },
  {
    "id": 15,
    "name": "Rumtek Elevated High Ground Shelter",
    "state": "Sikkim",
    "latitude": 27.305,
    "longitude": 88.575,
    "capacity": 400,
    "current_occupancy": 95,
    "contact_phone": "+91 3592 202231",
    "status": "OPEN - SAFE ELEVATED"
  },
  {
    "id": 16,
    "name": "Agartala Netaji Subhash Stadium Shelter",
    "state": "Tripura",
    "latitude": 23.838,
    "longitude": 91.285,
    "capacity": 800,
    "current_occupancy": 140,
    "contact_phone": "+91 381 2325555",
    "status": "OPEN - SAFE BASE"
  },
  {
    "id": 17,
    "name": "Kanchanpur Community Evacuation Hall",
    "state": "Tripura",
    "latitude": 23.9,
    "longitude": 92.2,
    "capacity": 350,
    "current_occupancy": 75,
    "contact_phone": "+91 381 2325556",
    "status": "OPEN - HILL BASE"
  }
];

export const DEFAULT_ALERTS = [
  {
    "id": 1,
    "title": "\ud83d\udea8 CRITICAL LANDSLIDE ALERT: SIKKIM TEESTA BASIN",
    "severity": "CRITICAL",
    "state": "Sikkim",
    "location": "Dikchu-Mangan Teesta Chute (Sikkim)",
    "risk_score": 94,
    "factors": "Heavy torrential rainfall (235mm/48h) + saturated soil (97%) + steep Himalayan slope (49\u00b0)",
    "action": "Immediate mandatory evacuation of low-lying valley hamlets. Avoid NH-10 and Mangan northern corridor completely.",
    "created_at": "09 Sep 2026, 03:49 PM IST",
    "is_active": 1
  },
  {
    "id": 3,
    "title": "\ud83d\udea8 CRITICAL LANDSLIDE ALERT: MANIPUR TUPUL VALLEY",
    "severity": "CRITICAL",
    "state": "Manipur",
    "location": "Tupul Noney Corridor (Manipur)",
    "risk_score": 92,
    "factors": "Intense monsoonal downpour + active mudflow triggering + Ijei river debris blockage risk",
    "action": "Evacuate vulnerable valleys immediately. Restrict all transit along NH-37 mountain pass.",
    "created_at": "09 Sep 2026, 03:49 PM IST",
    "is_active": 1
  },
  {
    "id": 4,
    "title": "\ud83d\udea8 CRITICAL LANDSLIDE ALERT: NAGALAND DZ\u00dcDZA SINKING ZONE",
    "severity": "CRITICAL",
    "state": "Nagaland",
    "location": "Dz\u00fcdza Paglapahar NH-29 (Nagaland)",
    "risk_score": 90,
    "factors": "Sinking roadbed deformation (16.8mm/day) + swollen river toe scour + saturated slope colluvium",
    "action": "Total closure of NH-29 Paglapahar section. Divert heavy vehicles to northern bypass.",
    "created_at": "09 Sep 2026, 03:49 PM IST",
    "is_active": 1
  },
  {
    "id": 5,
    "title": "\u26a0\ufe0f HIGH RISK ALERT: ARUNACHAL PRADESH TAWANG PASS",
    "severity": "HIGH",
    "state": "Arunachal Pradesh",
    "location": "Sela Pass-Tawang Ridge (Arunachal Pradesh)",
    "risk_score": 89,
    "factors": "Continuous rainfall + freeze-thaw fractured bedrock + boulder fall danger",
    "action": "Halt night travel on BCT highway. Maintain emergency communication with district disaster desk.",
    "created_at": "09 Sep 2026, 03:49 PM IST",
    "is_active": 1
  },
  {
    "id": 2,
    "title": "\ud83d\udea8 CRITICAL LANDSLIDE ALERT: MEGHALAYA SOHRA GORGE",
    "severity": "CRITICAL",
    "state": "Meghalaya",
    "location": "Cherrapunji Sohra Escarpment (Meghalaya)",
    "risk_score": 88,
    "factors": "Extreme cloudburst bursts (280mm/48h) + limestone karst destabilization + widening ground fissures",
    "action": "Avoid the affected rim area and follow local emergency instructions. Relocate to designated high-ground shelters.",
    "created_at": "09 Sep 2026, 03:49 PM IST",
    "is_active": 1
  },
  {
    "id": 6,
    "title": "\u26a0\ufe0f HIGH RISK ALERT: ASSAM DIMA HASAO HAFLONG",
    "severity": "HIGH",
    "state": "Assam",
    "location": "Haflong Sinking Scarp (Assam)",
    "risk_score": 86,
    "factors": "Excessive soil pore saturation (91.8%) + railway alignment subsidence",
    "action": "Standby for evacuation orders. Stay clear of natural drainage channels and railway escarpments.",
    "created_at": "09 Sep 2026, 03:49 PM IST",
    "is_active": 1
  },
  {
    "id": 7,
    "title": "\u26a0\ufe0f HIGH RISK ALERT: MIZORAM AIZAWL HUNTHAR FAULT",
    "severity": "HIGH",
    "state": "Mizoram",
    "location": "Hunthar Sinking Zone (Mizoram)",
    "risk_score": 79,
    "factors": "Active foundation settlement in multi-story houses + road crack widening",
    "action": "Vacate structural buildings showing tension cracks. Utilize Vanapa Hall relief center.",
    "created_at": "09 Sep 2026, 03:49 PM IST",
    "is_active": 1
  }
];

export const DEFAULT_VILLAGES = [
  {
    "id": 1,
    "name": "Jang Alpine Hamlet",
    "state": "Arunachal Pradesh",
    "latitude": 27.575,
    "longitude": 91.87,
    "population": 480,
    "risk_level": "CRITICAL",
    "nearby_road": "Balipara-Charduar-Tawang (BLOCKED)",
    "distance_from_hazard_m": 140,
    "recommended_action": "Immediate evacuation to Tawang relief camp",
    "evacuation_status": "Evacuating"
  },
  {
    "id": 2,
    "name": "Bhalukpong River Colony",
    "state": "Arunachal Pradesh",
    "latitude": 27.02,
    "longitude": 92.645,
    "population": 850,
    "risk_level": "HIGH",
    "nearby_road": "Trans-Arunachal Highway",
    "distance_from_hazard_m": 260,
    "recommended_action": "Standby for flash flood and debris alert",
    "evacuation_status": "High Alert"
  },
  {
    "id": 3,
    "name": "Dirang Valley Eco Settlement",
    "state": "Arunachal Pradesh",
    "latitude": 27.35,
    "longitude": 92.24,
    "population": 1200,
    "risk_level": "LOW",
    "nearby_road": "Dirang Elevated Bypass",
    "distance_from_hazard_m": 1800,
    "recommended_action": "Precautionary watch; hillsides stable",
    "evacuation_status": "Normal"
  },
  {
    "id": 4,
    "name": "Jatinga Valley Ridge Village",
    "state": "Assam",
    "latitude": 25.15,
    "longitude": 93.03,
    "population": 720,
    "risk_level": "CRITICAL",
    "nearby_road": "Haflong-Silchar Corridor (BLOCKED)",
    "distance_from_hazard_m": 95,
    "recommended_action": "Mandatory evacuation to Haflong Sports Stadium",
    "evacuation_status": "Evacuating"
  },
  {
    "id": 5,
    "name": "Haflong Old Hill Settlement",
    "state": "Assam",
    "latitude": 25.18,
    "longitude": 93.015,
    "population": 1600,
    "risk_level": "HIGH",
    "nearby_road": "Haflong Urban Bypass",
    "distance_from_hazard_m": 210,
    "recommended_action": "Relocate elderly and children to high ground",
    "evacuation_status": "Relocation Advised"
  },
  {
    "id": 6,
    "name": "Dispur Safe Urban Sector",
    "state": "Assam",
    "latitude": 26.14,
    "longitude": 91.78,
    "population": 6500,
    "risk_level": "LOW",
    "nearby_road": "Guwahati-Shillong Highway NH-27",
    "distance_from_hazard_m": 3500,
    "recommended_action": "Safe destination cluster",
    "evacuation_status": "Safe Base"
  },
  {
    "id": 7,
    "name": "Tupul Railway Hamlet",
    "state": "Manipur",
    "latitude": 24.775,
    "longitude": 93.632,
    "population": 560,
    "risk_level": "CRITICAL",
    "nearby_road": "NH-37 Imphal-Jiribam (BLOCKED)",
    "distance_from_hazard_m": 60,
    "recommended_action": "Immediate relocation away from Ijei riverbed",
    "evacuation_status": "Emergency Evacuation"
  },
  {
    "id": 8,
    "name": "Marangching Slope Colony",
    "state": "Manipur",
    "latitude": 24.785,
    "longitude": 93.645,
    "population": 420,
    "risk_level": "CRITICAL",
    "nearby_road": "NH-37 Corridor",
    "distance_from_hazard_m": 80,
    "recommended_action": "High ground evacuation to Noney center",
    "evacuation_status": "Evacuating"
  },
  {
    "id": 9,
    "name": "Senapati Hilltown Ward 3",
    "state": "Manipur",
    "latitude": 25.265,
    "longitude": 94.02,
    "population": 1850,
    "risk_level": "HIGH",
    "nearby_road": "NH-2 Imphal-Kohima",
    "distance_from_hazard_m": 310,
    "recommended_action": "Prepare emergency go-bags",
    "evacuation_status": "Warning"
  },
  {
    "id": 10,
    "name": "Mawmluh Village Sohra",
    "state": "Meghalaya",
    "latitude": 25.265,
    "longitude": 91.725,
    "population": 910,
    "risk_level": "CRITICAL",
    "nearby_road": "Sohra-Shella Ghat (DAMAGED)",
    "distance_from_hazard_m": 75,
    "recommended_action": "Relocate from gorge scarp to Sohra Central Camp",
    "evacuation_status": "Mandatory Evacuation"
  },
  {
    "id": 11,
    "name": "Laitryngew Cliff Hamlet",
    "state": "Meghalaya",
    "latitude": 25.32,
    "longitude": 91.75,
    "population": 680,
    "risk_level": "HIGH",
    "nearby_road": "NH-6 Shillong-Silchar (BLOCKED)",
    "distance_from_hazard_m": 180,
    "recommended_action": "Avoid downhill footpaths and culverts",
    "evacuation_status": "High Alert"
  },
  {
    "id": 12,
    "name": "Pomlakrai Upper Ridge",
    "state": "Meghalaya",
    "latitude": 25.53,
    "longitude": 91.86,
    "population": 1400,
    "risk_level": "HIGH",
    "nearby_road": "Shillong Western Ridge Bypass",
    "distance_from_hazard_m": 350,
    "recommended_action": "Maintain alert; watch hillside runoff",
    "evacuation_status": "Relocation Advised"
  },
  {
    "id": 13,
    "name": "Mawphlang Heritage Village",
    "state": "Meghalaya",
    "latitude": 25.455,
    "longitude": 91.755,
    "population": 1100,
    "risk_level": "LOW",
    "nearby_road": "Mawphlang Sacred Forest Road",
    "distance_from_hazard_m": 2200,
    "recommended_action": "Stable bedrock safe enclave",
    "evacuation_status": "Safe Base"
  },
  {
    "id": 14,
    "name": "Hunthar Veng Subsidance Hamlet",
    "state": "Mizoram",
    "latitude": 23.758,
    "longitude": 92.702,
    "population": 1150,
    "risk_level": "CRITICAL",
    "nearby_road": "Hunthar Subsidence Bypass (BLOCKED)",
    "distance_from_hazard_m": 80,
    "recommended_action": "Evacuate cracked multi-story residences",
    "evacuation_status": "Evacuating"
  },
  {
    "id": 15,
    "name": "Laipuitlang Crest Ward",
    "state": "Mizoram",
    "latitude": 23.744,
    "longitude": 92.723,
    "population": 890,
    "risk_level": "CRITICAL",
    "nearby_road": "Aizawl North Ridge Road",
    "distance_from_hazard_m": 110,
    "recommended_action": "Relocate to Vanapa Hall Relief Shelter",
    "evacuation_status": "Evacuation Standby"
  },
  {
    "id": 16,
    "name": "Durtlang Elevated Ridge",
    "state": "Mizoram",
    "latitude": 23.785,
    "longitude": 92.738,
    "population": 2400,
    "risk_level": "LOW",
    "nearby_road": "Aizawl North Highland Ridge Road",
    "distance_from_hazard_m": 2500,
    "recommended_action": "Designated safe elevated refuge",
    "evacuation_status": "Safe Base"
  },
  {
    "id": 17,
    "name": "Dz\u00fcdza Riverfront Settlement",
    "state": "Nagaland",
    "latitude": 25.748,
    "longitude": 93.952,
    "population": 620,
    "risk_level": "CRITICAL",
    "nearby_road": "NH-29 Lifeline (BLOCKED)",
    "distance_from_hazard_m": 50,
    "recommended_action": "Move to Medziphema high-ground relief camp",
    "evacuation_status": "Mandatory Evacuation"
  },
  {
    "id": 18,
    "name": "Phesama Hill Village",
    "state": "Nagaland",
    "latitude": 25.64,
    "longitude": 94.1,
    "population": 1300,
    "risk_level": "HIGH",
    "nearby_road": "Kohima Bypass",
    "distance_from_hazard_m": 240,
    "recommended_action": "Clear drainage channels; monitor slope cracks",
    "evacuation_status": "Warning"
  },
  {
    "id": 19,
    "name": "Medziphema Safe Valley Base",
    "state": "Nagaland",
    "latitude": 25.76,
    "longitude": 93.85,
    "population": 3100,
    "risk_level": "LOW",
    "nearby_road": "Kohima-Wokha North Bypass",
    "distance_from_hazard_m": 3200,
    "recommended_action": "Central reception shelter",
    "evacuation_status": "Safe Base"
  },
  {
    "id": 20,
    "name": "Dikchu Hydel Colony",
    "state": "Sikkim",
    "latitude": 27.502,
    "longitude": 88.528,
    "population": 780,
    "risk_level": "CRITICAL",
    "nearby_road": "Mangan Northern Access (BLOCKED)",
    "distance_from_hazard_m": 70,
    "recommended_action": "Evacuate valley floor immediately due to dam burst risk",
    "evacuation_status": "Emergency Evacuation"
  },
  {
    "id": 21,
    "name": "Singtam Riverside Sector",
    "state": "Sikkim",
    "latitude": 27.23,
    "longitude": 88.495,
    "population": 1950,
    "risk_level": "CRITICAL",
    "nearby_road": "NH-10 Lifeline (DAMAGED)",
    "distance_from_hazard_m": 90,
    "recommended_action": "Move to high-altitude shelter at Rumtek",
    "evacuation_status": "Evacuating"
  },
  {
    "id": 22,
    "name": "Gangtok Burtuk Ward",
    "state": "Sikkim",
    "latitude": 27.355,
    "longitude": 88.62,
    "population": 2100,
    "risk_level": "HIGH",
    "nearby_road": "Gangtok-Rumtek Elevated Bypass",
    "distance_from_hazard_m": 220,
    "recommended_action": "Watch for retaining wall bulging",
    "evacuation_status": "Relocation Advised"
  },
  {
    "id": 23,
    "name": "Vanghmun Village Jampui",
    "state": "Tripura",
    "latitude": 23.952,
    "longitude": 92.285,
    "population": 860,
    "risk_level": "HIGH",
    "nearby_road": "Jampui Hills Ridge Access",
    "distance_from_hazard_m": 190,
    "recommended_action": "Relocate from unstable road slopes",
    "evacuation_status": "High Alert"
  },
  {
    "id": 24,
    "name": "Teliamura Lowland Safe Zone",
    "state": "Tripura",
    "latitude": 23.83,
    "longitude": 91.62,
    "population": 4200,
    "risk_level": "LOW",
    "nearby_road": "NH-8 Agartala-Churaibari",
    "distance_from_hazard_m": 3000,
    "recommended_action": "District relief distribution center",
    "evacuation_status": "Safe Base"
  }
];


export const decodeWMOWeather = (code) => {
  const codes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast / Heavy Cloud',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    62: 'Moderate rain',
    63: 'Heavy rain',
    65: 'Violent torrential rain',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    95: 'Thunderstorm with rain',
    96: 'Thunderstorm with hail',
    99: 'Severe thunderstorm with squall'
  };
  return codes[code] || 'Cloudy with precipitation';
};

export const fetchDirectOpenMeteo = async (lat, lon, isNer = true) => {
  try {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto';
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const curr = data.current || {};
    const temp = curr.temperature_2m ?? 21.5;
    const hum = curr.relative_humidity_2m ?? 82.0;
    const rain = curr.precipitation ?? (curr.rain ?? 14.0);
    const wind = curr.wind_speed_10m ?? 14.5;
    const dir = curr.wind_direction_10m ?? 180.0;
    const code = curr.weather_code ?? 61;
    const cond = decodeWMOWeather(code);

    let riskLevel = 'LOW';
    let riskDesc = 'Normal baseline weather within safe geological limits.';
    if (rain >= 25.0 || (rain >= 15.0 && wind >= 40.0)) {
      riskLevel = 'CRITICAL';
      riskDesc = 'Extreme monsoonal precipitation exceeding critical slope liquefaction threshold.';
    } else if (rain >= 12.0 || wind >= 30.0 || hum >= 90.0) {
      riskLevel = 'HIGH';
      riskDesc = 'Heavy rainfall and high atmospheric saturation increasing landslide risk.';
    } else if (rain >= 4.0 || wind >= 18.0 || hum >= 78.0) {
      riskLevel = 'MODERATE';
      riskDesc = 'Elevated moisture and intermittent hillside rain showers.';
    }

    return {
      source: 'Open-Meteo Direct Client',
      temperature_c: temp,
      precipitation_mm: rain,
      wind_speed_kmh: wind,
      wind_direction_deg: dir,
      humidity_pct: hum,
      weather_condition: cond,
      weather_code: code,
      weather_risk: isNer ? riskLevel : 'N/A (Outside NER)',
      risk_analysis: isNer ? riskDesc : 'LANDSLIDE RISK ANALYSIS IS AVAILABLE ONLY FOR THE NER REGION.',
      disclaimer: isNer ? 'Prototype weather-risk calculation.' : 'Landslide hazard analysis strictly restricted to NER.',
      is_fallback: false
    };
  } catch (err) {
    console.warn('Direct Open-Meteo fetch error:', err);
    return null;
  }
};

export const DEFAULT_REPORTS = [
  {
    id: 'rep-sk-01',
    hazard_type: 'Landslide',
    description: 'Active tension cracks and rock fissures widening across NH-10 near Dikchu chute.',
    latitude: 27.3912,
    longitude: 88.5281,
    state: 'Sikkim',
    is_ner: true,
    status: 'VERIFIED',
    ai_triage: {
      hazard_class: 'CRITICAL',
      confidence: 91,
      signals: 'Corroborated by tilt sensor #SK-04 (+14.2 mm/d) & 97% soil moisture'
    },
    created_at: '10 Sep 2026, 17:45 IST'
  },
  {
    id: 'rep-ml-02',
    hazard_type: 'Slope Movement',
    description: 'Mud creep and rock detachment near Sohra road cut, partial lane obstruction.',
    latitude: 25.2986,
    longitude: 91.7324,
    state: 'Meghalaya',
    is_ner: true,
    status: 'VERIFIED',
    ai_triage: {
      hazard_class: 'HIGH',
      confidence: 87,
      signals: 'Open-Meteo recorded 210mm continuous 48h precipitation in East Khasi Hills'
    },
    created_at: '10 Sep 2026, 18:20 IST'
  },
  {
    id: 'rep-as-03',
    hazard_type: 'Blocked Road',
    description: 'Debris cone blocking Lumding-Badarpur hill rail/road link near Haflong.',
    latitude: 25.1633,
    longitude: 93.0167,
    state: 'Assam',
    is_ner: true,
    status: 'PENDING_TRIAGE',
    ai_triage: {
      hazard_class: 'HIGH',
      confidence: 82,
      signals: 'Recent heavy convective cell detected over Dima Hasao district'
    },
    created_at: '10 Sep 2026, 19:10 IST'
  }
];

