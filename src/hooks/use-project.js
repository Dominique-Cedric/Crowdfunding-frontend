import { useState, useEffect } from "react";
import { getProject } from "../api/get-project.js";

export function useProject(id) {
    const [project, setProject] = useState(null);

    useEffect(() => {
        getProject(id).then((data) => {
            console.log("Raw project data:", data);
            if (data && data.goal) {
                data.goal = parseFloat(data.goal);
            }
            setProject(data);
        });
    }, [id]);

    return project;
}

export default useProject; 