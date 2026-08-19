#!/usr/bin/env bash
# Télécharge les médias générés (Higgsfield CDN) dans sites/assets/.
# À lancer UNE FOIS depuis ta machine avant de déployer :  bash fetch-assets.sh
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p assets

CDN="https://d8j0ntlcm91z4.cloudfront.net/user_3EySMZUzUbGakFLyLPoFHW1KflJ"

fetch() { # $1 = fichier, $2 = URL
  if [ -s "assets/$1" ]; then echo "✓ assets/$1 (déjà présent)"; return; fi
  echo "↓ assets/$1"
  curl -fsSL -A "Mozilla/5.0" -o "assets/$1" "$2" && echo "✓ assets/$1" || echo "✗ assets/$1 — URL morte ? (les pages restent fonctionnelles sans)"
}

fetch hero-poster.jpg "$CDN/hf_20260819_113551_b3eafc6c-8b27-4ac9-a776-b2913eff0b3a.png"  # skyline Brickell GPT 4K (plage : …f7771cb6 ; nuit : …27a02d80)
fetch hero-loop.mp4   "$CDN/hf_20260819_114920_35ada738-b3cc-44d6-bd24-3957a61fb8e7.mp4"  # boucle skyline Brickell 1080p (plage : hf_20260819_060449_e11ff1f9… ; nuit : hf_20260818_132603_c4caf601…)
fetch lifestyle.jpg   "$CDN/hf_20260817_220311_fd69c5f4-60c1-40c8-90d6-418cdd3974ad.png"
fetch penthouse.jpg   "$CDN/hf_20260817_223449_d654d1f5-8e17-4ce7-8b17-7fb452427906.png"
fetch pool.jpg        "$CDN/hf_20260817_223449_e29d0072-4f99-4449-81ec-d976d8370995.png"
fetch deco.jpg        "$CDN/hf_20260817_223449_11b19f91-5794-459e-aa07-bf89b8a23b72.png"
fetch skyline.jpg     "$CDN/hf_20260817_223449_38ce7dd0-8190-411c-9c11-0835009e1677.png"

# Portraits unifiés (fond studio ivoire, buste, même lumière) — versions retenues par David
fetch agent-fr.jpg "$CDN/hf_20260819_072634_ff11cf70-bcf0-4b5b-9828-138e3d5173e7.png"  # Laurent Benzaquen (v. GPT 4K écartée : …3e3a23eb)
fetch agent-ma.jpg "$CDN/hf_20260819_074629_be0ee3cf-3ac2-4db6-b889-8dbac1166d43.png"  # (v. GPT 4K écartée : …a492af36)
fetch agent-il.jpg "$CDN/hf_20260819_072634_a5407b03-441c-484f-bcab-bbe4d3a3d5ad.png"  # (v. GPT 4K écartée : …5bc109f8)
fetch agent-ua.jpg "$CDN/hf_20260819_072634_81bd96c5-7527-4b18-a19a-6dc82907628b.png"  # (v. GPT 4K écartée : …6d4a0aa6)

echo "Terminé. Le site est prêt à déployer (racine du repo)."
