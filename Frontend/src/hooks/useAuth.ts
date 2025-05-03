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

  // Handle PayPal return before authentication check
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paypalReturn = params.get("paypal_return");
    
    if (paypalReturn === "success" && !isProcessingPayment) {
      setIsProcessingPayment(true);
      
      // Get the subscription ID from localStorage
      const subscriptionId = localStorage.getItem('pending_subscription_id');
      
      if (subscriptionId) {
        console.log("Processing PayPal payment confirmation:", subscriptionId);
        paymentSuccess(subscriptionId)
          .then((res) => {
            if (res?.data) {
              console.log("PayPal payment confirmed successfully");
              localStorage.removeItem('pending_subscription_id');
              dispatch(pay());
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

  // Regular authentication check
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