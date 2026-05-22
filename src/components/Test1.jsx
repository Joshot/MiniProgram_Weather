import { Terminal } from 'lucide-react'

function isPrime(n) {
  if (n < 2) return false
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false
  }
  return true
}

function buildOutput() {
  const arr = []
  for (let i = 100; i >= 1; i--) {
    if (isPrime(i)) continue
    if (i % 15 === 0) arr.push('FooBar')
    else if (i % 3 === 0) arr.push('Foo')
    else if (i % 5 === 0) arr.push('Bar')
    else arr.push(String(i))
  }
  return arr.join('  ')
}


const OUTPUT = buildOutput()

function Test1() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Small Program — Array 1 to 100</h2>
        <p>Angka 1–100 dicetak terbalik. Bilangan prima dilewati. Kelipatan 3 → Foo, kelipatan 5 → Bar, keduanya → FooBar.</p>
      </div>
      <div className="card-body">
        <div className="output-wrap">
          <div className="output-bar">
            <span><Terminal /> Output</span>
            <div className="dot-green" />
          </div>
          <div className="output-box">{OUTPUT}</div>
        </div>
      </div>
    </div>
  )
}

export default Test1
