import { useRef, useEffect } from 'react';

export const useRenderObserver = (debugLabel?: string, trackedValues?: Record<string, any>) => {
    const squareRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const renderTimeStamp = useRef<number[]>([]);
    const renderCount = useRef(0);
    const previousValue = useRef<Record<string, any>>({});
    const renderCause = useRef<string>('initial');

    useEffect(() => {
        renderCount.current++;

        if (trackedValues) {
            const changes: string[] = [];

            if (Object.keys(previousValue.current).length === 0) {
                previousValue.current = { ...trackedValues };
                renderCause.current = 'initial';
            } else {
                Object.keys(trackedValues).forEach(key => {
                    if (previousValue.current[key] !== trackedValues[key]) {
                        changes.push(key);
                    }
                })

                
                renderCause.current = changes.length > 0 ? changes.join(', ') : 'unknown';
                previousValue.current = { ...trackedValues };
            }
           

        }

        const now = Date.now();
        renderTimeStamp.current.push(now);

        renderTimeStamp.current = renderTimeStamp.current.filter(
            timestamp => now - timestamp < 500
        );

        const density = renderTimeStamp.current.length;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        const scaleAmount = 1 + (density * 0.1);
        squareRef.current.style.scale = String(scaleAmount);

        timeoutRef.current = setTimeout(() => {
            if (squareRef.current) {
                squareRef.current.style.scale = '1';
            }
        }, 50);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    });

    return {
        squareRef,
        renderCount: renderCount.current,
        density: renderTimeStamp.current.length,
        cause: renderCause.current
    };
}