export default function SectionTitle({ children }) {
  return (
    <div className="text-center mb-3 md:mb-6">
      <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-3 leading-relaxed text-justify px-4 md:px-0">
        {children}
      </h2>
      <div className="w-12 md:w-20 h-0.5 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto rounded-full"></div>
    </div>
  );
}
