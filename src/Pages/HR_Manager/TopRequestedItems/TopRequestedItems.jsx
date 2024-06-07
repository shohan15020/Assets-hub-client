
import Spinner from '../../../Components/Spinner';
import { useQuery } from '@tanstack/react-query';
import useUserData from '../../../Hooks/useHRData';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const TopRequestedItems = () => {
    const axiosSecure = useAxiosSecure();
    const { loading: authLoading, user } = useAuth();
    const { userData, isLoading: userDataLoading } = useUserData();

    const { data: requests = [], isLoading: requestsLoading, isError, error,} = useQuery({

        queryKey: ["Top_requested_item", userData?.email],
        enabled: !authLoading && !!userData?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/top_requests/${userData?.email}`);
            return data;
        },
    });

    console.log(requests)


    if (authLoading || userDataLoading || requestsLoading) return <Spinner />;
    if (isError) return <div>Error: {error.message}</div>;

    // const handleSearch = () => {
    //     console.log("filter");
    // };
    return (
        <div className="mt-12 mb-24">
            <h2 className="text-3xl mb-10 text-center text-primary">Top most requested items: {requests?.length}</h2>

            {/* <div className="mt-8 mb-10 flex items-center gap-10 justify-center">
                <form onSubmit={handleSearch} className="flex">
                    <label className="input border-2 border-green-500 flex items-center gap-2">
                        <input type="text" name="search" className="grow" placeholder="Search items by its names" />
                    </label>
                    <button type="submit" className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 bg-green-500 rounded-md -ml-1 hover:bg-green-800 focus:outline-none focus:bg-green-800">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </form>
            </div> */}

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Request Count</th>
                            <th>product_name</th>
                            <th>requesterEmail</th>
                            <th>Item_Added_By</th>
                            {/* <th>Status</th>
                            <th>Approve Button</th>
                            <th>Reject Button</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {requests?.map((assetReq, index) => (
                            <tr key={assetReq._id}>
                                <th>{index + 1}</th>
                                <td>{assetReq._id}</td>
                                <td>{assetReq?.requestCount}</td>
                                <td>{assetReq?.product_name}</td>
                                <td>{assetReq?.requesterEmail}</td>
                                <td>{assetReq?.Item_Added_By}</td>
                                {/* <td>{assetReq.notes}</td>
                                <td>{assetReq.status}</td> */}

                                {/* <td><button onClick={() => handleStatus(assetReq._id, "approved")} className="btn btn-error" disabled={assetReq.status === "approved"}>Approve</button></td>

                                <td><button onClick={() => handleStatus(assetReq._id, "rejected")} disabled={assetReq.status === "rejected"} className="btn bg-primary btn-success">Reject</button></td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopRequestedItems;