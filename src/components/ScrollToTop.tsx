import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ページ遷移時に画面トップにスクロールするコンポーネント
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
