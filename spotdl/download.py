from spotdl import handle
from spotdl import const
from spotdl import downloader

import os
import sys

const.args = handle.get_arguments(to_group=True)

track = downloader.Downloader(raw_song=const.args.song[0])

track_title = track.refine_songname(track.content.title)
track_filename = track_title + const.args.output_ext
track_download_path = os.path.join(const.args.folder, track_filename)

track.download_single()