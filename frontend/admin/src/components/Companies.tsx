import React from 'react'
import {
  TextField,
  EmailField,
  List,
  Datagrid,
  Show,
  ListProps,
  ShowProps,
  ReferenceManyField,
  EditButton,
  SimpleShowLayout,
} from 'react-admin'

import { Company } from '../models'

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
  return (
    <Show title={<CompanyTitle />} {...props}>
      <SimpleShowLayout>
        <TextField source="name" label="Name" />
        <TextField source="email" label="Email" />
        <ReferenceManyField
          fullWidth
          label="Admins"
          reference="users"
          target="companyId"
        >
          <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="email" />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  )
}
