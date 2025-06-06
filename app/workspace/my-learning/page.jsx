import EnrollCourseList from "../_components/EnrollCourseList";
import WelcomeBanner from "../_components/WelcomeBanner";

function MyLearning() {
  return (
    <div>
      <WelcomeBanner />
      <h2 className="font-bold text-2xl mt-5">My Learning</h2>
      <EnrollCourseList />
    </div>
  );
}

export default MyLearning;
