import { HomePageButton } from './homePageButton/homePageButton';

import ProfilesSvg from './images/profiles.svg';
import FeedbackSvg from './images/feedback.svg';
import BudgetSvg from './images/budget.svg';
import ManagementSvg from './images/management.svg';

import { OnPageChosenFunction } from '../../../types/page.type';

import './homePageButtons.css';

export function HomePageButtons(props: { onPageChosen: OnPageChosenFunction }) {
    return (
        <div className="home-page-buttons">
            <HomePageButton icon={ProfilesSvg} title="טפסי קליטה" />
            <HomePageButton icon={FeedbackSvg} title="משוב" />
            <HomePageButton icon={BudgetSvg} title="תקציב" />
            <HomePageButton icon={ManagementSvg} title="ניהול" />
        </div>
    );
}
