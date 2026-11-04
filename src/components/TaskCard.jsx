import { useState } from 'react'
import { Icon } from '@iconify/react'
import { PRIORITY_MAP } from '../utils/priorities'
import TaskForm from './TaskForm'

const statusStyles = {
  waiting: 'bg-leaf/40 text-primary-dark',
  done: 'bg-primary text-white',
  miss: 'bg-miss/15 text-miss',
}

export default function TaskCard({
  task,
  onMarkDone,
  onMarkMiss,
  onRemoveMark,
  onDelete,
  onEdit,
}) {
  const [editing, setEditing] = useState(false)
  const priority = PRIORITY_MAP[task.priority]

  if (editing) {
    return (
      <TaskForm
        initial={{
          title: task.title || task.name,
          priority: task.priority,
          daily: task.daily,
        }}
        submitLabel="Save changes"
        onCancel={() => setEditing(false)}
        onSubmit={(data) => {
          onEdit(task.id, data)
          setEditing(false)
        }}
      />
    )
  }

  return (
    <article className="border border-primary/10 bg-white/75 p-4 backdrop-blur-sm sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl text-ink">{task.title || task.name}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className={`rounded-sm px-2 py-0.5 font-medium ${statusStyles[task.status]}`}>
              {task.status}
            </span>
            <span className="border border-primary/15 px-2 py-0.5 text-muted">
              {priority?.label ?? task.priority} · {task.price ?? priority?.points} pts
            </span>
            {task.daily && (
              <span className="inline-flex items-center gap-1 text-primary">
                <Icon icon="solar:calendar-bold" />
                Daily
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {task.status !== 'done' && (
          <button
            type="button"
            onClick={() => onMarkDone(task.id)}
            className="inline-flex items-center gap-1 border border-primary/25 px-2.5 py-1.5 text-xs font-medium text-primary hover:bg-primary hover:text-white"
          >
            <Icon icon="solar:check-circle-bold" />
            Mark done
          </button>
        )}
        {task.status !== 'miss' && (
          <button
            type="button"
            onClick={() => onMarkMiss(task.id)}
            className="inline-flex items-center gap-1 border border-miss/30 px-2.5 py-1.5 text-xs font-medium text-miss hover:bg-miss hover:text-white"
          >
            <Icon icon="solar:danger-triangle-bold" />
            Mark miss
          </button>
        )}
        {task.status !== 'waiting' && (
          <button
            type="button"
            onClick={() => onRemoveMark(task.id)}
            className="inline-flex items-center gap-1 border border-muted/30 px-2.5 py-1.5 text-xs font-medium text-muted hover:border-ink hover:text-ink"
          >
            <Icon icon="solar:refresh-bold" />
            Remove mark
          </button>
        )}
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="inline-flex items-center gap-1 border border-primary/20 px-2.5 py-1.5 text-xs text-ink hover:bg-primary-soft"
        >
          <Icon icon="solar:pen-bold" />
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="inline-flex items-center gap-1 border border-miss/20 px-2.5 py-1.5 text-xs text-miss hover:bg-miss/10"
        >
          <Icon icon="solar:trash-bin-trash-bold" />
          Delete
        </button>
      </div>
    </article>
  )
}
