import { useState } from 'react';
import { HomePage } from './components/pages/homePage/homePage';
import { AppPage } from './types/page.type';

export function PagesHandler(props: { children: any[] }) {
    const [currentPage, setCurrentPage] = useState(-1);

    const onPageChosen = (page: AppPage) => {
        if (Array.isArray(props.children)) {
            const index = props.children.findIndex(
                (child) => child.props.name === page
            );

            setCurrentPage(index);
        }
    };

    const createHomepage = () => {
        if (currentPage === -1) {
            return (
                <div key={-1}>
                    <HomePage onPageChosen={onPageChosen} />
                </div>
            );
        }

        return (
            <div key={-1} style={{ display: 'none' }}>
                <HomePage onPageChosen={onPageChosen} />
            </div>
        );
    };

    const createChild = (child: any, index: number) => {
        if (index === currentPage) {
            return <div key={index}>{child}</div>;
        }

        return (
            <div key={index} style={{ display: 'none' }}>
                {child}
            </div>
        );
    };

    const createChildren = () => {
        const homePage = createHomepage();
        const newChildren = [homePage];
        if (Array.isArray(props.children)) {
            for (let i = 0; i < props.children.length; i++) {
                newChildren.push(createChild(props.children[i], i));
            }
        } else {
            newChildren.push(createChild(props.children, 0));
        }

        return newChildren;
    };

    return <div>{createChildren()}</div>;
}
