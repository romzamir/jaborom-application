import {useCallback, useState} from 'react';

import SearchSvg from './search.svg';

import './profilesPageSearchBar.css';

export function ProfilesPageSearchBar(props: {text: string}) {
    const [value, setValue] = useState(props.text);

    const onValueChanged = useCallback((event: any) => {
        const newValue = event.target.value;
        setValue(newValue);
    }, []);

    return (
        <div className='profiles-page-search-bar'>
            <input
                className='profiles-page-search-bar-input'
                value={value}
                onChange={onValueChanged}
                autoFocus
                placeholder='חיפוש'
            />
            <div className='profiles-page-search-bar-separator'></div>
            <img className='profiles-page-search-bar-button' src={SearchSvg} alt='חיפוש' />
        </div>
    );
}
