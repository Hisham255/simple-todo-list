import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import AOS from 'aos'
import Layout from '../components/Layout'
import TaskForm from '../components/TaskForm'
import { useTasks } from '../hooks/useTasks'

export default function Home() {
  const { waitingTasks, addTask, earnedPoints } = useTasks()

  useEffect(() => {
    AOS.refresh()
  }, [])

  return (
    <Layout>
      <section className="relative overflow-hidden border-b border-primary/10">
        <div
          className="absolute inset-0 bg-linear-to-br from-primary-dark via-primary to-primary-light"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'repeating-linear-gradient(115deg, transparent, transparent 22px, rgba(255,255,255,0.06) 22px, rgba(255,255,255,0.06) 23px)',
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p
            className="font-brand text-4xl text-white sm:text-5xl"
            data-aos="fade-right"
            data-aos-duration="900"
          >
            restack
          </p>
          <h1
            className="mt-4 font-display text-3xl text-leaf sm:text-4xl"
            data-aos="fade-up"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            You have {waitingTasks.length} waiting{' '}
            {waitingTasks.length === 1 ? 'task' : 'tasks'}
          </h1>
          <p
            className="mt-3 max-w-lg text-white/75"
            data-aos="fade-up"
            data-aos-duration="900"
            data-aos-delay="180"
          >
            {waitingTasks.length === 0
              ? 'Nothing waiting — add something below, or check your points.'
              : 'Focus on what is still open, then stack a new one when you are ready.'}
          </p>
          <div
            className="mt-6 flex flex-wrap gap-4 text-sm text-leaf/90"
            data-aos="fade-up"
            data-aos-duration="900"
            data-aos-delay="260"
          >
            <span className="inline-flex items-center gap-1.5">
              <Icon icon="solar:cup-star-bold" />
              {earnedPoints} points earned
            </span>
            <Link to="/tasks" className="underline-offset-4 hover:underline">
              View all tasks
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-6" data-aos="fade-up" data-aos-duration="800">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">Add a task</h2>
          <p className="mt-1 text-sm text-muted">
            Set priority and mark it daily if it should reset each morning.
          </p>
        </div>
        <div data-aos="fade-up" data-aos-duration="900" data-aos-delay="80">
          <TaskForm onSubmit={addTask} />
        </div>

        {waitingTasks.length > 0 && (
          <div className="mt-12" data-aos="fade-up" data-aos-duration="900">
            <h2 className="mb-4 font-display text-2xl text-ink">Waiting now</h2>
            <ul className="divide-y divide-primary/10 border border-primary/10 bg-white/60">
              {waitingTasks.slice(0, 5).map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                >
                  <span className="font-medium text-ink">{task.title || task.name}</span>
                  <span className="text-xs tracking-wide text-muted uppercase">
                    {task.priority}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </Layout>
  )
}
