import { useState } from 'react'
import axios from 'axios'
import { RefreshCw, AlertCircle, Loader, MapPin } from 'lucide-react'

const API_KEY = '9a94d11d3f14404a5faf40c5c994c15a'
const KOTA = 'Jakarta'

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
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${KOTA}&appid=${API_KEY}&units=metric`
      )
      const seenDays = {}
      const hasil = []
      for (const item of res.data.list) {
        const tanggal = item.dt_txt.split(' ')[0]
        if (!seenDays[tanggal]) {
          seenDays[tanggal] = true
          hasil.push({
            tanggal: fmtTgl(item.dt),
            suhu: Math.round(item.main.temp),
            deskripsi: item.weather[0].description,
            icon: item.weather[0].icon,
          })
        }
        if (hasil.length === 5) break
      }
      setCuaca(hasil)
    } catch (e) {
      if (e.response?.status === 401) setError('API Key tidak valid.')
      else setError('Gagal mengambil data. Cek koneksi internet.')
    }
    setLoading(false)
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Weather Forecast — Jakarta</h2>
        <p>Prakiraan cuaca 5 hari ke depan menggunakan OpenWeatherMap Forecast API.</p>
      </div>
      <div className="card-body">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button className="btn" onClick={ambilCuaca} disabled={loading}>
            {loading ? <Loader size={14} className="spin" /> : <RefreshCw size={14} />}
            {loading ? 'Mengambil...' : 'Tampilkan Cuaca'}
          </button>
          <span style={{ fontSize: '0.75rem', color: '#999', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={11} /> Jakarta, ID
          </span>
        </div>

        {error && (
          <div className="status-msg">
            <AlertCircle />{error}
          </div>
        )}

        {cuaca.length > 0 && (
          <div className="weather-grid">
            {cuaca.map((c, i) => (
              <div className="weather-card" key={i}>
                <div className="wdate">{c.tanggal}</div>
                <div className="wicon-wrap">
                  <img
                    src={`https://openweathermap.org/img/wn/${c.icon}@2x.png`}
                    alt={c.deskripsi}
                    width={36}
                    height={36}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="wtemp">{c.suhu}<span className="wunit">°C</span></div>
                <div className="wdesc">{c.deskripsi}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Test2
