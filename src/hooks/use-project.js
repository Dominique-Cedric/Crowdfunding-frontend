import { useState, useEffect } from "react";
import getProject from "../api/get-project";

export function useProject(id) {
    const [project, setProject] = useState(null);

    useEffect(() => {
        getProject(id).then((data) => {
            if (data.goal) {
                data.goal = parseFloat(data.goal);
            }
            setProject(data);
        });
    }, [id]);

    return project;
}

export default useProject; 