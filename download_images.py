import os
import requests
from duckduckgo_search import DDGS
import time

fragrances = {
    "prada_paradoxe": "Prada Paradoxe perfume bottle high resolution",
    "armani_my_way": "Giorgio Armani My Way perfume bottle high resolution",
    "mancera_coco_vanille": "Mancera Coco Vanille perfume bottle high resolution",
    "armani_stronger_intensely": "Emporio Armani Stronger With You Intensely perfume bottle high resolution",
    "jpg_ultra_male": "Jean Paul Gaultier Ultra Male perfume bottle high resolution",
    "dior_sauvage": "Dior Sauvage eau de toilette bottle high resolution",
    "lacoste_blanc": "Lacoste L.12.12 Blanc White perfume bottle high resolution"
}

output_dir = r"c:\Users\user\Documents\AAAl5edma\Web\TopTop\public\images"
os.makedirs(output_dir, exist_ok=True)

ddgs = DDGS()

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
}

for name, query in fragrances.items():
    print(f"Searching images for {name}...")
    try:
        results = ddgs.images(
            keywords=query,
            region="wt-wt",
            safesearch="off",
            size="Wallpaper",
            color=None,
            type_image="photo",
            layout=None,
            license_image=None,
            max_results=10
        )
        
        downloaded = 0
        for i, res in enumerate(results):
            if downloaded >= 2:
                break
            image_url = res.get("image")
            if not image_url:
                continue
            
            try:
                print(f"Downloading {image_url}")
                response = requests.get(image_url, headers=headers, timeout=5)
                if response.status_code == 200:
                    ext = "jpg"
                    # We named them .jpg in the products.ts
                    filename = f"{name}_{downloaded + 1}.{ext}"
                    filepath = os.path.join(output_dir, filename)
                    with open(filepath, "wb") as f:
                        f.write(response.content)
                    print(f"Saved to {filepath}")
                    downloaded += 1
                else:
                    print(f"Failed to download {image_url} with status code {response.status_code}")
            except Exception as e:
                print(f"Error downloading {image_url}: {e}")
            time.sleep(1)
            
        if downloaded < 2:
            print(f"Warning: Only downloaded {downloaded} images for {name}")
    except Exception as e:
        print(f"Error searching for {name}: {e}")
