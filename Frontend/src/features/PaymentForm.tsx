import { useEffect } from "react";
import Button from "../components/shared/Button";
import Container from "../components/shared/Container";
import { useLazyPayAndActivateUserQuery, usePaymentSuccessMutation } from "../store/slices/authApiSlice";
import { pay } from "../store/slices/authSlice";
import { useAppDispatch } from "../store/store";
//import { useNavigate } from "react-router-dom";

const PaymentForm = () => {

    const dispatch = useAppDispatch();
    const [triggerPayment, { isLoading: isPaying }] = useLazyPayAndActivateUserQuery();
    const [paymentSuccess] = usePaymentSuccessMutation();

    const handlePay = async () => {
        try {
            const { data } = await triggerPayment();

            if (data?.approvalUrl && data?.subscriptionId) {
                localStorage.setItem('pending_subscription_id', data.subscriptionId);

                // Redirect to PayPal
                console.log("Redirecting to PayPal:", data.approvalUrl);
                window.location.href = data.approvalUrl;
            } else {
                console.error("Invalid PayPal data returned:", data);
            }
        } catch (error) {
            console.error("Payment subscription failed", error);
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const paypalReturn = params.get("paypal_return");

        console.log("URL Params:", params.toString());

        if (paypalReturn === "success") {
            const subscriptionId = localStorage.getItem('pending_subscription_id');

            if (subscriptionId) {
                console.log("Processing payment confirmation for:", subscriptionId);

                paymentSuccess(subscriptionId)
                    .then((res) => {
                        if (res?.data) {
                            console.log("Payment confirmed successfully");
                            dispatch(pay());
                            localStorage.removeItem('pending_subscription_id');
                        }
                    })
                    .catch((err) => {
                        console.error("Payment confirmation failed", err);
                    });
            } else {
                console.error("No subscription ID found in storage");
            }
        }
    }, [dispatch, paymentSuccess]);

    return (
        <Container>
            <Button className="h-20 w-30 bg-red-700 text-white text-2xl rounded-md" onClick={handlePay}>{isPaying ? "Processing" : "Pay"}</Button>
        </Container>
    )
}

export default PaymentForm;

// const handlePay = async () => {
//     try {
//         const { data } = await triggerPayment();

//         if (data) {
//             const { subscriptionId } = data;
//             const greatSuccess = await paymentSuccess(subscriptionId);
//             if (greatSuccess) {
//                 dispatch(pay());
//             }
//         } else {
//             console.error("Approval URL not returned");
//         }
//     } catch (error) {
//         console.error("Payment subscription failed", error);
//     }
// }