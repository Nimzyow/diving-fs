import React from "react";
import { SimpleForm, TextInput, Create } from "react-admin";

const AddressCreate = (props: unknown) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="line1" />
      <TextInput source="line2" />
      <TextInput source="county" />
      <TextInput source="postcode" />
      <TextInput source="country" />
    </SimpleForm>
  </Create>
);

export default AddressCreate;
