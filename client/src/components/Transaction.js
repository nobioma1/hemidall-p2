import React, { useState } from 'react';
import { useRequest } from '../hooks/useRequest';

export const Transaction = () => {
  const [userId, setUserId] = useState('');
  const [credit, setCredit] = useState(0);
  const [debit, setDebit] = useState(0);
  const [message, setMessage] = useState([]);

  const { doRequest, error } = useRequest({
    url: `http://localhost:5000/api/users/${userId}/transactions`,
    method: 'post',
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!userId) {
      return setMessage(<p className="message error">User id is required</p>);
    }
    setMessage([]);
    await doRequest({
      values: { amount: credit, type: 'CREDIT' },
      onSuccess: async (user) => {
        setMessage((prev) => [
          ...prev,
          <p className="message success">{`${user.id} CREDIT ${credit} trx success`}</p>,
        ]);
        await doRequest({
          values: { amount: debit, type: 'DEBIT' },
          onSuccess: (user) => {
            setMessage((prev) => [
              ...prev,
              <p className="message success">{`${user.id} DEBIT ${debit} trx success`}</p>,
            ]);
            setCredit(0);
            setDebit(0);
            setUserId('');
          },
        });
      },
    });
  };

  return (
    <div>
      <h2>Transactions</h2>
      {error || message}
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>User ID</label>
          <input
            name="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div>
          <label>Amount to credit</label>
          <input
            name="credit"
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
          />
        </div>
        <div>
          <label>Amount to debit</label>
          <input
            name="debit"
            value={debit}
            onChange={(e) => setDebit(e.target.value)}
          />
        </div>
        <button type="submit">Credit and Debit User</button>
      </form>
    </div>
  );
};
