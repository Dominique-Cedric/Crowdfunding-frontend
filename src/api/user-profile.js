const API_URL = "https://risingathletes-495c4007dfac.herokuapp.com";

export async function getUserProfile(userId) {
    try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error('Response not OK:', {
                status: response.status,
                statusText: response.statusText,
                errorData
            });
            throw new Error(`Failed to fetch user profile: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export async function updateUserProfile(userId, data) {
    try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error('Update response not OK:', {
                status: response.status,
                statusText: response.statusText,
                errorData
            });
            throw new Error(`Failed to update user profile: ${response.statusText}`);
        }

        const updatedData = await response.json();
        return updatedData;
    } catch (error) {
        console.error('Update error:', error);
        throw error;
    }
} 