import { useEffect, useRef } from 'react';

const useClickOutside = (currentEnvelope, exceptionClick, handler) => {
    const clickRef = useRef();

    useEffect(() => {
        if (!currentEnvelope) {
            return;
        }

        if (!clickRef.current) {
            return;
        }

        const handleClick = (event) => {
            const modalList = [
                'modal-open',
                'modal-content',
                'modal-body'
            ];

            const isExcept = exceptionClick.some((element) => element === event.target.parentNode);

            const isExceptModal = modalList.map((element) => event.target.offsetParent && event.target.offsetParent.classList.contains(element)) || event.target.classList.contains('modal');

            if (isExcept || isExceptModal.some((element) => element)) {
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