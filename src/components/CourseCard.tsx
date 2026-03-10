import React from 'react';
import { Heart, MapPin, Clock, Navigation } from 'lucide-react';
import { Course } from '../types';
import { useStore } from '../store';
import { clsx } from 'clsx';

interface CourseCardProps {
  key?: string | number;
  course: Course;
  onClick?: () => void;
}

export default function CourseCard({ course, onClick }: CourseCardProps) {
  const { savedCourseIds, toggleSavedCourse } = useStore();
  const isSaved = savedCourseIds.includes(course.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSavedCourse(course.id);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="relative h-48 w-full">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <button
          onClick={handleSave}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
        >
          <Heart
            size={20}
            className={clsx(isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600')}
          />
        </button>
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-medium rounded-full">
            {course.difficulty === 'easy' ? '쉬움' : course.difficulty === 'medium' ? '보통' : '어려움'}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <MapPin size={14} className="mr-1" />
          {course.region}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{course.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{course.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-700 border-t border-gray-50 pt-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Clock size={16} className="mr-1.5 text-emerald-600" />
              <span className="font-medium">{course.duration}분</span>
            </div>
            <div className="flex items-center">
              <Navigation size={16} className="mr-1.5 text-emerald-600" />
              <span className="font-medium">{course.distance}km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
