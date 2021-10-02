import {BrowserRouter as Router} from 'react-router-dom';

import {PagesTransitions} from './components/pagesTransitions';

import './App.css';

export default function App() {
    return (
        <div className='App'>
            <Router>
                <PagesTransitions />
            </Router>
        </div>
    );
}
