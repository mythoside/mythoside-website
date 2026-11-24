'use client'

import type { ReactNode } from 'react'
import { IconName, SectionId, TreeRowKind } from '@/enums'
import { useLang } from '@/i18n/LangProvider'
import { T } from '@/i18n/T'
import type { MessageKey } from '@/i18n/messages'
import Icon from '../ui/Icon'
import { WaitlistForm } from '../ui/WaitlistForm'

interface TreeRow {
  kind: TreeRowKind
  label?: string
  labelKey?: MessageKey
}

// File paths and names stay literal; only the "Entities" group label is translated.
const TREE: readonly TreeRow[] = [
  { kind: TreeRowKind.Group, label: 'the-ashfall-cycle' },
  { kind: TreeRowKind.Folder, label: 'book-01-embergate' },
  { kind: TreeRowKind.File, label: 'ch-12-the-fall.md' },
  { kind: TreeRowKind.Folder, label: 'book-02-the-drowned-throne' },
  { kind: TreeRowKind.File, label: 'ch-01-saltlight.md' },
  { kind: TreeRowKind.ActiveFile, label: 'ch-03-the-tidewatch.md' },
  { kind: TreeRowKind.Group, labelKey: 'demo.entities' },
  { kind: TreeRowKind.Folder, label: 'characters' },
  { kind: TreeRowKind.File, label: 'lord-corvath.md' },
  { kind: TreeRowKind.File, label: 'sera-of-vael.md' },
]

function TreeItem({ kind, label, labelKey }: TreeRow) {
  switch (kind) {
    case TreeRowKind.Group:
      return labelKey ? <T k={labelKey} as="div" className="grp" /> : <div className="grp">{label}</div>
    case TreeRowKind.Folder:
      return <div className="row"><span className="tw">▾</span> {label}</div>
    case TreeRowKind.File:
      return <div className="row file">{label}</div>
    case TreeRowKind.ActiveFile:
      return <div className="row file active">{label} <span className="fdot">•</span></div>
  }
}

interface Meta {
  head: MessageKey
  detail: MessageKey
}

const META: readonly Meta[] = [
  { head: 'hero.m1a', detail: 'hero.m1b' },
  { head: 'hero.m2a', detail: 'hero.m2b' },
  { head: 'hero.m3a', detail: 'hero.m3b' },
]

interface CodeLine {
  n: number
  content: ReactNode
}

export default function Hero() {
  const { t } = useLang()

  // Line 43 carries the squiggled, flagged name.
  const lines: readonly CodeLine[] = [
    { n: 41, content: t('demo.l41') },
    { n: 42, content: t('demo.l42') },
    {
      n: 43,
      content: (
        <>
          {t('demo.l43a')}
          <span className="flag">Lord Corvath<svg className="sq" viewBox="0 0 120 6" preserveAspectRatio="none" aria-hidden="true"><path d="M0 3 Q7 0 14 3 T28 3 T42 3 T56 3 T70 3 T84 3 T98 3 T112 3 T120 3" /></svg></span>
          {t('demo.l43b')}
        </>
      ),
    },
    { n: 44, content: t('demo.l44') },
  ]

  return (
    <section className="hero wrap">
      <div className="hero-grid">
        <div>
          <T k="hero.eyebrow" className="eyebrow" />
          <T k="hero.h1" as="h1" />
          <T k="hero.lead" as="p" className="lead" />
          <p className="hero-status"><T k="hero.status" className="pill" /> <T k="hero.statusNote" /></p>
          <WaitlistForm anchorId={SectionId.Waitlist} />
        </div>

        {/* Signature: the narrative diagnostic. File paths/names stay literal; prose + diagnostic are translated. */}
        <figure className="hero-visual">
          <div className="editor" role="img" aria-label="Preview of a planned Mythos continuity check: it flags Lord Corvath, a character who died in Book One, appearing in Book Two.">
            <div className="editor-bar">
              <span className="dot" />
              <span className="crumb">the-ashfall-cycle / book-02-the-drowned-throne / <b>ch-03-the-tidewatch.md</b></span>
              <span className="unsaved">•</span>
            </div>
            <div className="editor-body">
              <div className="tree" aria-hidden="true">
                {TREE.map((row) => <TreeItem key={row.label ?? row.labelKey} {...row} />)}
              </div>
              <div className="code">
                {lines.map(({ n, content }) => (
                  <div className="ln" key={n}><span className="n" aria-hidden="true">{n}</span><span className="t prose-line">{content}</span></div>
                ))}
              </div>
            </div>
            <div className="problems">
              <div className="ph">{t('demo.problems')} <span className="soon">{t('demo.soon')}</span> <span className="c">{t('demo.err')}</span></div>
              <div className="diag">
                <span className="sev"><Icon name={IconName.X} /></span>
                <div className="dcode">
                  <div className="rc">MYTH-E012 · {t('demo.rc')}</div>
                  <T k="demo.msg" as="div" className="msg" />
                  <a className="goto" href={`#${SectionId.Model}`}><T k="demo.goto" /></a>
                </div>
              </div>
            </div>
          </div>
          <T k="demo.cap" as="figcaption" className="demo-cap" />
        </figure>

        <div className="hero-meta">
          {META.map(({ head, detail }) => (
            <div className="hm" key={head}><T k={head} as="b" /><T k={detail} /></div>
          ))}
        </div>
      </div>
    </section>
  )
}
