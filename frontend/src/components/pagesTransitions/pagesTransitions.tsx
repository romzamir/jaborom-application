import {Switch, Route, Redirect, useLocation} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import {HomePage} from '../pages/homePage';
import {ProfilesPage} from '../pages/profilesPage';

import './pagesTransitions.css';

export function PagesTransitions() {
    const location = useLocation();
    return (
        <TransitionGroup>
            <CSSTransition key={location.key} classNames='fade' timeout={300}>
                <Switch>
                    <Route path='/profiles'>
                        <ProfilesPage />
                    </Route>
                    <Route path='/'>
                        <HomePage></HomePage>
                    </Route>
                    <Route path='*'>
                        <Redirect to='/' />
                    </Route>
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    );
}
