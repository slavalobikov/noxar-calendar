import {memo, useMemo} from 'react';

import {mergeCalendarWithReminders} from "@helpers/calendar.ts";

import useCalendarData from "./hooks/useCalendarData.ts";
import useManageCalendar from "./hooks/useManageCalendar.ts";

import './styles.css';
import Header from "@components/Calendar/Header";
import CalendarGrid from "@components/Calendar/CalendarGrid";
import Reminds from "@components/Calendar/Reminds";


type Props = {
    initialDate?: Date;
}

const Calendar = ({initialDate = new Date()}: Props) => {
    const {
        clickPrev,
        clickNext,
        clickToday,
        currentDate,
        toggleCalendarView,
        isWeekView,
        arrWeek,
        arrMonth,
        setSelectedDay,
        selectedDay
    } = useManageCalendar(initialDate)
    const {data, isLoading, error} = useCalendarData();
    const arrMonthWithReminds = useMemo(() =>
        mergeCalendarWithReminders(arrMonth, data), [arrMonth, data]);
    const arrWeekWithReminds = useMemo(() =>
        mergeCalendarWithReminders(arrWeek, data), [arrWeek, data]);


    if (isLoading) return <div>Загрузка</div>
    if (error) return <div>Что-то пошло не так</div>

    return (
        <div className="wrapper">
            <div className="calendarMainWrapper">
                <Header
                    clickNext={clickNext}
                    clickPrev={clickPrev}
                    clickToday={clickToday}
                    currentDate={currentDate}
                    isWeekView={isWeekView}
                />
                <CalendarGrid
                    data={isWeekView ? arrWeekWithReminds : arrMonthWithReminds}
                    isWeekView={isWeekView}
                    toggleCalendarView={toggleCalendarView}
                    setSelectedDay={setSelectedDay}
                />
            </div>
            {selectedDay !== null && <Reminds
                data={(isWeekView ? arrWeekWithReminds : arrMonthWithReminds)?.[selectedDay]}/>}
        </div>
    );
};

export default memo(Calendar);