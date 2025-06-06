import { Button } from "@/components/ui/button";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";
import axios from "axios";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useContext } from "react";
import YouTube from "react-youtube";
import { toast } from "sonner";

function ChapterContent({ courseInfo, refreshData }) {
  const { courseId } = useParams();
  const course = courseInfo?.courses;
  const enrollCourse = courseInfo?.enrollCourse;
  const courseContent = courseInfo?.courses?.courseContent;
  const { selectedChapterIndex } = useContext(SelectedChapterIndexContext);

  const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
  const topics = courseContent?.[selectedChapterIndex]?.courseData?.topics;

  const evenVideos =
    videoData?.length % 2 === 0
      ? videoData
      : videoData?.slice(0, videoData.length - 1);

  const isChapterCompleted =
    enrollCourse?.completedChapters?.includes(selectedChapterIndex);

  const handleToggleCompletion = async () => {
    let completedChapters = enrollCourse?.completedChapters ?? [];

    if (!isChapterCompleted) {
      completedChapters.push(selectedChapterIndex);
    } else {
      completedChapters = completedChapters.filter(
        (index) => index !== selectedChapterIndex
      );
    }

    try {
      await axios.put("/api/enroll-course", {
        courseId: courseId,
        completedChapters,
      });

      toast.success(
        isChapterCompleted
          ? "Chapter marked as incomplete ❌"
          : "Chapter marked as completed ✅"
      );
      refreshData(); // Refresh the updated data
    } catch (err) {
      toast.error("Failed to update chapter status");
      console.error(err);
    }
  };

  if (!courseContent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
        <div className="relative">
          <Loader2 className="w-10 h-10 animate-spin text-orange-600 drop-shadow-md" />
          <div className="absolute inset-0 animate-ping rounded-full bg-indigo-100 opacity-75"></div>
        </div>
        <p className="mt-4 text-lg font-medium text-gray-700 animate-pulse">
          Loading, please wait...
        </p>
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">
          {selectedChapterIndex + 1}.{" "}
          {courseContent?.[selectedChapterIndex]?.courseData.chapterName}
        </h2>

        <Button
          onClick={handleToggleCompletion}
          variant={isChapterCompleted ? "outline" : "default"}
        >
          {isChapterCompleted ? (
            <>
              <XCircle className="mr-2" />
              Mark as Incomplete
            </>
          ) : (
            <>
              <CheckCircle className="mr-2" />
              Mark as Completed
            </>
          )}
        </Button>
      </div>

      <h2 className="my-2 font-bold text-lg">Related Videos 🎬</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {evenVideos?.map((video, index) => (
          <div key={index} className="w-full">
            <YouTube
              videoId={video?.videoId}
              opts={{
                width: "100%",
                height: "300",
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-7">
        {topics.map((topic, index) => (
          <div key={index} className="mt-10 p-5 bg-secondary rounded-2xl">
            <h2 className="font-bold text-2xl text-primary">
              {index + 1}.{topic?.topic}
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: topic?.content }}
              style={{
                lineHeight: "2.5",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;
