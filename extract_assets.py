import os
from PIL import Image
import numpy as np
from scipy.ndimage import label, binary_dilation

def extract_from_black_background(input_path, output_path, bg_threshold=22, edge_feather=16):
    print(f"Processing {input_path}...")
    img = Image.open(input_path).convert('RGB')
    w, h = img.size
    arr = np.array(img, dtype=np.float32)

    # Brightness metric
    max_c = np.max(arr, axis=2)

    # Mask of dark pixels connected to boundary
    is_dark = max_c < (bg_threshold + edge_feather)

    # Label connected components
    labeled, num_features = label(is_dark)

    # Identify background components touching any image border
    border_pixels = np.concatenate([
        labeled[0, :], labeled[-1, :],
        labeled[:, 0], labeled[:, -1]
    ])
    border_labels = set(border_pixels)
    border_labels.discard(0)

    # Create background mask
    bg_mask = np.isin(labeled, list(border_labels))

    # Calculate smooth alpha
    alpha = np.ones((h, w), dtype=np.float32) * 255.0
    
    # Smooth transition on border region
    edge_ratio = np.clip((max_c - bg_threshold) / max(1.0, float(edge_feather)), 0.0, 1.0)
    # Apply soft curve
    edge_ratio = edge_ratio * edge_ratio * (3.0 - 2.0 * edge_ratio)
    
    alpha[bg_mask] = edge_ratio[bg_mask] * 255.0

    # Build RGBA
    rgba = np.dstack([arr, alpha]).astype(np.uint8)
    out_img = Image.fromarray(rgba, 'RGBA')
    
    # Auto-crop bounding box where alpha > 10 to trim empty border padding
    bbox = out_img.getbbox()
    if bbox:
        # Give small 6px margin
        margin = 6
        crop_box = (
            max(0, bbox[0] - margin),
            max(0, bbox[1] - margin),
            min(w, bbox[2] + margin),
            min(h, bbox[3] + margin)
        )
        out_img = out_img.crop(crop_box)

    out_img.save(output_path, 'PNG', optimize=True)
    print(f"Saved: {output_path} (new size: {out_img.size})")

artifacts_dir = r"C:\Users\LENOVO\.gemini\antigravity-ide\brain\2db3aade-7a8b-4465-b027-3790c90b16ad"
assets_dir = r"c:\Users\LENOVO\Downloads\Project\trung-thu\assets\images"

tasks = [
    (
        os.path.join(artifacts_dir, "rabbit_branch_iso_1790095790849.jpg"),
        os.path.join(assets_dir, "rabbit_branch_transparent.png"),
        24, 18
    ),
    (
        os.path.join(artifacts_dir, "screen_sky_lantern_1790095841353.jpg"),
        os.path.join(assets_dir, "sky_lantern_screen_transparent.png"),
        20, 16
    ),
    (
        os.path.join(artifacts_dir, "real_star_lantern_1790094472794.jpg"),
        os.path.join(assets_dir, "star_lantern_transparent.png"),
        22, 16
    ),
    (
        os.path.join(artifacts_dir, "real_lotus_lantern_1790094493714.jpg"),
        os.path.join(assets_dir, "lotus_lantern_transparent.png"),
        20, 16
    ),
    (
        os.path.join(artifacts_dir, "real_carp_lantern_1790094512077.jpg"),
        os.path.join(assets_dir, "carp_lantern_transparent.png"),
        22, 16
    )
]

for src, dst, thresh, feather in tasks:
    if os.path.exists(src):
        extract_from_black_background(src, dst, thresh, feather)
    else:
        print(f"Source not found: {src}")

print("All extractions completed!")
