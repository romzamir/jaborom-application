import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {HomePage} from './components/pages/homePage/homePage';
import {ProfilesPage} from './components/pages/profilesPage';

import './App.css';

export default function App() {
    return (
        <div className='App'>
            <Router>
                <Switch>
                    <Route path='/profiles'>
                        <ProfilesPage />
                    </Route>
                    <Route path='/'>
                        <HomePage></HomePage>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}
