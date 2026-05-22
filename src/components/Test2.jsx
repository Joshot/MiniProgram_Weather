import { useState } from 'react'
import axios from 'axios'

const API_KEY = '8ce650732c4ad837aa78685b9898fb12'

const WEATHER_ICONS = {
  'clear sky': '☀️',
  'few clouds': '🌤️',
  'scattered clouds': '⛅',
  'broken clouds': '☁️',
  'overcast clouds': '☁️',
  'shower rain': '🌧️',
  'rain': '🌧️',
  'light rain': '🌦️',
  'moderate rain': '🌧️',
  'heavy intensity rain': '⛈️',
  'thunderstorm': '⛈️',
  'snow': '❄️',
  'mist': '🌫️',
  'haze': '🌫️',
  'fog': '🌫️',
}

function getIcon(desc) {
  const lower = desc.toLowerCase()
  for (const [key, val] of Object.entries(WEATHER_ICONS)) {
    if (lower.includes(key)) return val
  }
  return '🌡️'
}

const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

function formatTanggal(dtStr) {
  const d = new Date(dtStr)
  return `${HARI[d.getDay()]}, ${d.getDate()} ${BULAN[d.getMonth()]}`
}

function Test2() {
  const [cuaca, setCuaca] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function ambilCuaca() {
    setLoading(true)
    setError('')
    setCuaca([])
    try {
      const res = await axios.get(
        'https://api.openweathermap.org/data/2.5/forecast',
        {
          params: {
            q: 'Jakarta',
            appid: API_KEY,
            units: 'metric',
            cnt: 40,
          },
        }
      )
      const seenDays = {}
      const hasil = []
      for (const item of res.data.list) {
        const tanggal = item.dt_txt.split(' ')[0]
        if (!seenDays[tanggal]) {
          seenDays[tanggal] = true
          hasil.push({
            tanggal: formatTanggal(item.dt_txt),
            suhu: Math.round(item.main.temp),
            deskripsi: item.weather[0].description,
            icon: getIcon(item.weather[0].description),
          })
        }
        if (hasil.length === 5) break
      }
      setCuaca(hasil)
    } catch (e) {
      if (e.response && e.response.status === 401) {
        setError('API Key tidak valid.')
      } else {
        setError('Gagal mengambil data cuaca. Cek koneksi internet kamu.')
      }
    }
    setLoading(false)
  }

  return (
    <div className="card">
      <h2>🌤️ Tes 2 — Prakiraan Cuaca Jakarta (5 Hari)</h2>
      <p className="desc">
        Klik tombol di bawah untuk melihat prakiraan cuaca <strong>Jakarta</strong> 5 hari ke depan
        menggunakan API dari <strong>openweathermap.org</strong>.
      </p>
      <button className="btn-run" onClick={ambilCuaca}>🔍 Tampilkan Cuaca</button>
      {loading && <p className="loading-msg">⏳ Mengambil data cuaca...</p>}
      {error && <p className="error-msg">⚠️ {error}</p>}
      {cuaca.length > 0 && (
        <div className="weather-grid">
          {cuaca.map((c, i) => (
            <div className="weather-card" key={i}>
              <div className="wdate">{c.tanggal}</div>
              <div className="wicon">{c.icon}</div>
              <div className="wtemp">{c.suhu}°C</div>
              <div className="wdesc">{c.deskripsi}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Test2
