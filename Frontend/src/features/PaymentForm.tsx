import Button from "../components/shared/Button";
import Container from "../components/shared/Container";
import { useLazyPayAndActivateUserQuery } from "../store/slices/authApiSlice";
import { strings } from "../strings/strings";

const PaymentForm = () => {
    const [triggerPayment, { isLoading: isPaying }] = useLazyPayAndActivateUserQuery();

    // Handle payment initiation
    const handlePay = async () => {
        try {
            const { data } = await triggerPayment();

            if (data?.approvalUrl && data?.subscriptionId) {
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

    return (
        <Container>
            <div className="flex flex-col items-center space-y-4">
                <h2 className="text-2xl font-bold">{strings.auth.payment.completeYourPayment}</h2>
                <p>{strings.auth.payment.typo}</p>

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