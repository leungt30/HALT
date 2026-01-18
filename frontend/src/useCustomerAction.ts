import { useSessionId } from './useSessionId';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function useCustomerAction() {
    const sessionId = useSessionId();

    const logAction = async (actionType: string, actionSubject: string) => {
        try {
            const response = await fetch(`${API_URL}/api/CustomerAction`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    actionType,
                    actionSubject,
                    sessionId,
                }),
            });

            if (!response.ok) {
                console.error(`Failed to log customer action: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error logging customer action:', error);
        }
    };

    return { logAction };
}
