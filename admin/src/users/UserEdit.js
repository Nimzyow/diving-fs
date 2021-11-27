import React from "react";
import { Edit, SimpleForm, TextInput, BooleanInput } from "react-admin";

const PostTitle = ({ record }) => {
  return (
    <span>User: {record ? `${record.firstName} ${record.lastName}` : ""}</span>
  );
};

const UserEdit = (props) => (
  <Edit title={<PostTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="email" />
      {/* <BooleanInput source="hidden" /> */}
    </SimpleForm>
  </Edit>
);

export default UserEdit;
