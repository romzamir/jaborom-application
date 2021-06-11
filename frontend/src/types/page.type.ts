import { ReactElement } from 'react';

export type AppPage = 'PROFILES' | 'FEEDBACKS' | 'BUDGET' | 'MANAGEMENT';

export type OnPageChosenFunction = (page: AppPage) => void;

export type PageComponent = (props?: any) => JSX.Element;
