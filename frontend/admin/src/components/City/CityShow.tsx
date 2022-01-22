import React from 'react'
import {
  ShowProps,
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceManyField,
  Datagrid,
  EditButton,
} from 'react-admin'

import { City } from '../../models'

const CityTitle = ({ record }: { record?: City }) => (
  <span>{record ? record.name : 'City'}</span>
)

const CityShow: (props: ShowProps) => JSX.Element = (props) => (
  <Show title={<CityTitle />} {...props}>
    <SimpleShowLayout>
      <TextField source="name" label="City" />
      <ReferenceManyField
        fullWidth
        label="Buildings"
        reference="buildings"
        target="cityId"
        sort={{ field: 'id', order: 'ASC' }}
      >
        <Datagrid rowClick="show">
          <TextField source="name" />
          <TextField source="address" />
          <EditButton />
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
)

export default CityShow
