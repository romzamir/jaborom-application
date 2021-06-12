import { useEffect, useState } from 'react';

import { OnPageChosenFunction } from '../../../types/page.type';

import { HomePageButtons } from './homePageButtons/homePageButtons';

import './homePage.css';

export function HomePage(props: { onPageChosen: OnPageChosenFunction }) {
    const [clockText, setClockText] = useState(generateTimeText());

    function generateTimeText() {
        const now = new Date();
        const hours = now.getHours();
        const hoursText = (hours < 10 ? '0' : '') + hours;
        const minutes = now.getMinutes();
        const minutesText = (minutes < 10 ? '0' : '') + minutes;
        return `${hoursText}:${minutesText}`;
    }

    function updateClockText() {
        const newText = generateTimeText();
        if (newText === clockText) return;

        setClockText(newText);
    }

    useEffect(() => {
        const intervalId = setInterval(updateClockText, 1000);

        return function () {
            clearInterval(intervalId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <HomePageButtons onPageChosen={props.onPageChosen} />
        </div>
    );
}
