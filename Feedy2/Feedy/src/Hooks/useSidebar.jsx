import { useState, useCallback } from "react";

const useSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = useCallback(() => {
    setIsSidebarOpen((prevState) => !prevState);
  }, []);

  return { isSidebarOpen, handleSidebarToggle };
};

export default useSidebar;
