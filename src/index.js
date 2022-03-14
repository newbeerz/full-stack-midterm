import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RestAPIsProvider } from './contexts/RestAPIsContext';
import { BrowserRouter } from 'react-router-dom';
import { CommentProvider } from './contexts/CommentContext';

ReactDOM.render(
  <React.StrictMode>
    <RestAPIsProvider><CommentProvider>
      <BrowserRouter>
        <App /> 
      </BrowserRouter>
    </CommentProvider></RestAPIsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
