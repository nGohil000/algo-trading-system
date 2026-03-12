import { Play, Pause, RefreshCw } from 'lucide-react'

const positions = [
  { symbol: 'BTCUSDT', side: 'LONG', qty: 0.5, entry: 65000, current: 67500, pnl: '+3.8%', time: '2h ago' },
  { symbol: 'ETHUSDT', side: 'SHORT', qty: 2.0, entry: 3500, current: 3450, pnl: '+1.4%', time: '4h ago' },
  { symbol: 'SOLUSDT', side: 'LONG', qty: 10, entry: 170, current: 165, pnl: '-2.9%', time: '1h ago' },
]

export default function PaperTrading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Paper Trading</h1>
          <p className="text-slate-400">Simulated trading with fake money</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Play className="w-4 h-4" />
            Start All
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-slate-400 text-sm">Paper Balance</p>
          <p className="text-2xl font-bold text-white">$125,420</p>
        </div>
        <div className="card">
          <p className="text-slate-400 text-sm">Today's P&L</p>
          <p className="text-2xl font-bold text-green-400">+$1,240</p>
        </div>
        <div className="card">
          <p className="text-slate-400 text-sm">Open Positions</p>
          <p className="text-2xl font-bold text-white">3</p>
        </div>
        <div className="card">
          <p className="text-slate-400 text-sm">Total Trades</p>
          <p className="text-2xl font-bold text-white">89</p>
        </div>
      </div>

      {/* Active Strategies */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-4">Active Strategies</h2>
        <div className="space-y-3">
          {['EMA Crossover', 'RSI Momentum', 'Bollinger Reversion'].map((strat) => (
            <div key={strat} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <button className="p-2 bg-green-600/20 rounded-full">
                  <Play className="w-4 h-4 text-green-400" />
                </button>
                <span className="text-white">{strat}</span>
              </div>
              <span className="text-green-400">Running</span>
            </div>
          ))}
        </div>
      </div>

      {/* Positions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-4">Open Positions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-400 text-sm">
                <th className="pb-3">Symbol</th>
                <th className="pb-3">Side</th>
                <th className="pb-3">Qty</th>
                <th className="pb-3">Entry</th>
                <th className="pb-3">Current</th>
                <th className="pb-3">P&L</th>
                <th className="pb-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((pos, i) => (
                <tr key={i} className="border-t border-slate-700">
                  <td className="py-3 font-medium text-white">{pos.symbol}</td>
                  <td className="py-3">
                    <span className={pos.side === 'LONG' ? 'text-green-400' : 'text-red-400'}>
                      {pos.side}
                    </span>
                  </td>
                  <td className="py-3 text-slate-300">{pos.qty}</td>
                  <td className="py-3 text-slate-300">${pos.entry.toLocaleString()}</td>
                  <td className="py-3 text-slate-300">${pos.current.toLocaleString()}</td>
                  <td className={`py-3 ${pos.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {pos.pnl}
                  </td>
                  <td className="py-3 text-slate-400">{pos.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
