import { createRootRoute, createRoute, createRouter, ErrorComponent } from '@tanstack/react-router'
import { MainLayoutPage } from './components/pages/MainLayoutPage'
import { LoginPage } from './features/login/page/LoginPage'
import { UserLayoutPage } from './components/pages/UserLayoutPage'
import { DashboardPage } from './features/dashboard/page/DashboardPage'
import { ListingPage } from './components/pages/ListingPage'
import { AddPage } from './components/pages/AddPage'
import { ViewPage } from './components/pages/ViewPage'
import { EditPage } from './components/pages/EditPage'
import NotFoundPage from './components/pages/NotFoundPage'

const rootRoute = createRootRoute({
  component: MainLayoutPage,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorComponent,
})
const userLayoutRouter = createRoute({
  component: UserLayoutPage,
  id: 'user-layout',
  getParentRoute: () => rootRoute,
})

const routeTree = rootRoute.addChildren([
  createRoute({ getParentRoute: () => rootRoute, path: '/login', component: LoginPage }),
  userLayoutRouter.addChildren([
    createRoute({
      getParentRoute: () => userLayoutRouter,
      path: '/',
      component: DashboardPage,
    }),
    createRoute({
      getParentRoute: () => userLayoutRouter,
      path: '$feature',
      component: ListingPage,
    }),
    createRoute({
      getParentRoute: () => userLayoutRouter,
      path: '$feature/add',
      component: AddPage,
    }),
    createRoute({
      getParentRoute: () => userLayoutRouter,
      path: '$feature/$id/view',
      component: ViewPage,
    }),
    createRoute({
      getParentRoute: () => userLayoutRouter,
      path: '$feature/$id/edit',
      component: EditPage,
    }),
  ]),
])

const router = createRouter({ routeTree })

export { router }
