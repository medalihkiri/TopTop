import os
import requests
from duckduckgo_search import DDGS
import time

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

# Fixed a few typos in names: 
# "Dior homme intese" -> "Dior homme intense"
# "Azzar the most wanted" -> "Azzaro the most wanted"
# "213 vip" -> "212 vip"
# "Blue de chanel" -> "Bleu de chanel"
# "Armani code" (duplicate removed)
# "Vert malachette" -> "Vert malachite"
# "Rouge" -> "Baccarat Rouge 540" (assumed)
# "Prada paradox" -> "Prada paradoxe"
# "J'adore diore" -> "J'adore dior"
# "Musk romen" -> "Musk roman"

os.makedirs("perfume_images", exist_ok=True)

def download_image(url, filepath):
    try:
        response = requests.get(url, timeout=10, headers={"User-Agent": "Mozilla/5.0"})
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                f.write(response.content)
            return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
    return False

def search_and_download():
    ddgs = DDGS()
    for perfume in perfumes:
        print(f"Searching for {perfume}...")
        try:
            # search for images
            results = ddgs.images(
                f"{perfume} perfume high quality bottle",
                max_results=3,
            )
            downloaded = False
            for result in results:
                image_url = result.get('image')
                if not image_url:
                    continue
                ext = image_url.split('.')[-1].split('?')[0]
                if ext.lower() not in ['jpg', 'jpeg', 'png', 'webp']:
                    ext = 'jpg'
                
                safe_name = perfume.replace(" ", "_").replace("'", "").replace("/", "")
                filepath = os.path.join("perfume_images", f"{safe_name}.{ext}")
                
                if download_image(image_url, filepath):
                    print(f"Downloaded: {filepath}")
                    downloaded = True
                    break
            
            if not downloaded:
                print(f"Failed to download image for {perfume}")
        except Exception as e:
            print(f"Search failed for {perfume}: {e}")
            
        time.sleep(1) # Be nice to the API

if __name__ == '__main__':
    search_and_download()
