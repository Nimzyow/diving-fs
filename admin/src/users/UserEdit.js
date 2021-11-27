import React from "react";
import {
  Edit,
  SimpleForm,
  DateField,
  TextInput,
  SelectInput,
  Labeled,
} from "react-admin";

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
      <SelectInput
        resource="commands"
        source="role"
        choices={[
          { id: "USER", name: "USER" },
          { id: "STAFF", name: "STAFF" },
          { id: "ADMIN", name: "ADMIN" },
          { id: "SUPER_USER", name: "SUPER_USER" },
        ]}
      />
      {/* <Labeled source="date" resource="commands"> */}
      {/* </Labeled> */}
      {/* <TextInput source="role" /> */}
      {/* <BooleanInput source="hidden" /> */}
      <div>
        <Labeled label="created at">
          <DateField source="createdAt" resource="commands" />
        </Labeled>
        <Labeled label="updated at">
          <DateField source="updatedAt" resource="commands" />
        </Labeled>
      </div>
    </SimpleForm>
  </Edit>
);

export default UserEdit;
