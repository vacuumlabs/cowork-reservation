import { Tabs, Tab, Divider } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import {
  ListProps,
  List,
  Datagrid,
  TextField,
  EmailField,
  ReferenceField,
  EditButton,
  DatagridProps,
  Identifier,
  useListContext,
  ListContextProvider,
  useGetIdentity,
} from 'react-admin'

const tabs = [
  { id: 'tenantAdmin', name: 'Admins' },
  { id: 'employee', name: 'employees' },
]

const TabbedDatagrid = (props: DatagridProps) => {
  const listContext = useListContext()
  const { ids, filterValues, setFilters, displayedFilters } = listContext
  const [admins, setAdmins] = useState<Identifier[]>([] as Identifier[])
  const [employees, setEmployees] = useState<Identifier[]>([] as Identifier[])
  const { identity } = useGetIdentity()
  useEffect(() => {
    if (ids && ids !== filterValues.role) {
      switch (filterValues.role) {
        case 'tenantAdmin':
          setAdmins(ids)
          break
        case 'employee':
          setEmployees(ids)
          break
      }
    }
  }, [ids, filterValues.role])

  const handleChange = useCallback(
    (event: React.ChangeEvent<{}>, value: string) => {
      setFilters &&
        setFilters(
          { ...filterValues, role: value, tenantId: identity?.tenantId },
          displayedFilters
        )
    },
    [displayedFilters, filterValues, setFilters]
  )

  return (
    <Fragment>
      <Tabs
        variant="fullWidth"
        centered
        value={filterValues.role}
        indicatorColor="primary"
        onChange={handleChange}
      >
        {tabs.map((choice) => (
          <Tab key={choice.id} label={choice.name} value={choice.id} />
        ))}
      </Tabs>
      <Divider />
      {filterValues.role === 'tenantAdmin' && (
        <ListContextProvider value={{ ...listContext, ids: admins }}>
          <Datagrid {...props} rowClick="show">
            <TextField source="name" />
            <EmailField source="email" />
            <ReferenceField
              source="tenantId"
              reference="tenants"
              link={false}
              label="Tenant"
            >
              <TextField source="name" />
            </ReferenceField>
            <EditButton />
          </Datagrid>
        </ListContextProvider>
      )}
      {filterValues.role === 'employee' && (
        <ListContextProvider value={{ ...listContext, ids: employees }}>
          <Datagrid {...props} rowClick="show">
            <TextField source="name" />
            <EmailField source="email" />
            <ReferenceField
              source="tenantId"
              reference="tenants"
              link={false}
              label="Tenant"
            >
              <TextField source="name" />
            </ReferenceField>
            <EditButton />
          </Datagrid>
        </ListContextProvider>
      )}
    </Fragment>
  )
}

const UserList: (props: ListProps) => JSX.Element = (props) => {
  const { identity } = useGetIdentity()
  let filterValues = {}
  {
    identity?.role === 'SUPER_ADMIN'
      ? (filterValues = { role: 'tenantAdmin' })
      : (filterValues = { role: 'tenantAdmin', tenantId: identity?.tenantId })
  }
  return (
    <List
      {...props}
      filterDefaultValues={filterValues}
      sort={{ field: 'id', order: 'DESC' }}
      perPage={25}
    >
      <TabbedDatagrid />
    </List>
  )
}

export default UserList
