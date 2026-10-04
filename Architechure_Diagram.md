# 🇮🇳 Bharat Drone OS

> **India's Universal Autonomous UAV Software Stack & Unified Ground Control Station (GCS)**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff?logo=vite)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express)](https://expressjs.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-3.5_Flash-orange?logo=google)](https://ai.google.dev/)

---

## 📌 Overview

**Bharat Drone OS** is an autonomous, mission-critical Unmanned Aerial Vehicle (UAV) software stack and tactical Ground Control Station (GCS). Engineered to provide a standardized, plug-and-play operating environment for Indian drone operations, it unifies flight controller hardware abstraction, Edge AI computer vision, autonomous mission planning, atmospheric weather compensation, and DGCA Digital Sky regulatory compliance into a unified interface.

---

## 🏗️ System Architecture & Layer Breakdown

Bharat Drone OS is architected into modular subsystems corresponding to the core layers of modern autonomous flight computing:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        BHARAT DRONE OS GCS                             │
├────────────────────────────────────────────────────────────────────────┤
│  Layer 5: DGCA Digital Sky & Blockchain Airspace Compliance            │
│  Layer 4: Tactical GIS Waypoint Planner & SITL Simulation Engine       │
│  Layer 3: Customized Mission Objectives & Autonomous Flight Profiles   │
│  Layer 2: NVIDIA Jetson YOLOv8 Edge Computer Vision                    │
│  Layer 1: Hardware Abstraction Layer (HAL) Drivers & Payloads          │
├────────────────────────────────────────────────────────────────────────┤
│  Middleware: ROS 2 Humble Node Executor & FreeRTOS Telemetry Bus       │
│  AI Engine: Google Gemini Weather-Aware A* Dynamic Routing & Co-pilot  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Modules & Capabilities

### 1. Layer 1: Hardware Abstraction Layer (HAL) & Payloads
* **Autoprobe Flight Controller Scanning:** Dynamic bus probing for standard autopilot architectures including **Cube Orange+** (PX4 v1.14.2), **Pixhawk 6C Pro** (ArduPilot v4.4.1), and **Kakute H7 v2** (Betaflight v4.5.0).
* **Multi-Sensor Health Matrix:** Live calibration and telemetry synchronization for:
  * BMX160 9-DOF IMU (Gyroscope & Accelerometer)
  * U-Blox F9P Dual RTK GNSS (Sub-2cm position precision)
  * MS5611 Barometric Altimeter
  * TF-Mini Plus LiDAR Rangefinder
* **Fault Injection Simulation:** In-flight sensor failure simulation to test immediate failsafe Return-To-Land (RTL) trigger paths.
* **Payload Control Interfacing:** Live modulation for micro-atomizer pesticide sprayers, multispectral camera gimbals, cold-chain medical payload latches, and cargo release mechanisms.

### 2. Layer 2: NVIDIA Jetson YOLOv8 Edge Computer
* Real-time edge video processing simulation representing on-drone embedded Jetson hardware.
* Dynamic collision-risk object tracking with bounding boxes, distance estimation, and bearing calculation for:
  * Powerline transmission towers
  * Avian wildlife (Migratory crane flocks)
  * Forest canopy crests
  * Cellular masts and gantry structures

### 3. Layer 3: Customized Mission Objectives
Dedicated operational profile management with 4 built-in default templates and custom mission generation:

| Mission Template | Operational Codename | Objective | Payload Configuration | Safety & Simulation Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **🌊 Flood Relief** | Flood Relief Supply Drop | Deliver emergency food and antibiotics to GPS coordinates `[30.3380, 78.0750]` in inundated valley. | Food & medicine package with electro-mechanical cargo release and barometric parachute retarder. | AI reroute around submerged roads; automated safe aerial drop at target. |
| **🌾 Crop Yield** | Precision Agriculture Scan | Survey `12.4 km²` farmland grid using multispectral imaging. | SONY IMX477 5-band multispectral camera + electrostatic sprayer nozzle. | Lawnmower sweep grid; real-time NDVI chlorophyll anomaly & pest hotspot detection. |
| **💊 Rural Medicine** | Rural Medical Supply Delivery | Transport emergency vaccines to remote village coordinates `[30.3420, 78.0850]`. | Insulated cold-chain container with live BLE thermal monitoring (`2°C - 8°C`). | Energy-optimized high-speed cruise; dynamic Himalayan wind-shear evasion. |
| **🔥 Wildfire Monitoring** | Wildfire Monitoring & Response | Scan `8.5 km²` fire-prone forest area for hotspot proliferation. | FLIR dual radiometric thermal gimbal + aerial fire retardant canister. | Real-time `450°C - 800°C` hotspot detection; 150m heat-safe standoff perimeter fence; water-drop target vectors. |

* **Customization Studio:** In-place editing of GPS coordinates `[X, Y]`, survey area `[X km²]`, operational constraints, payload parameters, and safety margins.
* **Custom Mission Builder:** Create user-defined autonomous flight operations from scratch.
* **1-Click SITL Arm & Dispatch:** Instantly transfers waypoints, safety boundaries, and payload parameters directly to the flight control engine.

### 4. Layer 4: Tactical GIS Waypoint Planner & SITL Simulation
* **Interactive Tactical Canvas:** High-resolution SVG-based spatial grid supporting Dehradun Valley, Haridwar Plain, and Agri-Zone Haripur regions.
* **Mapbox Layer Modes:** Switch between **Terrain**, **Satellite**, and **DGCA Restricted Airspace Zones** (Red/Yellow/Green corridors).
* **Software-in-the-Loop (SITL) Physics:** Real-time waypoint navigation simulation with aerodynamic heading calculations, altitude staging, and motor vibration modeling.
* **Advanced Power Diagnostics:**
  * Rolling battery decay sparkline with linear regression trend projection.
  * 6S LiPo individual cell telemetry monitor (C1 to C6).
  * **Low Battery Alert Slider:** User-configurable threshold (10% to 50%) triggering dual-tone audio hardware beeps, visual HUD warnings, and speech synthesis alerts.
* **Tactical SVG Mission Overlays:** Submerged road hazard zones, emergency drop target beacons, agricultural NDVI grids, rural hospital clinic pads, and 650°C wildfire plumes.

### 5. Layer 5: DGCA Digital Sky Airspace Compliance
* Interactive flight authorization token generation adhering to India's **Digital Sky** regulatory framework.
* Airspace categorization enforcement:
  * **Green Zone:** Automated permission token granting.
  * **Yellow Zone:** Air Traffic Control coordination required.
  * **Red Zone / Military Airspace:** Hard lock NPNT (No Permission, No Takeoff) ESC motor arming restriction.
* **Blockchain Flight Logging:** Simulated Hyperledger peer-node ledger tracking mission timestamps and immutable audit hashes.

### 6. AI Co-Pilot Advisor & Dynamic Routing Engine
* **AI Weather-Aware Rerouting:** Sends current waypoints and atmospheric parameters to Google Gemini to calculate dynamic A* obstacle bypass vectors, pitch offset adjustments, and thrust multipliers.
* **Lead Systems Co-pilot:** Embedded AI advisory console trained on flight dynamics, FreeRTOS queue priority, PX4 SITL simulation, and MAVLink protocol standards.

### 7. Bottom Terminal Console
* Real-time ROS 2 node status monitor (`/commander_node`, `/navigator_node`, `/health_monitor_node`, `/obstacle_avoidance_rt_node`).
* Unified logging pipeline categorizing messages by `HAL`, `ROS2`, `API`, `EDGE_AI`, `BLOCKCHAIN`, and `SYS`.
* Interactive terminal CLI commands (`help`, `clear`, `arm`, `disarm`, `rtl`, `calibrate`, `nodes`, `status`).

---

## 🛠️ Tech Stack

* **Frontend Framework:** React 19, TypeScript, Tailwind CSS v4, Lucide React Icons
* **Application Bundler:** Vite 6
* **Backend Runtime:** Node.js, Express, TSX, esbuild
* **AI & Intelligence:** `@google/genai` (Google Gen AI SDK / Gemini 3.5 Flash)
* **Audio Synthesis:** Web Audio API (`AudioContext`) & SpeechSynthesis API

---

## 📁 Project Directory Structure

```
bharat-drone-os/
├── .env.example                  # Environment configuration template
├── index.html                    # Main HTML entry point
├── metadata.json                 # AI Studio applet capabilities and permissions
├── package.json                  # NPM dependencies and scripts
├── server.ts                     # Full-stack Express API proxy & Vite middleware
├── tsconfig.json                 # TypeScript compiler configuration
├── vite.config.ts                # Vite build and Tailwind configuration
└── src/
    ├── App.tsx                   # Central GCS layout, telemetry state & SITL loop
    ├── index.css                 # Global CSS styles with Tailwind CSS
    ├── main.tsx                  # React application DOM root
    ├── types.ts                  # TypeScript domain models (Telemetry, Waypoints, Missions)
    ├── data/
    │   └── defaultMissions.ts    # 4 Default mission templates (Flood, Agri, Medical, Wildfire)
    └── components/
        ├── AiCopilotPanel.tsx    # Gemini AI drone engineering assistant interface
        ├── ComplianceStatus.tsx  # DGCA Digital Sky permit clearance & blockchain logger
        ├── DroneHealthDashboard.tsx # HAL hardware driver auto-probe & payload controls
        ├── EdgeCameraFeed.tsx    # YOLOv8 computer vision obstacle detection visualizer
        ├── MissionObjectives.tsx # Customized Mission Objectives hub & custom mission builder
        ├── MissionPlanner.tsx    # Tactical GIS waypoint map, SITL flight simulator & battery HUD
        └── TerminalConsole.tsx   # ROS 2 node status monitor & GCS system log console
```

---

## 🚦 Getting Started

### Prerequisites
* **Node.js** (v18.0.0 or higher recommended)
* **npm** or **bun** / **yarn**

### 1. Installation
Clone the repository and install all required dependencies:

```bash
git clone https://github.com/your-username/bharat-drone-os.git
cd bharat-drone-os
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Add your Google Gemini API Key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

> *Note: If `GEMINI_API_KEY` is not provided, the application will automatically run in local standalone/mock simulation mode.*

### 3. Launching the Development Server

```bash
npm run dev
```

Navigate to `http://localhost:3000` in your web browser.

### 4. Production Build

To compile both the Vite client assets and the Express backend server:

```bash
npm run build
npm start
```

---

## 📡 REST API Endpoints

The Express server (`server.ts`) exposes proxy routes for external AI evaluation and compliance verification:

| Endpoint | Method | Payload Description | Response |
| :--- | :--- | :--- | :--- |
| `/api/weather-routing` | `POST` | `{ waypoints, city, scenario }` | Evaluates atmospheric vectors via Gemini and returns rerouted safe coordinates, thrust multiplier, and pitch offset. |
| `/api/copilot` | `POST` | `{ message, chatHistory }` | Conversational interface with the Lead Systems & AI Co-pilot for flight telemetry analysis. |
| `/api/digital-sky/permit` | `POST` | `{ droneId, category, areaGCS, baseCoords, waypointsCount }` | Evaluates flight zone permissions and issues Digital Sky UIN authorization tokens. |

---

## 📜 License

This project is licensed under the **Apache-2.0 License**. See the license headers in individual source files for more information.
