<p align="center">
  <img src="assets/readme/hero.svg" width="100%" alt="mythoside.com, Mythos'un ürün sitesi">
</p>

<p align="center">
  <a href="https://mythoside.com">mythoside.com</a> · <a href="https://github.com/mythoside">Mythos</a> · <a href="./README.md">English</a> · Türkçe
</p>

<p align="center">
  <a href="https://mythoside.com"><img src="assets/readme/site.png" width="100%" alt="mythoside.com'un ilk ekranı: 'Write the whole series in one place' başlığı ve yanında süreklilik kontrolü gösteren bir editör önizlemesi"></a>
</p>

Seri yazmak için bir masaüstü uygulaması olan [Mythos](https://github.com/mythoside)'un ürün sitesi. İngilizce ve Türkçe, açık ve koyu temalı tek bir sayfa; uygulamayla aynı sıcak, editoryal görünümde. `main` dalına her merge'de Firebase Hosting'e dağıtılır.

## Çalıştır

```bash
git clone https://github.com/mythoside/mythoside-website.git
cd mythoside-website
npm install
npm run dev     # http://localhost:3000
npm run build   # out/ içine statik çıktı
npm run lint
```

## Teknolojiler

| Katman | Araç |
| --- | --- |
| Arayüz | React 19, TypeScript |
| Çatı | Next.js (App Router, statik çıktı) |
| Stil | Tailwind CSS v4 ve `app/globals.css` içindeki tasarım token'ları |
| Yazı tipleri | Inter, Newsreader, JetBrains Mono, `next/font` ile |
| Barındırma | Firebase Hosting, GitHub Actions ile dağıtım |

## Klasör yapısı

```text
app/(en)/, app/tr/       / ve /tr için kök layout ve sayfalar (her biri kendi <html lang> değerini taşır)
firestore.rules           bekleme listesi kuralları: yalnızca oluşturma, doğrulamalı
app/globals.css           tasarım token'ları, açık ve koyu tema
src/enums.ts              kapalı seçenek kümeleri: Lang, Theme, ButtonVariant, IconName, NodeKind, SectionId, RuleSeverity, TreeRowKind
src/i18n/                 sitedeki bütün metinler, İngilizce ve Türkçe; sağlayıcı ve geçiş düğmesi
src/theme/                tema sağlayıcısı ve geçiş düğmesi
src/components/sections/  Navbar, Hero, Problem, HowItWorks, Features, Philosophy, OpenSource, FinalCTA, Footer
src/components/ui/        Logo, Icon, ReferenceGraph (canvas kuvvet grafiği), Button, Card, FadeIn, SectionShell
public/                   favicon, paylaşım görseli (og.png), robots.txt, sitemap.xml ve logo dosyaları
```

Metni değiştirmek için `src/i18n/messages.ts` dosyasını düzenle; İngilizce ve Türkçe girdileri birlikte güncelle.

## Lisans

Sitenin kodu MIT lisanslı, bkz. [LICENSE](./LICENSE). Mythos adı ve logosu bu lisansın kapsamında değildir. Motor ve uygulama kendi repolarında FSL-1.1-ALv2 ile lisanslıdır.
