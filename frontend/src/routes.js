import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))
const Charts = React.lazy(() => import('./views/charts/Charts'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
const Brokerage = React.lazy(() => import('./views/brokerage/Brokerage'))
const Shares = React.lazy(() => import('./views/shares/Shares'))
const Purchase = React.lazy(() => import('./views/purchase/Purchase'))
const Sales = React.lazy(() => import('./views/sales/Sales'))

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/brokerage', name: 'Brokerage', element: Brokerage },
  { path: '/shares', name: 'Shares', element: Shares },
  { path: '/purchase', name: 'Purchase', element: Purchase },
  { path: '/sales', name: 'Sales', element: Sales },
]

export default routes
