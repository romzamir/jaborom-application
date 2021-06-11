import { ReactElement, useState } from 'react';
import { PageComponent } from './types/page.type';

export function PagesHandler(props: PagesHandlerProps) {
    const [currentPage, setCurrentPage] = useState(0);

    const createChild = (child: ReactElement<PageComponent>, index: number) => {
        if (index === currentPage) {
            return <div>{child}</div>;
        }

        return <div style={{ display: 'none' }}>{child}</div>;
    };

    const children = (() => {
        if (Array.isArray(props.children)) {
            return props.children.map(createChild);
        }

        return createChild(props.children, 0);
    })();

    return <div>{children}</div>;
}

export type PagesHandlerProps = {
    children: ReactElement<PageComponent> | ReactElement<PageComponent>[];
};
