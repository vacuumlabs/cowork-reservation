import React from 'react'
import {
  ListProps,
  List,
  ReferenceManyField,
  TextField,
  EditButton,
  Datagrid,
} from 'react-admin'

export const MyCompanyList: (props: ListProps) => JSX.Element = (props) => {
  const company = localStorage.getItem('company')
  return (
    <List {...props}>
      <ReferenceManyField
        fullWidth
        // filter not working beacuse of api
        filter={{ companyId: company }}
        reference="users"
        target="companyId"
        sort={{ field: 'id', order: 'ASC' }}
      >
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="email" />
          <TextField source="companyId" />
          <EditButton />
        </Datagrid>
      </ReferenceManyField>
    </List>
  )
}
