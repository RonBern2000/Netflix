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

            if (data) {
                const { subscriptionId } = data; // TODO: Crypt it and deCrypt it in the backend
                const greatSuccess = await paymentSuccess(subscriptionId);
                if (greatSuccess) {
                    dispatch(pay());
                }
            } else {
                console.error("Approval URL not returned");
            }
        } catch (error) {
            console.error("Payment subscription failed", error);
        }
    }

    return (
        <Container>
            <Button className="h-20 w-30 bg-red-700 text-white text-2xl rounded-md" onClick={handlePay}>{isPaying ? "Processing" : "Pay"}</Button>
        </Container>
    )
}

export default PaymentForm;