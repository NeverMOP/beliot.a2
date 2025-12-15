# **App Name**: Beliot Dashboard

## Core Features:

- Device Data Ingestion: Accept data from LoRaWAN gateways via HTTP and parse 188B packets. Save the information to the readings hypertable in TimescaleDB.
- Data Storage: Store the parsed data into a PostgreSQL database with TimescaleDB for time-series optimization. Table schemas are pre-defined.
- External MQTT Communication: Forwards processed data to an external MQTT broker for consumption by other services or applications. Broker details are configurable.
- REST API: Provides a RESTful API to interact with devices and readings data. The API should include authentication (JWT) for security and should work with the existing database schemas. Does not include any authentication endpoints (the table and initial user are pre-defined)
- Dashboard UI: Create an interactive dashboard to visualize the device data, display device status, and show readings as graphs. Leverage technologies such as React 18, TypeScript, Vite, Tailwind CSS, Recharts, and shadcn/ui.
- Nginx Reverse Proxy: Configure Nginx as a reverse proxy to route traffic to the frontend and backend services.

## Style Guidelines:

- Primary color: A deep blue (#2E3B55), evoking stability and trust, and reminiscent of industrial control systems and the night sky, suitable for monitoring IoT devices.
- Background color: Light gray (#F0F2F5) to ensure readability and reduce eye strain during prolonged use.  
- Accent color: Soft purple (#7B68EE), for interactive elements.
- Headline Font: 'Space Grotesk', sans-serif, giving a modern and digital feel, should be used for headlines. Body Font: 'Inter', sans-serif, should be used for the remaining text.
- Use clean, outlined icons to represent different device types, statuses, and data points.
- Implement a responsive and modular grid layout, ensuring compatibility across different screen sizes. Utilize dashboards to display key metrics at a glance.
- Incorporate subtle transitions and animations for a smoother user experience, such as loading spinners or data update notifications.