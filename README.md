# Billy Andreas — Portfolio (Next.js)

Redesign portofolio dengan tema **"developer console"** — terinspirasi dari tampilan VS Code: sidebar file explorer, tab bar, gutter nomor baris, dan status bar. Semua isi konten (Pendidikan, Keahlian, Project, Sertifikat, Contact) sama seperti website aslinya, hanya tampilannya yang didesain ulang.

## Cara menjalankan

```bash
npm install
npm run dev
```
## Build production

```bash
npm run build
npm run start
```

## Struktur

```
app/
  layout.tsx        -> font & metadata global
  page.tsx           -> merangkai semua section
  globals.css         -> token warna, gutter line-number, dsb
components/
  EditorChrome.tsx    -> sidebar + tab bar + status bar (client component)
  sections/
    Hero.tsx
    Pendidikan.tsx
    Keahlian.tsx
    Project.tsx
    Sertifikat.tsx
    Contact.tsx
lib/
  content.ts          -> semua data/isi (edit di sini kalau mau update konten)
```

## Mengubah konten

Semua teks, link, dan gambar ada di satu file: `lib/content.ts`. Tidak perlu sentuh komponen lain kalau cuma mau ganti teks atau link.

## Mengganti gambar dengan file lokal

Saat ini gambar masih mengarah ke GitHub Pages lama (`big-com18.github.io`). Supaya lebih cepat & tidak bergantung ke domain lama:

1. Unduh gambar-gambar tersebut, taruh di `public/images/`.
2. Ganti URL di `lib/content.ts` menjadi path lokal, contoh: `/images/foto-billy.jpg`.

## Palet & tipografi

- Warna: `ink` (latar gelap hangat), `amber` (aksen utama), `teal` (aksen sekunder), `rose` (aksen ketiga, dipakai tipis), `paper` (teks terang), `muted` (teks/garis redup).
- Font: `Space Grotesk` (judul), `Inter` (body), `JetBrains Mono` (label, tab, gutter, status bar).

Semua token warna & font diatur di `tailwind.config.js` dan `app/layout.tsx`.
