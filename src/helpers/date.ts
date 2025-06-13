import type {CalendarElement, CalendarElementWithReminded} from "@/types/calendar.ts";
import {MONTHS_SORT_ARR} from "@constants/calendar.ts";

export const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
};

export const getDaysArrayForMonth = (currentDate: Date): CalendarElement[] => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    const daysInPrevMonth = getDaysInMonth(prevMonth);

    const days: CalendarElement[] = [];

    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        days.push({
            day,
            isCurrentMonth: false,
            date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), day)
        });
    }

    for (let i = 1; i <= daysInMonth; i++) {
        days.push({
            day: i,
            isCurrentMonth: true,
            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
        });
    }

    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    const totalDays = firstDay + daysInMonth;
    const weeksNeeded = Math.ceil(totalDays / 7);
    const totalCells = weeksNeeded * 7;

    const remainingDays = totalCells - days.length;
    for (let i = 1; i <= remainingDays; i++) {
        days.push({
            day: i,
            isCurrentMonth: false,
            date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i)
        });
    }

    return days;
};

export const getCurrentWeek = (arrMonth: CalendarElement[], currentDate: Date) => {
    const days = arrMonth;
    const currentDay = currentDate.getDate();
    const currentWeekStart = Math.floor((currentDay + getFirstDayOfMonth(currentDate) - 1) / 7) * 7;
    return days.slice(currentWeekStart, currentWeekStart + 7);
};

export const getIsTodayDate = (date: Date) => {
    return new Date(date).getFullYear() === new Date().getFullYear()
        && new Date(date).getMonth() === new Date().getMonth()
        && new Date(date).getDate() === new Date().getDate()
}

export const getClock = (date: string) => {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

export const getDayAndMonth = (date: string | Date) => {
    const day = new Date(date).getDate();
    const month = MONTHS_SORT_ARR[new Date(date).getMonth()];

    return `${month} ${day}`;
}

export const getUpcomingReminderIndex = (reminders: CalendarElementWithReminded['reminders'])=> {
    const now = new Date();

    for (let i = 0; i < reminders.length; i++) {
        const reminder = reminders[i];
        const notifyMinutes = reminder.reminder_notify_minutes;
        const reminderTime = new Date(reminder.reminder_on_datetime);
        const notifyTime = new Date(reminderTime.getTime() - notifyMinutes * 60 * 1000);

        if (now >= notifyTime && now < reminderTime && !reminder.user_notified) {
            return i;
        }
    }

    return null;
}

export const calculateTimeLeft = (till : string) => {
    const target = new Date(till).getTime();
    const now = Date.now();
    const difference = target - now;
    if (difference <= 0) {
        return null;
    }
    return  {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
};