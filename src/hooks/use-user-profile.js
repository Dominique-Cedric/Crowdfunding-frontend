import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../api/user-profile.js";

export function useUserProfile(userId) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;
        
        setLoading(true);
        getUserProfile(userId)
            .then((data) => {
                console.log("API Response:", data);
                setProfile(data);
                setError(null);
            })
            .catch((err) => {
                console.error("API Error:", err);
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [userId]);

    const updateProfile = async (updatedData) => {
        try {
            console.log("Sending update data:", updatedData);
            const updated = await updateUserProfile(userId, updatedData);
            console.log("Update response:", updated);
            setProfile(updated);
            return { success: true };
        } catch (err) {
            console.error("Update error:", err);
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    return { profile, loading, error, updateProfile };
} 