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
import { Building } from 'shared/models'

const BuildingTitle = ({ record }: { record?: Building }) => (
  <span>{record ? record.name : 'Building'}</span>
)

const BuildingShow: (props: ShowProps) => JSX.Element = (props) => (
  <Show {...props} title={<BuildingTitle />}>
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
          <TextField source="city" />
          <ReferenceField
            label="Address"
            source="buildingId"
            reference="buildings"
            link={false}
          >
            <TextField source="address" />
          </ReferenceField>
          <EditButton />
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
)

export default BuildingShow
