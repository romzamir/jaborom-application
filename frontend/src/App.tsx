import { HomePage } from './components/pages/homePage/homePage';
import { AppPage } from './types/page.type';

import './App.css';
import { PagesHandler } from './pagesHandler';

export default function App() {
    const onPageChosen = (page: AppPage) => {
        console.log(page);
    };

    return (
        <div className="App">
            <PagesHandler>
                <HomePage name="HOME" onPageChosen={onPageChosen} />
            </PagesHandler>
        </div>
    );
}
