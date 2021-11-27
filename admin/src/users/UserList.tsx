import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  Labeled,
  DateField,
} from "react-admin";

const UserList = (props: unknown) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <EmailField source="email" />
      <TextField source="role" />
      <DateField source="createdAt" resource="commands" />
      <DateField source="updatedAt" resource="commands" />
      {/* <BooleanField source="hidden" /> */}
    </Datagrid>
  </List>
);

export default UserList;
