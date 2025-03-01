'use client';

export default function CategoryFilter({ selectedCategory, setSelectedCategory, categories, setCurrentPage }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white pb-4 pt-2 px-2 md:static md:pb-0 md:pt-0 md:px-0 md:mb-8">
      <div className="flex justify-center flex-wrap gap-2 md:gap-4 max-w-screen-xl mx-auto overflow-x-auto">
        <button 
          onClick={() => {
            setSelectedCategory('all');
            setCurrentPage(1);
          }} 
          className={`px-2 py-1 md:px-4 md:py-2 text-xs md:text-base rounded-lg transition-all duration-300 whitespace-nowrap ${
            selectedCategory === 'all' 
              ? 'bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-500 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Semua
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-2 py-1 md:px-4 md:py-2 text-xs md:text-base rounded-lg transition-all duration-300 whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

