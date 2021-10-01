import {Switch, Route, useLocation} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import {HomePage} from './homePage/';
import {ProfilesPage} from './profilesPage';

export function PagesHandler() {
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
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    );
}
