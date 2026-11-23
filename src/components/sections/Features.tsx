import { RuleSeverity, SectionId } from '@/enums'
import { T } from '@/i18n/T'
import type { MessageKey } from '@/i18n/messages'
import { SectionHead } from '../ui/SectionHead'
import { SectionShell } from '../ui/SectionShell'

interface Rule {
  code: string
  severity: RuleSeverity
  title: MessageKey
  description: MessageKey
  analog: string
}

// The consistency-engine rules. Codes and CS analogs are universal jargon (not translated).
const RULES: readonly Rule[] = [
  { code: 'MYTH-E012', severity: RuleSeverity.Error, title: 'rule.e012t', description: 'rule.e012d', analog: '≈ use-after-free' },
  { code: 'MYTH-E003', severity: RuleSeverity.Error, title: 'rule.e003t', description: 'rule.e003d', analog: '≈ undefined symbol' },
  { code: 'MYTH-E007', severity: RuleSeverity.Error, title: 'rule.e007t', description: 'rule.e007d', analog: '≈ data race' },
  { code: 'MYTH-W031', severity: RuleSeverity.Warning, title: 'rule.w031t', description: 'rule.w031d', analog: '≈ causality violated' },
  { code: 'MYTH-W018', severity: RuleSeverity.Warning, title: 'rule.w018t', description: 'rule.w018d', analog: '≈ dead code' },
  { code: 'MYTH-W009', severity: RuleSeverity.Warning, title: 'rule.w009t', description: 'rule.w009d', analog: '≈ name collision' },
]

export default function Features() {
  return (
    <SectionShell id={SectionId.Engine}>
      <SectionHead title="engine.h2" body="engine.body" />
      <div className="rules">
        {RULES.map((r) => (
          <div className={r.severity === RuleSeverity.Warning ? 'rule warn' : 'rule'} key={r.code}>
            <span className="rc">{r.code}</span>
            <T k={r.title} as="span" className="rt" />
            <span className="analog"><b>{r.analog}</b></span>
            <T k={r.description} as="div" className="rd" />
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
