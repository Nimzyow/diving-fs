import React from "react";
import {
  SimpleForm,
  TextInput,
  Create,
  BooleanInput,
  SelectInput,
} from "react-admin";

const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="email" />
      <TextInput source="password" />
      <SelectInput
        source="role"
        choices={[
          { id: "admin", name: "Admin" },
          { id: "user", name: "User" },
        ]}
      />
      {/* <BooleanInput source="hidden" /> */}
    </SimpleForm>
  </Create>
);

export default UserCreate;
