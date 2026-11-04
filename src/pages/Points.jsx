import { useEffect } from 'react'
import AOS from 'aos'
import Layout from '../components/Layout'
import { useTasks } from '../hooks/useTasks'
import { PRIORITY_MAP, PRIORITIES } from '../utils/priorities'

export default function Points() {
  const { doneTasks, earnedPoints, missTasks, waitingTasks } = useTasks()

  useEffect(() => {
    AOS.refresh()
  }, [doneTasks.length])

  const byPriority = PRIORITIES.map((p) => {
    const list = doneTasks.filter((t) => t.priority === p.id)
    return {
      ...p,
      count: list.length,
      totalPoints: list.reduce((sum, t) => sum + (t.price ?? p.points), 0),
    }
  })

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8" data-aos="fade-up" data-aos-duration="800">
          <h1 className="font-display text-3xl text-ink sm:text-4xl">Points</h1>
          <p className="mt-2 text-muted">
            Points come from done tasks — Low 1 · Medium 2 · High 3 · Must 5.
          </p>
        </div>

        <div
          className="mb-10 grid gap-4 sm:grid-cols-3"
          data-aos="fade-up"
          data-aos-duration="900"
        >
          <Stat label="Total points" value={earnedPoints} />
          <Stat label="Done" value={doneTasks.length} />
          <Stat label="Waiting / Miss" value={`${waitingTasks.length} / ${missTasks.length}`} />
        </div>

        <div
          className="mb-10 overflow-x-auto border border-primary/10 bg-white/75"
          data-aos="fade-up"
          data-aos-duration="900"
          data-aos-delay="80"
        >
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="border-b border-primary/15 bg-primary-soft/60">
              <tr>
                <th className="px-4 py-3 font-semibold text-primary-dark">Priority</th>
                <th className="px-4 py-3 font-semibold text-primary-dark">Pts each</th>
                <th className="px-4 py-3 font-semibold text-primary-dark">Done count</th>
                <th className="px-4 py-3 font-semibold text-primary-dark">Points</th>
              </tr>
            </thead>
            <tbody>
              {byPriority.map((row) => (
                <tr key={row.id} className="border-b border-primary/8">
                  <td className="px-4 py-3 font-medium">{row.label}</td>
                  <td className="px-4 py-3 text-muted">{row.points}</td>
                  <td className="px-4 py-3">{row.count}</td>
                  <td className="px-4 py-3 font-semibold text-primary">{row.totalPoints}</td>
                </tr>
              ))}
              <tr className="bg-primary/5 font-semibold">
                <td className="px-4 py-3" colSpan={3}>
                  Total
                </td>
                <td className="px-4 py-3 text-primary">{earnedPoints}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div data-aos="fade-up" data-aos-duration="900" data-aos-delay="120">
          <h2 className="mb-4 font-display text-2xl text-ink">Done tasks</h2>
          {doneTasks.length === 0 ? (
            <p className="border border-dashed border-primary/25 px-4 py-8 text-center text-muted">
              No finished tasks yet — mark something done to earn points.
            </p>
          ) : (
            <div className="overflow-x-auto border border-primary/10 bg-white/75">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="border-b border-primary/15 bg-primary-soft/60">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-primary-dark">Task</th>
                    <th className="px-4 py-3 font-semibold text-primary-dark">Priority</th>
                    <th className="px-4 py-3 font-semibold text-primary-dark">Daily</th>
                    <th className="px-4 py-3 font-semibold text-primary-dark">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {doneTasks.map((task) => (
                    <tr key={task.id} className="border-b border-primary/8">
                      <td className="px-4 py-3 font-medium">{task.title || task.name}</td>
                      <td className="px-4 py-3 capitalize">
                        {PRIORITY_MAP[task.priority]?.label ?? task.priority}
                      </td>
                      <td className="px-4 py-3">{task.daily ? 'Yes' : 'No'}</td>
                      <td className="px-4 py-3 font-semibold text-primary">
                        {task.price ?? PRIORITY_MAP[task.priority]?.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

function Stat({ label, value }) {
  return (
    <div className="border border-primary/10 bg-white/70 px-5 py-6">
      <p className="text-xs font-semibold tracking-wider text-muted uppercase">{label}</p>
      <p className="mt-2 font-display text-3xl text-primary">{value}</p>
    </div>
  )
}
