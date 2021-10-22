import React from 'react'
import {
  TextField,
  EmailField,
  List,
  Datagrid,
  Show,
  TabbedShowLayout,
  Tab,
  ListProps,
  ShowProps,
  ResourceContextProvider,
} from 'react-admin'

import { Company } from '../models'
import { UserList } from './Users'

export const CompanyList: (props: ListProps) => JSX.Element = (props) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <TextField source="phone" />
      <EmailField source="email" />
    </Datagrid>
  </List>
)

const CompanyTitle = ({ record }: { record?: Company }) => (
  <span>{record ? record.name : 'Company'}</span>
)

export const CompanyShow: (props: ShowProps) => JSX.Element = (props) => {
  console.log(props)
  return (
    <Show title={<CompanyTitle />} {...props}>
      <TabbedShowLayout>
        <Tab label="Info">
          <TextField source="name" label="" />
          <TextField source="email" label="Tenant admin email:" />
        </Tab>
        <Tab label="people">
          <ResourceContextProvider value="users">
            <UserList {...props} />
          </ResourceContextProvider>
        </Tab>
      </TabbedShowLayout>
    </Show>
  )
}
