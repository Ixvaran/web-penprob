#!/bin/bash

# Script untuk mengambil screenshot manual
# Cara menggunakan:
# 1. Buka terminal
# 2. Jalankan: chmod +x take-screenshots.sh
# 3. Jalankan: ./take-screenshots.sh
# 4. Ikuti instruksi di layar

echo "=========================================="
echo "  Screenshot Helper untuk README"
echo "=========================================="
echo ""
echo "Browser sudah terbuka di http://localhost:5173/"
echo ""
echo "Ambil screenshot untuk setiap bagian:"
echo ""
echo "1. Hero Section (halaman utama)"
echo "   - Scroll ke atas halaman"
echo "   - Tekan Cmd+Shift+4, lalu select area hero"
echo "   - Simpan sebagai: screenshots/hero.png"
echo ""
echo "2. Kalkulator Interaktif"
echo "   - Scroll ke bagian 'Contoh Soal'"
echo "   - Temukan kalkulator Z-Score"
echo "   - Tekan Cmd+Shift+4, lalu select area kalkulator"
echo "   - Simpan sebagai: screenshots/kalkulator.png"
echo ""
echo "3. Kurva Interaktif"
echo "   - Scroll ke bagian 'Pengertian' atau 'Rumus'"
echo "   - Temukan kurva normal dengan slider"
echo "   - Tekan Cmd+Shift+4, lalu select area kurva"
echo "   - Simpan sebagai: screenshots/kurva-interaktif.png"
echo ""
echo "4. Contoh Soal"
echo "   - Scroll ke bagian 'Contoh Soal'"
echo "   - Pilih salah satu contoh soal"
echo "   - Tekan Cmd+Shift+4, lalu select area soal"
echo "   - Simpan sebagai: screenshots/contoh-soal.png"
echo ""
echo "Setelah selesai, jalankan:"
echo "  cd distribusi-normal"
echo "  git add screenshots/ README.md"
echo "  git commit -m 'docs: tambahkan README dengan screenshot'"
echo "  git push origin main"
echo ""
