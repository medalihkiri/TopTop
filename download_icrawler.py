import os
import glob
from icrawler.builtin import GoogleImageCrawler

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

base_dir = r"c:\Users\user\Documents\AAAl5edma\Web\TopTop\perfume_images_accurate"
os.makedirs(base_dir, exist_ok=True)

class MyCrawler(GoogleImageCrawler):
    def __init__(self, perfume_name, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.perfume_name = perfume_name

    def set_file_path(self, task):
        ext = task['file_url'].split('.')[-1]
        if ext.lower() not in ['jpg', 'jpeg', 'png', 'webp']:
            ext = 'jpg'
        safe_name = self.perfume_name.replace(" ", "_").replace("'", "").replace("/", "")
        return f"{safe_name}.{ext}"

def search_and_download():
    for perfume in perfumes:
        print(f"Searching and downloading for {perfume}...")
        
        # Check if already downloaded
        safe_name = perfume.replace(" ", "_").replace("'", "").replace("/", "")
        existing = glob.glob(os.path.join(base_dir, f"{safe_name}.*"))
        if existing:
            print(f"Already downloaded {perfume}")
            continue

        try:
            google_crawler = MyCrawler(
                perfume_name=perfume,
                feeder_threads=1,
                parser_threads=1,
                downloader_threads=1,
                storage={'root_dir': base_dir}
            )
            # Use filters to get high quality photos
            filters = dict(
                size='large',
                type='photo'
            )
            google_crawler.crawl(
                keyword=f"{perfume} perfume bottle official",
                filters=filters,
                max_num=1
            )
        except Exception as e:
            print(f"Failed to download {perfume}: {e}")

if __name__ == '__main__':
    search_and_download()
