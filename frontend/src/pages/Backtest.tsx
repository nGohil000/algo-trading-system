import { Play, Download } from 'lucide-react'

const backtestResults = {
  totalReturn: '+45.2%',
  sharpeRatio: 1.85,
  maxDrawdown: '-12.3%',
  winRate: '68%',
  profitFactor: 2.1,
  totalTrades: 156,
}

export default function Backtest() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Backtest</h1>
          <p className="text-slate-400">Test your strategies on historical data</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Play className="w-4 h-4" />
          Run Backtest
        </button>
      </div>

      {/* Parameters */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-4">Parameters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Strategy</label>
            <select className="input">
              <option>EMA Crossover</option>
              <option>RSI Momentum</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Symbol</label>
            <select className="input">
              <option>BTCUSDT</option>
              <option>ETHUSDT</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Start Date</label>
            <input type="date" className="input" defaultValue="2023-01-01" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">End Date</label>
            <input type="date" className="input" defaultValue="2024-01-01" />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {Object.entries(backtestResults).map(([key, value]) => (
          <div key={key} className="card text-center">
            <p className="text-slate-400 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
            <p className={`text-xl font-bold mt-1 ${
              typeof value === 'string' && value.startsWith('+') ? 'text-green-400' :
              typeof value === 'string' && value.startsWith('-') ? 'text-red-400' : 'text-white'
            }`}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Equity Curve</h2>
          <button className="text-sm text-blue-400 flex items-center gap-1">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
        <div className="h-80 bg-slate-700/50 rounded-lg flex items-center justify-center">
          <p className="text-slate-500">Equity curve chart placeholder</p>
        </div>
      </div>
    </div>
  )
}
