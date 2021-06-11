import { HomePageButton } from './homePageButton/homePageButton';

import ProfilesSvg from './images/profiles.svg';
import FeedbackSvg from './images/feedback.svg';
import BudgetSvg from './images/budget.svg';
import ManagementSvg from './images/management.svg';

import { AppPage, OnPageChosenFunction } from '../../../types/page.type';

import './homePageButtons.css';

export function HomePageButtons(props: { onPageChosen: OnPageChosenFunction }) {
    return (
        <div className="home-page-buttons">
            <HomePageButton
                icon={ProfilesSvg}
                title="טפסי קליטה"
                onPageChosen={() => props.onPageChosen('PROFILES')}
            />
            <HomePageButton
                icon={FeedbackSvg}
                title="משוב"
                onPageChosen={() => props.onPageChosen('FEEDBACKS')}
            />
            <HomePageButton
                icon={BudgetSvg}
                title="תקציב"
                onPageChosen={() => props.onPageChosen('BUDGET')}
            />
            <HomePageButton
                icon={ManagementSvg}
                title="ניהול"
                onPageChosen={() => props.onPageChosen('MANAGEMENT')}
            />
        </div>
    );
}
