
# 🌤️ Decoupled Weather App (Laravel + Next.js + OpenWeatherMap)

This project demonstrates a weather application built with **Laravel (API backend)** and **Next.js (frontend)** using a decoupled architecture. Weather data is fetched from [OpenWeatherMap API](https://openweathermap.org/api).

---

## 🧩 Architecture Overview

```
Frontend (Next.js + RippleUI)
        |
        v
Backend API (Laravel)
        |
        v
OpenWeatherMap API
```

---

## 📦 Backend: Laravel API Setup

### 1. Create Laravel Project

```bash
laravel new weather-api
cd weather-api
```

### 2. Setup OpenWeatherMap API Key

Add to `.env`:

```env
OPENWEATHER_API_KEY=8ef31ff1ffd85561a8e8dfc1eb496534

### 3. Create Weather Controller

```bash
php artisan make:controller WeatherController
```

Update `app/Http/Controllers/WeatherController.php`:

```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    public function getWeather(Request $request)
    {
        $city = $request->query('city', 'Nairobi');
        $apiKey = env('OPENWEATHER_API_KEY');

        $response = Http::get("https://api.openweathermap.org/data/2.5/weather", [
            'q' => $city,
            'appid' => $apiKey,
            'units' => 'metric'
        ]);

        return response()->json($response->json());
    }
}
```

### 4. Define API Route

Update `routes/api.php`:

```php
use App\Http\Controllers\WeatherController;

Route::get('/weather', [WeatherController::class, 'getWeather']);
```

### 5. Serve API

```bash
php artisan serve
```

Test endpoint:  
`http://127.0.0.1:8000/api/weather?city=Nairobi`

---

## 🖥️ Frontend: Next.js with TypeScript + RippleUI

### 1. Create Next.js App

```bash
npx create-next-app@latest weather-ui --typescript
cd weather-ui
```

### 2. Install Tailwind + RippleUI

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install rippleui
```

### 3. Configure Tailwind

Edit `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/rippleui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("rippleui")],
};
```

Update `globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 4. Create Weather Component

`components/WeatherCard.tsx`:

```tsx
"use client";
import { useEffect, useState } from "react";

interface WeatherData {
  name: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

export default function WeatherCard({ city }: { city: string }) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/weather?city=${city}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [city]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!data) return <p className="text-center">No data available</p>;

  return (
    <div className="card w-full bg-base-100 shadow-xl p-4">
      <h2 className="text-xl font-bold">{data.name}</h2>
      <p className="text-lg">{data.main.temp}°C</p>
      <p className="capitalize">{data.weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
    </div>
  );
}
```

---

### 5. Update Homepage

`app/page.tsx`:

```tsx
"use client";
import { useState } from "react";
import WeatherCard from "../components/WeatherCard";

export default function Home() {
  const [city, setCity] = useState("Nairobi");

  return (
    <main className="p-6 flex flex-col items-center space-y-6">
      <input
        className="input input-bordered w-full max-w-xs"
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <WeatherCard city={city} />
    </main>
  );
}
```

---

## ▶️ Run the Project

### Start Backend

```bash
cd weather-api
php artisan serve
```

### Start Frontend

```bash
cd weather-ui
npm run dev
```

Visit: `http://localhost:3000`

---

## ✅ Extras (For Bonus)

| Feature                        | Details                                     |
|-------------------------------|---------------------------------------------|
| ✅ Type-safe API response      | Interface `WeatherData` in TS               |
| ✅ Code comments               | Use `//` and JSDoc                          |
| ✅ Git commit messages         | Use `feat:`, `fix:`, `refactor:`            |
| ✅ Loading & error handling    | Shown in `<WeatherCard />`                 |
| ✅ RippleUI styling            | Tailwind-based UI components used           |

---

## 📝 License

MIT – for educational/demo purposes
