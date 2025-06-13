import {apiClient} from "./axiosConfig.ts";
import {API_REMINDERS} from "@constants/api.ts";

export const getReminders = async (userId: number, token: string) => {
    const response = await apiClient.post(
        API_REMINDERS,
        { t_user_id: userId },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data.reminders;
};
