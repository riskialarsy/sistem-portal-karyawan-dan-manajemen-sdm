'use client';

import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function DataTablePagination({ data, itemsPerPage = 10, children }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsSmallMobile(window.innerWidth < 380);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Hitung total halaman
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Dapatkan data untuk halaman saat ini
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Handler untuk perubahan halaman
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handler untuk halaman sebelumnya
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handler untuk halaman selanjutnya
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Buat array nomor halaman yang akan ditampilkan
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = isSmallMobile ? 1 : isMobile ? 3 : 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (isSmallMobile) {
        pageNumbers.push(currentPage);
      } else if (currentPage <= Math.ceil(maxVisiblePages/2)) {
        for (let i = 1; i <= maxVisiblePages-1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - Math.floor(maxVisiblePages/2)) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - (maxVisiblePages-2); i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="space-y-4">
      {/* Render data menggunakan children prop */}
      {children(getCurrentPageData())}

      {/* Pagination controls */}
      <div className="flex flex-col space-y-4 px-2 py-3 bg-white border-t border-gray-200">
        <div className="flex flex-col xs:flex-row items-center justify-between gap-4">
          <p className="text-[10px] xs:text-xs text-gray-700 text-center xs:text-left">
            Menampilkan{' '}
            <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span>
            {' '}-{' '}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, data.length)}
            </span>
            {' '}dari{' '}
            <span className="font-medium">{data.length}</span>
            {' '}data
          </p>
          
          <div className="flex justify-center w-full xs:w-auto">
            <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-1.5 xs:px-2 py-1.5 xs:py-2 text-gray-400 rounded-l-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Sebelumnya</span>
                <FiChevronLeft className="h-3 w-3 xs:h-4 xs:w-4" />
              </button>
              
              {getPageNumbers().map((pageNumber, index) => (
                <button
                  key={index}
                  onClick={() => pageNumber !== '...' && handlePageChange(pageNumber)}
                  disabled={pageNumber === '...'}
                  className={`relative inline-flex items-center px-2 xs:px-2.5 py-1.5 xs:py-2 text-[10px] xs:text-xs font-medium border ${
                    pageNumber === currentPage
                      ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
              
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-1.5 xs:px-2 py-1.5 xs:py-2 text-gray-400 rounded-r-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Selanjutnya</span>
                <FiChevronRight className="h-3 w-3 xs:h-4 xs:w-4" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
