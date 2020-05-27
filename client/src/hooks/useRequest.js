import React, { useState } from 'react';
import axios from 'axios';

export const useRequest = ({ method, url }) => {
  const [error, setError] = useState(null);

  const doRequest = async ({ values, onSuccess }) => {
    setError(null);
    try {
      const response = await axios[method](url, values);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        setError(<p className="message error">{err.response.data.message}</p>);
      }
    }
  };

  return { doRequest, error };
};
