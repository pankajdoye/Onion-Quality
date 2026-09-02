from ml.pipeline_bridge import run_two_stage_inference

def process_image_analysis(image_input=None, preset_type=None):
    """
    Executes Two-Stage AI Pipeline:
    Stage 1: Image Quality Assessment & Onion Verification Gate
    Stage 2: Multi-Bulb Detection & Quality Analysis (Runs ONLY if Stage 1 passes)
    """
    return run_two_stage_inference(image_input, preset_type=preset_type)
