'use client';

import React, { useState, useEffect } from 'react';
import NavbarSlider from './NavbarSlider';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathName = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (pathName === '/privacy-policy') {
    return null;
  }

  return (
    <NavbarSlider 
      isOpen={isSidebarOpen} 
      toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
    />
  );
};

export default Navbar;