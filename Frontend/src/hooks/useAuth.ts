import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { useCheckStatusQuery } from '../store/slices/authApiSlice';
import { logout, setStatus } from '../store/slices/authSlice';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isActive, email } = useAppSelector((state) => state.auth);
  const { data, isSuccess, isError } = useCheckStatusQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setStatus(data));
    } else if (isError) {
      dispatch(logout());
    }
  }, [data, isSuccess, isError, dispatch]);

  return { isAuthenticated, isActive, email };
};

export default useAuth;