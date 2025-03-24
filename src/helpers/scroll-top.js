import { useLayoutEffect } from "react";
import { useLocation } from 'react-router-dom'

const ScrollToTop = ({children}) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children
};

export const scrollToElement = (id,offset = 100) => {
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};



export default ScrollToTop;