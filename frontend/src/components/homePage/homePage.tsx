import React from 'react';
import { AppPage, onPageChosenFunction } from '../../types/page.type';

import './homePage.css';

export function HomePage(props: { onPageChosen: onPageChosenFunction }) {
    return (
        <div className="home-page">
            <span className="home-page-clock">14:32</span>
            <div className="home-page-text">
                <div className="home-page-hello-container">
                    שלום,
                    <span className="home-page-hello-name">רום</span>
                </div>
                מה תרצה לעשות?
            </div>
        </div>
    );
}
