import React, { useEffect } from 'react'
import { Admin, fetchUtils, Resource } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'
import simpleRestProvider from 'ra-data-simple-rest'

import { UserRole } from './models'
import authProvider, { getIdToken } from './authProvider'
import Tenant from './components/Tenant'
import User from './components/User'
import Room from './components/Room'
import Layout from './components/Layout'
import City from './components/City'
import Building from './components/Building'
import LoginPage from './components/LoginPage'

// TODO extract to env file
const USE_BACKEND_API = true
const BACKEND_URL = 'https://cowork-reservation-f43a6j7azq-ez.a.run.app'

const jsonProvider = jsonServerProvider(
  'https://my-json-server.typicode.com/Bandius/myJsonServer'
)

const httpClient: (
  url: string,
  options?: fetchUtils.Options
) => Promise<{
  status: number
  headers: Headers
  body: string
  json: string
}> = async (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' })
  }
  ;(options.headers as Headers).set('Authorization', (await getIdToken()) || '')
  return fetchUtils.fetchJson(url, options)
}
const restProvider = simpleRestProvider(BACKEND_URL, httpClient)

const dataProvider = USE_BACKEND_API ? restProvider : jsonProvider

const SUPER_ADMIN_RESOURCES = [
  <Resource
    key="tenants"
    name="tenants"
    {...Tenant}
    options={{ label: 'Tenants' }}
  />,
  <Resource
    key="users"
    name="users"
    {...User}
    options={{ label: 'Tenant Admins' }}
  />,
  <Resource key="rooms" name="rooms" {...Room} />,
  <Resource key="cities" name="cities" {...City} />,
  <Resource key="buildings" name="buildings" {...Building} />,
]

const TENANT_ADMIN_RESOURCES = [
  <Resource
    key="tenants"
    name="tenants"
    show={Tenant.show}
    options={{ label: 'Profile' }}
  />,
  <Resource key="users" name="users" {...User} options={{ label: 'Admins' }} />,
]

const USER_RESOURCES = [
  <Resource
    key="users"
    name="users"
    show={User.show}
    options={{ label: 'Profile' }}
  />,
]

const App: React.FC = () => {
  // TEMP console.log firebase idToken for dev purposes
  useEffect(() => {
    const logIdToken = async () => {
      // eslint-disable-next-line no-console
      console.log(await getIdToken())
    }

    if (process.env.NODE_ENV === 'development') {
      logIdToken()
    }
  }, [])

  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
      layout={Layout}
    >
      {(permissions) =>
        permissions === UserRole.SUPER_ADMIN
          ? SUPER_ADMIN_RESOURCES
          : permissions === UserRole.TENANT_ADMIN
          ? TENANT_ADMIN_RESOURCES
          : USER_RESOURCES
      }
    </Admin>
  )
}

export default App
