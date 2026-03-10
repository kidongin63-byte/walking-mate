import { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import ExploreMap from './pages/ExploreMap';
import Saved from './pages/Saved';
import Profile from './pages/Profile';
import { AnimatePresence } from 'motion/react';
import { useStore } from './store';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const fetchCourses = useStore((state) => state.fetchCourses);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <main className="w-full h-full">
        <AnimatePresence mode="wait">
          {currentTab === 'home' && <Home key="home" />}
          {currentTab === 'map' && <ExploreMap key="map" />}
          {currentTab === 'saved' && <Saved key="saved" />}
          {currentTab === 'profile' && <Profile key="profile" />}
        </AnimatePresence>
      </main>
      <BottomNav currentTab={currentTab} onChangeTab={setCurrentTab} />
    </div>
  );
}
