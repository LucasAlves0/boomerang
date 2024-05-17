"use client";
import { useEffect, useState } from 'react';

const Footer = () => {
  const [views, setViews] = useState(20); // Valor inicial padrão

  useEffect(() => {
    // Verificar se estamos no lado do cliente
    if (typeof window !== 'undefined') {
      const initialViews = parseInt(localStorage.getItem('viewCount') || '20');
      setViews(initialViews);

      const incrementViewCount = () => {
        const newViews = initialViews + 1;
        setViews(newViews);
        localStorage.setItem('viewCount', newViews.toString());
      };

      const hasViewed = localStorage.getItem('hasViewed');

      if (!hasViewed) {
        incrementViewCount();
        localStorage.setItem('hasViewed', 'true');
      }

      const intervalId = setInterval(incrementViewCount, 10000); // 10 segundos

      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <footer className="bg-white border-t">
      <div className="mx-auto py-6 sm:py-8 md:py-10 lg:py-12">
        <p className="text-center text-xs sm:text-sm text-black">
          &copy; 2024 Boomerang
        </p>
      </div>
    </footer>
  );
};

export default Footer;
