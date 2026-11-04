import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-primary/15 bg-primary-dark text-primary-soft">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div data-aos="fade-up" data-aos-duration="900">
          <h2 className="font-brand text-3xl text-white">restack</h2>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-leaf/80">
            Stack your day, clear what waits, and earn points for every finish.
          </p>
        </div>

        <div data-aos="fade-up" data-aos-duration="900" data-aos-delay="80">
          <h3 className="mb-3 text-xs font-semibold tracking-[0.2em] text-leaf/60 uppercase">
            Navigate
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link to="/home" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/tasks" className="hover:text-white">
                Tasks
              </Link>
            </li>
            <li>
              <Link to="/points" className="hover:text-white">
                Points
              </Link>
            </li>
          </ul>
        </div>

        <div data-aos="fade-up" data-aos-duration="900" data-aos-delay="160">
          <h3 className="mb-3 text-xs font-semibold tracking-[0.2em] text-leaf/60 uppercase">
            Focus
          </h3>
          <p className="flex items-start gap-2 text-sm text-leaf/80">
            <Icon icon="solar:leaf-bold" className="mt-0.5 text-lg text-leaf" />
            Built to keep waiting work visible and daily habits honest.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-leaf/50">
        © {new Date().getFullYear()} restack
      </div>
    </footer>
  )
}
