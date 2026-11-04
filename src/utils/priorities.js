export const PRIORITIES = [
  { id: 'low', label: 'Low', points: 1 },
  { id: 'medium', label: 'Medium', points: 2 },
  { id: 'high', label: 'High', points: 3 },
  { id: 'must', label: 'Must', points: 5 },
]

export const PRIORITY_MAP = Object.fromEntries(
  PRIORITIES.map((p) => [p.id, p]),
)

export const STATUS = {
  waiting: 'waiting',
  done: 'done',
  miss: 'miss',
}

export function pointsForPriority(priority) {
  return PRIORITY_MAP[priority]?.points ?? 1
}

export function todayKey() {
  return new Date().toISOString().slice(0, 10)
}
