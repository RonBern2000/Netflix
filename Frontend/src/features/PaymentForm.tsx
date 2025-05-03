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

            if (data?.approvalUrl) {
                // Redirect to PayPal
                window.location.href = data.approvalUrl;
            } else {
                console.error("Approval URL not returned");
            }
        } catch (error) {
            console.error("Payment subscription failed", error);
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const subscriptionId = params.get("subscription_id"); // adjust based on your PayPal config

        console.log("Params:", params);

        if (subscriptionId) {
            paymentSuccess(subscriptionId).then((res) => {
                if (res?.data) {
                    dispatch(pay());
                }
            }).catch((err) => {
                console.error("Payment confirmation failed", err);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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