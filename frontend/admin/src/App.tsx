import React, { useEffect } from 'react'
import { Admin, Resource } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'

import authProvider, { getIdToken } from './authProvider'
import Tenant from './components/Tenant'
import User from './components/User'
import Room from './components/Room'
import Layout from './components/Layout'
import { UserRole } from './models'

const dataProvider = jsonServerProvider(
  'https://my-json-server.typicode.com/Bandius/myJsonServer'
)

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
      layout={Layout}
    >
      {(permissions) =>
        permissions === UserRole.SUPER_ADMIN
          ? [
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
              <Resource
                key="rooms"
                name="rooms"
                {...Room}
                options={{ label: 'Rooms' }}
              />,
            ]
          : [
              <Resource
                key="tenants"
                name="tenants"
                show={Tenant.show}
                options={{ label: 'Profile' }}
              />,
              <Resource
                key="users"
                name="users"
                {...User}
                options={{ label: 'Tenant Admins' }}
              />,
            ]
      }
    </Admin>
  )
}

export default App
