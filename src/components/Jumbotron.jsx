import React from 'react';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';

const Jumbotron = (props) => {
  const { title, subtext, action, actionLink } = props;
  return (
    <div className="bg-gray-900 w-full mb-5 px-5 py-8 rounded-lg">
      <h1 className="text-4xl mb-4 text-white tracking-widest">{title}</h1>
      {subtext && <p>{subtext}</p>}
      {action && (
        <button as={Link} to={actionLink}>
          {action}
        </button>
      )}
    </div>
  );
};

export default Jumbotron;
