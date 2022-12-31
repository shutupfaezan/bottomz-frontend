import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Context from './contexts/Context';
import {Client as Styletron} from 'styletron-engine-monolithic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider} from 'baseui';

const root = ReactDOM.createRoot(document.getElementById('root'));
const engine = new Styletron();
root.render(
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Context>
            <App/>
        </Context>
      </BaseProvider>
    </StyletronProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
