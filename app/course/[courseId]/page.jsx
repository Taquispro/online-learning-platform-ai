"use client";
import AppHeader from "@/app/workspace/_components/AppHeader";
import ChapterListSidebar from "../_components/ChapterListSidebar";
import ChapterContent from "../_components/ChapterContent";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

function Course() {
  const [courseInfo, setCourseInfo] = useState(null);
  const { courseId } = useParams();

  useEffect(() => {
    getEnrollCourseById();
  }, []);

  const getEnrollCourseById = async () => {
    const result = await axios.get(`/api/enroll-course?courseId=${courseId}`);

    setCourseInfo(result.data);
  };
  console.log(courseInfo);

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader hideSidebar={true} />
      <div className="flex flex-1">
        {/* Sidebar with fixed width */}
        <div className="w-80 border-r">
          <ChapterListSidebar courseInfo={courseInfo} />
        </div>

        {/* Content takes full remaining space */}
        <div className="flex-1 overflow-auto">
          <ChapterContent
            courseInfo={courseInfo}
            refreshData={() => getEnrollCourseById()}
          />
        </div>
      </div>
    </div>
  );
}

export default Course;
