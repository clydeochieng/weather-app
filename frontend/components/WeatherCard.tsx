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
