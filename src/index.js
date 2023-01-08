import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Context from './contexts/Context';
import {Client as Styletron} from 'styletron-engine-monolithic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider} from 'baseui';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));

const engine = new Styletron();
root.render(
  <GoogleOAuthProvider clientId="607152334413-882kgfto93aid1jdigmla5d5q9hd0a69.apps.googleusercontent.com">
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Context>
            <App/>
        </Context>
      </BaseProvider>
    </StyletronProvider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
