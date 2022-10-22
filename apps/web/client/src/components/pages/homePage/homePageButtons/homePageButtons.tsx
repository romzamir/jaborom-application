import {Link} from 'react-router-dom';
import {HomePageButton} from './homePageButton/homePageButton';

import ProfilesSvg from './images/profiles.svg';
import FeedbackSvg from './images/feedback.svg';
import BudgetSvg from './images/budget.svg';
import ManagementSvg from './images/management.svg';

import './homePageButtons.css';

export function HomePageButtons() {
    return (
        <div className='home-page-buttons'>
            <Link to='profiles'>
                <HomePageButton
                    color='#E88E3C'
                    icon={ProfilesSvg}
                    title='חניכים'
                />
            </Link>
            <Link to='feedback'>
                <HomePageButton
                    color='#3CAAE8'
                    icon={FeedbackSvg}
                    title='משוב'
                />
            </Link>
            <Link to='financial'>
                <HomePageButton
                    color='#E83C5B'
                    icon={BudgetSvg}
                    title='תקציב'
                />
            </Link>
            <Link to='admin'>
                <HomePageButton
                    color='#3CE8BE'
                    icon={ManagementSvg}
                    title='ניהול'
                />
            </Link>
        </div>
    );
}
