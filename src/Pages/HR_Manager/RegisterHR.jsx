import { Link, useNavigate, } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import toast from 'react-hot-toast'
import useAxiosPublic from '../../Hooks/useAxiosPublic'
import useAuth from '../../Hooks/useAuth'
// import Spinner from '../../Components/Spinner'
import axios from 'axios'

const RegisterHR = () => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const { createUser, signInWithGoogle, setLoading, loading } = useAuth()

    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target
        const email = form.email.value
        const fullName = form.fullName.value
        const password = form.password.value
        const category = form.category.value
        const date_of_birth = form.date_of_birth.value
        const companyName = form.companyName.value
        const profileImage = form.profileImage.value
        
        // for company logo
        const companyLogo = form.image.files[0]
        const formData = new FormData()
        formData.append('image', companyLogo)

        // for profile pic
        // const profileImage = form.profileImage.files[0]
        // const formData2 = new FormData()
        // formData.append('image', profileImage)

        console.log(email, password, fullName, date_of_birth, category, companyName, companyLogo, profileImage)

        // console.log(import.meta.env.VITE_IMGBB_API_KEY)

        try {
            setLoading(true)
            const { data } = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            )

            // const { data2 } = await axios.post(
            //     `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY_TWO}`,
            //     formData2
            // )
            // console.log(data.data.display_url)

            // create user
            await createUser(email, password)
                .then(res => {
                    console.log(res.user)

                    const info = {
                        fullName,
                        email,
                        date_of_birth,
                        category,
                        companyName,
                        companyLogo: data?.data.display_url,
                        profileImage,
                        role: "hr",
                    
                    }

                     axiosPublic.post("/users", info)
                        .then(res => {
                            // console.log(res.data)
                            if (res.data.insertedId) {
                                toast.success('user added to db successfully')
                            }
                            navigate("/")
                            setLoading(false)
                        })
                })

        }
        catch (err) {
            toast.error(err.message)
            // setLoading(false)
        }
    }

    // const googleSignUp = async () => {
    //     await signInWithGoogle()
    //         .then(result => {
    //             console.log(result.user);
    //             const info = {
    //                 name: result?.user?.displayName,
    //                 email: result?.user?.email,
    //                 role: "admin",
                    
    //             }

    //             axiosPublic.post("/users", info)
    //                 .then(res => {
    //                     // console.log(res.data)
    //                     if (res.data.insertedId) {
    //                         toast.success('user added to db successfully')
    //                         navigate('/')
    //                     }
    //                 })
    //         })
    //         .catch(error => {
    //             // console.error(error)
    //             toast.error(error.message)
    //         })

    // }

    //     Full Name
    // ● Company Name
    // ● Company Logo
    // ● Email
    // ● Password
    // ● Date of Birth
    // ● Select a package(there will be three packages, details below)
    // if (loading) return <Spinner></Spinner>

    return (
        <div className='flex justify-center items-center my-24'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Sign Up for HR</h1>
                    <p className='text-xl text-gray-400'>Join as Employee</p>
                </div>
                <form onSubmit={handleSignUp}
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='fullName' className='block mb-2 text-sm'>
                                Full Name
                            </label>
                            <input
                                type='text'
                                name='fullName'
                                placeholder='Enter Your Name Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>

                        <div>
                            <label htmlFor='companyName' className='block mb-2 text-sm'>
                                Company Name
                            </label>
                            <input
                                type='text'
                                name='companyName'
                                placeholder='Enter Your Company Name Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>

                        <div>
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Company Logo
                            </label>
                            <input
                                type='file'
                                name='image'
                                placeholder='Enter Your Company logo Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>

                        <div>
                            <label htmlFor='profileImage' className='block mb-2 text-sm'>
                                Profile picture
                            </label>
                            <input
                                type='url'
                                name='profileImage'
                                placeholder='Enter Your Profile picture Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>

                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email
                            </label>
                            <input
                                type='email'
                                name='email'

                                required
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>


                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input
                                type='password'
                                name='password'
                                autoComplete='new-password'

                                required
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor='Date of birth' className='block mb-2 text-sm'>
                            Date of birth
                        </label>
                        <input
                            type="date"
                            name='date_of_birth'

                            required
                            placeholder='Enter Your Email Here'
                            className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                            data-temp-mail-org='0'
                        />
                    </div>

                    <div>
                        <label htmlFor='Category' className='block mb-2 text-sm'>
                            Category
                        </label>

                        <select defaultValue="default" name='category'
                            className="select select-bordered w-full">
                            <option disabled value="default">Select a category</option>
                            <option value={5}>5 Members for $5</option>
                            <option value={8}>10 Members for $8</option>
                            <option value={15}>20 Members for $15</option>
                        </select>
                    </div>


                    <div>
                        <button
                            type='submit'
                            className='bg-primary w-full rounded-md py-3 text-white'
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Sign up with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <div  className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                    <FcGoogle size={32} />

                    <p>Continue with Google</p>
                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Already have an account?{' '}
                    <Link
                        to='/login'
                        className='hover:underline hover:text-rose-500 text-gray-600'
                    >
                        Login
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default RegisterHR