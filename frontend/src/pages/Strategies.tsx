import { useState } from 'react'
import { Play, Pause, Trash2, Edit, Copy, MoreVertical } from 'lucide-react'

const strategies = [
  { id: 1, name: 'EMA Crossover', type: 'Trend', status: 'running', pnl: '+12.5%', trades: 45 },
  { id: 2, name: 'RSI Momentum', type: 'Momentum', status: 'running', pnl: '+8.2%', trades: 32 },
  { id: 3, name: 'Bollinger Reversion', type: 'Mean Reversion', status: 'paused', pnl: '+3.1%', trades: 18 },
  { id: 4, name: 'MACD Breakout', type: 'Breakout', status: 'stopped', pnl: '-2.4%', trades: 12 },
  { id: 5, name: 'Golden Cross', type: 'Trend', status: 'running', pnl: '+15.8%', trades: 67 },
]

export default function Strategies() {
  const [filter, setFilter] = useState('all')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Strategies</h1>
          <p className="text-slate-400">Manage your trading strategies</p>
        </div>
        <button className="btn-primary">+ New Strategy</button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'running', 'paused', 'stopped'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg capitalize ${
              filter === f ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Strategy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {strategies.filter(s => filter === 'all' || s.status === filter).map((strat) => (
          <div key={strat.id} className="card hover:border-blue-500/50 border border-transparent transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-white">{strat.name}</h3>
                <span className="text-sm text-slate-400">{strat.type}</span>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                strat.status === 'running' ? 'bg-green-600/20 text-green-400' :
                strat.status === 'paused' ? 'bg-yellow-600/20 text-yellow-400' :
                'bg-red-600/20 text-red-400'
              }`}>
                {strat.status}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="text-slate-400">{strat.trades} trades</span>
              <span className={strat.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                {strat.pnl}
              </span>
            </div>
            
            <div className="flex gap-2">
              {strat.status === 'running' ? (
                <button className="flex-1 btn-secondary flex items-center justify-center gap-2">
                  <Pause className="w-4 h-4" /> Pause
                </button>
              ) : (
                <button className="flex-1 btn-primary flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" /> Run
                </button>
              )}
              <button className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600">
                <Edit className="w-4 h-4 text-slate-400" />
              </button>
              <button className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600">
                <Trash2 className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
