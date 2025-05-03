import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/shared/Button";
import Container from "../components/shared/Container";
import { useLazyPayAndActivateUserQuery, usePaymentSuccessMutation } from "../store/slices/authApiSlice";
import { pay } from "../store/slices/authSlice";
import { useAppDispatch } from "../store/store";

const PaymentForm = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [triggerPayment, { isLoading: isPaying }] = useLazyPayAndActivateUserQuery();
    const [paymentSuccess] = usePaymentSuccessMutation();

    // Handle payment initiation
    const handlePay = async () => {
        try {
            console.log("Initiating payment...");
            const { data } = await triggerPayment();

            if (data?.approvalUrl && data?.subscriptionId) {
                console.log("Payment initiated. Subscription ID:", data.subscriptionId);
                console.log("Approval URL:", data.approvalUrl);

                // Store the subscription ID for when redirected back
                localStorage.setItem('pending_subscription_id', data.subscriptionId);

                // Redirect to PayPal
                window.location.href = data.approvalUrl;
            } else {
                console.error("Invalid response from payment API:", data);
            }
        } catch (error) {
            console.error("Payment initiation failed:", error);
        }
    };

    // Handle PayPal return
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const paypalReturn = params.get("paypal_return");

        console.log("Current URL params:", params.toString());

        if (paypalReturn === "success") {
            const subscriptionId = localStorage.getItem('pending_subscription_id');

            if (subscriptionId) {
                console.log("Processing payment confirmation for subscription:", subscriptionId);

                paymentSuccess(subscriptionId)
                    .then((res) => {
                        if (res?.data) {
                            console.log("Payment confirmed successfully!");
                            dispatch(pay());
                            localStorage.removeItem('pending_subscription_id');
                        } else {
                            console.error("Payment confirmation returned unexpected data:", res);
                        }
                    })
                    .catch((err) => {
                        console.error("Payment confirmation API error:", err);
                    });
            } else {
                console.error("No subscription ID found in storage for payment confirmation");
            }
        } else if (paypalReturn === "cancel") {
            console.log("Payment was cancelled by user");
            // Handle cancellation if needed
        }
    }, [location.search, paymentSuccess, dispatch]);

    return (
        <Container>
            <div className="flex flex-col items-center space-y-4">
                <h2 className="text-2xl font-bold">Complete Your Payment</h2>
                <p>Click the button below to proceed with PayPal payment</p>

                <Button
                    className="h-16 px-8 bg-red-700 text-white text-xl rounded-md hover:bg-red-800"
                    onClick={handlePay}
                    disabled={isPaying}
                >
                    {isPaying ? "Processing..." : "Pay with PayPal"}
                </Button>
            </div>
        </Container>
    );
};

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