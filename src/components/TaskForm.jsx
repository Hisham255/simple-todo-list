import { useState } from 'react'
import { Icon } from '@iconify/react'
import { PRIORITIES } from '../utils/priorities'

const empty = { title: '', priority: 'medium', daily: false }

export default function TaskForm({ onSubmit, initial = empty, submitLabel = 'Add task', onCancel }) {
  const [form, setForm] = useState({ ...empty, ...initial })

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) return
    onSubmit({
      title: form.title.trim(),
      priority: form.priority,
      daily: form.daily,
    })
    if (!initial.title) setForm(empty)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-primary/15 bg-white/70 p-5 shadow-[0_12px_40px_rgba(21,95,21,0.06)] backdrop-blur-sm sm:p-6"
    >
      <label className="mb-2 block text-xs font-semibold tracking-wider text-muted uppercase">
        Task
      </label>
      <input
        type="text"
        value={form.title}
        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        placeholder="What needs stacking?"
        className="mb-5 w-full border-b border-primary/25 bg-transparent py-2 text-base outline-none transition focus:border-primary"
        required
      />

      <p className="mb-2 text-xs font-semibold tracking-wider text-muted uppercase">Priority</p>
      <div className="mb-5 flex flex-wrap gap-2">
        {PRIORITIES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setForm((f) => ({ ...f, priority: p.id }))}
            className={`border px-3 py-1.5 text-sm transition ${
              form.priority === p.id
                ? 'border-primary bg-primary text-white'
                : 'border-primary/20 bg-transparent text-ink hover:border-primary/50'
            }`}
          >
            {p.label}
            <span className="ml-1 opacity-70">· {p.points}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setForm((f) => ({ ...f, daily: !f.daily }))}
        className={`mb-6 inline-flex items-center gap-2 border px-3 py-1.5 text-sm transition ${
          form.daily
            ? 'border-primary bg-primary-soft text-primary'
            : 'border-primary/20 text-muted hover:border-primary/40'
        }`}
      >
        <Icon icon={form.daily ? 'solar:calendar-bold' : 'solar:calendar-outline'} />
        Daily task
      </button>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-light"
        >
          <Icon icon="solar:add-circle-bold" className="text-lg" />
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 text-sm text-muted hover:text-ink"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
