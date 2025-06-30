import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { SiTicktick } from "react-icons/si";
import { useNavigate } from "react-router";

const MyParcel = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: parcels = [] } = useQuery({
        queryKey: ["my-parcel", user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(
                `/parcels?email=${user?.email}`
            );
            return result.data;
        },
    });

    const handlePay = (parcelId) => {
        console.log(parcelId);
        navigate(`/dashboard/payment/${parcelId}`);
    };

    return (
        <div className="w-full p-2 mx-auto sm:p-4 dark:text-gray-800">
            <h2 className="mb-4 text-2xl font-semibold leading-tight">
                MY Parcels :
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                    <colgroup>
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col className="w-24" />
                    </colgroup>
                    <thead className="dark:bg-gray-300">
                        <tr className="text-left">
                            <th className="p-3">Tracking ID</th>
                            <th className="p-3">Title</th>
                            <th className="p-3">Created Date</th>
                            <th className="p-3">Amount/fees</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel) => (
                            <tr
                                key={parcel._id}
                                className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                <td className="p-3">
                                    <p>{parcel.tracking_id}</p>
                                </td>
                                <td className="p-3">
                                    <p>{parcel.title}</p>
                                </td>
                                <td className="p-3">
                                    <p>
                                        {new Date(
                                            parcel.creation_date
                                        ).toLocaleDateString()}
                                    </p>
                                </td>
                                <td className="p-3">
                                    <p>$ {parcel.cost}</p>
                                </td>
                                <td className="p-3">
                                    <span className="px-3 py-1 font-semibold rounded-md">
                                        <span>
                                            {parcel.payment_status ===
                                            "Paid" ? (
                                                <button className="btn btn-xs btn-success">
                                                    Paid
                                                </button>
                                            ) : (
                                                <button className="btn btn-xs btn-error">
                                                    Unpaid
                                                </button>
                                            )}
                                        </span>
                                    </span>
                                </td>
                                <td>
                                    <div className="flex items-center justify-end gap-2">
                                        {parcel.payment_status === "unpaid" && (
                                            <button
                                                onClick={() =>
                                                    handlePay(parcel._id)
                                                }
                                                className="btn btn-sm btn-primary text-black">
                                                Pay
                                            </button>
                                        )}
                                        <button className="btn btn-sm btn-secondary text-black">
                                            Edit
                                        </button>
                                        <button className="btn btn-sm btn-error text-black">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcel;
