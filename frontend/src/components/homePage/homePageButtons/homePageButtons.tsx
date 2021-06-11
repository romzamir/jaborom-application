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
            <HomePageButton
                color="#E88E3C"
                icon={ProfilesSvg}
                title="טפסי קליטה"
                onPageChosen={() => props.onPageChosen('PROFILES')}
            />
            <HomePageButton
                color="#3CAAE8"
                icon={FeedbackSvg}
                title="משוב"
                onPageChosen={() => props.onPageChosen('FEEDBACKS')}
            />
            <HomePageButton
                color="#E83C5B"
                icon={BudgetSvg}
                title="תקציב"
                onPageChosen={() => props.onPageChosen('BUDGET')}
            />
            <HomePageButton
                color="#3CE8BE"
                icon={ManagementSvg}
                title="ניהול"
                onPageChosen={() => props.onPageChosen('MANAGEMENT')}
            />
        </div>
    );
}
