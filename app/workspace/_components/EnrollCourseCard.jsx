import { Book, PlayCircle } from "lucide-react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function EnrollCourseCard({ course, enrollCourse }) {
  const coursejson = course?.coursejson?.course;
  const calculateProgress = () => {
    const completed = enrollCourse?.completedChapters?.length ?? 0;
    const total = course?.courseContent?.length ?? 1; // avoid division by 0
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="shadow rounded-xl mt-3">
      <Image
        src={course?.bannerImageURL}
        alt={course?.name}
        width={400}
        height={300}
        className="w-full aspect-video rounded-t-xl object-cover"
      />
      <div className="p-3 flex flex-col gap-3">
        <h2 className="font-bold text-lg">{coursejson.name}</h2>
        <p className="line-clamp-3 text-gray-400 text-sm">
          {coursejson.description}
        </p>
        <div className="">
          <h2 className="flex justify-between text-sm text-primary">
            Progress <span>{calculateProgress() + "%"}</span>
          </h2>
          <Progress value={calculateProgress()} />
          <Link href={"/workspace/view-course/" + course?.cid}>
            <Button className={"w-full mt-3"}>
              <PlayCircle />
              Continue Learning
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EnrollCourseCard;
