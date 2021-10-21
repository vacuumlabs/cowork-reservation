import React from 'react'
import {
  TextField,
  EmailField,
  List,
  Datagrid,
  Show,
  TabbedShowLayout,
  Tab,
} from 'react-admin'

// eslint-disable-next-line
export const CompanyList = (props) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <TextField source="phone" />
      <EmailField source="email" />
    </Datagrid>
  </List>
)

const CompanyTitle = ({ record }) => {
  return <span>{record ? `${record.name}` : ''}</span>
}
// eslint-disable-next-line
export const CompanyInfo = (props) => (
  <Show title={<CompanyTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="Info">
        <TextField source="name" label="" />
        <TextField source="email" label="Tenant admin email:" />
      </Tab>
      <Tab label="people"></Tab>
    </TabbedShowLayout>
  </Show>
)
