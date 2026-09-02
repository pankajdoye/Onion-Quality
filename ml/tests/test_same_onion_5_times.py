from pathlib import Path
import sys

BASE_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.append(str(BASE_DIR))

from ml.inference.predict import OnionAIEngine

def test_same_onion_5_times():
    engine = OnionAIEngine()
    base = BASE_DIR / "Onion Leaves and Bulb Dataset" / "New Onion - Copy" / "2. Bulb"

    print("=== TESTING SAME ONION PHOTOGRAPHED 5 TIMES ===")
    
    # Red Single Onion sequence
    red_images = [base / "1. Healthy" / "1. Red Onion" / "1. Single" / f"Onion0404{i}.jpg" for i in range(1, 6)]
    red_success = 0
    print("\n--- Red Single Onion (5 Repeated Shots) ---")
    for p in red_images:
        res = engine.predict(str(p))
        is_onion = res.get("is_onion", False)
        if is_onion:
            red_success += 1
        print(f"Shot {p.name}: Detected={is_onion} | Score={res.get('quality_score')} | Grade={res.get('grade_a')}% A | Conf={res.get('onion_confidence')}")

    # White Single Onion sequence
    white_images = [base / "1. Healthy" / "2. White Onion" / "1. Single" / f"Onion0815{i}.jpg" for i in range(1, 6)]
    white_success = 0
    print("\n--- White Single Onion (5 Repeated Shots) ---")
    for p in white_images:
        res = engine.predict(str(p))
        is_onion = res.get("is_onion", False)
        if is_onion:
            white_success += 1
        print(f"Shot {p.name}: Detected={is_onion} | Score={res.get('quality_score')} | Grade={res.get('grade_a')}% A | Conf={res.get('onion_confidence')}")

    print(f"\nResults: Red Single: {red_success}/5 passed | White Single: {white_success}/5 passed")
    assert red_success == 5, f"Red single onion failed: {red_success}/5"
    assert white_success == 5, f"White single onion failed: {white_success}/5"
    print("ALL 5 REPEATED SHOTS DETECTED SUCCESSFULLY!")

if __name__ == "__main__":
    test_same_onion_5_times()
