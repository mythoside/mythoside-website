import { Lang } from '@/enums'

// The privacy notice (KVKK md. 10, GDPR art. 13) for the waitlist. Plain text only; links are rendered by the page.
// Keep in step with `wait.privacy` in messages.ts, and bump CONSENT_VERSION in lib/waitlist.ts when the meaning changes.

export interface LegalSection {
  heading: string
  paragraphs: readonly string[]
  list?: readonly string[]
}

export interface LegalDoc {
  title: string
  description: string
  updated: string
  back: string
  sections: readonly LegalSection[]
}

const CONTACT = 'support@mythoside.com'

export const PRIVACY: Record<Lang, LegalDoc> = {
  [Lang.En]: {
    title: 'Privacy notice',
    description: 'How the Mythos waitlist handles your email address.',
    updated: 'Last updated 24 November 2026',
    back: 'Back to mythoside.com',
    sections: [
      {
        heading: 'Who is responsible',
        paragraphs: [
          `Mythos is built by Barış Salih Babacan, an individual developer in Istanbul, Türkiye. He is the data controller for the waitlist. You can reach him at ${CONTACT}.`,
        ],
      },
      {
        heading: 'What we collect',
        paragraphs: ['When you join the waitlist we store:'],
        list: [
          'your email address',
          'the language you used on the site (English or Turkish)',
          'when you joined, and which version of the consent wording you agreed to',
        ],
      },
      {
        heading: 'Why, and on what basis',
        paragraphs: [
          'We use this only to email you the Mythos release announcement and important project news. The legal basis is your explicit consent, which you give by ticking the box (KVKK art. 5(1); GDPR art. 6(1)(a)). You can withdraw it at any time; withdrawing does not affect emails already sent.',
          'We do not use your address for anything else, do not sell it and do not use it for advertising or profiling.',
        ],
      },
      {
        heading: 'Who processes it, and where',
        paragraphs: [
          'Your data is stored outside Türkiye, so joining the list involves a transfer of personal data abroad. It is handled for us, under our instructions, by Google (Firebase: Cloud Firestore and Firebase Hosting) on servers in the European Union. If we bring in another provider, for example to send emails, we will add it here before it receives any data.',
        ],
      },
      {
        heading: 'How long we keep it',
        paragraphs: [
          'Until you leave the list or the waitlist is closed after launch, whichever comes first. When you leave, we delete your entry within three business days.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'Under KVKK art. 11 and the GDPR you can ask whether we hold data about you, get a copy, have it corrected or deleted, learn who it was transferred to, object to its use, and withdraw your consent. You can also complain to the Personal Data Protection Authority of Türkiye (KVKK) or, in the EU, to your local data protection authority.',
          `To use any of these rights, or to leave the list, write to ${CONTACT}. We answer within 30 days, free of charge.`,
        ],
      },
      {
        heading: 'Cookies and analytics',
        paragraphs: [
          'Your theme, language and cookie choice are kept in your own browser only. Like any web host, Firebase Hosting processes technical request data such as your IP address to deliver the pages.',
          'Analytics run only if you allow them in the cookie banner. Then we load Google Tag Manager and Google Analytics, which set cookies (_ga) and send usage data such as pages viewed, device and approximate location to Google LLC in the United States, so we can count visits. The legal basis is your explicit consent. Until you allow it, no request is made to these services. You can change or withdraw your choice at any time with “Cookie settings” at the bottom of the home page; withdrawing deletes the analytics cookies.',
        ],
      },
    ],
  },
  [Lang.Tr]: {
    title: 'Aydınlatma metni',
    description: 'Mythos bekleme listesinin e-posta adresini nasıl işlediği.',
    updated: 'Son güncelleme: 24 Kasım 2026',
    back: "mythoside.com'a dön",
    sections: [
      {
        heading: 'Veri sorumlusu',
        paragraphs: [
          `Mythos'u İstanbul'da bireysel geliştirici olarak Barış Salih Babacan geliştiriyor. Bekleme listesinin veri sorumlusu odur. ${CONTACT} adresinden ulaşabilirsin.`,
        ],
      },
      {
        heading: 'Hangi verileri işliyoruz',
        paragraphs: ['Bekleme listesine katıldığında şunları saklıyoruz:'],
        list: [
          'e-posta adresin',
          'sitede kullandığın dil (Türkçe ya da İngilizce)',
          'katıldığın zaman ve onayladığın metnin sürümü',
        ],
      },
      {
        heading: 'Amaç ve hukuki sebep',
        paragraphs: [
          'Bu verileri yalnızca sana Mythos sürüm duyurusunu ve önemli proje haberlerini e-postayla göndermek için kullanıyoruz. Hukuki sebep, kutuyu işaretleyerek verdiğin açık rızadır (KVKK md. 5(1); GDPR md. 6(1)(a)). Rızanı istediğin zaman geri alabilirsin; bu, daha önce gönderilmiş e-postaları etkilemez.',
          'Adresini başka bir amaçla kullanmıyor, satmıyor, reklam ya da profilleme için kullanmıyoruz.',
        ],
      },
      {
        heading: 'Verileri kim, nerede işliyor',
        paragraphs: [
          'Veriler Türkiye dışında saklandığı için listeye katılmak kişisel verilerin yurt dışına aktarılması anlamına gelir. Veriler, bizim talimatımızla Google (Firebase: Cloud Firestore ve Firebase Hosting) tarafından Avrupa Birliği’ndeki sunucularda işlenir. E-posta göndermek gibi bir iş için başka bir hizmet sağlayıcıyla çalışırsak, ona veri aktarılmadan önce burada belirtiriz.',
        ],
      },
      {
        heading: 'Saklama süresi',
        paragraphs: [
          'Listeden çıkana ya da bekleme listesi lansmandan sonra kapatılana kadar; hangisi önce olursa. Listeden çıktığında kaydını üç iş günü içinde sileriz.',
        ],
      },
      {
        heading: 'Hakların',
        paragraphs: [
          'KVKK md. 11 ve GDPR kapsamında; hakkında veri işlenip işlenmediğini öğrenme, bir kopyasını alma, düzeltilmesini ya da silinmesini isteme, kimlere aktarıldığını öğrenme, işlenmesine itiraz etme ve rızanı geri alma hakların var. Kişisel Verileri Koruma Kurulu’na, AB’de ise kendi veri koruma otoritene şikâyette bulunabilirsin.',
          `Bu haklarını kullanmak ya da listeden çıkmak için ${CONTACT} adresine yaz. En geç 30 gün içinde, ücretsiz olarak yanıtlarız.`,
        ],
      },
      {
        heading: 'Çerezler ve analitik',
        paragraphs: [
          'Tema, dil ve çerez tercihin yalnızca kendi tarayıcında tutulur. Her web sunucusu gibi Firebase Hosting de sayfaları iletmek için IP adresin gibi teknik istek verilerini işler.',
          'Analitik yalnızca çerez banner’ında izin verirsen çalışır. Bu durumda ziyaretleri sayabilmek için Google Tag Manager ve Google Analytics yüklenir; bunlar çerez (_ga) yerleştirir ve görüntülenen sayfalar, cihaz ve yaklaşık konum gibi kullanım verilerini ABD’deki Google LLC’ye gönderir. Hukuki sebep açık rızandır. İzin vermediğin sürece bu hizmetlere hiçbir istek gönderilmez. Tercihini ana sayfanın altındaki “Çerez tercihleri” bağlantısından istediğin zaman değiştirebilir ya da geri alabilirsin; geri aldığında analitik çerezleri silinir.',
        ],
      },
    ],
  },
}
