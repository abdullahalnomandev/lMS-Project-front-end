import { getCourses } from "@/services/courseService";
import React from "react";
import AllCourseCard from "@/components/Course/AllCourse";

export default async function CourseDetailsPage() {
  try {
    const courses = await getCourses();
    return <AllCourseCard courses={courses} />;
  } catch (error) {
    // Handle the 404 error gracefully
    console.error("Error fetching courses:", error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">
          No courses available at the moment. Please try again later.
        </p>
      </div>
    );
  }
}
