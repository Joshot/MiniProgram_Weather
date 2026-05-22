import { useState } from 'react'
import axios from 'axios'
import {
  Cloud, Sun, CloudRain, CloudSnow, Wind,
  CloudLightning, Droplets, RefreshCw, AlertCircle, Loader
} from 'lucide-react'

const API_KEY = '02652873c4b0bba1f724557145b9f827'

function getWeatherIcon(desc) {
  const d = desc.toLowerCase()
  if (d.includes('thunder')) return CloudLightning
  if (d.includes('rain') || d.includes('drizzle') || d.includes('shower')) return CloudRain
  if (d.includes('snow')) return CloudSnow
  if (d.includes('mist') || d.includes('fog') || d.includes('haze')) return Wind
  if (d.includes('clear')) return Sun
  return Cloud
}

const HARI = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
const BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

function formatTanggal(dtStr) {
  const d = new Date(dtStr)
  return `${HARI[d.getDay()]} ${d.getDate()} ${BULAN[d.getMonth()]}`
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
            IconComp: getWeatherIcon(item.weather[0].description),
          })
        }
        if (hasil.length === 5) break
      }
      setCuaca(hasil)
    } catch (e) {
      if (e.response && e.response.status === 401) {
        setError('API Key tidak valid atau belum aktif.')
      } else {
        setError('Gagal mengambil data cuaca. Cek koneksi internet.')
      }
    }
    setLoading(false)
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">
          <Cloud size={18} />
        </div>
        <div className="card-title">
          <h2>Weather Forecast — Jakarta</h2>
          <p>Prakiraan cuaca 5 hari ke depan menggunakan OpenWeatherMap API. Satu suhu per hari.</p>
        </div>
      </div>

      <div className="card-body">
        <div className="weather-btn-row">
          <button className="btn btn-primary" onClick={ambilCuaca} disabled={loading}>
            {loading ? <Loader size={15} className="spin" /> : <RefreshCw size={15} />}
            {loading ? 'Mengambil data...' : 'Tampilkan Cuaca'}
          </button>
          <div className="weather-meta">
            <Droplets />
            openweathermap.org
          </div>
        </div>

        {error && (
          <div className="status-msg status-error">
            <AlertCircle />
            {error}
          </div>
        )}

        {cuaca.length > 0 && (
          <div className="weather-grid">
            {cuaca.map((c, i) => {
              const Icon = c.IconComp
              return (
                <div className="weather-card" key={i}>
                  <div className="wdate">{c.tanggal}</div>
                  <div className="wicon-wrap">
                    <Icon size={18} />
                  </div>
                  <div className="wtemp">{c.suhu}<span className="wunit">°C</span></div>
                  <div className="wdesc">{c.deskripsi}</div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Test2
