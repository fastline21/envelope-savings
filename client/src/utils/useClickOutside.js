import { useEffect, useRef } from 'react';

const useClickOutside = (exceptionClick, handler) => {
    const clickRef = useRef();
    useEffect(() => {
        if (!clickRef.current) {
            return;
        }

        const handleClick = (event) => {
            if (event.target.parentNode === exceptionClick) {
                return;
            }

            if (!clickRef.current.contains(event.target)) {
                handler();
            }
        };

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    });

    return clickRef;
}

export default useClickOutside;