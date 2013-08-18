#!/bin/bash

# to ogg opus
# ffmpeg -i boom-original.ogg -to 00:00:0.600 -y -acodec opus -ar 8k -ac 1 boom.ogg

ffmpeg -i boom-original.ogg -to 00:00:0.600 -y -ar 12k -ac 1 boom.mp3