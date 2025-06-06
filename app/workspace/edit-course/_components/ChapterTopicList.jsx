import { Gift, Loader2 } from "lucide-react";
function ChapterTopicList({ course }) {
  const courseLayout = course?.coursejson?.course;
  if (!courseLayout && !course)
    return (
      <div className=" md:flex  gap-5flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-orange-600 drop-shadow-md" />
          <div className="absolute -inset-1 animate-ping rounded-full bg-indigo-100 opacity-75"></div>
        </div>
        <p className="mt-4 text-lg font-medium text-gray-700 animate-pulse">
          Generating Magic...
        </p>
      </div>
    );
  console.log(courseLayout);
  return (
    <div>
      <h2 className="font-bold  text-3xl mt-10">Chapters & Topics</h2>
      <div className="flex flex-col items-center justify-center mt-10">
        {courseLayout?.chapters.map((chapter, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="p-4 border shadow rounded-xl bg-primary text-white">
              <h2 className="text-center ">Chapter {index + 1}</h2>

              <h2 className="font-bold text-lg text-center">
                {chapter.chapterName}
              </h2>

              <h2 className="text-xs flex justify-between gap-16">
                <span>Duration: {chapter?.duration}</span>

                <span>No. Of Chapters: {chapter?.topics?.length}</span>
              </h2>
            </div>

            <div>
              {chapter?.topics.map((topic, index) => (
                <div className="flex flex-col items-center" key={index}>
                  <div className="h-10 bg-gray-300 w-1"></div>

                  <div className="flex items-center gap-5">
                    <span
                      className={`${
                        index % 2 == 0 && "text-transparent"
                      } max-w-xs`}
                    >
                      {topic}
                    </span>

                    <h2 className="text-center rounded-full bg-gray-300 px-6 text-gray-500 p-4">
                      {index + 1}
                    </h2>

                    <span
                      className={`${
                        index % 2 != 0 && "text-transparent"
                      } max-w-xs`}
                    >
                      {topic}
                    </span>
                  </div>

                  {index == chapter?.topics?.length - 1 && (
                    <div className="h-10 bg-gray-300 w-1"></div>
                  )}

                  {index == chapter?.topics?.length - 1 && (
                    <div className="flex items-center gap-5">
                      <Gift className="text-center  rounded-full bg-gray-300 h-14 w-14 text-gray-500 p-4" />
                    </div>
                  )}

                  {index == chapter?.topics?.length - 1 && (
                    <div className="h-10 bg-gray-300 w-1"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="p-4 border shadow rounded-xl bg-green-600 text-white">
          <h2>Finish</h2>
        </div>
      </div>
    </div>
  );
}

export default ChapterTopicList;
