import { useState } from 'react'
import Test1 from './components/Test1'
import Test2 from './components/Test2'

function App() {
  const [tab, setTab] = useState('test1')

  return (
    <div>
      <header>
        <span style={{ fontSize: '1.6rem' }}>💻</span>
        <h1>Mini Program & Prakiraan Cuaca</h1>
      </header>

      <div className="tab-bar">
        <button
          className={`tab-btn${tab === 'test1' ? ' active' : ''}`}
          onClick={() => setTab('test1')}
        >
          Tes 1 — Array 1–100
        </button>
        <button
          className={`tab-btn${tab === 'test2' ? ' active' : ''}`}
          onClick={() => setTab('test2')}
        >
          Tes 2 — Cuaca Jakarta
        </button>
      </div>

      <div className="container">
        {tab === 'test1' && <Test1 />}
        {tab === 'test2' && <Test2 />}
      </div>
    </div>
  )
}

export default App
