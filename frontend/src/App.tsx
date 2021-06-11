import './App.css';
import { ProfilesPage } from './components/pages/profilesPage/profilesPage';
import { PagesHandler } from './pagesHandler';

export default function App() {
    return (
        <div className="App">
            <PagesHandler>
                <div></div>
                <ProfilesPage name="PROFILES"></ProfilesPage>
            </PagesHandler>
        </div>
    );
}
