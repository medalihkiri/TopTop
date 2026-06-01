import os
import requests
import time
from bs4 import BeautifulSoup
import urllib.parse
import json

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

base_dir = r"c:\Users\user\Documents\AAAl5edma\Web\TopTop\perfume_images_new"
os.makedirs(base_dir, exist_ok=True)

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}

def download_image(url, filepath):
    try:
        response = requests.get(url, timeout=10, headers=headers)
        if response.status_code == 200 and len(response.content) > 1000: # ensure it's not a tiny error file
            with open(filepath, 'wb') as f:
                f.write(response.content)
            return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
    return False

def search_and_download():
    for perfume in perfumes:
        print(f"Searching for {perfume}...")
        query = urllib.parse.quote_plus(f"{perfume} perfume high quality bottle")
        url = f"https://www.bing.com/images/search?q={query}&form=HDRSC3"
        try:
            res = requests.get(url, headers=headers, timeout=10)
            soup = BeautifulSoup(res.text, "html.parser")
            
            # Bing image results have a class 'mimg' or are inside 'iusc' elements containing json
            a_tags = soup.find_all("a", class_="iusc")
            
            downloaded = False
            for a in a_tags:
                m = a.get("m")
                if m:
                    try:
                        m_json = json.loads(m)
                        image_url = m_json.get("murl")
                        if not image_url:
                            continue
                        
                        ext = image_url.split('.')[-1].split('?')[0]
                        if ext.lower() not in ['jpg', 'jpeg', 'png', 'webp']:
                            ext = 'jpg'
                        
                        safe_name = perfume.replace(" ", "_").replace("'", "").replace("/", "")
                        filepath = os.path.join(base_dir, f"{safe_name}.{ext}")
                        
                        if download_image(image_url, filepath):
                            print(f"Downloaded: {filepath}")
                            downloaded = True
                            break
                    except Exception as json_e:
                        continue
            
            if not downloaded:
                print(f"Failed to download image for {perfume}")
                
        except Exception as e:
            print(f"Search failed for {perfume}: {e}")
            
        time.sleep(2) # Be nice to Bing

if __name__ == '__main__':
    search_and_download()
