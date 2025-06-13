import {getReminders} from "@api/remindersApi.ts";
import {APP_CONFIG} from "@constants/common.ts"
import useSWR from "swr";
import {API_REMINDERS} from "@constants/api.ts";
import type {Remined} from "@/types/calendar.ts";

const {API_USER_ID, API_ACCESS_TOKEN} = APP_CONFIG;

type RType = {
    data: Remined[];
    isLoading: boolean;
    error: Error;
}

const useCalendarData = (): RType => {

    const {
        data,
        isLoading,
        error,
    } = useSWR(API_USER_ID && API_ACCESS_TOKEN ? [API_USER_ID, API_ACCESS_TOKEN, API_REMINDERS] : null,
        async () => await getReminders(API_USER_ID, API_ACCESS_TOKEN));


    return {
        data: data ? Object.values(data) : [],
        isLoading,
        error
    }

}

export default useCalendarData;