import {BrowserRouter as Router} from 'react-router-dom';

import {PagesHandler} from './components/pagesTransitions';

import './App.css';

export default function App() {
    return (
        <div className='App'>
            <Router>
                <PagesHandler />
            </Router>
        </div>
    );
}
