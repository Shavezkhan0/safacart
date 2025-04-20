"use client"
import { signIn, useSession } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { FcGoogle } from "react-icons/fc";
import LoadingBar from "react-top-loading-bar";

const Login = () => {

    const { data: session, status: sessionStatus } = useSession()
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const [progress, setProgress] = useState(0);
    const togglePasswordVisibility = () => setShowPassword(prev => !prev);

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            router.push("/")
        }
    }, [sessionStatus, router])

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        setProgress(50);
        const { email, password } = data;

        try {
            const res = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            console.log('Sign-in response:', res);
            setProgress(80);

            if (res.ok) {
                Toastify({
                    text: 'Login successfully',
                    duration: 3000,
                    close: true,
                    gravity: 'top',
                    position: 'right',
                    style: { background: 'linear-gradient(to right, #00b09b, #96c93d)' },
                }).showToast();
                setProgress(100);
                setTimeout(() => {
                    router.push('/');
                }, 400);
            } else {
                throw new Error(res.error);
            }
        } catch (error) {
            console.error('Error in login:', error);
            Toastify({
                text: 'Details do not match',
                duration: 3000,
                close: true,
                gravity: 'top',
                position: 'right',
                style: { background: 'linear-gradient(to right, #ff5f6d, #ffc371)' },
            }).showToast();
        }
    };


    return (
        <>
            <LoadingBar
                color="#f11946"
                progress={progress}
                waitingTime={3000}
                onLoaderFinished={() => setProgress(0)}
            />

            <div className='mx-auto mt-20 mb-10' >
                <div className='flex flex-col gap-3 justify-center items-center w-[96vw] md:w-[45vw] mx-auto shadow-md py-5 px-2 bg-white' >
                    <h1 className='text-2xl font-bold text-[#01531FFF]'>Login</h1>
                    <div>
                        <div className="flex flex-col items-center gap-2">

                            <button onClick={() => signIn("google")} className="w-fit shadow flex items-center gap-2 shadow-green-600 pt-2 pb-2 mb-2 pl-5 pr-5">Login <FcGoogle size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 '>

                            <div className='flex flex-col  justify-center items-center py-2'>
                                <div className='flex flex-col  justify-center items-center  gap-2  '>
                                    <div className='w-[300px] flex gap-2 items-center justify-between'>
                                        <label className='text-sm'>Email</label>
                                        <input
                                            type="email"
                                            className='bg-gray-200 bottom-2 border-black rounded-sm px-2 py-1'
                                            placeholder='Enter your email'
                                            {...register("email")}
                                            autoComplete="email"
                                        />
                                    </div>



                                    <div className='w-[300px] flex gap-2 items-center justify-between relative'>
                                        <label className='text-sm'>Password</label>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className='bg-gray-200 bottom-2 border-black rounded-sm px-2 py-1'
                                            placeholder='Enter password'
                                            {...register("password")}
                                            autoComplete="password"
                                        />
                                        <span
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <AiFillEyeInvisible size={18} /> : <AiFillEye size={18} />}
                                        </span>
                                    </div>


                                </div>

                            </div>
                            <div className="flex justify-center items-center">
                                <button type='submit' className="bg-emerald-600 hover:bg-emerald-900 text-white font-semibold py-1 px-4 rounded-sm shadow-md transition duration-300 cursor-pointer">
                                    Login
                                </button>
                            </div>
                            <div >


                                <div className="flex justify-between items-center">
                                    <Link href={'/forgotpassword'} className="cursor-pointer underline" ><h4>Forgot Password</h4></Link>
                                    <Link href={'/signUp'}>
                                        <h1 className='text-xl font-semibold text-green-700 hover:text-green-900 cursor-pointer'>signUp</h1>
                                    </Link>
                                </div>
                            </div>

                        </form>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
