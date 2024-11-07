import React, { FC, useContext, useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/response/IUser';
import UserService from './services/UserService';

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [store]);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  if (store.isLoading) {
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!store.isAuth) {
    return (
      <div className="App">
        <h1>Please register/login to proceed</h1>
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="ResDIV">
      <h1>{store.isAuth ? `You authorized by: ${store.user.email}` : `Need to login`}</h1>
      <div className="ver">
        <p>{store.user.isActivated ? `Account verified` : `Verify your account by email!`}</p>
      </div>
      <button className='logout' onClick={() => store.logout()}>Logout</button>
      <button className='getusers' onClick={getUsers}>Get All Users</button>
      {users.map(user => <div className='usersdiv' key={user.email}>{user.email}</div>)}
    </div>
  );
};

export default observer(App);
