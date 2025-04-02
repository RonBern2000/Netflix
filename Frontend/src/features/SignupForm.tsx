
import Button from "../components/shared/Button";
import Form from "../components/shared/Form";
import { useAppDispatch, useAppSelector } from "../store/store";
import { strings } from "../strings/strings";
import { useCreateUserMutation } from "../store/slices/authApiSlice";
import { AuthFormData, authSchema } from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signup } from "../store/slices/authSlice";
import Input from "../components/shared/Input";


const SignupForm = () => {

    const email = useAppSelector((state) => state.auth.email);
    const dispatch = useAppDispatch();
    const [createUserMutation, { isLoading: isCreatingUser }] = useCreateUserMutation();


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
            const response = await createUserMutation(data).unwrap();
            dispatch(signup(response));
        } catch (error) {
            console.error("Email check failed", error);
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input label={strings.auth.regform.email} containerClassName="w-full" className='w-full border-1 border-gray-400 rounded-sm' {...register("email")} error={errors.email?.message} />
            <Input label={strings.auth.regform.password} type="password" containerClassName="w-full mt-2.5" className='w-full border-1 border-gray-400 rounded-sm' {...register("password")} error={errors.password?.message} />
            <Button type="submit" className='bg-red-500 text-white w-full h-18 rounded-md font-semibold text-2xl mt-5'>{isCreatingUser ? strings.auth.regform.creating : strings.auth.next}</Button>
        </Form>
    )
}

export default SignupForm;