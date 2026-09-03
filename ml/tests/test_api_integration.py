import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(BASE_DIR))

from fastapi.testclient import TestClient
from backend.main import app
from backend.database import init_db

def run_integration_tests():
    init_db()
    client = TestClient(app)

    print("=== 1. Health check ===")
    r = client.get('/')
    print("GET /:", r.status_code, r.json().get('status'))

    print("\n=== 2. Market prices check ===")
    r = client.get('/api/market-prices?market_id=sangli')
    print("GET /api/market-prices?market_id=sangli:", r.status_code, r.json())

    base = Path('Onion Leaves and Bulb Dataset/New Onion - Copy/2. Bulb')
    p_single = base / '1. Healthy' / '1. Red Onion' / '1. Single' / 'Onion04041.jpg'
    p_multi = base / '1. Healthy' / '1. Red Onion' / '2. Multiple' / 'Onion07041.jpg'
    p_non = Path('ml/datasets/test/validator/non_onion/1758873619153_jpg.rf.1a56b6414cf96ad2a5b62bd5bb277024.jpg')

    print("\n=== 3. Stage 1 verify-image with Single Onion ===")
    with open(p_single, 'rb') as f:
        r = client.post('/api/verify-image', files={'file': ('single.jpg', f, 'image/jpeg')})
    print("Verify single onion:", r.status_code, r.json())

    print("\n=== 4. Stage 1 verify-image with Non-Onion ===")
    with open(p_non, 'rb') as f:
        r = client.post('/api/verify-image', files={'file': ('non.jpg', f, 'image/jpeg')})
    print("Verify non-onion:", r.status_code, r.json())

    print("\n=== 5. Analyze Single Onion ===")
    with open(p_single, 'rb') as f:
        r = client.post('/api/analyze', files={'file': ('single.jpg', f, 'image/jpeg')})
    res = r.json()
    print("Analyze single:", r.status_code, "Status:", res.get('status'), "Bulbs:", res.get('detected_onions_count'), "Grade A:", res.get('grade_a'), "Quality:", res.get('overall_quality'))

    print("\n=== 6. Analyze Multi Onion ===")
    with open(p_multi, 'rb') as f:
        r = client.post('/api/analyze', files={'file': ('multi.jpg', f, 'image/jpeg')})
    res = r.json()
    print("Analyze multi:", r.status_code, "Status:", res.get('status'), "Bulbs:", res.get('detected_onions_count'), "Grade A:", res.get('grade_a'), "URS:", res.get('urs'), "Quality:", res.get('overall_quality'))
    print("Individual bulbs detected:", len(res.get('individual_onions', [])))
    for b in res.get('individual_onions', []):
        print(f"  Onion #{b['onion_id']}: {b['assigned_grade']} ({b['grade']}), {b['diameter_mm']}mm, conf={b['confidence']}, defects={b['defects']}")

    print("\n=== 7. Analyze Non-Onion Rejection ===")
    with open(p_non, 'rb') as f:
        r = client.post('/api/analyze', files={'file': ('non.jpg', f, 'image/jpeg')})
    res = r.json()
    print("Analyze non-onion:", r.status_code, "Status:", res.get('status'), "is_onion:", res.get('is_onion'), "Message:", res.get('message'))

    print("\n=== 8. History API ===")
    r = client.get('/api/history')
    h_res = r.json()
    print("History count:", h_res.get('count'))
    if h_res.get('records'):
        latest = h_res['records'][0]
        print(f"Latest record: ID={latest.get('id')}, Bulbs={latest.get('total_onions')}, Quality={latest.get('overall_quality')}, Grade A={latest.get('grade_a')}%, Price={latest.get('estimated_price')}")

if __name__ == '__main__':
    run_integration_tests()
