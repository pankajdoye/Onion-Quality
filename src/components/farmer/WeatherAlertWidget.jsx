import React from 'react';
import { CloudRain, Sun, Cloud, AlertTriangle, Droplets } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function WeatherAlertWidget({ lang = 'mr' }) {
  const t = SMART_I18N[lang] || SMART_I18N.mr;

  const weather = {
    temp: '29°C',
    condition: 'Partly Cloudy',
    humidity: '78%',
    rainPossibility: '35%',
    location: 'Nashik / Lasalgaon Region',
    forecast: [
      { day: 'Wed', temp: '28°C', rain: '40%' },
      { day: 'Thu', temp: '30°C', rain: '20%' },
      { day: 'Fri', temp: '31°C', rain: '10%' }
    ],
    alertMsg: '⚠️ High humidity expected (78%). Keep harvested onions protected from direct ground moisture.'
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 shadow-md space-y-4">
      
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2 text-amber-300">
          <CloudRain className="w-4 h-4 text-amber-300" />
          🌦️ {t.weatherAlerts}
        </h3>
        <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-slate-300">
          {weather.location}
        </span>
      </div>

      {/* Main Weather Card */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold">
            <Sun className="w-7 h-7" />
          </div>
          <div>
            <div className="text-3xl font-black">{weather.temp}</div>
            <p className="text-xs text-slate-300 font-semibold">{weather.condition}</p>
          </div>
        </div>

        <div className="text-right text-xs space-y-0.5">
          <p className="flex items-center gap-1 justify-end font-semibold text-slate-300">
            <Droplets className="w-3.5 h-3.5 text-blue-400" /> Humidity: <strong className="text-white">{weather.humidity}</strong>
          </p>
          <p className="flex items-center gap-1 justify-end font-semibold text-slate-300">
            <CloudRain className="w-3.5 h-3.5 text-blue-400" /> Rain: <strong className="text-white">{weather.rainPossibility}</strong>
          </p>
        </div>
      </div>

      {/* Agriculture Alert Banner (Requirement #18) */}
      <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-bold flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <span>{weather.alertMsg}</span>
      </div>

    </div>
  );
}
