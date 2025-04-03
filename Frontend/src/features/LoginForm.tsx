import { useForm } from "react-hook-form";
import Container from "../components/shared/Container";
import Form from "../components/shared/Form";
import { useAppDispatch, useAppSelector } from "../store/store";
import { AuthFormData, authSchema } from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { strings } from "../strings/strings";
import { login } from "../store/slices/authSlice";
import { useLoginMutation } from "../store/slices/authApiSlice";

type LoginFormProps = {
    className?: string;
}

const LoginForm = ({ className = '' }: LoginFormProps) => {

    const email = useAppSelector((state) => state.auth.email);
    const dispatch = useAppDispatch();
    const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<AuthFormData>({
        resolver: zodResolver(authSchema),
        defaultValues: { email }
    });

    const onSubmit = async (data: AuthFormData) => {
        try {
            const response = await loginMutation(data).unwrap();
            dispatch(login(response));
        } catch (error) {
            console.error("Login failed please try again later...", error);
        }
    }

    return (
        <Container className={`${className} w-full mb-2`}>
            <Form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <Input label={strings.auth.regform.email} containerClassName="w-full mt-2" className='w-full border-1 border-gray-400 rounded-sm bg-[rgba(31,29,29,0.7)]' {...register("email")} error={errors.email?.message} />
                <Input label={strings.auth.regform.password} type="password" containerClassName="w-full mt-3" className='w-full border-1 bg-[rgba(31,29,29,0.7)] border-gray-400 rounded-sm' {...register("password")} error={errors.password?.message} />
                <Button type="submit" className='bg-red-700 text-white w-full py-1.5 rounded-md font-semibold text-lg mt-5'>{isLoggingIn ? strings.auth.login.signingIn : strings.auth.login.signin}</Button>
            </Form>
        </Container>
    )
}

export default LoginForm;