import { useStore } from '../store';
import { AgeGroup, Theme, Companion } from '../types';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { Settings, User, Map, Users } from 'lucide-react';

export default function Profile() {
  const { profile, setProfile } = useStore();

  const handleAgeChange = (ageGroup: AgeGroup) => {
    setProfile({ ageGroup: profile.ageGroup === ageGroup ? null : ageGroup });
  };

  const handleThemeChange = (theme: Theme) => {
    setProfile({ theme: profile.theme === theme ? null : theme });
  };

  const handleCompanionChange = (companion: Companion) => {
    setProfile({ companion: profile.companion === companion ? null : companion });
  };

  const ageOptions: { value: AgeGroup; label: string }[] = [
    { value: '1020', label: '10-20대' },
    { value: '3040', label: '30-40대' },
    { value: '5060', label: '50-60대' },
    { value: '70+', label: '70대 이상' },
  ];

  const themeOptions: { value: Theme; label: string }[] = [
    { value: 'nature', label: '자연' },
    { value: 'culture', label: '문화' },
    { value: 'city', label: '도심' },
    { value: 'healing', label: '힐링' },
  ];

  const companionOptions: { value: Companion; label: string }[] = [
    { value: 'alone', label: '혼자' },
    { value: 'couple', label: '연인' },
    { value: 'family', label: '가족' },
    { value: 'friends', label: '친구' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="pb-24 pt-8 px-4 max-w-md mx-auto"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
          나의 프로필
        </h1>
        <p className="text-gray-600 text-lg">
          맞춤형 코스 추천을 위해 정보를 입력해주세요.
        </p>
      </header>

      <div className="space-y-8">
        <section>
          <div className="flex items-center mb-4">
            <User size={20} className="text-emerald-600 mr-2" />
            <h2 className="text-lg font-bold text-gray-900">연령대</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {ageOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAgeChange(option.value)}
                className={clsx(
                  'py-3 px-4 rounded-xl border font-medium transition-colors',
                  profile.ageGroup === option.value
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center mb-4">
            <Map size={20} className="text-blue-600 mr-2" />
            <h2 className="text-lg font-bold text-gray-900">선호 테마</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleThemeChange(option.value)}
                className={clsx(
                  'py-3 px-4 rounded-xl border font-medium transition-colors',
                  profile.theme === option.value
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center mb-4">
            <Users size={20} className="text-purple-600 mr-2" />
            <h2 className="text-lg font-bold text-gray-900">동반 유형</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {companionOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleCompanionChange(option.value)}
                className={clsx(
                  'py-3 px-4 rounded-xl border font-medium transition-colors',
                  profile.companion === option.value
                    ? 'bg-purple-50 border-purple-200 text-purple-700'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
