import { ReactElement } from 'react';
import { PageComponent } from './types/page.type';

export function PagesHandler(props: { children: PagesHandlerProps }) {
    return <div>{props.children}</div>;
}

export type PagesHandlerProps = {
    children: ReactElement<PageComponent> | ReactElement<PageComponent>[];
};
