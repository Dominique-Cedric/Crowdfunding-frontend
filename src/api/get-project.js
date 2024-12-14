export async function getProject(id) {
  try {
    const url = `${import.meta.env.VITE_API_URL}projects/${id}/`;
    console.log("Fetching from URL:", url);
    const response = await fetch(url);
    const data = await response.json();
    console.log("API Response:", data);
    
    if (data && data.goal) {
      data.goal = parseFloat(data.goal);
    }
    return data;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export default getProject;