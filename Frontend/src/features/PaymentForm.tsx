import { useNavigate } from "react-router-dom";
import Button from "../components/shared/Button";
import { usePayAndActivateUserMutation } from "../store/slices/authApiSlice";
import { pay } from "../store/slices/authSlice";
import { useAppDispatch } from "../store/store";


const PaymentForm = () => {

    const [payAndActivateUser, { isLoading: isPaying }] = usePayAndActivateUserMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handlePay = async () => {
        try {
            await payAndActivateUser();
            dispatch(pay());
            navigate('/login')
        } catch (error) {
            console.error("Email check failed", error);
        }
    }

    return (
        <Button className="h-10 w-20 bg-red-700" onClick={handlePay}>{isPaying ? "Processing" : "Pay"}</Button>
    )
}

export default PaymentForm;