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
import { useState } from "react";

type LoginFormProps = {
    className?: string;
}

const LoginForm = ({ className = '' }: LoginFormProps) => {

    const email = useAppSelector((state) => state.auth.email);
    const dispatch = useAppDispatch();
    const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
    const [isUserNotFound, setUserNotFound] = useState(false);

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

            setUserNotFound(false)
            dispatch(login(response));
        } catch (error) {
            setUserNotFound(true);
            console.error("Login failed please try again later...", error);
        }
    }

    return (
        <Container className={`${className} w-full mb-2`}>
            <Form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <Input value={email} label={strings.auth.regform.email} containerClassName="w-full mt-2" className='w-full border-1 border-gray-400 rounded-sm bg-[rgba(31,29,29,0.7)]' {...register("email", {
                    onChange: () => setUserNotFound(false)
                })} error={errors.email?.message} />
                <Input label={strings.auth.regform.password} type="password" containerClassName="w-full mt-3" className='w-full border-1 bg-[rgba(31,29,29,0.7)] border-gray-400 rounded-sm' {...register("password", {
                    onChange: () => setUserNotFound(false)
                })} error={errors.password?.message} />
                {isUserNotFound && <p className="text-red-400 text-sm mt-1 flex gap-1 visible h-5"><img src="/CircleError.svg" />{strings.auth.login.invalidCredentials}</p>}
                <Button type="submit" className='bg-red-700 text-white w-full py-1.5 rounded-md font-semibold text-lg mt-5'>{isLoggingIn ? strings.auth.login.signingIn : strings.auth.login.signin}</Button>
            </Form>
        </Container>
    )
}

export default LoginForm;