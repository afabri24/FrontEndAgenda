import React from 'react';

function Card({ title, description, date }) {
  return (
    <div className="mx-4 bg-white rounded-xl shadow-md overflow-hidden md:w-64 m-3 border-blue-500">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{title}</div>
          <p className="mt-2 text-gray-500">{description}</p>
          <p className="mt-2 text-gray-500">{date}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;