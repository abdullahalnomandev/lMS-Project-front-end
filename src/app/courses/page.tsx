
import { getCourses } from "@/services/courseService";
import React from "react";
import AllCourseCard from "@/components/Course/AllCourse";

export default async function CourseDetailsPage() {
  const courses = await getCourses();

  return (
    <AllCourseCard courses={courses} />
  );
}
