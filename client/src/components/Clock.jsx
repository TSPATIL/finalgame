import React, { useEffect, useState } from 'react'

export default function Clock() {
    const [clock, setClock] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setClock(new Date());
        }, 1000);

        return () => {
            clearInterval(timer)
        }
    }, []);
    return (
        <div className='Clock'>
            <div className='clock text-4xl text-white text-right'>
                {clock.toLocaleTimeString()}
            </div>
        </div>
    )
}
