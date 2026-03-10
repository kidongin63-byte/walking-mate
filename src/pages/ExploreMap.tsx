import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import CourseCard from '../components/CourseCard';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useStore } from '../store';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function ExploreMap() {
  const courses = useStore((state) => state.courses);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  return (
    <div className="relative w-full h-[calc(100vh-64px)]">
      <MapContainer
        center={[36.5, 127.5]} // Center of South Korea
        zoom={7}
        className="w-full h-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {courses.map((course) => (
          <Marker
            key={course.id}
            position={course.coordinates}
            eventHandlers={{
              click: () => setSelectedCourseId(course.id),
            }}
          >
            <Popup>
              <div className="font-bold">{course.title}</div>
              <div className="text-xs text-gray-500">{course.region}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-4 left-4 right-4 z-[1000] max-w-md mx-auto"
          >
            <div className="relative">
              <button
                onClick={() => setSelectedCourseId(null)}
                className="absolute -top-10 right-0 p-2 bg-white rounded-full shadow-md z-10"
              >
                <X size={20} className="text-gray-600" />
              </button>
              <CourseCard course={selectedCourse} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
