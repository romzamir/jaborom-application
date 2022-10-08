import {useEffect, useState} from 'react';

import {HomePageButtons} from './homePageButtons/homePageButtons';
import {useAuthorize, useUser} from '../../../hooks';

import './homePage.css';

export function HomePage() {
    const user = useUser();
    const isAuthorized = useAuthorize(user);
    const [clockText, setClockText] = useState(generateTimeText());

    function generateTimeText() {
        const now = new Date();
        return now.toLocaleTimeString('he', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    }

    function updateClockText() {
        const newText = generateTimeText();
        if (newText === clockText) return;

        setClockText(newText);
    }

    useEffect(() => {
        const intervalId = setInterval(updateClockText, 100);

        return function () {
            clearInterval(intervalId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isAuthorized) return null;

    return (
        <div className='home-page'>
            <span className='home-page-clock'>{clockText}</span>
            <div className='home-page-text'>
                <div className='home-page-hello-container'>
                    שלום,
                    <span className='home-page-hello-name'>
                        {user?.displayName}
                    </span>
                </div>
                מה תרצה לעשות?
            </div>
            <HomePageButtons />
        </div>
    );
}
