import { useEffect, useRef } from 'react'
import { useCart } from 'react-use-cart'
import { STATUS, todayKey } from '../utils/priorities'

/** Resets daily tasks to waiting once per calendar day. */
export default function DailyReset({ children }) {
  const { items, setItems, metadata, updateCartMetadata } = useCart()
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const today = todayKey()
    if (metadata?.lastResetDate === today) return

    const next = items.map((item) => {
      if (item.daily && item.status !== STATUS.waiting) {
        return { ...item, status: STATUS.waiting }
      }
      return item
    })

    const changed = next.some((item, i) => item.status !== items[i]?.status)
    if (changed) setItems(next)
    updateCartMetadata({ lastResetDate: today })
    // Intentionally once on mount after cart hydrates from localStorage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return children
}
