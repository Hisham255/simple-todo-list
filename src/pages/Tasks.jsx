import { useEffect, useMemo, useState } from 'react'
import AOS from 'aos'
import Layout from '../components/Layout'
import TaskCard from '../components/TaskCard'
import { useTasks } from '../hooks/useTasks'
import { PRIORITIES } from '../utils/priorities'

const statusFilters = [
  { id: 'all', label: 'All' },
  { id: 'waiting', label: 'Waiting' },
  { id: 'done', label: 'Done' },
  { id: 'miss', label: 'Miss' },
]

export default function Tasks() {
  const { tasks, markDone, markMiss, removeMark, deleteTask, editTask } = useTasks()
  const [status, setStatus] = useState('all')
  const [priority, setPriority] = useState('all')
  const [daily, setDaily] = useState('all')

  useEffect(() => {
    AOS.refresh()
  }, [tasks.length, status, priority, daily])

  const filtered = useMemo(() => {
    return tasks.filter((task) => {
      if (status !== 'all' && task.status !== status) return false
      if (priority !== 'all' && task.priority !== priority) return false
      if (daily === 'yes' && !task.daily) return false
      if (daily === 'no' && task.daily) return false
      return true
    })
  }, [tasks, status, priority, daily])

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8" data-aos="fade-up" data-aos-duration="800">
          <h1 className="font-display text-3xl text-ink sm:text-4xl">All tasks</h1>
          <p className="mt-2 text-muted">
            Filter by status, priority, and whether a task repeats daily.
          </p>
        </div>

        <div
          className="mb-8 flex flex-col gap-5 border border-primary/10 bg-white/70 p-4 sm:p-5"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="80"
        >
          <FilterRow label="Status">
            {statusFilters.map((f) => (
              <FilterChip
                key={f.id}
                active={status === f.id}
                onClick={() => setStatus(f.id)}
                label={f.label}
              />
            ))}
          </FilterRow>

          <FilterRow label="Priority">
            <FilterChip
              active={priority === 'all'}
              onClick={() => setPriority('all')}
              label="All"
            />
            {PRIORITIES.map((p) => (
              <FilterChip
                key={p.id}
                active={priority === p.id}
                onClick={() => setPriority(p.id)}
                label={p.label}
              />
            ))}
          </FilterRow>

          <FilterRow label="Daily">
            <FilterChip active={daily === 'all'} onClick={() => setDaily('all')} label="All" />
            <FilterChip active={daily === 'yes'} onClick={() => setDaily('yes')} label="Daily" />
            <FilterChip
              active={daily === 'no'}
              onClick={() => setDaily('no')}
              label="Not daily"
            />
          </FilterRow>
        </div>

        {filtered.length === 0 ? (
          <p
            className="border border-dashed border-primary/25 px-4 py-10 text-center text-muted"
            data-aos="fade-up"
          >
            No tasks match these filters.
          </p>
        ) : (
          <div className="grid gap-4" data-aos="fade-up" data-aos-duration="900">
            {filtered.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onMarkDone={markDone}
                onMarkMiss={markMiss}
                onRemoveMark={removeMark}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  )
}

function FilterRow({ label, children }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold tracking-wider text-muted uppercase">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function FilterChip({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-3 py-1.5 text-sm transition ${
        active
          ? 'border-primary bg-primary text-white'
          : 'border-primary/20 text-ink hover:border-primary/50'
      }`}
    >
      {label}
    </button>
  )
}
