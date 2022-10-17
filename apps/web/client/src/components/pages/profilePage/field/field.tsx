import {ReactNode} from 'react';
import classNames from 'classnames';

import './field.css';

export * from './fields';

type ProfileFieldProps = {
    title: string;
    className?: string;
    children?: ReactNode;
};

export function ProfileFieldContainer({
    title,
    className,
    children,
}: ProfileFieldProps) {
    return (
        <div className={classNames('profile-field-container', className)}>
            <div className='profile-field-title'>{title}:</div>
            <div className='profile-field-value'>{children}</div>
        </div>
    );
}
