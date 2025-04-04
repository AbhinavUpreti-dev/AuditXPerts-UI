import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import { initializeStore } from './store/index.ts';
import { Provider } from "react-redux";


const renderApp = () =>{
  const store = initializeStore();
  return (
 // ReactDOM.render(
    //<React.StrictMode>
       <Provider store={store}>
       <App /> 
      </Provider>
    //</React.StrictMode>
  //  document.getElementById('root')
 // );
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  renderApp()
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
