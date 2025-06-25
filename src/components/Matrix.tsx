import {useRef, useEffect} from 'react';

class Column {
    x: number;
    maxPosition: number;
    position: number = 0;

    constructor(x: number, maxLength: number) {
        this.x = x;
        this.maxPosition = maxLength;
    }
}

export default function Matrix() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const columnsRef = useRef<Column[]>([]);

    const symbolSize = 10;
    const minimumHeight = 10;

    // Helper: random number inclusive
    const randomNumberInclusive = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1) + min);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Initialize canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight - canvas.getBoundingClientRect().top;
        };
        setCanvasSize();

        // Initialize columns
        const maxHeight = Math.floor(canvas.height / symbolSize);
        columnsRef.current = [];
        for (let i = 0; i < canvas.width / symbolSize; i++) {
            const randomMaxPos = randomNumberInclusive(minimumHeight, maxHeight);
            columnsRef.current.push(new Column(i * symbolSize, randomMaxPos));
        }

        // Resize observer fallback
        const handleResize = () => {
            setCanvasSize();
            // Recalculate maxHeight and columns on resize
            const newMaxHeight = Math.floor(canvas.height / symbolSize);
            columnsRef.current = [];
            for (let i = 0; i < canvas.width / symbolSize; i++) {
                const randomMaxPos = randomNumberInclusive(minimumHeight, newMaxHeight);
                columnsRef.current.push(new Column(i * symbolSize, randomMaxPos));
            }
        };

        window.addEventListener('resize', handleResize);

        // Draw function
        const draw = () => {
            if (!ctx || !canvas) return;

            // fade the foreground
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${symbolSize - 2}px monospace`;
            ctx.fillStyle = 'rgb(0, 255, 0)';

            for (const column of columnsRef.current) {
                const character = String.fromCharCode(randomNumberInclusive(32, 126));
                ctx.fillText(character, column.x, column.position * symbolSize, symbolSize);

                column.position++;

                if (column.position > column.maxPosition) {
                    column.position = 0;
                    column.maxPosition = randomNumberInclusive(minimumHeight, Math.floor(canvas.height / symbolSize));
                }
            }
        };

        // requestAnimationFrame has better performance
        let animationFrameId: number;
        let lastFrameTime = 0;
        const frameInterval = 50;

        const tick = (timestamp: number) => {
            if (timestamp - lastFrameTime >= frameInterval) {
                draw();
                lastFrameTime = timestamp;
            }
            animationFrameId = requestAnimationFrame(tick);
        };

        animationFrameId = requestAnimationFrame(tick);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            id="matrixCanvas"
            ref={canvasRef}
            style={{display: 'block', width: '100vw', background: 'black'}}
        />
    );
}
