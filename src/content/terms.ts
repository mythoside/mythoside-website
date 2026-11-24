import { Lang } from '@/enums'
import type { LegalDoc } from './privacy'

// Terms for this website and the waitlist only. The apps carry their own licence (FSL-1.1-ALv2) in their repositories.

const CONTACT = 'support@mythoside.com'

export const TERMS: Record<Lang, LegalDoc> = {
  [Lang.En]: {
    title: 'Terms of use',
    description: 'The terms for using mythoside.com and the Mythos waitlist.',
    updated: 'Last updated 24 November 2026',
    back: 'Back to mythoside.com',
    sections: [
      {
        heading: 'Who we are',
        paragraphs: [
          `mythoside.com is run by Barış Salih Babacan, an individual developer in Istanbul, Türkiye. Contact: ${CONTACT}. By using the site or joining the waitlist you accept these terms.`,
        ],
      },
      {
        heading: 'The waitlist',
        paragraphs: [
          'Joining is free and gives you no right to buy, receive or use Mythos, and no promised release date, price or feature. Mythos is in early development and the plans described on the site may change.',
          'Join only with an email address that is yours. We may remove entries that look automated or abusive. How we handle your address is set out in the privacy notice.',
        ],
      },
      {
        heading: 'Prices and the product',
        paragraphs: [
          'Nothing on the site is an offer to sell. The price and terms of sale will be published at launch, and buying Mythos will be under the terms shown then.',
        ],
      },
      {
        heading: 'Source code and the Mythos name',
        paragraphs: [
          "The website's source code is MIT-licensed. The Mythos engine and app are source-available under the Functional Source License 1.1 (ALv2 Future License); see each repository on GitHub. The Mythos name and logo are not covered by these licences and may not be used in a way that suggests endorsement.",
        ],
      },
      {
        heading: 'No warranty',
        paragraphs: [
          'The site is provided as is. We try to keep it accurate and available but make no promise that it is. To the extent the law allows, we are not liable for loss arising from using the site or relying on what it says. Nothing here limits rights you have as a consumer that cannot be limited by contract.',
        ],
      },
      {
        heading: 'Changes and law',
        paragraphs: [
          'We may update these terms; the date above shows the latest version. These terms are governed by the laws of the Republic of Türkiye, and Istanbul courts and enforcement offices have jurisdiction, without prejudice to mandatory consumer protection rules where you live.',
        ],
      },
    ],
  },
  [Lang.Tr]: {
    title: 'Kullanım şartları',
    description: 'mythoside.com ve Mythos bekleme listesinin kullanım şartları.',
    updated: 'Son güncelleme: 24 Kasım 2026',
    back: "mythoside.com'a dön",
    sections: [
      {
        heading: 'Biz kimiz',
        paragraphs: [
          `mythoside.com, İstanbul'da bireysel geliştirici olarak çalışan Barış Salih Babacan tarafından yayımlanır. İletişim: ${CONTACT}. Siteyi kullanarak ya da bekleme listesine katılarak bu şartları kabul etmiş olursun.`,
        ],
      },
      {
        heading: 'Bekleme listesi',
        paragraphs: [
          'Listeye katılmak ücretsizdir; sana Mythos’u satın alma, edinme ya da kullanma hakkı vermez ve bir çıkış tarihi, fiyat ya da özellik taahhüdü içermez. Mythos erken geliştirme aşamasındadır ve sitede anlatılan planlar değişebilir.',
          'Listeye yalnızca sana ait bir e-posta adresiyle katıl. Otomatik ya da kötüye kullanım amaçlı görünen kayıtları silebiliriz. Adresini nasıl işlediğimiz aydınlatma metninde yazıyor.',
        ],
      },
      {
        heading: 'Fiyat ve ürün',
        paragraphs: [
          'Sitedeki hiçbir ifade satış teklifi değildir. Fiyat ve satış şartları lansmanda yayımlanacak; Mythos o zaman gösterilen şartlarla satın alınabilecek.',
        ],
      },
      {
        heading: 'Kaynak kodu ve Mythos adı',
        paragraphs: [
          'Sitenin kaynak kodu MIT lisanslıdır. Mythos motoru ve uygulaması Functional Source License 1.1 (ALv2 Future License) ile kaynak kodu erişilebilir olarak yayımlanır; ayrıntılar GitHub’daki depolarda. Mythos adı ve logosu bu lisansların kapsamında değildir ve onay ya da ortaklık izlenimi verecek şekilde kullanılamaz.',
        ],
      },
      {
        heading: 'Garanti yok',
        paragraphs: [
          'Site olduğu gibi sunulur. Doğru ve erişilebilir tutmaya çalışırız ama bunu garanti etmeyiz. Hukukun izin verdiği ölçüde, siteyi kullanmaktan ya da içeriğine güvenmekten doğan zararlardan sorumlu değiliz. Bu hüküm, sözleşmeyle sınırlanamayan tüketici haklarını sınırlamaz.',
        ],
      },
      {
        heading: 'Değişiklikler ve uygulanacak hukuk',
        paragraphs: [
          'Bu şartları güncelleyebiliriz; yukarıdaki tarih en son sürümü gösterir. Şartlara Türkiye Cumhuriyeti hukuku uygulanır ve İstanbul mahkemeleri ile icra daireleri yetkilidir; bulunduğun yerdeki emredici tüketici hükümleri saklıdır.',
        ],
      },
    ],
  },
}
