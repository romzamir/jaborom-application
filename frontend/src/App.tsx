import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import {ProfilesPage} from 'components/pages/profilesPage';
import {ProfilePage} from 'components/pages/profilePage';
import {HomePage} from 'components/pages/homePage';

import './App.css';

export default function App() {
    return (
        <div className='App'>
            <Router>
                <Switch>
                    <Route path='/profiles'>
                        <ProfilesPage />
                    </Route>
                    <Route path='/profile/:id'>
                        <ProfilePage />
                    </Route>
                    <Route exact path='/'>
                        <HomePage />
                    </Route>
                    <Route path='*'>
                        <Redirect to='/' />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}
