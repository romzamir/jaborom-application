import {useState} from 'react';

import SearchSvg from './search.svg';

import './profilesPageSearchBar.css';

export function ProfilesPageSearchBar() {
    const [value, setValue] = useState('');

    const onValueChanged = (event: any) => {
        const newValue = event.target.value;
        setValue(newValue);
        console.log(newValue);
    };

    return (
        <div className='profiles-page-search-bar'>
            <input
                className='profiles-page-search-bar-input'
                value={value}
                onChange={onValueChanged}
                placeholder='חיפוש'
            />
            <div className='profiles-page-search-bar-separator'></div>
            <img
                className='profiles-page-search-bar-button'
                src={SearchSvg}
                alt='חיפוש'
            />
        </div>
    );
}
