import './App.css';
import {PagesHandler} from './pagesHandler';
import {ProfilesPage} from './components/pages/profilesPage/profilesPage';

export default function App() {
    return (
        <div className='App'>
            <PagesHandler>
                <div></div>
                <ProfilesPage name='PROFILES'></ProfilesPage>
            </PagesHandler>
        </div>
    );
}
