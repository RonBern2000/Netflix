import Form from "../components/shared/Form";
import { useForm } from "react-hook-form";
import { useCheckEmailMutation } from "../store/slices/authApiSlice";
import { EmailFormData, emailSchema } from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { strings } from "../strings/strings";
import { useAppDispatch } from "../store/store";
import { setEmail } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

type CheckEmailFormProps = {
    className?: string;
}

const CheckEmailForm = ({ className = '' }: CheckEmailFormProps) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [checkEmailMutation, { isLoading: isCheckingEmail }] = useCheckEmailMutation();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema)
    });

    const onSubmit = async (data: EmailFormData) => {
        try {
            const response = await checkEmailMutation(data).unwrap();
            dispatch(setEmail({ email: data.email }));
            if (response.isExist) {
                navigate('/login');
            }
            navigate('/signup/registration');
        } catch (error) {
            console.error("Email check failed", error);
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={`${className} flex gap-1.5`} >
            <Input label={strings.landing.emailAddress} className='w-full bg-[rgba(31,31,31,0.7)] border-1 text-white'  {...register("email")} error={errors.email?.message} />
            <Button type="submit" className="h-[54px] relative rounded-sm max-md:text-sm text-white bg-[rgba(229,8,20,0.9)] px-6 py-3">{isCheckingEmail ? strings.landing.checking : strings.landing.getStarted}<img
                className="absolute right-2 top-1/2 -translate-y-1/2"
                src="/ArrowLeft.svg"
                alt="arrowLeft" />
            </Button>
        </Form >
    )
}

export default CheckEmailForm;