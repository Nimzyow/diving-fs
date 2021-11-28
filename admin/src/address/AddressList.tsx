import React from "react";

import {
  ReferenceField,
  List,
  Datagrid,
  TextField,
  DateField,
} from "react-admin";

const AddressList = (props: unknown) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="line1" />
        <TextField source="line2" />
        <TextField source="county" />
        <TextField source="postcode" />
        <TextField source="country" />
        <DateField source="createdAt" resource="commands" />
        <DateField source="updatedAt" resource="commands" />
        <ReferenceField label="User" source="userId" reference="user">
          <TextField source="firstName" />
        </ReferenceField>
      </Datagrid>
    </List>
  );
};

export default AddressList;
