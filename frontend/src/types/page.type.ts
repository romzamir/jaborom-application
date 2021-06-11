import { ReactElement } from 'react';

export type AppPage =
    | 'HOME'
    | 'PROFILES'
    | 'FEEDBACKS'
    | 'BUDGET'
    | 'MANAGEMENT';

export type OnPageChosenFunction = (page: AppPage) => void;

export type PageComponent = (props: PageComponentProps) => JSX.Element;

export type PageComponentProps = {
    name: AppPage;
};
