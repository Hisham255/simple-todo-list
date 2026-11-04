import { useCart } from 'react-use-cart'
import { pointsForPriority, STATUS } from '../utils/priorities'

function createId() {
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function useTasks() {
  const {
    items,
    addItem,
    removeItem,
    updateItem,
    isEmpty,
    totalUniqueItems,
    metadata,
    updateCartMetadata,
    setItems,
  } = useCart()

  const tasks = items

  const waitingTasks = tasks.filter((t) => t.status === STATUS.waiting)
  const doneTasks = tasks.filter((t) => t.status === STATUS.done)
  const missTasks = tasks.filter((t) => t.status === STATUS.miss)

  const earnedPoints = doneTasks.reduce(
    (sum, t) => sum + (t.price ?? pointsForPriority(t.priority)),
    0,
  )

  function addTask({ title, priority = 'medium', daily = false }) {
    const trimmed = title.trim()
    if (!trimmed) return null

    const id = createId()
    addItem({
      id,
      name: trimmed,
      title: trimmed,
      price: pointsForPriority(priority),
      priority,
      daily: Boolean(daily),
      status: STATUS.waiting,
      createdAt: new Date().toISOString(),
    })
    return id
  }

  function editTask(id, { title, priority, daily }) {
    const payload = {}
    if (title !== undefined) {
      const trimmed = title.trim()
      if (!trimmed) return
      payload.name = trimmed
      payload.title = trimmed
    }
    if (priority !== undefined) {
      payload.priority = priority
      payload.price = pointsForPriority(priority)
    }
    if (daily !== undefined) {
      payload.daily = Boolean(daily)
    }
    updateItem(id, payload)
  }

  function deleteTask(id) {
    removeItem(id)
  }

  function markDone(id) {
    updateItem(id, { status: STATUS.done })
  }

  function markMiss(id) {
    updateItem(id, { status: STATUS.miss })
  }

  function removeMark(id) {
    updateItem(id, { status: STATUS.waiting })
  }

  return {
    tasks,
    waitingTasks,
    doneTasks,
    missTasks,
    earnedPoints,
    isEmpty,
    totalUniqueItems,
    metadata,
    updateCartMetadata,
    setItems,
    addTask,
    editTask,
    deleteTask,
    markDone,
    markMiss,
    removeMark,
  }
}
