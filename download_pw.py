import os
import time
import requests
from playwright.sync_api import sync_playwright
import urllib.parse

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

base_dir = r"c:\Users\user\Documents\AAAl5edma\Web\TopTop\perfume_images_accurate_playwright"
os.makedirs(base_dir, exist_ok=True)

def download_image(url, filepath):
    try:
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
        response = requests.get(url, timeout=15, headers=headers)
        if response.status_code == 200 and len(response.content) > 2000:
            with open(filepath, 'wb') as f:
                f.write(response.content)
            return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
    return False

def search_and_download():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        for perfume in perfumes:
            safe_name = perfume.replace(" ", "_").replace("'", "").replace("/", "")
            
            # skip if already exists
            import glob
            if glob.glob(os.path.join(base_dir, f"{safe_name}.*")):
                print(f"Already downloaded {perfume}")
                continue

            print(f"Searching for {perfume}...")
            
            query = f"{perfume} perfume bottle official"
            url = f"https://duckduckgo.com/?q={urllib.parse.quote_plus(query)}&iax=images&ia=images"
            
            try:
                page.goto(url, wait_until="networkidle")
                
                # Wait for the first image tile to appear
                page.wait_for_selector(".tile--img__img", timeout=10000)
                
                # Get the source of the first image. DuckDuckGo actually stores the original url in the tile
                # if we extract it. But clicking it is safer.
                page.locator(".tile--img__img").first.click()
                
                # Wait for the high res image panel to open
                page.wait_for_selector(".detail__media__img-highres", timeout=10000)
                
                # Get the src
                img_url = page.locator(".detail__media__img-highres").get_attribute("src")
                if not img_url or img_url.startswith("data:"):
                    img_url = page.locator(".detail__media__img-highres").get_attribute("data-src")
                
                if img_url:
                    if img_url.startswith("//"):
                        img_url = "https:" + img_url
                        
                    print(f"Found URL for {perfume}: {img_url}")
                    
                    ext = img_url.split('.')[-1].split('?')[0]
                    if ext.lower() not in ['jpg', 'jpeg', 'png', 'webp']:
                        ext = 'jpg'
                    
                    filepath = os.path.join(base_dir, f"{safe_name}.{ext}")
                    if download_image(img_url, filepath):
                        print(f"Downloaded: {filepath}")
                    else:
                        print(f"Failed to download image file for {perfume}")
                else:
                    print(f"No valid image URL found for {perfume}")
                    
            except Exception as e:
                print(f"Search failed for {perfume}: {e}")
                
            time.sleep(1) # Be nice to DuckDuckGo
            
        browser.close()

if __name__ == '__main__':
    search_and_download()
