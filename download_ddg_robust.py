import os
import requests
from duckduckgo_search import DDGS
from duckduckgo_search.exceptions import RatelimitException, DuckDuckGoSearchException
import time
import glob

perfumes = [
    "Le male elixir", "Gucci oud", "One million elixir", "La nuit de l'homme", "Dior homme intense",
    "Lacoste bleu", "Azzaro the most wanted", "Oud vanilla", "212 vip", "Armani code",
    "Bleu de chanel", "Azzaro wanted extra", "Fahrenheit", "Tom ford soleil", "Tom ford black orchid",
    "La bomba", "Kayali vanilla", "Idole extra", "Escada miami", "Vert malachite",
    "Baccarat Rouge 540", "Gucci bloom", "Prada paradoxe", "Prada milano", "Good girl blanche",
    "Good girl extra", "Burberry her extra", "L'interdit rouge", "Miss dior", "Glamour",
    "Narciso amber", "Narciso poudree", "Coco vanille", "J'adore dior", "Diamant",
    "La nuit tresor fleur de nuit", "Tresor nude", "Libre intense extra", "Libre le parfum",
    "Musk roman", "Musk tout", "Mesk vanille", "Mesk tahara"
]

base_dir = r"c:\Users\user\Documents\AAAl5edma\Web\TopTop\perfume_images_final"
os.makedirs(base_dir, exist_ok=True)

def download_image(url, filepath):
    try:
        response = requests.get(url, timeout=10, headers={"User-Agent": "Mozilla/5.0"})
        if response.status_code == 200 and len(response.content) > 1000:
            with open(filepath, 'wb') as f:
                f.write(response.content)
            return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
    return False

def search_and_download():
    for perfume in perfumes:
        safe_name = perfume.replace(" ", "_").replace("'", "").replace("/", "")
        existing = glob.glob(os.path.join(base_dir, f"{safe_name}.*"))
        if existing:
            print(f"Already downloaded {perfume}")
            continue

        print(f"Searching for {perfume}...")
        
        downloaded = False
        retries = 0
        while not downloaded and retries < 3:
            try:
                with DDGS() as ddgs:
                    results = ddgs.images(
                        f"{perfume} perfume bottle official",
                        max_results=3,
                    )
                    for result in results:
                        image_url = result.get('image')
                        if not image_url:
                            continue
                        ext = image_url.split('.')[-1].split('?')[0]
                        if ext.lower() not in ['jpg', 'jpeg', 'png', 'webp']:
                            ext = 'jpg'
                        
                        filepath = os.path.join(base_dir, f"{safe_name}.{ext}")
                        
                        if download_image(image_url, filepath):
                            print(f"Downloaded: {filepath}")
                            downloaded = True
                            break
            except Exception as e:
                print(f"Search failed for {perfume} (attempt {retries+1}): {e}")
                time.sleep(10) # wait longer on failure
            
            retries += 1
            if not downloaded:
                time.sleep(5)
        
        if not downloaded:
            print(f"Failed to download image for {perfume}")
            
        time.sleep(3) # Be nice to the API

if __name__ == '__main__':
    search_and_download()
