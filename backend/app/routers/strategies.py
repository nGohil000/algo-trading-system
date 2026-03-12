"""Strategy Routes"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .database import get_db
from .models import Strategy, Backtest, User
from .auth import get_current_user
from .schemas import (
    StrategyCreate, StrategyResponse, StrategyUpdate,
    BacktestCreate, BacktestResponse
)

router = APIRouter(prefix="/api/strategies", tags=["Strategies"])


@router.get("/", response_model=List[StrategyResponse])
def get_strategies(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all strategies for current user"""
    strategies = db.query(Strategy).filter(
        Strategy.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    return strategies


@router.get("/{strategy_id}", response_model=StrategyResponse)
def get_strategy(
    strategy_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific strategy"""
    strategy = db.query(Strategy).filter(
        Strategy.id == strategy_id,
        Strategy.user_id == current_user.id
    ).first()
    
    if not strategy:
        raise HTTPException(status_code=404, detail="Strategy not found")
    
    return strategy


@router.post("/", response_model=StrategyResponse)
def create_strategy(
    strategy_data: StrategyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new strategy"""
    strategy = Strategy(
        name=strategy_data.name,
        description=strategy_data.description,
        strategy_type=strategy_data.strategy_type,
        config={
            "legs": [leg.model_dump() for leg in strategy_data.legs],
            "exit_rules": [rule.model_dump() for rule in strategy_data.exit_rules]
        },
        user_id=current_user.id,
        status="draft"
    )
    db.add(strategy)
    db.commit()
    db.refresh(strategy)
    return strategy


@router.put("/{strategy_id}", response_model=StrategyResponse)
def update_strategy(
    strategy_id: int,
    strategy_data: StrategyUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a strategy"""
    strategy = db.query(Strategy).filter(
        Strategy.id == strategy_id,
        Strategy.user_id == current_user.id
    ).first()
    
    if not strategy:
        raise HTTPException(status_code=404, detail="Strategy not found")
    
    if strategy_data.name is not None:
        strategy.name = strategy_data.name
    if strategy_data.description is not None:
        strategy.description = strategy_data.description
    if strategy_data.config is not None:
        strategy.config = strategy_data.config
    if strategy_data.status is not None:
        strategy.status = strategy_data.status
    
    db.commit()
    db.refresh(strategy)
    return strategy


@router.delete("/{strategy_id}")
def delete_strategy(
    strategy_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a strategy"""
    strategy = db.query(Strategy).filter(
        Strategy.id == strategy_id,
        Strategy.user_id == current_user.id
    ).first()
    
    if not strategy:
        raise HTTPException(status_code=404, detail="Strategy not found")
    
    db.delete(strategy)
    db.commit()
    return {"message": "Strategy deleted"}


@router.post("/{strategy_id}/backtest", response_model=BacktestResponse)
def run_backtest(
    strategy_id: int,
    backtest_data: BacktestCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Run backtest for a strategy"""
    # Verify strategy belongs to user
    strategy = db.query(Strategy).filter(
        Strategy.id == strategy_id,
        Strategy.user_id == current_user.id
    ).first()
    
    if not strategy:
        raise HTTPException(status_code=404, detail="Strategy not found")
    
    # Create backtest record
    # In production, this would run actual backtesting
    backtest = Backtest(
        strategy_id=strategy_id,
        symbol=backtest_data.symbol,
        timeframe=backtest_data.timeframe,
        start_date=backtest_data.start_date,
        end_date=backtest_data.end_date,
        initial_capital=backtest_data.initial_capital,
        # Mock results
        total_return=0.0,
        sharpe_ratio=0.0,
        max_drawdown=0.0,
        win_rate=0.0,
        profit_factor=0.0,
        total_trades=0
    )
    db.add(backtest)
    db.commit()
    db.refresh(backtest)
    return backtest


@router.get("/{strategy_id}/backtests", response_model=List[BacktestResponse])
def get_backtests(
    strategy_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get backtests for a strategy"""
    # Verify strategy belongs to user
    strategy = db.query(Strategy).filter(
        Strategy.id == strategy_id,
        Strategy.user_id == current_user.id
    ).first()
    
    if not strategy:
        raise HTTPException(status_code=404, detail="Strategy not found")
    
    backtests = db.query(Backtest).filter(
        Backtest.strategy_id == strategy_id
    ).all()
    return backtests
