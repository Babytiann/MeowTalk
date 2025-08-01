import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { isLoggedIn } from '../service/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedIn = isLoggedIn();
    
    // 如果需要认证但用户未登录，重定向到登录页
    if (requireAuth && !loggedIn) {
      navigate('/login', { 
        replace: true,
        state: { from: location.pathname }
      });
    }
    
    // 如果用户已登录但访问登录页，重定向到首页
    if (loggedIn && location.pathname === '/login') {
      navigate('/home', { replace: true });
    }
  }, [navigate, location, requireAuth]);

  return <>{children}</>;
}

export default AuthGuard; 