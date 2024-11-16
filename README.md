# Mikasa AI - Next.js API for Netlify

Mikasa AI adalah aplikasi yang menggunakan API untuk menghasilkan respons berbasis prompt dari model generatif Google Gemini. Aplikasi ini dikembangkan dengan Next.js dan dideploy ke Netlify.

## Fitur

- Menggunakan **Next.js API routes** untuk menangani permintaan HTTP.
- API yang terintegrasi dengan **Google Gemini** untuk menghasilkan konten AI berdasarkan prompt.
- Dapat dijalankan dan di-deploy di **Netlify** dengan pengaturan otomatis.


### Folder `pages/api/`
- **hello.js**: Endpoint untuk mengembalikan pesan "Hello, world!" sebagai tes.
- **mikasa.js**: Endpoint untuk menangani permintaan dari pengguna dan menghasilkan respons AI menggunakan `mikasa()`.

## Cara Menjalankan Proyek

1. **Clone repository ini**

```bash
git clone <repository-url>
cd <project-folder>
