import React, { useEffect, useState } from 'react';
import { AppPage, onPageChosenFunction } from '../../types/page.type';

import './homePage.css';

export function HomePage(props: { onPageChosen: onPageChosenFunction }) {
    const [clockText, setClockText] = useState(generateTimeText());

    function generateTimeText() {
        const now = new Date();
        const hours = now.getHours();
        const hoursText = (hours < 10 ? '0' : '') + hours;
        const minutes = now.getMinutes();
        const minutesText = (minutes < 10 ? '0' : '') + minutes;
        return `${hoursText}:${minutesText}`;
    }

    const updateClockText = () => {
        const newText = generateTimeText();
        if (newText === clockText) return;

        setClockText(newText);
    };

    useEffect(() => {
        const intervalId = setInterval(updateClockText, 1000);

        return function () {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="home-page">
            <span className="home-page-clock">{clockText}</span>
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
