import type { Metadata } from 'next'
import { IconName, Lang, LegalDocKind } from '@/enums'
import { PRIVACY } from '@/content/privacy'
import type { LegalDoc } from '@/content/privacy'
import { TERMS } from '@/content/terms'
import { LANG_PATH } from '@/lib/seo'
import Icon from './ui/Icon'
import Logo from './ui/Logo'

const DOCS: Record<LegalDocKind, Record<Lang, LegalDoc>> = {
  [LegalDocKind.Privacy]: PRIVACY,
  [LegalDocKind.Terms]: TERMS,
}

// Keep in step with the app/ routes and the links in messages.ts and public/sitemap.xml.
export const LEGAL_PATH: Record<LegalDocKind, Record<Lang, string>> = {
  [LegalDocKind.Privacy]: { [Lang.En]: '/privacy', [Lang.Tr]: '/tr/gizlilik' },
  [LegalDocKind.Terms]: { [Lang.En]: '/terms', [Lang.Tr]: '/tr/kullanim-sartlari' },
}

export function legalMetadata(kind: LegalDocKind, lang: Lang): Metadata {
  const { title, description } = DOCS[kind][lang]
  const paths = LEGAL_PATH[kind]
  return {
    title: `${title} · Mythos`,
    description,
    alternates: { canonical: paths[lang], languages: { [Lang.En]: paths[Lang.En], [Lang.Tr]: paths[Lang.Tr] } },
  }
}

// Static, server-rendered and outside LangProvider, so the URL never rewrites to `/` or `/tr`.
export default function LegalPage({ kind, lang }: { kind: LegalDocKind; lang: Lang }) {
  const { title, updated, back, sections } = DOCS[kind][lang]
  const other = lang === Lang.En ? Lang.Tr : Lang.En
  return (
    <>
    <header className="nav">
      <div className="wrap legal-head">
        <a className="brand legal-backlink" href={LANG_PATH[lang]} title={back}>
          <Icon name={IconName.ChevronLeft} className="icon chevron" /><Logo /> Mythos
        </a>
        <a className="legal-lang" href={LEGAL_PATH[kind][other]} hrefLang={other} lang={other}>{other === Lang.Tr ? 'Türkçe' : 'English'}</a>
      </div>
    </header>
    <main className="wrap legal">
      <h1>{title}</h1>
      <p className="legal-updated">{updated}</p>
      {sections.map(({ heading, paragraphs, list }) => (
        <section key={heading}>
          <h2>{heading}</h2>
          {paragraphs.map((p) => <p key={p}>{p}</p>)}
          {list && <ul>{list.map((item) => <li key={item}>{item}</li>)}</ul>}
        </section>
      ))}
      <p className="legal-back"><a href={LANG_PATH[lang]}>{back}</a></p>
    </main>
    </>
  )
}
