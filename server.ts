import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini safely
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } catch (err) {
    console.error("Failed to initialize Gemini API client:", err);
  }
} else {
  console.warn("GEMINI_API_KEY not found in environment. Co-pilot will run in mock mode.");
}

// REST API for Weather Routing and A* simulation parameters
app.post("/api/weather-routing", async (req, res) => {
  const { waypoints, city, scenario } = req.body;

  if (!ai) {
    // Mock robust response if key is missing
    return res.json({
      success: true,
      analysis: `### 🌤️ Simulating Environmental Vectors for ${city || "Dehradun Region"}
Due to heavy weather front (wind speed 18-22 knots), real-time compensation is active.
- **Microburst danger**: Moderate at waypoint 3.
- **Recommended pitch adjustment**: +1.5 degrees north.
- **Flight clearance status**: YELLOW Zone. Dynamic bypass route computed successfully.`,
      windSpeed: 23,
      windDirection: "NE",
      rainIntensity: "Moderate (4.2mm/h)",
      thrustMultiplier: 1.15,
      pitchOffset: 2.1,
      reroutedWaypoints: (waypoints || []).map((wp: any, idx: number) => {
        if (idx === 1) {
          return { ...wp, lat: wp.lat + 0.005, lng: wp.lng - 0.004, altitude: 45, info: "AI Weather Alternate" };
        }
        return wp;
      }),
    });
  }

  try {
    const prompt = `
      You are the AI Routing Master for BharatDrone OS (Autonomous Platform for Drone).
      We are flying a drone simulation in the ${city || "Indian subcontinent"} under the physical scenario of "${scenario || "High Mountain Wind & Cloud Front"}".
      The pilot's target flight path waypoints are: ${JSON.stringify(waypoints)}.

      Perform a realistic, professional, physics-based weather-aware drone route analysis. Return a structured JSON response explaining:
      1. General weather analysis and local atmospheric hazards (wind shear, microbursts, low visibility, moisture).
      2. Flight controls compensation vectors (thrust multiplier between 1.0 - 1.3, pitch offset in degrees between -3.0 and 3.0, and dynamic wind speed in knots).
      3. Rerouted, safer waypoints (if weather hazard requires adjustment, update the mid-waypoints slightly to avoid a central hazard zone. Add descriptions of the changes!).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING, description: "Detailed markdown analysis of local atmospheric hazards and flight guidelines." },
            windSpeed: { type: Type.NUMBER, description: "Simulated localized wind speed in knots." },
            windDirection: { type: Type.STRING, description: "Wind direction abbreviation e.g. NW, SSE." },
            rainIntensity: { type: Type.STRING, description: "Description of precipitation level e.g. None, Light, Torrential." },
            thrustMultiplier: { type: Type.NUMBER, description: "Adjustment factor for drone motors to fight headwind." },
            pitchOffset: { type: Type.NUMBER, description: "Calculated flight controller pitch offset under wind load." },
            reroutedWaypoints: {
              type: Type.ARRAY,
              description: "The revised safe waypoint list with adjusted lat/lng/alt to dodge weather fronts.",
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.NUMBER },
                  lat: { type: Type.NUMBER },
                  lng: { type: Type.NUMBER },
                  altitude: { type: Type.NUMBER },
                  info: { type: Type.STRING, description: "Label description of this waypoint (e.g., Avoidance Node)." },
                },
              },
            },
          },
          required: ["analysis", "windSpeed", "windDirection", "thrustMultiplier", "pitchOffset", "reroutedWaypoints"],
        },
      },
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json({ success: true, ...parsedData });
  } catch (error: any) {
    console.error("Weather routing generation failed:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// REST API for Bharat Drone OS Co-pilot Assistant
app.post("/api/copilot", async (req, res) => {
  const { message, chatHistory } = req.body;

  if (!ai) {
    return res.json({
      success: true,
      text: "BharatDrone OS (Autonomous Platform for Drone) simulator loaded in Standalone/Mock Mode. To enable full generative drone AI responses, make sure a valid 'GEMINI_API_KEY' is provided in your secrets panel!\n\nHere are some of the active embedded system subroutines for you to review:\n- `hal::init_port(CUBE_ORANGE)`: Probes hardware stack.\n- `ros2::launch(health_monitor)`: Ensures motor telemetry is green.\n- `dgca::verify_digital_sky_token()`: Returns DGCA authorization status.",
    });
  }

  try {
    const systemInstruction = `
      You are the Lead Systems & AI Co-pilot representing "BharatDrone OS (Autonomous Platform for Drone)".
      You understand flight dynamics, FreeRTOS priority queues, PX4 SITL simulation state, NVIDIA Jetson Edge YOLOv8 vision pipelines, DGCA Digital Sky API, and MAVLink drivers.
      Provide highly technical, inspiring, and concise operational feedback to the user on how the drone's subsystems are performing, how to resolve calibration errors, and how to program autonomous mission scripts.
      Refer to specific components like the Pixhawk 6C, Cube Orange, wind compensation matrices, and DGCA permission tokens. Keep it short and full-stack engineering minded.
    `;

    // Convert history format to Gemini GenAI sdk format
    const formattedHistory = (chatHistory || []).map((chat: any) => ({
      role: chat.role === "user" ? "user" : "model",
      parts: [{ text: chat.text }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [...formattedHistory, { role: "user", parts: [{ text: message }] }],
      config: {
        systemInstruction,
      },
    });

    res.json({ success: true, text: response.text });
  } catch (error: any) {
    console.error("Co-pilot chat failed:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Mock Digital Sky Flight Permit authorization response
app.post("/api/digital-sky/permit", (req, res) => {
  const { droneId, category, areaGCS, baseCoords, waypointsCount } = req.body;

  // Simulate Digital Sky dynamic licensing check
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const isApproved = category !== "prohibited";
  const uin = `UIN-IND-DT${randomSuffix}`;
  const permitCode = isApproved ? `DGCA-AUTH-F${randomSuffix}-OK` : null;

  res.json({
    success: true,
    uin,
    permitCode,
    status: isApproved ? "APPROVED" : "DENIED",
    zone: category === "agricultural" ? "GREEN" : category === "prohibited" ? "RED" : "YELLOW",
    timestamp: new Date().toISOString(),
    details: isApproved
      ? "Dynamic digital flight token received. Blockchain flight logs are active on Hyperledger peer node #0."
      : "Flight path encroaches on military base exclusion zone. Permit request denied by Digital Sky validator.",
  });
});

// Configure Vite middleware or Static files serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[BharatDrone OS (Autonomous Platform for Drone) v1.0.0] Mission Control online on http://0.0.0.0:${PORT}`);
  });
}

startServer();
