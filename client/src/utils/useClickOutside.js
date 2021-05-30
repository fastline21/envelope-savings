import { useEffect, useRef } from 'react';

const useClickOutside = (exceptionClick, handler) => {
    const clickRef = useRef();
    useEffect(() => {
        if (!clickRef.current) {
            return;
        }

        const handleClick = (event) => {
            const isExcept = exceptionClick.map((element) => element === event.target.parentNode);
            if (isExcept) {
                return;
            }

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