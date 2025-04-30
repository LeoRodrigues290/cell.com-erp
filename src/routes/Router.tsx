import { lazy } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import Loadable from 'src/layouts/full/shared/loadable/Loadable'
import { PrivateRoute } from 'src/firebase/PrivateRoute'

// Layouts
const FullLayout  = Loadable(lazy(() => import('src/layouts/full/FullLayout')))
const BlankLayout = Loadable(lazy(() => import('src/layouts/blank/BlankLayout')))

// Dashboard
const Dashboard  = Loadable(lazy(() => import('src/views/dashboards/Dashboard')))

// Views
const Produtos      = Loadable(lazy(() => import('src/views/produtos')))
const Servicos      = Loadable(lazy(() => import('src/views/servicos')))
const Pedidos       = Loadable(lazy(() => import('src/views/pedidos')))
const Lembretes     = Loadable(lazy(() => import('src/views/lembretes')))
const SearchResults = Loadable(lazy(() => import('src/views/search/SearchResults')))
const Typography    = Loadable(lazy(() => import('src/views/typography/Typography')))
const Table         = Loadable(lazy(() => import('src/views/tables/Table')))
const Form          = Loadable(lazy(() => import('src/views/forms/Form')))
const Shadow        = Loadable(lazy(() => import('src/views/shadows/Shadow')))
const Solar         = Loadable(lazy(() => import('src/views/icons/Solar')))

// Auth
const Login      = Loadable(lazy(() => import('src/views/auth/login/Login')))
const Register   = Loadable(lazy(() => import('src/views/auth/register/Register')))
const SamplePage = Loadable(lazy(() => import('src/views/sample-page/SamplePage')))
const Error404   = Loadable(lazy(() => import('src/views/auth/error/Error')))

const routes = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'produtos',     element: <PrivateRoute><Produtos/></PrivateRoute> },
      { path: 'servicos',     element: <PrivateRoute><Servicos/></PrivateRoute> },
      { path: 'pedidos',      element: <PrivateRoute><Pedidos/></PrivateRoute> },
      { path: 'lembretes',    element: <PrivateRoute><Lembretes/></PrivateRoute> },
      { path: 'search',       element: <PrivateRoute><SearchResults/></PrivateRoute> },
      { path: 'ui/typography',element: <Typography/> },
      { path: 'ui/table',     element: <Table/> },
      { path: 'ui/form',      element: <Form/> },
      { path: 'ui/shadow',    element: <Shadow/> },
      { path: 'icons/solar',  element: <Solar/> },
      { path: 'sample-page',  element: <SamplePage/> },
      { path: '*',            element: <Navigate to="/auth/404" replace /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: 'auth/login',    element: <Login/> },
      { path: 'auth/register', element: <Register/> },
      { path: '404',           element: <Error404/> },
      { path: 'auth/404',      element: <Error404/> },
      { path: '*',             element: <Navigate to="/auth/404" replace /> },
    ],
  },
]

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
})

export default router
