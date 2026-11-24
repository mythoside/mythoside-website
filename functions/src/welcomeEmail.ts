export type Lang = 'en' | 'tr'

export interface WelcomeEmail {
  subject: string
  html: string
  text: string
}

interface Copy {
  subject: string
  preheader: string
  heading: string
  intro: string
  nextTitle: string
  next: string[]
  meanwhile: string
  github: string
  privacy: string
  signoff: string
}

const SITE = 'https://mythoside.com'
const GITHUB = 'https://github.com/mythoside'
const SUPPORT = 'support@mythoside.com'

const COPY: Record<Lang, Copy> = {
  en: {
    subject: "You're on the Mythos waitlist",
    preheader: "We'll write once, when Mythos is ready to install.",
    heading: "You're on the list",
    intro:
      'Thanks for joining the Mythos waitlist. Mythos is a desktop app for long fiction: chapters, characters, places and the timeline sit side by side as plain Markdown files on your own disk.',
    nextTitle: 'What happens next',
    next: [
      "We'll email you when the first release is ready to install, on Windows and Linux first. macOS comes after.",
      "Mythos is free while it's in development. The price will be announced at launch.",
      'Apart from that, we only write about important project news.',
    ],
    meanwhile: 'Until then, you can follow the work in the open.',
    github: 'Follow on GitHub',
    privacy: `You're getting this because you joined the Mythos waitlist. Sent by Barış Salih Babacan, ${SUPPORT}. To leave the list, reply to this email. Privacy notice: ${SITE}/privacy`,
    signoff: 'Mythos',
  },
  tr: {
    subject: 'Mythos bekleme listesindesin',
    preheader: 'Mythos kuruluma hazır olduğunda sana yazacağız.',
    heading: 'Listedesin',
    intro:
      'Mythos bekleme listesine katıldığın için teşekkürler. Mythos, uzun kurgu için bir masaüstü uygulaması: bölümler, karakterler, mekânlar ve zaman çizelgesi kendi diskinde, yan yana düz Markdown dosyaları olarak durur.',
    nextTitle: 'Bundan sonra ne olacak',
    next: [
      'İlk sürüm kuruluma hazır olduğunda sana e-posta göndereceğiz. Önce Windows ve Linux, macOS daha sonra.',
      'Mythos geliştirme süresince ücretsiz. Fiyat lansmanda açıklanacak.',
      'Bunun dışında yalnızca önemli proje haberleri için yazarız.',
    ],
    meanwhile: 'O zamana kadar çalışmayı açıkta takip edebilirsin.',
    github: "GitHub'da takip et",
    privacy: `Bu e-postayı Mythos bekleme listesine katıldığın için alıyorsun. Gönderen: Barış Salih Babacan, ${SUPPORT}. Listeden çıkmak için bu e-postayı yanıtla. Aydınlatma metni: ${SITE}/tr/gizlilik`,
    signoff: 'Mythos',
  },
}

const C = {
  bg: '#F8F6F0',
  card: '#FFFFFF',
  text: '#2A2724',
  dim: '#5E554A',
  muted: '#6B645A',
  gold: '#9A5539',
  line: '#E8E4D9',
  button: '#2A2724',
  onButton: '#F8F6F0',
}
const SERIF = "Georgia,'Times New Roman',serif"
const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif"

export function isLang(value: unknown): value is Lang {
  return value === 'en' || value === 'tr'
}

export function renderWelcomeEmail(lang: Lang): WelcomeEmail {
  const t = COPY[lang]
  const homeUrl = lang === 'tr' ? `${SITE}/tr` : SITE
  const nextItems = t.next
    .map(
      (line) =>
        `<tr><td valign="top" style="padding:0 10px 10px 0;color:${C.gold};font:16px/24px ${SANS};">&#8226;</td>` +
        `<td style="padding:0 0 10px 0;color:${C.dim};font:16px/24px ${SANS};">${line}</td></tr>`,
    )
    .join('')

  const html = `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${t.subject}</title>
</head>
<body style="margin:0;padding:0;background:${C.bg};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${t.preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.bg};">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
<tr><td style="padding:0 0 24px 4px;">
<a href="${homeUrl}" style="text-decoration:none;color:${C.text};">
<img src="${SITE}/email/mythos-mark.png" width="32" height="32" alt="" style="vertical-align:middle;border:0;">
<span style="vertical-align:middle;padding-left:8px;font:20px/32px ${SERIF};color:${C.text};">Mythos</span>
</a>
</td></tr>
<tr><td style="background:${C.card};border:1px solid ${C.line};border-radius:12px;padding:36px 28px;">
<h1 style="margin:0 0 16px;font:400 30px/38px ${SERIF};color:${C.text};">${t.heading}</h1>
<p style="margin:0 0 28px;font:16px/26px ${SANS};color:${C.dim};">${t.intro}</p>
<h2 style="margin:0 0 12px;font:500 13px/20px ${SANS};color:${C.muted};">${t.nextTitle}</h2>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px;">${nextItems}</table>
<p style="margin:0 0 20px;font:16px/26px ${SANS};color:${C.dim};">${t.meanwhile}</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="background:${C.button};border-radius:8px;">
<a href="${GITHUB}" style="display:inline-block;padding:12px 20px;font:500 15px/20px ${SANS};color:${C.onButton};text-decoration:none;">${t.github}</a>
</td></tr></table>
<p style="margin:32px 0 0;font:18px/26px ${SERIF};color:${C.text};">${t.signoff}</p>
</td></tr>
<tr><td style="padding:24px 4px 0;font:13px/20px ${SANS};color:${C.muted};">
${t.privacy}<br><br>
<a href="${homeUrl}" style="color:${C.gold};text-decoration:none;">mythoside.com</a>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`

  const text = [
    t.heading,
    '',
    t.intro,
    '',
    `${t.nextTitle}:`,
    ...t.next.map((line) => `- ${line}`),
    '',
    `${t.meanwhile} ${GITHUB}`,
    '',
    `— ${t.signoff}`,
    '',
    t.privacy,
    homeUrl,
  ].join('\n')

  return { subject: t.subject, html, text }
}
