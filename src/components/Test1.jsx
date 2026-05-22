import { useState } from 'react'

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
      <h2>📋 Tes 1 — Program Kecil (Array 1–100)</h2>
      <p className="desc">
        Cetak angka 1–100 secara <strong>terbalik</strong>, horizontal, dengan aturan:
      </p>
      <ul className="rules-list">
        <li>❌ Jangan cetak bilangan prima</li>
        <li>3️⃣ Kelipatan 3 → <strong>Foo</strong></li>
        <li>5️⃣ Kelipatan 5 → <strong>Bar</strong></li>
        <li>🔢 Kelipatan 3 dan 5 → <strong>FooBar</strong></li>
      </ul>
      <button className="btn-run" onClick={jalankan}>▶ Jalankan Program</button>
      {output && <div className="output-box">{output}</div>}
    </div>
  )
}

export default Test1
