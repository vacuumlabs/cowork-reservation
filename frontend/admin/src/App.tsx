import React from 'react'
import { Admin, Resource, ListGuesser } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'

import { CompanyInfo, CompanyList } from './components/companies'

const dataProvider = jsonServerProvider(
  'https://my-json-server.typicode.com/Bandius/myJsonServer'
)

const App: React.FC = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="companies" list={CompanyList} show={CompanyInfo} />
    <Resource name="users" list={ListGuesser} />
  </Admin>
)

export default App
