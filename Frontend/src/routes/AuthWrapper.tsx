import useAuth from '../hooks/useAuth';
import AppRoutes from '../routes/AppRoutes';

const AuthWrapper = () => {
    const { isAuthenticated, isActive, email } = useAuth();

    return (
        <AppRoutes
            isAuthenticated={isAuthenticated}
            isActive={isActive}
            email={email}
        />
    );
};

export default AuthWrapper;