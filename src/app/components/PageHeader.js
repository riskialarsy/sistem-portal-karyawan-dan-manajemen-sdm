import { TypeAnimation } from 'react-type-animation';

export default function PageHeader({ title = "Analisis Regresi Linear Sederhana", description = "Metode statistik untuk memodelkan hubungan linear antara dua variabel" }) {
  return (
    <div className="text-center pb-4 sm:pb-8 px-4 sm:px-0">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-800 via-green-600 to-green-400 mb-2 sm:mb-4 hover:scale-105 transform transition-all duration-300 cursor-default leading-relaxed overflow-visible whitespace-normal py-2">
        {title}
      </h1>
      <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-green-700 via-green-500 to-green-300 mx-auto rounded-full mb-2 sm:mb-4"></div>
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mx-4 sm:mx-auto sm:max-w-2xl hover:shadow-xl transition-shadow duration-300 border border-green-100">
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          <TypeAnimation
            sequence={[description]}
            wrapper="span"
            speed={50}
            repeat={1}
            className="text-green-800"
          />
        </p>
      </div>
    </div>
  );
}
