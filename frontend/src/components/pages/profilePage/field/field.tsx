import './field.css';

export * from './fields';

type ProfileFieldProps = {
    title: string;
    children: (JSX.Element | string)[] | JSX.Element | string;
};

export function ProfileFieldContainer({title, children}: ProfileFieldProps) {
    return (
        <div className='profile-field-container'>
            <div className='profile-field-title'>{title}:</div>
            <div className='profile-field-value'>{children}</div>
        </div>
    );
}
