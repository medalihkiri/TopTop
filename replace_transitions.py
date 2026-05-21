import os
import glob

def replace_in_files(directory, old, new):
    for filepath in glob.glob(directory + '/**/*.tsx', recursive=True) + glob.glob(directory + '/**/*.ts', recursive=True):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            if old in content:
                content = content.replace(old, new)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated {filepath}")
        except Exception as e:
            print(f"Error on {filepath}: {e}")

replace_in_files('src', 'transition-all ', 'transition ')
replace_in_files('src', 'transition-all"', 'transition"')
