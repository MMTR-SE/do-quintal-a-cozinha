#!/bin/bash

echo "Converting images to WebP format..."
echo "=================================="

# Store the project root directory
PROJECT_ROOT="/home/ubuntu/projects/do-quintal-a-cozinha"

# Convert story images
echo ""
echo "Converting story images..."
cd "$PROJECT_ROOT/public/images/stories/" || exit 1
count=0
for img in *.jpg *.jpeg *.png *.JPG *.JPEG *.PNG; do
  [ -f "$img" ] || continue
  filename="${img%.*}"
  if [ ! -f "${filename}.webp" ]; then
    cwebp -q 80 -m 4 "$img" -o "${filename}.webp"
    if [ $? -eq 0 ]; then
      original_size=$(du -h "$img" | cut -f1)
      webp_size=$(du -h "${filename}.webp" | cut -f1)
      echo "✓ Converted: $img ($original_size) → ${filename}.webp ($webp_size)"
      ((count++))
    else
      echo "✗ Failed: $img"
    fi
  else
    echo "⊘ Skipped: ${filename}.webp (already exists)"
  fi
done

# Convert recipe images
echo ""
echo "Converting recipe images..."
cd "$PROJECT_ROOT/public/receitas/" || exit 1
for img in *.jpg *.jpeg *.png *.JPG *.JPEG *.PNG; do
  [ -f "$img" ] || continue
  filename="${img%.*}"
  if [ ! -f "${filename}.webp" ]; then
    cwebp -q 80 -m 4 "$img" -o "${filename}.webp"
    if [ $? -eq 0 ]; then
      original_size=$(du -h "$img" | cut -f1)
      webp_size=$(du -h "${filename}.webp" | cut -f1)
      echo "✓ Converted: $img ($original_size) → ${filename}.webp ($webp_size)"
      ((count++))
    else
      echo "✗ Failed: $img"
    fi
  else
    echo "⊘ Skipped: ${filename}.webp (already exists)"
  fi
done

echo ""
echo "=================================="
echo "Conversion complete! $count images converted."
