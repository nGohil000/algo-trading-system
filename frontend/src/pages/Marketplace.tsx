import { Star, Download, Eye } from 'lucide-react'

const marketplaceStrategies = [
  { 
    id: 1, 
    name: 'Golden Cross Pro', 
    author: 'TradeBot Team',
    rating: 4.8,
    downloads: 1250,
    price: 29,
    description: 'Proven trend following strategy using 50/200 SMA crossover',
    tags: ['Trend', 'SMA', 'BTC', 'ETH']
  },
  { 
    id: 2, 
    name: 'RSI Scalper', 
    author: 'AlgoMaster',
    rating: 4.5,
    downloads: 890,
    price: 19,
    description: 'Short-term RSI-based scalping for crypto pairs',
    tags: ['Scalping', 'RSI', '5m', '15m']
  },
  { 
    id: 3, 
    name: 'Volatility Breakout', 
    author: 'VolatilityTrader',
    rating: 4.9,
    downloads: 2100,
    price: 49,
    description: 'Captures explosive moves using ATR-based breakout system',
    tags: ['Breakout', 'ATR', 'Volatility']
  },
  { 
    id: 4, 
    name: 'Grid Trading Bot', 
    author: 'GridMaster',
    rating: 4.3,
    downloads: 560,
    price: 0,
    description: 'Free grid strategy for sideways markets',
    tags: ['Grid', 'Free', 'Range']
  },
]

export default function Marketplace() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Marketplace</h1>
          <p className="text-slate-400">Discover and use strategies from the community</p>
        </div>
        <button className="btn-primary">+ Publish Strategy</button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['All', 'Free', 'Paid', 'Trending', 'New'].map((f) => (
          <button
            key={f}
            className="px-4 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600"
          >
            {f}
          </button>
        ))}
      </div>

      {/* Strategy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {marketplaceStrategies.map((strat) => (
          <div key={strat.id} className="card">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-white">{strat.name}</h3>
                <p className="text-sm text-slate-400">by {strat.author}</p>
              </div>
              <span className="text-lg font-bold text-green-400 flex items-center gap-1">
                {strat.price === 0 ? 'Free' : `$${strat.price}`}
              </span>
            </div>
            
            <p className="text-sm text-slate-300 mb-3">{strat.description}</p>
            
            <div className="flex gap-2 mb-3">
              {strat.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  {strat.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  {strat.downloads}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600">
                  <Eye className="w-4 h-4 text-slate-400" />
                </button>
                <button className="btn-primary text-sm">
                  {strat.price === 0 ? 'Get Free' : 'Subscribe'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
