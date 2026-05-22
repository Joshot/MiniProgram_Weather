import { useState } from 'react'
import { Play, Terminal, Hash } from 'lucide-react'

function isPrime(n) {
  if (n < 2) return false
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false
  }
  return true
}

function Test1() {
  const [output, setOutput] = useState(null)

  function jalankan() {
    const arr = []
    for (let i = 100; i >= 1; i--) {
      if (isPrime(i)) continue
      if (i % 15 === 0) arr.push('FooBar')
      else if (i % 3 === 0) arr.push('Foo')
      else if (i % 5 === 0) arr.push('Bar')
      else arr.push(String(i))
    }
    setOutput(arr.join('  '))
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">
          <Hash size={18} />
        </div>
        <div className="card-title">
          <h2>Small Program — Array 1 to 100</h2>
          <p>Cetak angka 1–100 secara terbalik dan horizontal menggunakan aturan Foo / Bar / FooBar.</p>
        </div>
      </div>

      <div className="card-body">
        <div className="rules-grid">
          <div className="rule-item">
            <span className="rule-badge red">SKIP</span>
            <span className="rule-text">Bilangan prima tidak dicetak</span>
          </div>
          <div className="rule-item">
            <span className="rule-badge indigo">÷ 3</span>
            <span className="rule-text">Kelipatan 3 → <strong>Foo</strong></span>
          </div>
          <div className="rule-item">
            <span className="rule-badge emerald">÷ 5</span>
            <span className="rule-text">Kelipatan 5 → <strong>Bar</strong></span>
          </div>
          <div className="rule-item">
            <span className="rule-badge amber">÷ 15</span>
            <span className="rule-text">Kelipatan 3 & 5 → <strong>FooBar</strong></span>
          </div>
        </div>

        <button className="btn btn-primary" onClick={jalankan}>
          <Play size={15} />
          Jalankan Program
        </button>

        {output && (
          <div className="output-wrap">
            <div className="output-topbar">
              <div className="output-label">
                <Terminal size={13} />
                Output
              </div>
              <div className="output-dot" />
            </div>
            <div className="output-box">{output}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Test1
