import axios from "axios";
import React from "react";

const UsersList = ({ users, selectUser, getUsers }) => {
  
  /***** FUNTION DELETE USER *****/

  const deleteUser = (id) => {

    axios
      .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(() => getUsers())
      .finally(() => toggleModal('delete-user'));

  };

  return (
    <>
    <dialog id="delete-user">
      <article>
          <a href="#close" onClick={() => toggleModal('delete-user')} className="close"></a>
          <h4>
            <i class="fa-solid fa-circle-check"></i> 
            Usuario eliminado
          </h4>
      </article>
    </dialog>
      <ul >
       {users.map((user) => (

          <li key={user.id}>
            <hgroup>
                <h3>{user.first_name}</h3>
                <div>
                    <i className="fa-regular fa-pen-to-square" data-target="modal" onClick={() => selectUser(user)}></i>
                    <i className="fa-regular fa-trash-can" onClick={() => deleteUser(user.id)}></i>
                </div>
            </hgroup>
            <hr/>
            <div>
             <b> First Name: </b>              
             {user.first_name}
            </div>
            <div>
              <b> Last Name: </b>
              {user.last_name}
            </div>
            <div>
              <b>Email: </b>
              {user.email}
            </div>
            <div>
              <b> Birthday: </b>
              {user.birthday}
            </div>
          </li>
        ))}

      </ul>
    </>
  );
};

export default UsersList;
