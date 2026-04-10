import React, { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface RoleGuardProps {
  roles: string[];
  children: ReactNode;
  fallback?: ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ roles, children, fallback }) => {
  const { hasRole } = useAuth();
  const hasAccess = roles.some((role) => hasRole(role));

  if (!hasAccess) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
};

export default RoleGuard;
