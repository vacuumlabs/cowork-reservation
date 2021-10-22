import React from 'react'
import { Admin, Resource } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'

import { CompanyShow, CompanyList } from './components/Companies'
import { UserList } from './components/Users'

const dataProvider = jsonServerProvider(
  'https://my-json-server.typicode.com/Bandius/myJsonServer'
)

const App: React.FC = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="companies" list={CompanyList} show={CompanyShow} />
    <Resource name="users" list={UserList} />
  </Admin>
)

export default App
