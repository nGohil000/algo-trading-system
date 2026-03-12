"""Trading Routes"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from .database import get_db
from .models import Trade, Strategy, User
from .auth import get_current_user
from .schemas import TradeCreate, TradeResponse

router = APIRouter(prefix="/api/trades", tags=["Trading"])


@router.get("/", response_model=List[TradeResponse])
def get_trades(
    skip: int = 0,
    limit: int = 100,
    status: str = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get user's trades"""
    query = db.query(Trade).filter(Trade.user_id == current_user.id)
    
    if status:
        query = query.filter(Trade.status == status)
    
    trades = query.order_by(Trade.created_at.desc()).offset(skip).limit(limit).all()
    return trades


@router.get("/{trade_id}", response_model=TradeResponse)
def get_trade(
    trade_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific trade"""
    trade = db.query(Trade).filter(
        Trade.id == trade_id,
        Trade.user_id == current_user.id
    ).first()
    
    if not trade:
        raise HTTPException(status_code=404, detail="Trade not found")
    
    return trade


@router.post("/", response_model=TradeResponse)
def create_trade(
    trade_data: TradeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Execute a trade (paper trading for now)"""
    # Verify strategy if provided
    if trade_data.strategy_id:
        strategy = db.query(Strategy).filter(
            Strategy.id == trade_data.strategy_id,
            Strategy.user_id == current_user.id
        ).first()
        
        if not strategy:
            raise HTTPException(status_code=404, detail="Strategy not found")
    
    # Create trade (paper trading - simulate execution)
    executed_price = trade_data.price or 1000  # Mock price
    
    trade = Trade(
        user_id=current_user.id,
        strategy_id=trade_data.strategy_id,
        symbol=trade_data.symbol,
        side=trade_data.side,
        order_type=trade_data.order_type,
        quantity=trade_data.quantity,
        price=trade_data.price,
        executed_price=executed_price,
        status="filled",  # Simulated immediate fill
        pnl=0,  # Will be calculated on close
        exchange="paper"
    )
    db.add(trade)
    db.commit()
    db.refresh(trade)
    return trade


@router.delete("/{trade_id}")
def cancel_trade(
    trade_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Cancel a pending trade"""
    trade = db.query(Trade).filter(
        Trade.id == trade_id,
        Trade.user_id == current_user.id
    ).first()
    
    if not trade:
        raise HTTPException(status_code=404, detail="Trade not found")
    
    if trade.status != "pending":
        raise HTTPException(status_code=400, detail="Can only cancel pending trades")
    
    trade.status = "cancelled"
    db.commit()
    return {"message": "Trade cancelled"}


@router.get("/stats/summary")
def get_trade_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get trading summary statistics"""
    trades = db.query(Trade).filter(
        Trade.user_id == current_user.id,
        Trade.status == "filled"
    ).all()
    
    total_trades = len(trades)
    winning_trades = len([t for t in trades if t.pnl > 0])
    total_pnl = sum(t.pnl for t in trades)
    win_rate = winning_trades / total_trades if total_trades > 0 else 0
    
    return {
        "total_trades": total_trades,
        "winning_trades": winning_trades,
        "losing_trades": total_trades - winning_trades,
        "total_pnl": total_pnl,
        "win_rate": win_rate
    }
