import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";
import { Loader2, CheckCircle } from "lucide-react";
import { useContext } from "react";

function ChapterListSidebar({ courseInfo }) {
  const course = courseInfo?.courses;
  const enrollCourse = courseInfo?.enrollCourse;
  const completedChapters = enrollCourse?.completedChapters ?? [];
  const courseContent = courseInfo?.courses?.courseContent;
  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(
    SelectedChapterIndexContext
  );

  if (!courseContent) {
    return (
      <div className="md:flex gap-5 flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
        <div className="relative">
          <Loader2 className="w-5 h-5 animate-spin text-orange-600 drop-shadow-md" />
          <div className="absolute -inset-1 animate-ping rounded-full bg-indigo-100 opacity-75"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-secondary h-screen p-5 overflow-y-auto">
      <h2 className="my-3 font-bold text-xl">
        Chapters ({courseContent?.length})
      </h2>

      <Accordion type="single" collapsible>
        {courseContent?.map((chapter, index) => {
          const isCompleted = completedChapters.includes(index);
          return (
            <AccordionItem
              key={index}
              value={chapter?.courseData?.chapterName}
              onClick={() => setSelectedChapterIndex(index)}
            >
              <AccordionTrigger className="text-lg font-medium flex items-center justify-between">
                <span>
                  {index + 1}. {chapter?.courseData?.chapterName}
                </span>
                {isCompleted && (
                  <CheckCircle className="w-4 h-4 text-green-600 ml-2" />
                )}
              </AccordionTrigger>
              <AccordionContent asChild>
                <div>
                  {chapter?.courseData.topics.map((topic, index) => (
                    <h2 key={index} className="p-3 bg-white my-1 rounded-lg">
                      {topic?.topic}
                    </h2>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

export default ChapterListSidebar;
