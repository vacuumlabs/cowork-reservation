import React from 'react'
import { Admin, Resource } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'

import authProvider from './authProvider'
import Company from './components/Company'
import User from './components/User'
import { MyCompanyList } from './components/MyCompany'

const dataProvider = jsonServerProvider(
  'https://my-json-server.typicode.com/Bandius/myJsonServer'
)

const App: React.FC = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    {localStorage.getItem('permissions') == 'superadmin' ? (
      <Resource
        name="companies"
        {...Company}
        options={{ label: 'Organisations' }}
      />
    ) : (
      <Resource
        name="companies"
        list={MyCompanyList}
        options={{ label: 'My company' }}
      />
    )}
    <Resource name="users" {...User} options={{ label: 'Tenant Admins' }} />
  </Admin>
)

export default App
