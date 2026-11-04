import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Icon } from '@iconify/react'

const links = [
  { to: '/home', label: 'Home' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/points', label: 'Points' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav
      className="sticky top-0 z-50 border-b border-primary/15 bg-paper/90 backdrop-blur-md"
      data-aos="fade-down"
      data-aos-duration="800"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <Link to="/" className="font-brand text-2xl tracking-wide text-primary sm:text-3xl">
          restack
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `font-body text-sm font-medium transition-colors ${
                    isActive ? 'text-primary' : 'text-muted hover:text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-primary md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon icon={open ? 'carbon:close' : 'eva:menu-outline'} className="text-2xl" />
        </button>
      </div>

      {open && (
        <div className="border-t border-primary/10 bg-paper px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block py-1 text-base font-medium ${
                      isActive ? 'text-primary' : 'text-muted'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
