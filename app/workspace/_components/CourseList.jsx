"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddNewCourseDiaglog from "./AddNewCourseDiaglog";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import CourseCard from "./CourseCard";

function CourseList() {
  const [courseList, setCourseList] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    getCourseList();
  }, [user]);
  const getCourseList = async () => {
    const result = await axios.post("/api/courses", {
      keyword: "",
    });
    console.log(result.data);
    setCourseList(result.data);
  };

  return (
    <div>
      <h2 className="font-bold text-xl mb-4 mt-3">Course List</h2>
      {courseList.length === 0 ? (
        <div className="flex p-7 items-center justify-center flex-col border rounded-xl mt-2 bg-secondary ">
          <Image src="/online-education.png" alt="edu" width={80} height={80} />
          <h2 className="my-2 text-xl font-bold ">
            Look like you haven't created any courses yet
          </h2>
          <AddNewCourseDiaglog>
            <Button>+ Create your first course</Button>
          </AddNewCourseDiaglog>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-col-2 xl:grid-cols-3 gap-5">
          {courseList?.map((course, index) => (
            <CourseCard course={course} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseList;
