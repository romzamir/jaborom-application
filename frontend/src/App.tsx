import './App.css';
import {HomePage} from './components/pages/homePage/homePage';
import {ProfilesPage} from './components/pages/profilesPage';

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
