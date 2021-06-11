import { HomePage } from './components/pages/homePage/homePage';
import { AppPage } from './types/page.type';

import './App.css';
import { PagesHandler } from './pagesHandler';

export default function App() {
    return (
        <div className="App">
            <PagesHandler>
                <div></div>
            </PagesHandler>
        </div>
    );
}
