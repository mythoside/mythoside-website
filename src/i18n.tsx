import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode, ElementType } from 'react'

export type Lang = 'en' | 'tr'

type Dict = Record<string, string>

const EN: Dict = {
  'nav.problem': 'Problem', 'nav.model': 'Model', 'nav.engine': 'Checks', 'nav.ethos': 'Your files', 'nav.open': 'Open&nbsp;source', 'nav.star': 'Star on GitHub',
  'hero.eyebrow': 'A world development environment for novelists',
  'hero.h1': 'Write the whole series in one place',
  'hero.lead': 'Mythos is a desktop app for long fiction. Chapters, characters, places and the timeline sit side by side as plain Markdown files on your own disk. Next on the list: continuity checks that notice when someone who died in Book One speaks again in Book Two.',
  'hero.cta2': 'How it works',
  'hero.m1a': 'Rust engine', 'hero.m1b': 'no network port', 'hero.m2a': 'Markdown and YAML', 'hero.m2b': 'files you own', 'hero.m3a': 'Series to chapter', 'hero.m3b': 'one folder per series',
  'demo.cap': 'Preview of a continuity check in development',
  'demo.entities': 'Entities',
  'demo.l41': 'The council chamber held its breath.',
  'demo.l42': 'Salt light fell through the drowned windows.',
  'demo.l43a': 'When ', 'demo.l43b': ' rose to speak, even',
  'demo.l44': 'the Tidewatch fell silent, and listened.',
  'demo.problems': 'Problems', 'demo.err': '1 error',
  'demo.rc': 'reference to deceased entity',
  'demo.msg': '<b>Lord Corvath</b> died in <b>The Ashfall</b> — Book I, ch. 12. He is referenced here as present.',
  'demo.goto': '→ open lord-corvath.md &nbsp;·&nbsp; status: deceased',
  'problem.h2': 'Your canon is spread across five places',
  'problem.body': 'A wiki, a spreadsheet, a folder of half-named drafts, and the rest in your head. Each tool holds a piece and none of them sees the whole series. Contradictions like a character who comes back from the dead, or a town that moved two hundred miles, stay hidden until a reader finds them.',
  'problem.n1': 'last synced 3 weeks ago', 'problem.n2': 'v7, or was it v8?', 'problem.n3': 'naming: chaotic', 'problem.n4': 'Corvath died… right?', 'problem.mem': 'your memory',
  'model.h2': 'Every character and place is a file',
  'model.body': "A series is a folder. Books, chapters, characters and locations are Markdown files with a short block of YAML at the top. When you mention a character in a chapter, Mythos links the two, so a character's page shows every chapter they appear in.",
  'model.p1': 'Entity', 'model.p2': 'References', 'model.p2fp': 'how the files connect',
  'graph.book': 'Series and books', 'graph.chapter': 'Chapter', 'graph.character': 'Character', 'graph.location': 'Location',
  'graph.hint': 'Drag a node · Ctrl or ⌘ + scroll to zoom',
  'graph.aria': 'Reference graph of The Ashfall Cycle: books, chapters, characters and locations linked by mentions. The dashed red link marks Lord Corvath, who died in Book One, chapter 12, being mentioned in Book Two, chapter 3.',
  'engine.h2': 'Continuity checks, in development',
  'engine.body': "These are the checks we're building next. Each one borrows an idea from how compilers catch mistakes in code. They point at the problem and leave your text alone.",
  'rule.e012t': 'Use after death', 'rule.e012d': 'A character acts, speaks, or appears after the chapter that killed them.',
  'rule.e003t': 'Undefined reference', 'rule.e003d': 'A name is invoked as canon, but no entity behind it exists in the series.',
  'rule.e007t': 'Impossible presence', 'rule.e007d': 'One character stands in two places within the same moment of the timeline.',
  'rule.w031t': 'Timeline drift', 'rule.w031d': 'An event is dated before the cause that is supposed to have produced it.',
  'rule.w018t': 'Orphaned lore', 'rule.w018d': 'An entity is defined in rich detail and then never referenced anywhere.',
  'rule.w009t': 'Shadowed name', 'rule.w009d': "Two distinct entities answer to the same name, and the prose can't tell them apart.",
  'ethos.h2': 'Your files stay on your disk',
  'ethos.body': 'The engine that reads your series never opens a network connection. It talks to the app over a private pipe that nothing else on the machine can reach. Everything you write is plain text in a folder you choose, so if you stop using Mythos, every file still opens in any editor.',
  'ethos.c1': '<b>Files, not a database.</b> Markdown and YAML on disk are the only source of truth.',
  'ethos.c2': '<b>No export step.</b> Your work was never locked into a format to begin with.',
  'ethos.c3': '<b>Offline by default.</b> If cloud sync ever ships, it will be optional.',
  'arch.label': 'Two processes, on purpose',
  'arch.cap': 'The Rust engine reads and watches your files.<br>The app draws them. Nothing listens on the network.',
  'open.h2': 'Free during development, then pay once',
  'open.body': "Mythos is free while it's in development. At the first release it becomes a one-time purchase that includes a year of updates. When the year is up, the app keeps working and the version you have is yours for good. You can renew for another year of updates whenever you like, but you never have to.",
  'open.freeTier': 'Now, in development', 'open.freePrice': 'Free', 'open.freeSub': 'no account, every feature',
  'open.f1': 'The full editor and engine', 'open.f2': 'Unlimited series and books', 'open.f3': 'Continuity checks as they land',
  'open.proTier': 'At launch', 'open.proPrice': 'Pay once', 'open.proSub': 'includes one year of updates',
  'open.p1': 'The signed desktop app, ready to install', 'open.p2': 'Every update released in your first year', 'open.p3': 'Your version keeps working after that, renewing is optional',
  'open.fsl': "<b>Functional Source License 1.1.</b> The source is public, so you can read it, build it and run it yourself for free. You can't repackage Mythos as a competing product.<br>Two years after each release, that release becomes Apache&nbsp;2.0. The website is MIT.",
  'closing.h2': 'Mythos is at version 0 and built in the open',
  'closing.cta2': 'Read the code',
  'foot.tagline': '<b>A world development environment for novelists.</b> Early days, built in the open by a small team.',
  'foot.repos': 'Repositories', 'foot.r1': 'mythoside-core · engine', 'foot.r2': 'mythoside-ts · app',
  'foot.project': 'Project', 'foot.pr1': 'Mythoside on GitHub', 'foot.pr2': 'Contributing', 'foot.pr3': 'Security',
  'foot.motto': 'The world is the source of truth.',
}

const TR: Dict = {
  'nav.problem': 'Problem', 'nav.model': 'Model', 'nav.engine': 'Kontroller', 'nav.ethos': 'Dosyaların', 'nav.open': 'Açık&nbsp;kaynak', 'nav.star': "GitHub'da Yıldızla",
  'hero.eyebrow': 'Romancılar için bir dünya geliştirme ortamı',
  'hero.h1': 'Bütün seriyi tek bir yerde yaz',
  'hero.lead': "Mythos, uzun kurgu için bir masaüstü uygulaması. Bölümler, karakterler, mekânlar ve zaman çizelgesi kendi diskinde, yan yana düz Markdown dosyaları olarak durur. Sırada süreklilik kontrolleri var: Birinci Kitap'ta ölen biri İkinci Kitap'ta yeniden konuşursa bunu fark edecek.",
  'hero.cta2': 'Nasıl çalışır',
  'hero.m1a': 'Rust motoru', 'hero.m1b': 'ağ portu yok', 'hero.m2a': 'Markdown ve YAML', 'hero.m2b': 'sana ait dosyalar', 'hero.m3a': 'Seriden bölüme', 'hero.m3b': 'her seri tek klasör',
  'demo.cap': 'Geliştirilmekte olan bir süreklilik kontrolünün önizlemesi',
  'demo.entities': 'Varlıklar',
  'demo.l41': 'Meclis salonu nefesini tuttu.',
  'demo.l42': 'Tuz ışığı boğulmuş pencerelerden içeri düştü.',
  'demo.l43a': '', 'demo.l43b': ' söz almak için ayağa kalktığında,',
  'demo.l44': 'Tidewatch bile sustu ve dinledi.',
  'demo.problems': 'Sorunlar', 'demo.err': '1 hata',
  'demo.rc': 'ölü varlığa referans',
  'demo.msg': "<b>Lord Corvath</b>, <b>The Ashfall</b>'da öldü — Birinci Kitap, ch. 12. Burada canlı olarak geçiyor.",
  'demo.goto': '→ lord-corvath.md aç &nbsp;·&nbsp; durum: ölü',
  'problem.h2': 'Kanonun beş ayrı yere dağılmış',
  'problem.body': 'Bir wiki, bir tablo, yarım isimli taslaklarla dolu bir klasör, gerisi de kafanda. Her araç bir parçayı tutuyor ama hiçbiri serinin bütününü görmüyor. Ölümden dönen bir karakter ya da üç yüz kilometre taşınan bir kasaba gibi çelişkiler, bir okur fark edene kadar gizli kalıyor.',
  'problem.n1': '3 hafta önce eşitlendi', 'problem.n2': 'v7, yoksa v8 miydi?', 'problem.n3': 'isimlendirme: kaotik', 'problem.n4': 'Corvath öldü… değil mi?', 'problem.mem': 'senin hafızan',
  'model.h2': 'Her karakter ve mekân bir dosya',
  'model.body': 'Bir seri bir klasördür. Kitaplar, bölümler, karakterler ve mekânlar, başında kısa bir YAML bloğu olan Markdown dosyalarıdır. Bir bölümde bir karakterden söz ettiğinde Mythos ikisini birbirine bağlar; böylece karakterin sayfası geçtiği her bölümü gösterir.',
  'model.p1': 'Varlık', 'model.p2': 'Referanslar', 'model.p2fp': 'dosyalar nasıl bağlanıyor',
  'graph.book': 'Seri ve kitaplar', 'graph.chapter': 'Bölüm', 'graph.character': 'Karakter', 'graph.location': 'Mekân',
  'graph.hint': 'Bir düğümü sürükle · yakınlaştırmak için Ctrl ya da ⌘ + kaydır',
  'graph.aria': "The Ashfall Cycle'ın referans grafiği: kitaplar, bölümler, karakterler ve mekânlar, anılma bağlantılarıyla birbirine bağlı. Kesikli kırmızı bağlantı, Birinci Kitap'ın 12. bölümünde ölen Lord Corvath'ın İkinci Kitap'ın 3. bölümünde anılmasını gösterir.",
  'engine.h2': 'Süreklilik kontrolleri, geliştirmede',
  'engine.body': 'Bunlar sırada yaptığımız kontroller. Her biri, derleyicilerin koddaki hataları yakalama yönteminden bir fikir ödünç alıyor. Sorunu gösteriyorlar, metnine dokunmuyorlar.',
  'rule.e012t': 'Ölümden sonra kullanım', 'rule.e012d': 'Bir karakter, onu öldüren bölümden sonra hareket eder, konuşur ya da görünür.',
  'rule.e003t': 'Tanımsız referans', 'rule.e003d': 'Bir isim kanon olarak anılır, ama seride arkasında bir varlık yoktur.',
  'rule.e007t': 'İmkânsız mevcudiyet', 'rule.e007d': 'Bir karakter, zaman çizgisinin aynı anında iki ayrı yerde bulunur.',
  'rule.w031t': 'Zaman çizgisi kayması', 'rule.w031d': 'Bir olay, onu doğurması gereken nedenden önceye tarihlenir.',
  'rule.w018t': 'Öksüz lore', 'rule.w018d': 'Bir varlık zengin ayrıntıyla tanımlanır, ama hiçbir yerde referans verilmez.',
  'rule.w009t': 'Gölgelenen isim', 'rule.w009d': 'İki ayrı varlık aynı isme yanıt verir ve metin onları birbirinden ayıramaz.',
  'ethos.h2': 'Dosyaların kendi diskinde kalır',
  'ethos.body': "Serini okuyan motor hiçbir ağ bağlantısı açmaz. Uygulamayla, makinedeki başka hiçbir şeyin erişemediği özel bir kanaldan konuşur. Yazdığın her şey, seçtiğin bir klasörde düz metin olarak durur; Mythos'u bıraksan bile her dosya herhangi bir editörde açılır.",
  'ethos.c1': '<b>Veritabanı değil, dosyalar.</b> Tek doğruluk kaynağı diskteki Markdown ve YAML.',
  'ethos.c2': '<b>Dışa aktarma adımı yok.</b> Çalışmaların zaten hiçbir formata kilitlenmedi.',
  'ethos.c3': '<b>Varsayılan olarak çevrimdışı.</b> Bulut eşitleme bir gün gelirse isteğe bağlı olacak.',
  'arch.label': 'Bilinçli olarak iki süreç',
  'arch.cap': 'Rust motoru dosyalarını okur ve izler.<br>Uygulama onları çizer. Ağda hiçbir şey dinlemez.',
  'open.h2': 'Geliştirme sürecinde ücretsiz, sonra tek seferlik',
  'open.body': 'Mythos geliştirme aşamasındayken ücretsiz. İlk sürümle birlikte, bir yıllık güncelleme içeren tek seferlik bir satın almaya dönüşecek. Bir yıl dolduğunda uygulama çalışmaya devam eder ve elindeki sürüm sonsuza kadar senindir. Bir yıl daha güncelleme almak istersen dilediğin zaman yenileyebilirsin, ama yenilemek zorunda değilsin.',
  'open.freeTier': 'Şimdi, geliştirmede', 'open.freePrice': 'Ücretsiz', 'open.freeSub': 'hesap yok, tüm özellikler',
  'open.f1': 'Tam editör ve motor', 'open.f2': 'Sınırsız seri ve kitap', 'open.f3': 'Süreklilik kontrolleri, geldikçe',
  'open.proTier': 'Çıkışta', 'open.proPrice': 'Bir kez öde', 'open.proSub': 'bir yıllık güncelleme dahil',
  'open.p1': 'İmzalı, kurulmaya hazır masaüstü uygulaması', 'open.p2': 'İlk yılında çıkan her güncelleme', 'open.p3': 'Sonrasında sürümün çalışmaya devam eder, yenilemek isteğe bağlı',
  'open.fsl': "<b>Functional Source License 1.1.</b> Kaynak kodu açık; okuyabilir, derleyebilir ve kendin ücretsiz çalıştırabilirsin. Mythos'u rakip bir ürün olarak yeniden paketleyemezsin.<br>Her sürüm, çıkışından iki yıl sonra Apache&nbsp;2.0 olur. Web sitesi MIT lisanslı.",
  'closing.h2': 'Mythos henüz 0 sürümünde ve açık kaynak olarak geliştiriliyor',
  'closing.cta2': 'Koda göz at',
  'foot.tagline': '<b>Romancılar için bir dünya geliştirme ortamı.</b> Daha ilk günler, küçük bir ekip açık kaynak olarak geliştiriyor.',
  'foot.repos': 'Depolar', 'foot.r1': 'mythoside-core · motor', 'foot.r2': 'mythoside-ts · uygulama',
  'foot.project': 'Proje', 'foot.pr1': "GitHub'da Mythoside", 'foot.pr2': 'Katkıda bulunma', 'foot.pr3': 'Güvenlik',
  'foot.motto': 'Dünya, doğruluğun kaynağıdır.',
}

const DICTS: Record<Lang, Dict> = { en: EN, tr: TR }

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string }
const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {}, t: (k) => k })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mythos-lang')
      if (saved === 'en' || saved === 'tr') setLangState(saved)
    } catch { /* ignore */ }
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    document.documentElement.setAttribute('lang', l)
    try { localStorage.setItem('mythos-lang', l) } catch { /* ignore */ }
  }

  const t = (key: string) => DICTS[lang][key] ?? key

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>
}

export function useLang() {
  return useContext(Ctx)
}

/**
 * Render a translated string as HTML into the given element (keeps <em>/<b>/<br>).
 * Safe: `t()` only ever returns values from the static EN/TR dictionaries above —
 * compile-time constants authored here, never user input. No untrusted data reaches innerHTML.
 */
export function T({ k, as: Tag = 'span', className }: { k: string; as?: ElementType; className?: string }) {
  const { t } = useLang()
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: t(k) }} />
}

export function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div className="lang" role="group" aria-label="Language">
      <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
      <button type="button" className={lang === 'tr' ? 'active' : ''} onClick={() => setLang('tr')}>TR</button>
    </div>
  )
}
