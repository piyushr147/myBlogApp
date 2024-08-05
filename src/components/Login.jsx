import {React,useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import authenticationService from '../appwrite/authentication'
import { login as userLogin } from '../store/authSlice'
import Input from './Input'
import Button from './Button'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Logo from './Logo'
import { useEffect } from 'react'

function Login() {
    console.log("login called")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm()

    useEffect(() => {
        if (error) {
          const timer = setTimeout(() => {
            setError('');
          }, 2000);
          return () => clearTimeout(timer);
        }
      }, [error]);

    const login = async (data) => {
        try {
            setError("")
            const session = await authenticationService.loginUser(data)
            console.log(session)
            if (session) {
                dispatch(userLogin(session))
                navigate("/")
            }
            else {
                console.log("here")
                setError("Invalid username/password")
            }
        } catch (error) {
            setError(error)
        }
    }
    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Log in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        {/* {errors && errors.email.type == "required" && (<p className=''>Email is requires</p>)}
                        {errors && errors.email.type == "pattern" && (<p className=''>Enter valid email address</p>)} */}
                        <Input
                        label="Password: "
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,
                            minLength: {
                                value:6,
                                message:"Password should be of atleast 6 characters"
                            },
                        })}
                        />
                        {errors.password && <p className='text-red-600 mt-8 text-center'>{errors.password.message}</p>}
                        {/* {errors && errors.password.type == "required" && (<p className=''>Password is required</p>)}
                        {errors && errors.password.type == "minLength" && (<p className=''>Password must contain atleast 6 characters</p>)} */}
                        <Button
                            type="submit"
                            className="w-full"
                        >Log in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login