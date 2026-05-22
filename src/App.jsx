import { useState } from 'react'
import Test1 from './components/Test1'
import Test2 from './components/Test2'
import { Code2, CloudSun } from 'lucide-react'

function App() {
  const [tab, setTab] = useState('test1')

  return (
    <div>
      <div className="header">
        <div className="header-logo">
          <Code2 size={18} />
        </div>
        <div className="header-info">
          <h1>MiniProgram & Weather</h1>
          <p>Stamps Developer Recruitment — Mini Test</p>
        </div>
      </div>

      <div className="tab-bar">
        <button
          className={`tab-btn${tab === 'test1' ? ' active' : ''}`}
          onClick={() => setTab('test1')}
        >
          <Code2 />
          Array Program
        </button>
        <button
          className={`tab-btn${tab === 'test2' ? ' active' : ''}`}
          onClick={() => setTab('test2')}
        >
          <CloudSun />
          Weather Forecast
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
