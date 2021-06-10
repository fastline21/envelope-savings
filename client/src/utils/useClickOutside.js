import { useEffect, useRef } from 'react';

const useClickOutside = (exceptionClick, handler) => {
    const clickRef = useRef();

    useEffect(() => {
        if (!clickRef.current) {
            return;
        }

        const handleClick = (event) => {
            const modalList = [
                'modal-open',
                'modal-content',
                'modal-body'
            ];

            const isExcept = exceptionClick.some((element) => element === event.target.parentNode) || modalList.map((element) => event.target.offsetParent.classList.contains(element)) || event.target.classList.contains('modal');

            if (isExcept) {
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