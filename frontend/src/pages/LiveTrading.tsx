import { AlertTriangle, Shield, Zap } from 'lucide-react'

export default function LiveTrading() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Live Trading</h1>
        <p className="text-slate-400">Connect exchanges and trade with real money</p>
      </div>

      {/* Warning */}
      <div className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
        <div>
          <p className="font-medium text-yellow-400">Live Trading Mode</p>
          <p className="text-sm text-slate-300">You're about to trade with real money. Make sure you've tested your strategies in paper trading first.</p>
        </div>
      </div>

      {/* Exchange Connections */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-4">Exchange Connections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Binance', status: 'connected', icon: '💰' },
            { name: 'Delta Exchange', status: 'disconnected', icon: '📊' },
            { name: 'Shoonya', status: 'disconnected', icon: '🇮🇳' },
          ].map((ex) => (
            <div key={ex.name} className="p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{ex.icon}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  ex.status === 'connected' ? 'bg-green-600/20 text-green-400' : 'bg-slate-600 text-slate-400'
                }`}>
                  {ex.status}
                </span>
              </div>
              <p className="font-medium text-white">{ex.name}</p>
              <button className="mt-2 w-full btn-secondary text-sm">
                {ex.status === 'connected' ? 'Manage' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* API Keys */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-4">API Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">API Key</label>
            <input type="text" className="input" placeholder="Enter API key" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">API Secret</label>
            <input type="password" className="input" placeholder="Enter API secret" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="testnet" className="w-4 h-4" defaultChecked />
            <label htmlFor="testnet" className="text-sm text-slate-300">Use Testnet (recommended for first connection)</label>
          </div>
        </div>
      </div>

      {/* Risk Controls */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-400" />
          Risk Controls
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Max Position Size ($)</label>
            <input type="number" className="input" defaultValue="10000" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Daily Loss Limit ($)</label>
            <input type="number" className="input" defaultValue="1000" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Max Drawdown (%)</label>
            <input type="number" className="input" defaultValue="20" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Kill Switch</label>
            <button className="w-full btn-secondary bg-red-600/20 text-red-400 hover:bg-red-600/30">
              ⚠️ Emergency Stop
            </button>
          </div>
        </div>
      </div>

      {/* Start Trading */}
      <div className="flex justify-end">
        <button className="btn-primary flex items-center gap-2 bg-green-600 hover:bg-green-700">
          <Zap className="w-4 h-4" />
          Start Live Trading
        </button>
      </div>
    </div>
  )
}
