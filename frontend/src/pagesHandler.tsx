import {useState} from 'react';
import {HomePage} from './components/pages/homePage/homePage';
import {AppPage} from './types/page.type';

export function PagesHandler(props: {children: any; hide?: boolean}) {
    const shouldHide = props.hide ?? true;
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
                <div key={-1} className='page-container'>
                    <HomePage onPageChosen={onPageChosen} />
                </div>
            );
        }

        if (shouldHide)
            return (
                <div
                    key={-1}
                    className='page-container'
                    style={{display: 'none'}}
                >
                    <HomePage onPageChosen={onPageChosen} />
                </div>
            );

        return null;
    };

    const createChild = (child: any, index: number) => {
        if (index === currentPage) {
            return (
                <div key={index} className='page-container'>
                    {child}
                </div>
            );
        }

        if (shouldHide)
            return (
                <div
                    key={index}
                    className='page-container'
                    style={{display: 'none'}}
                >
                    {child}
                </div>
            );

        return null;
    };

    const createChildren = () => {
        const homePage = createHomepage();
        const newChildren: (JSX.Element | null)[] = [homePage];
        if (Array.isArray(props.children)) {
            for (let i = 0; i < props.children.length; i++) {
                newChildren.push(createChild(props.children[i], i));
            }
        } else {
            newChildren.push(createChild(props.children, 0));
        }

        return newChildren;
    };

    return <>{createChildren()}</>;
}
