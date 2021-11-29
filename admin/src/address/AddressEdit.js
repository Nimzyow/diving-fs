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

const AddressesEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="line1" />
      <TextInput source="line2" />
      <TextInput source="county" />
      <TextInput source="postcode" />
      <TextInput source="country" />
      <TextInput source="userId" />
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

export default AddressesEdit;
