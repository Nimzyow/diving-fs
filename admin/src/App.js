import { Admin, Resource } from "react-admin";
import dataProvider from "./utils/DataProvider";
// import authProvider from "./utils/AuthProvider";

import "./App.css";
import UserList from "./users/UserList";
import UserEdit from "./users/UserEdit";
import UserCreate from "./users/UserCreate";
import AddressList from "./address/AddressList";
import AddressEdit from "./address/AddressEdit";
import AddressCreate from "./address/AddressCreate";
// import MyLoginPage from "./pages/login/Login";

function App() {
  if (!dataProvider) {
    return <div>Loading</div>;
  }

  return (
    <Admin
      // loginPage={MyLoginPage}
      dataProvider={dataProvider}
      // authProvider={authProvider}
    >
      <Resource
        name="user"
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
      />
      <Resource
        name="address"
        list={AddressList}
        edit={AddressEdit}
        create={AddressCreate}
      />
    </Admin>
  );
}

export default App;
