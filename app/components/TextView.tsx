import React from 'react';
import { useState, useEffect } from "react";

// DataGrid columns
const columns = [
  { field: 'prompt', headerName: 'Prompt', width: 200 },
  { field: 'response', headerName: 'Response', flex: 1 },
  { field: 'created_at', headerName: 'Created At', width: 200 },
];

const TextView = () => {

  return (
    <div>
      <div className='ml-auto grid py-4 px-40 w-full text-white'>
        Hello World
      </div>
    </div>
  );
};

export default TextView;