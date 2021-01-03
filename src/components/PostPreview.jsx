import React from 'react';
import { Link } from 'react-router-dom';
import { format, formatDistance } from 'date-fns';

const PostPreview = (props) => {
  const { author, created, title, contents, id } = props;
  return (
    <div className="flex flex-wrap md:flex-no-wrap border-2 border-solid rounded border-gray-900 p-5 my-5">
      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
        <span className="tracking-widest font-medium title-font text-white">
          {author}
        </span>
        <span className="mt-1 text-gray-600 text-sm">
          {format(created, 'dd/MM/yyyy hh:mm')}
          <br />
          {formatDistance(created, Date.now(), { addSuffix: true })}
        </span>
      </div>
      <div className="md:flex-grow">
        <h2 className="text-2xl font-medium text-white title-font mb-2">
          {title}
        </h2>
        <p className="leading-relaxed">{contents}</p>
        <Link
          to={`post/${id}`}
          className="text-purple-500 inline-flex items-center mt-4"
        >
          Read Post
          <svg
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PostPreview;
