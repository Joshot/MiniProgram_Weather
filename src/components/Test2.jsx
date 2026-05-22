import { useState } from 'react'
import axios from 'axios'
import { Cloud, Sun, CloudRain, CloudSnow, Wind, CloudLightning, RefreshCw, AlertCircle, Loader } from 'lucide-react'

const API_KEY = 'd69a0f6de9a982b10764b39f712ea4b3'
const LAT = -6.2088
const LON = 106.8456

function getIcon(desc) {
  const d = desc.toLowerCase()
  if (d.includes('thunder')) return CloudLightning
  if (d.includes('rain') || d.includes('drizzle') || d.includes('shower')) return CloudRain
  if (d.includes('snow')) return CloudSnow
  if (d.includes('mist') || d.includes('fog') || d.includes('haze')) return Wind
  if (d.includes('clear')) return Sun
  return Cloud
}

const HARI = ['Min','Sen','Sel','Rab','Kam','Jum','Sab']
const BULAN = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']

function fmtTgl(ts) {
  const d = new Date(ts * 1000)
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
      const res = await axios.get('https://api.openweathermap.org/data/3.0/onecall', {
        params: {
          lat: LAT,
          lon: LON,
          exclude: 'current,minutely,hourly,alerts',
          appid: API_KEY,
          units: 'metric',
        }
      })
      const hasil = res.data.daily.slice(0, 5).map(day => ({
        tanggal: fmtTgl(day.dt),
        suhu: Math.round(day.temp.day),
        deskripsi: day.weather[0].description,
        IconComp: getIcon(day.weather[0].description),
      }))
      setCuaca(hasil)
    } catch (e) {
      if (e.response?.status === 401) setError('API Key tidak valid atau belum aktif.')
      else if (e.response?.status === 403) setError('API Key belum berlangganan One Call 3.0. Aktifkan di dashboard OpenWeatherMap.')
      else setError('Gagal mengambil data. Cek koneksi internet.')
    }
    setLoading(false)
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Weather Forecast — Jakarta</h2>
        <p>Prakiraan cuaca 5 hari ke depan menggunakan OpenWeatherMap One Call API 3.0.</p>
      </div>
      <div className="card-body">
        <button className="btn" onClick={ambilCuaca} disabled={loading}>
          {loading ? <Loader size={14} className="spin" /> : <RefreshCw size={14} />}
          {loading ? 'Mengambil...' : 'Tampilkan Cuaca'}
        </button>
        {error && (
          <div className="status-msg">
            <AlertCircle />{error}
          </div>
        )}
        {cuaca.length > 0 && (
          <div className="weather-grid">
            {cuaca.map((c, i) => {
              const Icon = c.IconComp
              return (
                <div className="weather-card" key={i}>
                  <div className="wdate">{c.tanggal}</div>
                  <div className="wicon-wrap"><Icon /></div>
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
