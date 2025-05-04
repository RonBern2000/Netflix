import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { useCheckStatusQuery, usePaymentSuccessMutation } from '../store/slices/authApiSlice';
import { logout, pay, setStatus } from '../store/slices/authSlice';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isAuthenticated, isActive, email } = useAppSelector((state) => state.auth);
  const { data, isSuccess, isError } = useCheckStatusQuery();
  const [paymentSuccess] = usePaymentSuccessMutation();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paypalReturn = params.get("paypal_return");
    
    if (paypalReturn === "success" && !isProcessingPayment) {
      setIsProcessingPayment(true);
      const subscriptionId = localStorage.getItem('pending_subscription_id');
      
      if (subscriptionId) {
        paymentSuccess(subscriptionId).then(async (res) => {
          if (res?.data) {
            localStorage.removeItem('pending_subscription_id');
            dispatch(pay());
            setIsPaid(true);
            navigate('/login');
          }
        })
        .catch((err) => {
          console.error("PayPal payment confirmation failed:", err);
        })
        .finally(() => {
          setIsProcessingPayment(false);
        });
      } else {
        console.error("No subscription ID found for PayPal confirmation");
        setIsProcessingPayment(false);
      }
    }
  }, [location.search, dispatch, paymentSuccess, isProcessingPayment, navigate]);

  useEffect(() => {
    if (isProcessingPayment || isPaid) {
      return;
    }
    if (isSuccess) {
      dispatch(setStatus(data));
    } else if (isError) {
      dispatch(logout());
    }
  }, [data, isSuccess, isError, dispatch, isProcessingPayment, isPaid]);
  return { isAuthenticated, isActive, email };
};

export default useAuth;