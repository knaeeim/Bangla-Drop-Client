import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";
import useAuth from "../../../hooks/useAuth";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [customError, setCustomError] = useState(null);
    const { user } = useAuth();
    const { id: parcelId } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {
        data: parcelInfo,
        isError,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["payment", parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel/${parcelId}`);
            return res.data;
        },
    });

    const amount = parcelInfo?.cost;
    const amountInCents = amount * 100;

    if (isLoading) {
        return <Loading></Loading>;
    }

    if (isError) {
        toast.error(error + "Please try again later.");
        return;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (!stripe || !elements) {
            toast.error("Stripe is not loaded yet. Please try again later.");
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            toast.error("Card element not found. Please try again.");
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            setCustomError(error.message);
        } else {
            setCustomError(null);
            console.log(paymentMethod);
            const res = await axiosSecure.post("/create-payment-intent", {
                amountInCents,
                parcelId,
            });

            console.log(res);

            const result = await stripe.confirmCardPayment(
                res.data.clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: user?.displayName,
                            email: user?.email,
                        },
                    },
                }
            );

            if (result.error) {
                toast.error(result.error.message);
            } else {
                toast.success("Payment successful!");

                const paymentData = {
                    parcelId, 
                    email: user?.email,
                    amount,
                    transactionId: result.paymentIntent.id,
                    paymentMethod: result.paymentIntent.payment_method,
                }

                const postedData = await axiosSecure.post("/payments", paymentData);

                console.log(postedData);

                if(postedData.data.insertedId) {
                    toast.success("Payment recorded successfully!");
                    navigate('/dashboard/my-parcel');
                    setLoading(false);
                }
            }

        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="md:w-[600px] w-[450px] mx-auto mt-10 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 space-y-6">
                <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white">
                    Enter Your Card Details
                </h2>

                <div className="p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#FFFFFF",
                                    fontFamily: "sans-serif",
                                    "::placeholder": {
                                        color: "#a0aec0",
                                    },
                                },
                                invalid: {
                                    color: "#fa755a",
                                    iconColor: "#fa755a",
                                },
                            },
                        }}
                    />
                </div>

                {customError && (
                    <p className="text-red-600 text-sm mt-2">{customError}</p>
                )}

                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className={`w-full py-3 px-6 rounded-xl text-white font-semibold transition duration-300 ${
                        loading || !stripe
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                    }`}>
                    {loading ? "Processing…" : "Pay for the PickUp"}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
