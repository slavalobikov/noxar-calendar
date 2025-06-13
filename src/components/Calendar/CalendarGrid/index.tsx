import {memo} from 'react';
import cn from 'classnames';

import {WEEK_DAYS} from "@constants/calendar.ts";
import type {CalendarElementWithReminded} from "@/types/calendar.ts";
import arrowIcon from "@svg/arrow.svg";

import './styles.css';
import {getIsTodayDate} from "@helpers/date.ts";


type Props = {
    data: CalendarElementWithReminded[];
    isWeekView: boolean;
    toggleCalendarView: () => void;
    setSelectedDay: (v: number | null) => void;
}

const CalendarGrid = ({data, isWeekView, toggleCalendarView, setSelectedDay}: Props) => {
    return (
        <>
            <div className="calendarGrid">
                {WEEK_DAYS.map(day => (
                    <div key={day} className="weekdayName">{day}</div>
                ))}
            </div>
            <div className="calendarGrid">
                {data.map(({day, isCurrentMonth, reminders, date}, index) =>  (
                    <div onClick={() => setSelectedDay(index)} aria-label={`Посмотреть события ${day}`} tabIndex={0} role="button" key={index}
                         className={cn("day", {"notCurrentDay": !isCurrentMonth})}>
                        <div className={cn({ "todayDay": getIsTodayDate(date)})}>
                        {day}
                        </div>
                        {!!reminders?.length && <div
                            // max-width for cases when length > 8 in css
                            style={{width: 4 + reminders?.length * 4}}
                            className={cn("remindUnderline", {"notCurrentRemindUnderline": !isCurrentMonth})}/>}
                    </div>
                ))}
            </div>
            <div className="calendarExpandWrapper">
                <button
                    className={"expandBtn"}
                    onClick={toggleCalendarView}
                    aria-label={isWeekView
                        ? 'Включить отоброжения календарря по месяцу'
                        : 'Включить отображение календаря по неделе'}
                >
                    <img className={cn("arrowManageCalendar",{"arrowCollapse": isWeekView, "arrowExpand": !isWeekView})} src={arrowIcon}
                         alt="arrow"/>
                </button>
            </div>
        </>
    )
}

export default memo(CalendarGrid);