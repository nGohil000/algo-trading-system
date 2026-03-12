import { useState } from 'react'
import { Plus, Trash2, Play, Save, Copy } from 'lucide-react'

interface Condition {
  id: string
  indicator: string
  operator: string
  value: string
  connector: 'AND' | 'OR'
}

interface Leg {
  id: string
  action: 'BUY' | 'SELL'
  instrument: string
  quantity: number
  conditions: Condition[]
}

// Strategy templates like TradeTron
const templates = [
  { id: 'straddle', name: 'Straddle', description: 'Buy call and put at same strike' },
  { id: 'strangle', name: 'Strangle', description: 'Buy OTM call and put' },
  { id: 'bull_call', name: 'Bull Call Spread', description: 'Buy call, sell higher call' },
  { id: 'bear_put', name: 'Bear Put Spread', description: 'Buy put, sell lower put' },
  { id: 'iron_condor', name: 'Iron Condor', description: 'Sell OTM call spread & put spread' },
  { id: 'custom', name: 'Custom', description: 'Build your own strategy' },
]

const indicators = [
  'RSI', 'MACD', 'SMA', 'EMA', 'Bollinger Bands', 'ATR', 'VWAP', 'Volume'
]

export default function StrategyBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState('custom')
  const [strategyName, setStrategyName] = useState('')
  const [legs, setLegs] = useState<Leg[]>([
    {
      id: '1',
      action: 'BUY',
      instrument: 'BTCUSDT',
      quantity: 1,
      conditions: []
    }
  ])

  const addLeg = () => {
    setLegs([...legs, {
      id: Date.now().toString(),
      action: 'BUY',
      instrument: 'BTCUSDT',
      quantity: 1,
      conditions: []
    }])
  }

  const addCondition = (legId: string) => {
    setLegs(legs.map(leg => {
      if (leg.id === legId) {
        return {
          ...leg,
          conditions: [...leg.conditions, {
            id: Date.now().toString(),
            indicator: 'RSI',
            operator: '<',
            value: '30',
            connector: 'AND'
          }]
        }
      }
      return leg
    }))
  }

  const removeLeg = (legId: string) => {
    setLegs(legs.filter(l => l.id !== legId))
  }

  const removeCondition = (legId: string, condId: string) => {
    setLegs(legs.map(leg => {
      if (leg.id === legId) {
        return {
          ...leg,
          conditions: leg.conditions.filter(c => c.id !== condId)
        }
      }
      return leg
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Strategy Builder</h1>
          <p className="text-slate-400">Create your trading strategy with visual builder</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <Copy className="w-4 h-4" />
            Copy
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Play className="w-4 h-4" />
            Test
          </button>
        </div>
      </div>

      {/* Templates */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-4">Strategy Templates</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTemplate(t.id)}
              className={`p-3 rounded-lg text-left transition-colors ${
                selectedTemplate === t.id 
                  ? 'bg-blue-600 border-2 border-blue-400' 
                  : 'bg-slate-700 hover:bg-slate-600 border-2 border-transparent'
              }`}
            >
              <p className="font-medium text-white">{t.name}</p>
              <p className="text-xs text-slate-400 mt-1">{t.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Strategy Name */}
      <div className="card">
        <label className="block text-sm text-slate-400 mb-2">Strategy Name</label>
        <input
          type="text"
          value={strategyName}
          onChange={(e) => setStrategyName(e.target.value)}
          placeholder="Enter strategy name..."
          className="input"
        />
      </div>

      {/* Legs / Conditions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Strategy Legs</h2>
          <button onClick={addLeg} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Leg
          </button>
        </div>

        {legs.map((leg) => (
          <div key={leg.id} className="card border-l-4 border-blue-500">
            <div className="flex items-center gap-4 mb-4">
              <select
                value={leg.action}
                onChange={(e) => setLegs(legs.map(l => l.id === leg.id ? { ...l, action: e.target.value as 'BUY' | 'SELL' } : l))}
                className="input w-auto"
              >
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
              </select>
              <input
                type="text"
                value={leg.instrument}
                onChange={(e) => setLegs(legs.map(l => l.id === leg.id ? { ...l, instrument: e.target.value } : l))}
                placeholder="Symbol (e.g., BTCUSDT)"
                className="input w-48"
              />
              <input
                type="number"
                value={leg.quantity}
                onChange={(e) => setLegs(legs.map(l => l.id === leg.id ? { ...l, quantity: parseFloat(e.target.value) } : l))}
                placeholder="Qty"
                className="input w-24"
              />
              <button onClick={() => removeLeg(leg.id)} className="p-2 text-red-400 hover:bg-red-600/20 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Conditions */}
            <div className="space-y-2">
              <p className="text-sm text-slate-400">Entry Conditions:</p>
              {leg.conditions.map((cond, idx) => (
                <div key={cond.id} className="flex items-center gap-2 flex-wrap">
                  {idx > 0 && (
                    <select className="input w-20 text-center">
                      <option>AND</option>
                      <option>OR</option>
                    </select>
                  )}
                  <select value={cond.indicator} className="input w-32">
                    {indicators.map(i => <option key={i}>{i}</option>)}
                  </select>
                  <select value={cond.operator} className="input w-20">
                    <option>{'<'}</option>
                    <option>{'>'}</option>
                    <option>{'='}</option>
                    <option>{'<='}</option>
                    <option>{'>='}</option>
                  </select>
                  <input type="text" value={cond.value} className="input w-24" />
                  <button onClick={() => removeCondition(leg.id, cond.id)} className="p-1 text-slate-400 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button 
                onClick={() => addCondition(leg.id)}
                className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Condition
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Exit Conditions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-4">Exit Conditions</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <select className="input w-32">
              <option>Stop Loss</option>
              <option>Take Profit</option>
              <option>Trailing Stop</option>
            </select>
            <input type="text" placeholder="Value (%)" className="input w-32" />
          </div>
          <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
            <Plus className="w-4 h-4" /> Add Exit Rule
          </button>
        </div>
      </div>
    </div>
  )
}
