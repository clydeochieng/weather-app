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
