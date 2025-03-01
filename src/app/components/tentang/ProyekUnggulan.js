'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProyekUnggulan() {
  const projects = [{
      title: "Online Test",
      category: "Web Application",
      categoryColor: "from-blue-400 via-blue-500 to-cyan-500",
      link: "/proyek/onlinetest",
      features: [
        'Timer otomatis untuk ujian',
        'Randomisasi soal',
        'Penilaian langsung'
      ],
      tags: ['#WebApp', '#Education']
    },
    {
      title: "Simple Linear Regression",
      category: "Analisis Data", 
      categoryColor: "from-blue-400 via-blue-500 to-cyan-500",
      link: "/proyek/simplelinearregression",
      features: [
        'Visualisasi data scatter plot',
        'Perhitungan koefisien regresi',
        'Analisis R-squared dan MSE'
      ],
      tags: ['#MachineLearning', '#DataScience']
    },
    {
      title: "Bunga Sakura dan Kebudayaan Jepang",
      category: "Kecerdasan Buatan",
      categoryColor: "from-blue-400 via-blue-500 to-cyan-500", 
      link: "/proyek/bungasakuradankebudayaanjepang",
      features: [
        'Visualisasi bunga sakura 3D',
        'Sejarah dan makna sakura',
        'Pengaruh dalam budaya Jepang'
      ],
      tags: ['#Budaya', '#GenerativeFill']
    },
    {
      title: "Kruskal Wallis Test",
      category: "Analisis Data",
      categoryColor: "from-blue-400 via-blue-500 to-cyan-500",
      link: "/proyek/kruskalwallistest", 
      features: [
        'Uji statistik non-parametrik',
        'Analisis multi-kelompok',
        'Visualisasi hasil uji'
      ],
      tags: ['#Statistik', '#NonParametrikTest']
    },
    {
      title: "Pemutar Musik Flutter",
      category: "Web and Mobile Programming",
      categoryColor: "from-blue-400 via-blue-500 to-cyan-500",
      link: "/proyek/pemutarmusikflutter",
      features: [
        'Pemutaran musik dari penyimpanan lokal',
        'Antarmuka yang bersih dan minimalis',
        'Kontrol pemutaran dasar (play, pause, next, previous)'
      ],
      tags: ['#Flutter', '#MobileApp']
    },
    {
      title: "Dashboard Tableau",
      category: "Dashboard",
      categoryColor: "from-blue-400 via-blue-500 to-cyan-500",
      link: "/proyek/dashboardtableau",
      features: [
        'Analisis penjualan per region',
        'Visualisasi interaktif dengan Tableau',
        'Interpretasi data komprehensif'
      ],
      tags: ['#DataVisualization', '#BusinessIntelligence']
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {projects.map((project, index) => (
        <Link href={project.link} key={index}>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl p-4 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 text-transparent bg-clip-text mb-2 sm:mb-0 text-justify">
                {project.title}
              </h3>
              <span className={`px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r ${project.categoryColor} text-white rounded-full text-xs sm:text-sm font-medium`}>
                {project.category}
              </span>
            </div>
            <div className="prose prose-sm max-w-none">
              <ul className="space-y-2 sm:space-y-3 list-none pl-0">
                {project.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-600 text-xs sm:text-sm text-justify">
                    <svg className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gradient ${project.categoryColor} shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 text-xs sm:text-sm`}>
              <span className="inline-flex items-center flex-wrap">
                <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 text-transparent bg-clip-text font-medium mr-2">Tags:</span>
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-gradient-to-r ${project.categoryColor} text-white hover:opacity-90 transition-opacity duration-200 m-0.5 sm:m-1 text-[10px] sm:text-xs`}
                  >
                    {tag}
                  </span>
                ))}
              </span>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}