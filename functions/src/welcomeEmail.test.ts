import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isLang, renderWelcomeEmail } from './welcomeEmail.js'

test('both languages render a complete email', () => {
  for (const lang of ['en', 'tr'] as const) {
    const { subject, html, text } = renderWelcomeEmail(lang)
    assert.ok(subject.length > 0)
    assert.ok(html.includes(`<html lang="${lang}">`))
    assert.ok(!html.includes('undefined') && !text.includes('undefined'))
    assert.ok(html.includes('support@mythoside.com') && text.includes('support@mythoside.com'))
  }
  assert.equal(renderWelcomeEmail('tr').subject, 'Mythos bekleme listesindesin')
})

test('isLang accepts only the site languages', () => {
  assert.ok(isLang('en') && isLang('tr'))
  assert.ok(!isLang('de') && !isLang(undefined))
})
