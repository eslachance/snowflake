import React from 'react';
import { useField } from 'formik';

const SingleTextInput = (props) => {
  const [field] = useField(props);
  return (
    <div className="my-5">
      <label htmlFor={props.name} className="leading-7 text-sm text-gray-400">
        {props.label}
        <input
          {...field}
          {...props}
          type="text"
          id={props.name}
          className="w-full bg-gray-800 rounded border border-gray-700 focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 transition-colors duration-200 ease-in-out leading-8"
        />
      </label>
    </div>
  );
}

export default SingleTextInput;
