import { ReactElement, useState } from 'react';
import { HomePage } from './components/pages/homePage/homePage';
import { AppPage, PageComponent } from './types/page.type';

export function PagesHandler(props: PagesHandlerProps) {
    const [currentPage, setCurrentPage] = useState(-1);

    const onPageChosen = (page: AppPage) => {
        if (Array.isArray(props.children)) {
            const index = props.children.findIndex(
                (child) => child.type === page
            );

            setCurrentPage(index);
        }
    };

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

    return (
        <div>
            {currentPage === -1 ? (
                <HomePage onPageChosen={onPageChosen} />
            ) : (
                children
            )}
        </div>
    );
}

export type PagesHandlerProps = {
    children: ReactElement<PageComponent> | ReactElement<PageComponent>[];
};
