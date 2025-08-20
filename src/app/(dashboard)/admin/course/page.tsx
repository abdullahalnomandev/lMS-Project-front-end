import dynamic from 'next/dynamic';
import { getCourses } from "@/services/courseService";

const DynamicManageCourse = dynamic(
  () => import("@/components/Course/ManageCourse"),
  { ssr: false }
);

export default async function Course() {
  const courses = await getCourses();

  return (
    <DynamicManageCourse courses={courses} />
  );
}
