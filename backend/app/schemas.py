"""API Schemas (Pydantic models)"""
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


# Auth Schemas
class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str
    full_name: Optional[str] = None


class UserLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenRefresh(BaseModel):
    refresh_token: str


class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    full_name: Optional[str]
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


# Strategy Schemas
class ConditionCreate(BaseModel):
    indicator: str
    operator: str
    value: str
    connector: str = "AND"


class LegCreate(BaseModel):
    action: str  # BUY, SELL
    instrument: str
    quantity: float
    conditions: List[ConditionCreate] = []


class ExitRuleCreate(BaseModel):
    rule_type: str  # stop_loss, take_profit, trailing_stop
    value: float


class StrategyCreate(BaseModel):
    name: str
    description: Optional[str] = None
    strategy_type: str
    legs: List[LegCreate] = []
    exit_rules: List[ExitRuleCreate] = []


class StrategyResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    strategy_type: str
    config: dict
    status: str
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class StrategyUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    config: Optional[dict] = None
    status: Optional[str] = None


# Backtest Schemas
class BacktestCreate(BaseModel):
    strategy_id: int
    symbol: str
    timeframe: str
    start_date: datetime
    end_date: datetime
    initial_capital: float = 10000


class BacktestResponse(BaseModel):
    id: int
    strategy_id: int
    symbol: str
    timeframe: str
    total_return: float
    sharpe_ratio: float
    max_drawdown: float
    win_rate: float
    profit_factor: float
    total_trades: int
    created_at: datetime
    
    class Config:
        from_attributes = True


# Trade Schemas
class TradeCreate(BaseModel):
    symbol: str
    side: str  # BUY, SELL
    order_type: str = "market"
    quantity: float
    price: Optional[float] = None
    strategy_id: Optional[int] = None


class TradeResponse(BaseModel):
    id: int
    symbol: str
    side: str
    order_type: str
    quantity: float
    price: Optional[float]
    executed_price: Optional[float]
    status: str
    pnl: float
    exchange: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True


# API Key Schemas
class APIKeyCreate(BaseModel):
    exchange: str
    api_key: str
    api_secret: str


class APIKeyResponse(BaseModel):
    id: int
    exchange: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


# Dashboard Schemas
class DashboardStats(BaseModel):
    total_strategies: int
    active_strategies: int
    total_trades: int
    winning_trades: int
    total_pnl: float
    win_rate: float
