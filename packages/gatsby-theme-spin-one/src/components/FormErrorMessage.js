import React from 'react';

export const FormErrorMessage = ({ error }) => {
  if (!error?.message) {
    return null;
  }

  return (
    <div className="error-message">
      <p>{error.message}</p>
    </div>
  );
};
