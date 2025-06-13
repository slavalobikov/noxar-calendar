import {useCallback, useMemo, useState} from "react";
import {getCurrentWeek, getDaysArrayForMonth} from "@helpers/date.ts";
import type {CalendarElement} from "@/types/calendar.ts";

type RType = {
    clickPrev: () => void;
    toggleCalendarView: () => void;
    clickNext: () => void;
    clickToday: () => void;
    isWeekView: boolean;
    currentDate: Date;
    arrMonth: CalendarElement[];
    arrWeek: CalendarElement[];
    selectedDay: null | number;
    setSelectedDay: (date: null | number) => void;
}

const useManageCalendar = (initialDate: Date): RType => {
    const [selectedDay, setSelectedDay] = useState<null | number>(null);

    const [currentDate, setCurrentDate] = useState(initialDate);
    const [isWeekView, setIsWeekView] = useState(false);

    const arrMonth = useMemo(() => {
        return getDaysArrayForMonth(currentDate)
    }, [currentDate]);

    const arrWeek = useMemo(() => {
        return getCurrentWeek(arrMonth, currentDate)
    }, [arrMonth, currentDate]);


    const changeMonth = useCallback((delta: number) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
    }, [currentDate]);

    const changeWeek = useCallback((delta: number) => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + delta * 7);
        setCurrentDate(newDate);
    }, [currentDate]);

    const clickPrev = useCallback(() => {
        setSelectedDay(null);
        isWeekView ? changeWeek(-1) : changeMonth(-1);
    }, [changeMonth, changeWeek, isWeekView]) 

    const clickNext = useCallback(() => {
        setSelectedDay(null);
        isWeekView ? changeWeek(1) : changeMonth(1)
    }, [changeMonth, changeWeek, isWeekView]) 

    const toggleCalendarView = useCallback(() => {
        setSelectedDay(null);
        setIsWeekView(prev => !prev);
    }, []) 

    const  clickToday = useCallback(() => {
        setSelectedDay(null);
        setCurrentDate(new Date());
    }, []) 

    return {
        clickPrev,
        toggleCalendarView,
        clickToday,
        clickNext,
        isWeekView,
        currentDate,
        arrMonth,
        arrWeek,
        selectedDay,
        setSelectedDay
    }

}

export default useManageCalendar;