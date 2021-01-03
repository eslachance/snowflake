import React from 'react';

import Jumbotron from '../components/Jumbotron.js';

const Page = () => {
  return (
    <div styles={{ position: 'relative' }}>
      <Jumbotron title="Admin" subtext="Command Core Subsystems" />
      <div className="flex flex-col bg-gray-900 text-center w-full mb-0 py-10">
        <p className="leading-relaxed">Data Contents</p>
      </div>
    </div>
  );
};

export default Page;
