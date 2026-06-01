import os
import glob
import time
import shutil
from icrawler.builtin import BingImageCrawler

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

base_dir = r"c:\Users\user\Documents\AAAl5edma\Web\TopTop\perfume_images_accurate_bing_fixed"
temp_dir = os.path.join(base_dir, "temp")
os.makedirs(base_dir, exist_ok=True)

def search_and_download():
    for perfume in perfumes:
        print(f"Searching and downloading for {perfume}...", flush=True)
        
        safe_name = perfume.replace(" ", "_").replace("'", "").replace("/", "")
        existing = glob.glob(os.path.join(base_dir, f"{safe_name}.*"))
        if existing:
            print(f"Already downloaded {perfume}", flush=True)
            continue

        os.makedirs(temp_dir, exist_ok=True)
        # Clear temp dir before downloading
        for f in glob.glob(os.path.join(temp_dir, "*")):
            os.remove(f)

        try:
            bing_crawler = BingImageCrawler(
                feeder_threads=1,
                parser_threads=1,
                downloader_threads=1,
                storage={'root_dir': temp_dir}
            )
            filters = dict(
                size='large',
                type='photo'
            )
            # Add "perfume bottle official" to guarantee accurate result
            bing_crawler.crawl(
                keyword=f"{perfume} perfume bottle official",
                filters=filters,
                max_num=1
            )
            
            # Find the downloaded file (should be 000001.jpg or similar)
            downloaded_files = glob.glob(os.path.join(temp_dir, "*"))
            if downloaded_files:
                original_file = downloaded_files[0]
                ext = original_file.split('.')[-1]
                new_file = os.path.join(base_dir, f"{safe_name}.{ext}")
                shutil.move(original_file, new_file)
                print(f"Successfully downloaded {perfume} to {new_file}", flush=True)
            else:
                print(f"Failed to find downloaded file for {perfume}", flush=True)
                
        except Exception as e:
            print(f"Exception downloading {perfume}: {e}", flush=True)
            
        time.sleep(2)

    # Clean up temp dir
    if os.path.exists(temp_dir):
        shutil.rmtree(temp_dir)

if __name__ == '__main__':
    search_and_download()
