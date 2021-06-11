import React from 'react';
import { HomePage } from './components/homePage/homePage';
import { AppPage } from './types/page.type';

import './App.css';

export default function App() {
    const onPageChosen = (page: AppPage) => {};

    return (
        <div className="App">
            <HomePage onPageChosen={onPageChosen} />
        </div>
    );
}
