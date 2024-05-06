import shutil
from filecmp import cmp

source_file_1 = './extension/scripts/FetchYoutubeData.js'
target_file_1 = './client/src/scripts/FetchYoutubeData.js'

source_file_2 = './extension/scripts/YoutubeValidator.js'
target_file_2 = './client/src/scripts/YoutubeValidator.js'

# Function to sync files
def sync_files(source, target):
    if not cmp(source, target, shallow=False):
        shutil.copy2(source, target)
        print(f"Synced {source} to {target}")

# Sync one way: COPY SOURCE_FILE -> PASTE INTO TARGET_FILE
sync_files(source_file_1, target_file_1)
sync_files(source_file_2, target_file_2)

