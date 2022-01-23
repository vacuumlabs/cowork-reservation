import React from 'react'
import {
  Datagrid,
  EditButton,
  ReferenceField,
  ReferenceManyField,
  Show,
  ShowProps,
  SimpleShowLayout,
  TextField,
} from 'react-admin'

import { Building } from '../../models'

const BuildingTitle = ({ record }: { record?: Building }) => (
  <span>{record ? record.name : 'Building'}</span>
)

const BuildingShow: (props: ShowProps) => JSX.Element = (props) => (
  <Show {...props} title={<BuildingTitle />}>
    <SimpleShowLayout>
      <TextField source="name" />
      <ReferenceField label="City" reference="cities" source="cityId">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="address" />
      <ReferenceManyField
        fullWidth
        label="Rooms"
        reference="rooms"
        target="buildingId"
        sort={{ field: 'id', order: 'ASC' }}
      >
        <Datagrid rowClick="show">
          <TextField source="name" />
          <TextField source="floor" />
          <TextField source="capacity" />
          <TextField source="equipment" />
          <EditButton />
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
)

export default BuildingShow
