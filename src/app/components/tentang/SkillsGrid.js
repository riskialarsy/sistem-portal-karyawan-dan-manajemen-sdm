'use client';

import { useRouter } from 'next/navigation';
import SkillItem from './SkillItem';
import { skills } from '@/app/data/skills';
import { motion } from 'framer-motion';

export default function SkillsGrid() {
  const router = useRouter();
  
  const handleCategoryClick = (category) => {
    localStorage.setItem('selectedCategory', category);
    router.push('/proyek');
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 mb-4 sm:mb-8 p-2 sm:p-4"
    >
      {skills.map((skill, index) => (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          key={index}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          <SkillItem
            key={index}
            skill={skill}
            onClick={() => handleCategoryClick(skill)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}