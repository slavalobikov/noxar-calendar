import type {CalendarElement, CalendarElementWithReminded, Remined} from "@/types/calendar";

export const mergeCalendarWithReminders =
    (calendar: CalendarElement[], reminders: Remined[]): CalendarElementWithReminded[] => {
        const remindersMap: Record<string, Remined[]> = reminders?.reduce((acc: Record<string, Remined[]>, reminder) => {
            const reminderDateTime = new Date(reminder?.reminder_on_datetime?.split(' ')[0]);
            // Смещаем дату на 1 день, при условии если бекенд возвращает дату без декрементирования ( начинается не с 0, а с 1)
            const previousDay = new Date(reminderDateTime);
            previousDay.setDate(previousDay.getDate() - 1);
            const reminderDate = previousDay.toISOString().split('T')[0];
            if (!acc[reminderDate]) {
                acc[reminderDate] = [];
            }
            acc[reminderDate].push(reminder);
            return acc;
        }, {});

        return calendar?.map(day => {
            const calendarDate = new Date(day.date).toISOString().split('T')[0];
            return {
                ...day,
                reminders: remindersMap[calendarDate] || []
            };
        });
    }