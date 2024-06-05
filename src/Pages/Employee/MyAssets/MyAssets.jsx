import { RiArrowDropDownLine } from "react-icons/ri";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useEmployeeData from "../../../Hooks/useEmployeeData";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";

const MyAssets = () => {
    const axiosSecure = useAxiosSecure()
    const { userDataEmployee, isLoading } = useEmployeeData()
    const { user, loading } = useAuth()

    const { data: assetByEmail = [], refetch } = useQuery({
        queryKey: ["assetByEmail", userDataEmployee?.email],
        // enabled: !loading && !!isLoading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/assetByEmail/${userDataEmployee?.email}`);
            return data;
        },
    });

    console.log(assetByEmail)





    const handleFilter = () => {
        console.log("filter")
    }
    const handleSearch = () => {
        console.log("filter")
    }

    return (
        <div className="mt-12 mb-24">
            <h2 className="text-3xl mb-10 text-center text-primary">My Requested Assets</h2>

            {/* button  */}

            <div className="mt-8 mb-10 flex items-center gap-10 justify-center">

                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1 font-bold text-white  bg-[#23BE0A]">
                        <h2>Filter Assets:</h2>
                        <RiArrowDropDownLine />
                    </div>


                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >

                        <li onClick={() => handleFilter('Available')}><a>Pending</a></li>
                        <li onClick={() => handleFilter('Out-of-stock')}><a>Approved</a></li>
                        <li onClick={() => handleFilter('Returnable')}><a>Returnable</a></li>
                        <li onClick={() => handleFilter('Non-returnable')}><a>Non-returnable</a></li>
                    </ul>

                </div>

                <form onSubmit={handleSearch} className="flex">
                    <label className="input border-2 border-green-500 flex items-center gap-2">
                        <input type="text" name="search" className="grow" placeholder="Search items by Asset names" />

                    </label>
                    <button type="submit" className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-green-500 rounded-md -ml-1 hover:bg-green-800 focus:outline-none focus:bg-green-800">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className=" w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </button>
                </form>


            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Asset Name</th>
                            <th>Asset Type</th>
                            <th>Request Date</th>
                            <th>Approval Date</th>
                            <th>Request Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>Laptop</td>
                            <td>Returnable</td>
                            <td>2023-7-15</td>
                            <td>2031/2/25</td>
                            <td>Approved</td>
                            <td className="flex gap-2">
                                <button className="btn  bg-primary btn-success">Print</button>
                                <button className="btn btn-info">Return</button>
                            </td>
                        </tr>
                        {/* row 1 */}
                        {
                            assetByEmail?.map((asset, index) => (
                                <tr key={asset._id}>
                                    <th>{index + 1}</th>
                                    <td>{asset.product_name}</td>
                                    <td>{asset.product_type}</td>
                                    <td>{asset.requestDate}</td>
                                    <td>Approve date</td>
                                    <td>{asset.status}</td>
                                    {
                                        asset?.status === "pending" && <td><button className="btn btn-error">Delete</button></td>
                                    }
                                    {
                                        asset?.status === "approved" && <td className="flex gap-2">
                                            <button className="btn  bg-primary btn-success">Print</button>
                                            <button className="btn btn-info">Return</button>
                                        </td>
                                    }

                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAssets;