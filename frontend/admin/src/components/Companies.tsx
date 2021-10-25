import React, { useEffect } from 'react'
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
  useQuery,
  Loading,
} from 'react-admin'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

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

const UserList = ({ record }: { record?: Company }) => {
  const { data, loading, error } = useQuery({
    type: 'getList',
    resource: 'users',
    payload: {
      pagination: { page: 1, perPage: 10 },
      sort: 'id',
      order: 'ASC',
      filter: { companyId: record?.id },
    },
  })
  if (loading) return <Loading />
  console.log(data[1].name)
  // return (
  //   <ul>
  //     {data.map((user: any, index: number) => (
  //       <li key={index}>{user.name}</li>
  //     ))}
  //   </ul>
  // )
  return (
    <Table size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((user: any) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

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
          <UserList />
        </Tab>
      </TabbedShowLayout>
    </Show>
  )
}
