from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="TradeBot API",
    description="Algo Trading Platform API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "TradeBot API is running!", "version": "1.0.0"}

@app.get("/api/health")
def health():
    return {"status": "healthy"}

# Strategy endpoints
@app.get("/api/strategies")
def get_strategies():
    return {
        "strategies": [
            {"id": 1, "name": "EMA Crossover", "type": "Trend", "status": "running"},
            {"id": 2, "name": "RSI Momentum", "type": "Momentum", "status": "paused"},
        ]
    }

# Backtest endpoints
@app.post("/api/backtest")
def run_backtest(data: dict):
    return {
        "totalReturn": "+45.2%",
        "sharpeRatio": 1.85,
        "maxDrawdown": "-12.3%",
        "winRate": "68%",
        "profitFactor": 2.1,
        "totalTrades": 156
    }

# Paper trading endpoints
@app.get("/api/paper/positions")
def get_paper_positions():
    return {
        "balance": 125420,
        "positions": [
            {"symbol": "BTCUSDT", "side": "LONG", "qty": 0.5, "pnl": "+3.8%"}
        ]
    }

# Live trading endpoints
@app.get("/api/exchanges")
def get_exchanges():
    return {
        "exchanges": [
            {"name": "Binance", "status": "disconnected"},
            {"name": "Delta", "status": "disconnected"},
            {"name": "Shoonya", "status": "disconnected"},
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
