import Button from "../components/shared/Button";
import { usePayAndActivateUserMutation } from "../store/slices/authApiSlice";
import { pay } from "../store/slices/authSlice";
import { useAppDispatch } from "../store/store";


const PaymentForm = () => {

    const [payAndActivateUser, { isLoading: isPaying }] = usePayAndActivateUserMutation();
    const dispatch = useAppDispatch();

    const handlePay = async () => {
        try {
            await payAndActivateUser();
            dispatch(pay());
        } catch (error) {
            console.error("Email check failed", error);
        }
    }

    return (
        <Button onClick={handlePay}>{isPaying ? "Processing" : "Pay"}</Button>
    )
}

export default PaymentForm;