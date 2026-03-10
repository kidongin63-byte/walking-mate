import { useStore } from '../store';
import CourseCard from '../components/CourseCard';
import { motion } from 'motion/react';
import { HeartCrack } from 'lucide-react';

export default function Saved() {
  const { savedCourseIds, courses } = useStore();
  const savedCourses = courses.filter((course) => savedCourseIds.includes(course.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="pb-24 pt-8 px-4 max-w-md mx-auto"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
          찜한 코스
        </h1>
        <p className="text-gray-600 text-lg">
          마음에 드는 코스를 모아보세요.
        </p>
      </header>

      {savedCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {savedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <HeartCrack size={48} className="text-gray-300 mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">아직 찜한 코스가 없어요</h2>
          <p className="text-gray-500">
            마음에 드는 코스의 하트 버튼을 눌러 저장해보세요.
          </p>
        </div>
      )}
    </motion.div>
  );
}
