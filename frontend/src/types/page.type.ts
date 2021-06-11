export type AppPage = 'PROFILES' | 'FEEDBACKS' | 'BUDGET' | 'MANAGEMENT';

export type OnPageChosenFunction = (page: AppPage) => void;
