import React from 'react';
import { NavLink } from 'react-router-dom';

export const Nav = () => {
  return (
    <div className="nav">
      <NavLink to="/">Create User</NavLink>
      <NavLink to="/trxs">Transactions</NavLink>
    </div>
  );
};
