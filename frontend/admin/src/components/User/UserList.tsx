import { Tabs, Tab, Divider } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
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
import { UserRole } from 'shared/models'

const tabs = [
  { id: UserRole.TENANT_ADMIN, name: 'Admins' },
  { id: UserRole.USER, name: 'Employees' },
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
        case UserRole.TENANT_ADMIN:
          setAdmins(ids)
          break
        case UserRole.USER:
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
    <>
      <Tabs
        variant="fullWidth"
        centered
        value={filterValues.role}
        indicatorColor="primary"
        onChange={handleChange}
      >
        {tabs.map((tab) => (
          <Tab key={tab.id} label={tab.name} value={tab.id} />
        ))}
      </Tabs>
      <Divider />
      <ListContextProvider
        value={{
          ...listContext,
          ids: filterValues.role === UserRole.TENANT_ADMIN ? admins : employees,
        }}
      >
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
    </>
  )
}

const UserList: (props: ListProps) => JSX.Element = (props) => {
  const { identity } = useGetIdentity()
  const filterValues = {
    role: UserRole.TENANT_ADMIN,
    ...(identity?.role === UserRole.TENANT_ADMIN
      ? { tenantId: identity?.tenantId }
      : {}),
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
