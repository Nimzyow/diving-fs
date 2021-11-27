import React from "react";
import { List, Datagrid, TextField, EmailField } from "react-admin";

const UserList = (props: unknown) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      {/* <TextField source="role" /> */}
      <EmailField source="email" />
      {/* <BooleanField source="hidden" /> */}
    </Datagrid>
  </List>
);

export default UserList;
