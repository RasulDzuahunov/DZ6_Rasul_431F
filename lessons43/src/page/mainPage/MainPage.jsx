import React, { useState } from "react";
import { useForm } from "react-hook-form";

function MainPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [users, setUsers] = useState([]);

  const onSubmit = (data) => {
    setUsers([...users, data]);
    reset(); 
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const handleClearTable = () => {
    setUsers([]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label>Username:</label>
          <input
            {...register("username", { required: "Username is required" })}
            placeholder="Username"
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            {...register("email", { 
              required: "Email is required", 
              pattern: { 
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 
                message: "Invalid email format" 
              }
            })}
            placeholder="Email"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Phone:</label>
          <input
            {...register("phone", { required: "Phone number is required" })}
            placeholder="Phone"
          />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>
        <div>
          <label>Website:</label>
          <input
            {...register("website")}
            placeholder="Website (optional)"
          />
        </div>
        <button type="submit">Создать</button>
        <button type="button" onClick={handleClearTable}>
          Очистить таблицу
        </button>
      </form>

      <div>
        {users.length === 0 ? (
          <p>Таблица пуста</p>
        ) : (
          <table border="1" style={{ marginTop: "20px", width: "100%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.website}</td>
                  <td>
                    <button onClick={() => handleDeleteUser(index)}>
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MainPage;
