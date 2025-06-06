"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import EnrollCourseCard from "./EnrollCourseCard";

function EnrollCourseList() {
  const [enrollCourseList, setEnrollCourseList] = useState();
  useEffect(() => {
    getEnrollCourse();
  }, []);
  const getEnrollCourse = async () => {
    const result = await axios.get("/api/enroll-course");
    console.log(result.data);
    setEnrollCourseList(result.data);
  };
  return (
    enrollCourseList && (
      <div>
        <h2 className="font-bold text-xl mt-3">
          Continue Learning Your Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-col-2 xl:grid-cols-3 gap-5">
          {enrollCourseList.map((course, index) => (
            <EnrollCourseCard
              course={course?.courses}
              enrollCourse={course?.enrollCourse}
              key={index}
            />
          ))}
        </div>
      </div>
    )
  );
}

export default EnrollCourseList;
