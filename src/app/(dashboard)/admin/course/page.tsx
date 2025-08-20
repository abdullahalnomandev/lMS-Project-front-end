import ManageCourse from "@/components/Course/ManageCourse";
import { getCourses } from "@/services/courseService";

async function fetchCoursesWithFallback() {
  try {
    const courses = await getCourses();
    return { courses: courses || [], error: null };
  } catch (error) {
    console.error("Error fetching courses:", error);
    
    // During build time (prerendering), return empty array to prevent build failure
    if (typeof window === 'undefined' && (process.env.NODE_ENV === 'production' || process.env.VERCEL)) {
      return { courses: [], error: null };
    }
    
    // During runtime, return error for user feedback
    return { 
      courses: [], 
      error: "Unable to load courses. Please try refreshing the page." 
    };
  }
}

export default async function Course() {
  const { courses, error } = await fetchCoursesWithFallback();

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-8">
        <div className="text-center">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to Load Courses</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return <ManageCourse courses={courses} />;
}