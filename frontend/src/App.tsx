import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';

import {ProfilesPage} from './components/pages/profilesPage';
import {ProfilePage} from './components/pages/profilePage';
import {HomePage} from './components/pages/homePage';

import './App.css';

export default function App() {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path='/profiles' element={<ProfilesPage />} />
                    <Route path='/profile/:id' element={<ProfilePage />} />
                    <Route path='/' element={<HomePage />} />
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </Router>
        </div>
    );
}
