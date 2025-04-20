"use client"
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { FcGoogle } from "react-icons/fc";


const SignUp = () => {

    const { data: session, status: sessionStatus } = useSession()
    const route = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(prev => !prev);

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            route.push("/")
        }
    }, [sessionStatus, route])

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await fetch("/api/user/signup", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const res = await response.json()
            if (response.ok) {
                Toastify({
                    text: `${res.message}`,
                    duration: 3000,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
                }).showToast();
                setTimeout(() => {
                    route.push('/login')
                }, 500);
            }
            else {
                console.error('Error signing up user:', res);
                Toastify({
                    text: `${res.message}`,
                    duration: 3000,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    style: { background: "linear-gradient(to right, #ff5f6d, #ffc371)" },
                }).showToast();
            }
        } catch (error) {
            console.error('Error submitting form:', error)
        }

    }
    return (
        <>

            <div className='mx-auto mt-4' >
                <div className='flex flex-col gap-3 justify-center items-center w-[96vw] md:w-[45vw] mx-auto shadow-md py-5 px-2 bg-white'>
                    <h1 className='text-2xl font-bold text-[#01531FFF]'>SignUp</h1>
                    <div>
                        <div className="flex flex-col items-center gap-2">

                            <button onClick={() => signIn("google")} className="w-fit shadow flex items-center gap-2 shadow-green-600 pt-2 pb-2 mb-2 pl-5 pr-5">Login <FcGoogle size={20} /></button>
                            <h1 className="text-lg text-center">-OR-</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2  '>

                            <div className='flex flex-col  justify-center items-center py-2'>


                                <div className='flex flex-col  justify-center items-center  gap-2  '>

                                    <div className='w-full flex  gap-2 items-center justify-between'>
                                        <label className=''>Username</label>
                                        <input type="text" className='bg-gray-200 bottom-2 border-black rounded-sm px-2 py-1' placeholder='Enter Username' {...register("username")} autoComplete="username" />
                                    </div>

                                    <div className='w-full flex gap-2  items-center justify-between'>
                                        <label className=''>Email</label>
                                        <input type="email" className='bg-gray-200 bottom-2 border-black rounded-sm px-2 py-1' placeholder='Enter your email' {...register("email")} autoComplete="email" />
                                    </div>

                                    <div className='w-full flex  gap-2 items-center justify-between'>
                                        <label className=''>Phone Number</label>
                                        <input type="text" className='bg-gray-200 bottom-2 border-black rounded-sm px-2 py-1' placeholder='Enter your phone number' {...register("phoneNumber")} autoComplete="phoneNumber" />
                                    </div>

                                    <div className='w-full flex gap-2 items-center justify-between relative'>
                                        <label >Password</label>
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
                                    SignUp
                                </button>
                            </div>

                            <div className="flex flex-col  text-end gap-2 ">
                                <div >
                                    <Link href={'/login'}>
                                        <h1 className='text-xl font-semibold text-green-700 hover:text-green-900 cursor-pointer'>Login</h1>
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

export default SignUp
