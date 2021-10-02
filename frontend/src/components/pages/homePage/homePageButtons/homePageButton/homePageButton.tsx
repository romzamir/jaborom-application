import {CSSProperties} from 'react';
import './homePageButton.css';

export function HomePageButton(props: {
    color: string;
    icon: string;
    title: string;
}) {
    const style: CSSProperties = {backgroundColor: props.color};
    return (
        <div className='home-page-button-container' style={style}>
            <img
                src={props.icon}
                className='home-page-button-icon'
                alt='מסך הבית'
            />
            <h2 className='home-page-button-title'>{props.title}</h2>
        </div>
    );
}
