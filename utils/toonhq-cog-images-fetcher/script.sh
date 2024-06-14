#!/bin/bash

base_url="https://toonhq.org/static/assets/cogs/"

if command -v curl &>/dev/null; then
  download_tool="curl"
else
  echo "Error: curl is not found."
  exit 1
fi

cog_names=("flunky" "bottom_feeder" "short_change" "cold_caller" "pencil_pusher" "bloodsucker" "penny_pincher" "telemarketer" "yes_man" "double_talker" "tightwad" "name_dropper" "micromanager" "ambulance_chaser" "bean_counter" "glad_hander" "downsizer" "backstabber" "number_cruncher" "mover_and_shaker" "head_hunter" "spin_doctor" "money_bags" "two_face" "corporate_raider" "legal_eagle" "loan_shark" "the_mingler" "the_big_cheese" "big_wig" "robber_baron" "mr_hollywood")

if test -d ../../src/assets/cogs; then
  echo "Directory exists - Not creating the cogs directory under assets"
else
  mkdir ../../src/assets/cogs
fi

for cog_name in "${cog_names[@]}"; do

  full_url="$base_url$cog_name.png"

  echo "URL: $full_url"

  $download_tool -o ${cog_name//_}.png "$full_url" --output-dir ../../src/assets/cogs

  if [[ $? -eq 0 ]]; then
    echo "Downloaded: $cog_name"
  else
    echo "Error downloading: $cog_name"
  fi

  echo ""
done

echo "Download complete."
