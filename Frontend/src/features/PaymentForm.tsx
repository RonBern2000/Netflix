//import { useNavigate } from "react-router-dom";
import Button from "../components/shared/Button";
import { usePayAndActivateUserMutation } from "../store/slices/authApiSlice";
import { pay } from "../store/slices/authSlice";
import { useAppDispatch } from "../store/store";
import axios from "axios";

const PaymentForm = () => {

    const [payAndActivateUser, { isLoading: isPaying }] = usePayAndActivateUserMutation();
    const dispatch = useAppDispatch();
   // const navigate = useNavigate();

    const handlePay = async () => {
        try {
            await payAndActivateUser();
            dispatch(pay());
            const response = await axios.get(`http://localhost:4001/api/v1/payments/subscribe`);
            const approvalUrl = response.data.approvalUrl;
            console.log(approvalUrl)
            if (approvalUrl) {
                window.location.href = approvalUrl;
            } else {
              console.error("Approval URL not returned");
            }
        } catch (error) {
            console.error("Email check failed", error);
        }
    }

    return (
        <Button className="h-10 w-20 bg-red-700" onClick={handlePay}>{isPaying ? "Processing" : "Pay"}</Button>
    )
}

export default PaymentForm;