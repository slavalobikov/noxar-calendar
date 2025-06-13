import {memo} from 'react';
import cn from 'classnames';

import type {CalendarElementWithReminded} from "@/types/calendar.ts";
import {getClock, getDayAndMonth, getIsTodayDate, getUpcomingReminderIndex} from "@helpers/date.ts";

import './styles.css';
import Timer from "@components/Timer";

type Props = {
    data: CalendarElementWithReminded
}

const Reminds = ({data}: Props) => {

    const isNotificationShow = (minutes: number, index: number) => {
        return getIsTodayDate(data.date) && minutes != 0 && getUpcomingReminderIndex(data.reminders) === index
    }
    return (
        <div className="remindWrapper">
            <h2 className="remindH2">{getDayAndMonth(data.date)}</h2>
            {data?.reminders.length === 0 && (
                <div className="emptyRemind">Сегодня событий нету</div>
            )}
            {data.reminders?.map(({reminder_text, reminder_on_datetime, reminder_notify_minutes}, index) => (
                <div className="remind" key={index}>
                    {isNotificationShow(reminder_notify_minutes, index) && <div className="remindTimer">скоро начнется: <Timer till={reminder_on_datetime} /></div>}
                    <div className={cn("remindTitle", {
                        "titleWithTimer": isNotificationShow(reminder_notify_minutes, index)
                    })}>{reminder_text}</div>
                    <div className="remindClock">{getClock(reminder_on_datetime)}</div>
                    <div className="remindLeftIcon"/>
                </div>
            ))}
        </div>
    )
}

export default memo(Reminds);