<p align="center">
  <img src="assets/readme/hero.svg" width="100%" alt="mythoside.com, the Mythos product site">
</p>

<p align="center">
  <a href="https://mythoside.com">mythoside.com</a> · <a href="https://github.com/mythoside">Mythos</a> · English · <a href="./README.TR.md">Türkçe</a>
</p>

<p align="center">
  <a href="https://mythoside.com"><img src="assets/readme/site.png" width="100%" alt="The first screen of mythoside.com: the headline 'Write the whole series in one place' beside a preview of the editor with a continuity check"></a>
</p>

The product site for [Mythos](https://github.com/mythoside), a desktop app for writing a series. One page in English and Turkish, with light and dark themes, in the same warm editorial style as the app. It deploys to Firebase Hosting on every merge to `main`.

## Run it

```bash
git clone https://github.com/mythoside/mythoside-website.git
cd mythoside-website
npm install
npm run dev     # http://localhost:5173
npm run build   # production build in dist/
```

## Stack

| Layer | Tooling |
| --- | --- |
| UI | React 19, TypeScript |
| Build | Vite |
| Styling | Tailwind CSS v4 and the design tokens in `src/index.css` |
| Fonts | Inter, Newsreader, JetBrains Mono |
| Hosting | Firebase Hosting, deployed by GitHub Actions |

## Layout

```text
src/index.css              design tokens, light and dark themes
src/i18n.tsx               every line of copy, in English and Turkish
src/theme.tsx              theme context and toggle
src/components/sections/   Navbar, Hero, Problem, HowItWorks, Features, Philosophy, OpenSource, FinalCTA, Footer
src/components/ui/         Logo, Icon, ReferenceGraph (canvas force graph), Button, Card, FadeIn
public/                    favicon and logo files
```

To change copy, edit `src/i18n.tsx` and keep the English and Turkish entries in step.

## License

The site's code is MIT, see [LICENSE](./LICENSE). The Mythos name and logo are not covered by it. The engine and the app are under FSL-1.1-ALv2 in their own repositories.
