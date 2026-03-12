import { Outlet, NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Wand2, 
  FlaskConical, 
  TrendingUp, 
  Rocket, 
  Store,
  Settings,
  Zap
} from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/strategies', icon: Zap, label: 'Strategies' },
  { to: '/builder', icon: Wand2, label: 'Strategy Builder' },
  { to: '/backtest', icon: FlaskConical, label: 'Backtest' },
  { to: '/paper-trading', icon: TrendingUp, label: 'Paper Trading' },
  { to: '/live-trading', icon: Rocket, label: 'Live Trading' },
  { to: '/marketplace', icon: Store, label: 'Marketplace' },
]

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 p-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">TradeBot</h1>
            <p className="text-xs text-slate-400">Algo Trading Platform</p>
          </div>
        </div>
        
        <nav className="space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <button className="flex items-center gap-3 px-3 py-2 w-full text-slate-400 hover:bg-slate-700 rounded-lg">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
