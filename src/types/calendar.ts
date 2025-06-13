export type CalendarElement = {
    day: number;
    isCurrentMonth: boolean;
    date: Date;
}

export type Remined = {
    reminder_ai_text: string;
    reminder_created_at: string;
    reminder_notify_minutes: number;
    reminder_on_datetime: string;
    reminder_text: string;
    user_notified: boolean;
}

export type CalendarElementWithReminded = CalendarElement & {
    reminders: Remined[]
}