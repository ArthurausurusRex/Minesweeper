import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './js/Game';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'font-awesome/css/font-awesome.min.css'
import registerServiceWorker from './registerServiceWorker';



const App = ()=> (
    <MuiThemeProvider>
        <Game />
    </MuiThemeProvider>
);
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
