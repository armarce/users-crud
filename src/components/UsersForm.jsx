import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";


 const UsersForm = ({ getUsers, userSelected, deselectUser }) => {

  const { register, handleSubmit, reset } = useForm();

/***** FUNTION useEFFECT *****/

  useEffect(() => {

    if (userSelected) {

      reset(userSelected);

    }else{

      clear();

    }

  }, [userSelected]);

  
/***** FUNTION SUBMIT *****/

  const submit = (data) => {

   if (userSelected) {
   // alert("Actualizando Usuarios");
      axios
      .put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, data)
      .then(() => {
        
        getUsers();
        toggleModal('modal');

        });     

    } else {

  // Create Users
        axios
          .post(`https://users-crud1.herokuapp.com/users/`, data)
          .then(() => {
            
            getUsers();
            toggleModal('modal');

            })
          .catch((error) => console.log(error.response));
   }
    clear();
  };

/***** FUNTION CLEAR *****/

  const clear = () => {

    reset({
      first_name: "",
      last_name: "",
          email: "",
        password: "",
        birthday: ""
    });

    deselectUser();
  };

  return (
    <>
      <dialog id="update-user">
        <article>
            <a href="#close" onClick={() => toggleModal('update-user')} className="close"></a>
            <h4>
              <i class="fa-solid fa-circle-check"></i> 
              Usuario agregado
            </h4>
        </article>
      </dialog>
      <dialog id="modal">
          <article>
              <header>
                  <a href="#close" onClick={() => toggleModal('modal')} className="close"></a>
                  <h2>{userSelected ? "Edit user" : "Add user"}</h2>
              </header>
              <form onSubmit={handleSubmit(submit)}>

                  <label htmlFor="first_name">
                      <strong><i className="fa-regular fa-user"></i> First Name</strong>
                      <input type="text" id="first_name" {...register("first_name")} required/>  
                  </label>

                  <label htmlFor="last_name">
                      <strong><i className="fa-solid fa-signature"></i> Last Name</strong>
                      <input type="text" id="last_name" {...register("last_name")} required/>
                  </label>
                  
                  <label htmlFor="email">
                      <i className="fa-solid fa-at"></i> <strong>Email</strong>
                      <input type="text" id="email" {...register("email")} required/>    
                  </label>
                  
                  <label htmlFor="password">
                      <i className="fa-solid fa-key"></i> <strong>Password</strong>
                      <input type={userSelected ? "text" : "password"} id="password" {...register("password")} required/>
                  </label>

                  <label htmlFor="birthday">
                      <i className="fa-solid fa-cake-candles"></i> <strong>Birthday</strong>
                      <input type="date" id="birthday" {...register("birthday")} required/> 
                  </label>
                  
                  <footer>
                      <button>{
                          userSelected ? 
                          (<><i className="fa-solid fa-pen-to-square"></i> Update</>) 
                          :
                          (<><i className="fa-solid fa-plus"></i> Create</>)
                          } User</button>
                      <button onClick={clear} type="button">
                          Clear
                      </button>
                  </footer>

              </form>
          </article>
      </dialog>
    </>
  );
  
};

export default UsersForm;