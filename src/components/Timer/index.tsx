import {memo, useEffect, useState} from 'react'
import {calculateTimeLeft} from "@helpers/date.ts";

type Props = {
    till: string,
}

const Timer = ({ till }:Props) => {

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(till));

    useEffect(() => {
        if (!timeLeft) return;

        const timer = setInterval(() => {
            const updatedTimeLeft = calculateTimeLeft(till);
            setTimeLeft(updatedTimeLeft);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    if (!timeLeft) return null;

    return (
        <span>
            {timeLeft.minutes}:{timeLeft.seconds}
        </span>
    )
}

export default memo(Timer);