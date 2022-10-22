import {useCallback, useEffect, useRef} from 'react';

export function useIsMounted() {
    const isMountedRef = useRef(true);

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    return useCallback(() => isMountedRef.current, []);
}
