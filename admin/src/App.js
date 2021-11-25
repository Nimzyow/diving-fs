import { Admin, Resource } from "react-admin";
import dataProvider from "./utils/DataProvider";
import authProvider from "./utils/AuthProvider";

import "./App.css";
import UserList from "./users/UserList";
import UserEdit from "./users/UserEdit";
import UserCreate from "./users/UserCreate";
import MyLoginPage from "./pages/login/Login";

function App() {
  if (!dataProvider) {
    return <div>Loading</div>;
  }

  return (
    <Admin
      loginPage={MyLoginPage}
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      <Resource
        name="user"
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
      />
    </Admin>
  );
}

export default App;
