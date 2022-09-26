import _ from 'lodash';
import {useCallback, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {searchConstants} from '../../../../core/constants/search.constants';

import SearchSvg from './search.svg';
import './profilesPageSearchBar.css';

export function ProfilesPageSearchBar(props: {text: string}) {
    const [value, setValue] = useState(props.text);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const navigate = useNavigate();

    const onValueChanged = useCallback((event: any) => {
        const newValue = event.target.value;
        setValue(newValue);
    }, []);

    const abortPreviousDelay = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const performSearch = () => {
        if (_.isEmpty(value)) {
            navigate('/profiles');
        } else {
            navigate(`/profiles?search=${value}`);
        }
    };

    if (value !== props.text) {
        abortPreviousDelay();
        timeoutRef.current = setTimeout(
            performSearch,
            searchConstants.searchDelay,
        );
    }

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
            <img
                className='profiles-page-search-bar-button'
                src={SearchSvg}
                alt='חיפוש'
            />
        </div>
    );
}
