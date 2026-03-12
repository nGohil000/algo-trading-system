import { Wallet, Activity, DollarSign, BarChart3 } from 'lucide-react'

const stats = [
  { label: 'Portfolio Value', value: '$125,420', change: '+12.5%', icon: Wallet, positive: true },
  { label: 'Today\'s P&L', value: '+$1,240', change: '+2.4%', icon: DollarSign, positive: true },
  { label: 'Open Positions', value: '5', change: '', icon: Activity, positive: true },
  { label: 'Win Rate', value: '68%', change: '+5%', icon: BarChart3, positive: true },
]

const recentTrades = [
  { symbol: 'BTCUSDT', side: 'BUY', qty: '0.5', price: '$67,234', pnl: '+$234', time: '2 min ago' },
  { symbol: 'ETHUSDT', side: 'SELL', qty: '2.0', price: '$3,456', pnl: '+$89', time: '15 min ago' },
  { symbol: 'SOLUSDT', side: 'BUY', qty: '10', price: '$178', pnl: '-$45', time: '1 hr ago' },
  { symbol: 'AAPL', side: 'BUY', qty: '50', price: '$178', pnl: '+$120', time: '2 hr ago' },
]

const activeStrategies = [
  { name: 'EMA Crossover', status: 'Running', trades: 23, pnl: '+5.2%' },
  { name: 'RSI Momentum', status: 'Running', trades: 15, pnl: '+3.1%' },
  { name: 'Bollinger Rev', status: 'Paused', trades: 8, pnl: '+1.2%' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400">Welcome back! Here's your trading overview.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                {stat.change && (
                  <p className={`text-sm mt-1 ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change}
                  </p>
                )}
              </div>
              <div className="p-2 bg-blue-600/20 rounded-lg">
                <stat.icon className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-4">Portfolio Performance</h2>
          <div className="h-64 bg-slate-700/50 rounded-lg flex items-center justify-center">
            <p className="text-slate-500">Chart placeholder - TradingView</p>
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-4">Active Strategies</h2>
          <div className="space-y-3">
            {activeStrategies.map((strat) => (
              <div key={strat.name} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div>
                  <p className="font-medium text-white">{strat.name}</p>
                  <p className="text-sm text-slate-400">{strat.trades} trades • {strat.pnl}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  strat.status === 'Running' ? 'bg-green-600/20 text-green-400' : 'bg-yellow-600/20 text-yellow-400'
                }`}>
                  {strat.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recent Trades */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Trades</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-400 text-sm">
                <th className="pb-3">Symbol</th>
                <th className="pb-3">Side</th>
                <th className="pb-3">Quantity</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">P&L</th>
                <th className="pb-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentTrades.map((trade, i) => (
                <tr key={i} className="border-t border-slate-700">
                  <td className="py-3 font-medium text-white">{trade.symbol}</td>
                  <td className="py-3">
                    <span className={trade.side === 'BUY' ? 'text-green-400' : 'text-red-400'}>
                      {trade.side}
                    </span>
                  </td>
                  <td className="py-3 text-slate-300">{trade.qty}</td>
                  <td className="py-3 text-slate-300">{trade.price}</td>
                  <td className={`py-3 ${trade.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {trade.pnl}
                  </td>
                  <td className="py-3 text-slate-400">{trade.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
