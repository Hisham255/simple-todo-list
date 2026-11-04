import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import AOS from 'aos'
import Layout from '../components/Layout'

export default function Welcome() {
  useEffect(() => {
    AOS.refresh()
  }, [])

  return (
    <Layout>
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(21,95,21,0.18),transparent_55%),linear-gradient(135deg,#0d3d0d_0%,#155f15_45%,#1f7a1f_100%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-12deg, transparent, transparent 18px, rgba(255,255,255,0.04) 18px, rgba(255,255,255,0.04) 19px)',
          }}
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6">
          <p
            className="font-brand text-5xl text-white sm:text-7xl md:text-8xl"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            restack
          </p>
          <h1
            className="mt-6 max-w-xl font-display text-3xl leading-tight text-leaf sm:text-4xl md:text-5xl"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="120"
          >
            Clear the wait. Stack the wins.
          </h1>
          <p
            className="mt-5 max-w-md text-base leading-relaxed text-white/75 sm:text-lg"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="220"
          >
            A simple place for waiting tasks, daily habits, and the points you earn when you finish.
          </p>
          <div
            className="mt-10"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="320"
          >
            <Link
              to="/home"
              className="inline-flex items-center gap-2 bg-white px-7 py-3.5 text-sm font-semibold text-primary transition hover:bg-leaf"
            >
              Get started
              <Icon icon="solar:arrow-right-linear" className="text-lg" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
