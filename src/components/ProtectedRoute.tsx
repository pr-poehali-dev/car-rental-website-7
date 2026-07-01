import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Icon from '@/components/ui/icon';

interface Props {
  children: ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly }: Props) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="dark flex min-h-screen items-center justify-center bg-background text-gold">
        <Icon name="LoaderCircle" size={40} className="animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
