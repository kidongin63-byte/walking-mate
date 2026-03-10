import { Home, Map as MapIcon, Heart, User } from 'lucide-react';
import { clsx } from 'clsx';
import { useStore } from '../store';

interface BottomNavProps {
  currentTab: string;
  onChangeTab: (tab: string) => void;
}

export default function BottomNav({ currentTab, onChangeTab }: BottomNavProps) {
  const setHomeStep = useStore((state) => state.setHomeStep);
  const tabs = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'map', label: '지도 탐색', icon: MapIcon },
    { id: 'saved', label: '찜한 코스', icon: Heart },
    { id: 'profile', label: '프로필', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'home') {
                  setHomeStep('category');
                }
                if (currentTab !== tab.id) {
                  onChangeTab(tab.id);
                }
              }}
              className={clsx(
                'flex flex-col items-center justify-center w-full h-full space-y-1',
                isActive ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-600'
              )}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
