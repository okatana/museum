import React from 'react';

export const Config = {
//  apiUrl: 'http://localhost:8000/api/',
  //apiUrl: process.env.API_URL,
  //apiPath: process.env.API_PATH,
  excursionTypeId: 1,
  apiUrl: () => {
    return 'API_PATH' in process.env ? window.location.origin + process.env.API_PATH : process.env.API_URL
  },
}

console.log('Config.apiUrl()', Config.apiUrl());
