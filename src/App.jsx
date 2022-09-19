import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import UsersForm from "./components/UsersForm";
import UsersList from "./components/UsersList";
import "./App.css";

function App() {

  const [users, setUsers] = useState([]);

  const [userSelected, setUserSelected] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

 /***** FUNCTION useEffect *****/

  useEffect(() => {
    axios
      .get(`https://users-crud1.herokuapp.com/users/`)
      .then(res => setUsers(res.data))
      .finally(() => setIsLoading(!isLoading));
  }, []);

  const getUsers = () => {
    axios
      .get(`https://users-crud1.herokuapp.com/users/`)
      .then((res) => setUsers(res.data));
  };
 
  
  const selectUser = (user) => {
    setUserSelected(user);
    toggleModal('modal');
  };

  const deselectUser = () => setUserSelected(null);

  const openModal = (container) => {
    
    deselectUser();

    toggleModal(container);

  }

  return (
    <>
      { isLoading ? 
      (<span class="loader"></span>) 
      :
      (
        <>
          <nav>
            <h1><i className="fa-solid fa-user-gear"></i> Users</h1>
            <div>
                <a href="#" role="button" onClick={() => openModal('modal')}><i className="fa-solid fa-plus"></i> Add User</a>
            </div>
          </nav>
          <UsersForm
            getUsers={getUsers}
            userSelected={userSelected}
            deselectUser={deselectUser}
          />
          <UsersList
            selectUser={selectUser}
            users={users}
            getUsers={getUsers}
          />
        </>
      )
      }
    </>
  );
}

export default App;