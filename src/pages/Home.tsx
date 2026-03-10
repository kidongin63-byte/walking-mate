import { useState } from 'react';
import { useStore } from '../store';
import CourseCard from '../components/CourseCard';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, MapPin } from 'lucide-react';

type CategoryType = 'age' | 'companion';
interface Category {
  id: string;
  label: string;
  type: CategoryType;
  icon: string;
  color: string;
}

const categories: Category[] = [
  { id: '1020', label: '10-20대', type: 'age', icon: '🎧', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: '3040', label: '30-40대', type: 'age', icon: '💼', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: '5060', label: '50-60대', type: 'age', icon: '🍵', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: '70+', label: '70대 이상', type: 'age', icon: '🚶', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'family', label: '가족', type: 'companion', icon: '👨‍👩‍👧‍👦', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { id: 'couple', label: '연인', type: 'companion', icon: '💑', color: 'bg-pink-50 text-pink-700 border-pink-200' },
];

const regions = ['서울', '경기', '강원', '충청', '전라', '경상', '제주', '100대 명산'];

const subRegions: Record<string, string[]> = {
  '서울': ['종로구', '중구', '성동구', '강남구', '송파구', '강서구', '마포구', '서초구', '영등포구', '동대문구'],
  '경기': ['수원시', '용인시', '성남시', '화성시', '부천시', '남양주시', '안산시', '평택시', '안양시', '파주시', '오산시', '구리시'],
  '강원': ['강릉시', '춘천시', '원주시', '속초시', '동해시'],
  '충청': ['대전시', '세종시', '천안시', '청주시', '아산시', '서산시', '공주시', '증평군', '예산군', '태안군'],
  '전라': ['광주시', '전주시', '여수시', '순천시', '목포시', '익산시', '군산시', '고창군', '부안군', '진도군'],
  '경상': ['부산시', '대구시', '울산시', '창원시', '포항시', '구미시', '경주시', '해운대구', '달서구', '거제시', '통영시'],
  '제주': ['제주시', '서귀포시'],
  '100대 명산': ['수도권 명산', '강원권 명산', '충청권 명산', '전라권 명산', '경상권 명산', '제주권 명산'],
};

export default function Home() {
  const courses = useStore((state) => state.courses);
  const { homeStep: step, setHomeStep: setStep } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedSubRegion, setSelectedSubRegion] = useState<string | null>(null);
  const [showSubRegions, setShowSubRegions] = useState(false);

  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat);
    setStep('region');
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    if (subRegions[region]) {
      setShowSubRegions(true);
    } else {
      setSelectedSubRegion(null);
      setStep('result');
    }
  };

  const handleSubRegionSelect = (sub: string) => {
    setSelectedSubRegion(sub);
    setShowSubRegions(false);
    setStep('result');
  };

  const handleBack = () => {
    if (showSubRegions) {
      setShowSubRegions(false);
    } else if (step === 'result') {
      setStep('region');
    } else if (step === 'region') {
      setStep('category');
    }
  };

  const filteredCourses = courses.filter(course => {
    if (!selectedCategory || !selectedRegion) return false;

    let categoryMatch = false;
    if (selectedCategory.type === 'age') {
      categoryMatch = course.ageGroups.includes(selectedCategory.id as any);
    } else {
      categoryMatch = course.companions.includes(selectedCategory.id as any);
    }

    let regionMatch = false;
    if (selectedSubRegion) {
      regionMatch = course.region.includes(selectedSubRegion);
    } else {
      if (selectedRegion === '충청') {
        regionMatch = ['충남', '충북', '대전', '세종', '충청'].some(r => course.region.startsWith(r));
      } else if (selectedRegion === '전라') {
        regionMatch = ['전남', '전북', '광주', '전라'].some(r => course.region.startsWith(r));
      } else if (selectedRegion === '경상') {
        regionMatch = ['경남', '경북', '부산', '대구', '울산', '경상'].some(r => course.region.startsWith(r));
      } else {
        regionMatch = course.region.startsWith(selectedRegion);
      }
    }

    return categoryMatch && regionMatch;
  });

  return (
    <div className="pb-24 pt-8 px-4 max-w-md mx-auto min-h-screen flex flex-col">
      <div className="flex items-center justify-center mb-8 h-12">
        {step !== 'category' && (
          <button onClick={handleBack} className="absolute left-4 p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
        )}
        <button className="px-8 py-2.5 bg-white border-2 border-emerald-500 text-emerald-700 rounded-full font-bold shadow-sm cursor-default active:scale-100">
          {step === 'category' && '누구와 함께 걷나요?'}
          {step === 'region' && (showSubRegions ? '상세 지역 선택' : '어디로 떠날까요?')}
          {step === 'result' && '추천 걷기 코스'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {step === 'category' && (
          <motion.div
            key="category"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat)}
                className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 shadow-sm hover:shadow-md transition-all active:scale-95 ${cat.color}`}
                style={{ aspectRatio: '1/1' }}
              >
                <span className="text-5xl mb-4 drop-shadow-sm">{cat.icon}</span>
                <span className="font-bold text-lg">{cat.label}</span>
              </button>
            ))}
          </motion.div>
        )}

        {step === 'region' && (
          <motion.div
            key="region"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full"
          >
            <div className="mb-8 p-5 bg-gray-50 rounded-2xl flex items-center gap-4 border border-gray-100">
              <span className="text-4xl">{selectedCategory?.icon}</span>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">선택한 대상</p>
                <p className="font-bold text-xl text-gray-900">{selectedCategory?.label}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {showSubRegions ? (
                subRegions[selectedRegion!]?.map(sub => (
                  <button
                    key={sub}
                    onClick={() => handleSubRegionSelect(sub)}
                    className="py-4 rounded-xl border-2 border-gray-100 bg-white shadow-sm hover:border-emerald-400 hover:bg-emerald-50 active:scale-95 transition-all flex flex-col items-center justify-center text-center"
                  >
                    <span className="font-bold text-base text-gray-800">{sub}</span>
                  </button>
                ))
              ) : (
                regions.map(region => (
                  <button
                    key={region}
                    onClick={() => handleRegionSelect(region)}
                    className="py-5 rounded-2xl border-2 border-gray-100 bg-white shadow-sm hover:border-emerald-400 hover:bg-emerald-50 active:scale-95 transition-all flex flex-col items-center gap-3"
                  >
                    <MapPin size={28} className={region === '전국' ? 'text-blue-500' : 'text-emerald-500'} />
                    <span className="font-bold text-lg text-gray-800">{region}</span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="flex gap-2 mb-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-bold whitespace-nowrap flex items-center gap-2">
                {selectedCategory?.icon} {selectedCategory?.label}
              </span>
              <span className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold whitespace-nowrap flex items-center gap-2">
                <MapPin size={16} /> {selectedRegion} {selectedSubRegion && `> ${selectedSubRegion}`}
              </span>
            </div>

            {filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 mt-4">
                <p className="text-gray-500 mb-4 text-lg">조건에 맞는 코스가 없습니다.</p>
                <button
                  onClick={() => setStep('region')}
                  className="px-6 py-3 bg-white border border-gray-200 rounded-full text-emerald-600 font-bold shadow-sm active:scale-95 transition-transform"
                >
                  다른 지역 선택하기
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
