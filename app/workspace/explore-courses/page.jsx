"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";
import { Skeleton } from "@/components/ui/skeleton";

function Explore() {
  const [courseList, setCourseList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [noCourseFound, setNoCourseFound] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    getCourseList();
  }, [user]);

  const getCourseList = async () => {
    const result = await axios.post("/api/courses?courseId=0", {
      keyword: keyword,
    });
    const data = result.data;

    setCourseList(data);
    setNoCourseFound(data.length === 0);
  };

  const onHandleInputChange = (value) => {
    setKeyword(value);
    if (value === "") {
      setNoCourseFound(false);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-3xl mb-6">Explore more courses</h2>

      <div className="flex gap-5 max-w-md">
        <Input
          placeholder="Search"
          onChange={(event) => onHandleInputChange(event.target.value)}
        />
        <Button onClick={getCourseList}>
          <Search />
          Search
        </Button>
      </div>

      {noCourseFound ? (
        <p className="mt-10 text-lg text-gray-600 font-medium">
          No courses found for "
          <span className="text-orange-600">{keyword}</span>"
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-col-2 xl:grid-cols-3 gap-5 mt-5">
          {courseList.length > 0
            ? courseList.map((course, index) => (
                <CourseCard course={course} key={index} />
              ))
            : [0, 1, 2, 3].map((_, index) => (
                <Skeleton className="w-full h-[240px]" key={index} />
              ))}
        </div>
      )}
    </div>
  );
}

export default Explore;
