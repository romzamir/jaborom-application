import { HomePage } from './components/pages/homePage/homePage';
import { AppPage } from './types/page.type';

import './App.css';

export default function App() {
    const onPageChosen = (page: AppPage) => {
        console.log(page);
    };

    return (
        <div className="App">
            <HomePage onPageChosen={onPageChosen} />
        </div>
    );
}
