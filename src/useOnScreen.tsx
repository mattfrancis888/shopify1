import React, { useState, useEffect } from "react";
//https://stackoverflow.com/questions/45514676/react-check-if-element-is-visible-in-dom
export default function useOnScreen(ref: any) {
    const [isIntersecting, setIntersecting] = useState(false);

    const observer = new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
    );

    useEffect(() => {
        observer.observe(ref.current);
        // Remove the observer as soon as the component is unmounted
        return () => {
            observer.disconnect();
        };
    }, []);

    return isIntersecting;
}
