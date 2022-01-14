import React from 'react'
import {
  Datagrid,
  EditButton,
  ReferenceManyField,
  Show,
  ShowProps,
  SimpleShowLayout,
  TextField,
} from 'react-admin'

const BuildingShow: (props: ShowProps) => JSX.Element = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <ReferenceManyField
        fullWidth
        label="Rooms"
        reference="rooms"
        target="buildingId"
        sort={{ field: 'id', order: 'ASC' }}
      >
        <Datagrid>
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
