import React from 'react';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';

const Jumbotron = (props) => {
  const { title, subtext, action, actionLink } = props;
  return (
    <div className="flex flex-col bg-gray-900 text-center w-full mb-20 py-10">
      <h1 className="text-4xl font-large title-font mb-4 text-white tracking-widest">
        {title}
      </h1>
      {subtext && (
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">{subtext}</p>
      )}
      {action && (
        <button as={Link} to={actionLink}>
          {action}
        </button>
      )}
    </div>
  );
};

export default Jumbotron;
