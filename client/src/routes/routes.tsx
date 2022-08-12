import { lazy } from 'solid-js'

const routes = [
  {
    path: '/',
    component: lazy(() => import('../pages/Home')),
    linkText: 'Home',
    excludeFromNav: true,
  },
  {
    path: '/ohm',
    component: lazy(() => import('../pages/OhmsLaw/OhmsLaw')),
    linkText: "Ohm's Law",
  },
  {
    path: '**',
    component: lazy(() => import('../pages/404')),
    linkText: '',
    excludeFromNav: true,
  },
]

export default routes
