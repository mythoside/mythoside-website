import { T } from '@/i18n/T'
import type { MessageKey } from '@/i18n/messages'

export interface CardData {
  tier: MessageKey
  price: MessageKey
  sub: MessageKey
  items: readonly MessageKey[]
  featured?: boolean
}

export function Card({ tier, price, sub, items, featured = false }: CardData) {
  return (
    <div className={featured ? 'card pro' : 'card'}>
      <T k={tier} className="tier" />
      <div className="price"><T k={price} /><T k={sub} as="small" /></div>
      <ul>
        {items.map((item) => <li key={item}><T k={item} /></li>)}
      </ul>
    </div>
  )
}
