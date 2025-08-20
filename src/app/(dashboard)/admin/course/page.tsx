import ManageCourse from "@/components/Course/ManageCourse";
import { getCourses } from "@/services/courseService";

export default async function Course() {
  let courses = [];

  try {
    courses = await getCourses();
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    // fallback empty array, page still renders
  }

  return <ManageCourse courses={courses} />;
}
