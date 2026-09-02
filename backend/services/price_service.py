import json
from pathlib import Path

def load_market_data():
    project_root = Path(__file__).resolve().parent.parent.parent
    data_file = project_root / 'data' / 'apmc_market_prices.json'
    if data_file.exists():
        with open(data_file, 'r') as f:
            return json.load(f)
    return {
        "last_updated": "2026-08-25T00:00:00Z",
        "source": "AGMARKNET APMC Feed",
        "markets": []
    }

def calculate_price_estimate(quality_score, grade_a_pct, market_id="lasalgaon"):
    data = load_market_data()
    markets = data.get("markets", [])
    
    selected_market = next((m for m in markets if m["id"] == market_id), None)
    if not selected_market and markets:
        selected_market = markets[0]
        
    if not selected_market:
        selected_market = {
            "name": "Lasalgaon APMC",
            "grade_a_price": 2700,
            "grade_b_price": 2350,
            "urs_price": 1700,
            "modal_price": 2550
        }
        
    g_a = selected_market.get("grade_a_price", 2700)
    g_b = selected_market.get("grade_b_price", 2350)
    urs = selected_market.get("urs_price", 1700)

    # Weighted calculation
    if quality_score >= 85:
        min_est = g_a - 100
        max_est = g_a + 50
        recommendation_badge = "🟢 Good Quality — High Export Value"
    elif quality_score >= 65:
        min_est = g_b - 100
        max_est = g_b + 100
        recommendation_badge = "🟡 Average Quality — Standard Mandi Rate"
    else:
        min_est = urs - 150
        max_est = urs + 100
        recommendation_badge = "🔴 Low Quality — Re-sorting Recommended"

    return {
        "estimated_min": min_est,
        "estimated_max": max_est,
        "grade_a_range": f"₹{g_a-50} – ₹{g_a+50}/quintal",
        "grade_b_range": f"₹{g_b-50} – ₹{g_b+50}/quintal",
        "urs_range": f"₹{urs-50} – ₹{urs+50}/quintal",
        "market_name": selected_market.get("name"),
        "quality_badge": recommendation_badge,
        "data_source": data.get("source", "AGMARKNET Feed"),
        "last_updated": data.get("last_updated")
    }

def get_best_selling_recommendation(quality_score, market_id="lasalgaon"):
    data = load_market_data()
    markets = data.get("markets", [])
    selected_market = next((m for m in markets if m["id"] == market_id), markets[0] if markets else {})
    trend = selected_market.get("trend", "rising")

    if trend == "rising" and quality_score >= 75:
        recommendation = "🟢 SELL NOW"
        explanation = "Prices are currently high and seasonal demand is strong in Lasalgaon and Nashik mandis."
    elif trend == "stable":
        recommendation = "🟡 WAIT 1–2 WEEKS"
        explanation = "Prices are steady. Waiting 1-2 weeks may yield higher returns as festive demand surges."
    else:
        recommendation = "🔴 CONSIDER SELLING SOON"
        explanation = "Market arrivals are increasing rapidly. Selling soon avoids potential price drops."

    return {
        "recommendation": recommendation,
        "explanation": explanation,
        "disclaimer": "Market prices can change due to weather, arrivals, demand, government policies and other factors."
    }
