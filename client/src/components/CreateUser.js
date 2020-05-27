import React, { useState } from 'react';

import { useRequest } from '../hooks/useRequest';

export const CreateUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState(null);

  const { doRequest, error } = useRequest({
    url: 'http://localhost:5000/api/users',
    method: 'post',
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setMessage(null);
    await doRequest({
      values: { firstName, lastName },
      onSuccess: (user) => {
        setFirstName('');
        setLastName('');
        setMessage(
          <p className="message success">{`User with id: ${user.id} created`}</p>
        );
      },
    });
  };

  return (
    <div>
      <h2>Create New User</h2>
      {message || error}
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>First Name</label>
          <input
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};
