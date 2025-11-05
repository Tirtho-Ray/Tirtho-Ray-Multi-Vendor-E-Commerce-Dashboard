"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, setUser } from "@/features/auth/authSilce";
import Cookies from "js-cookie";
import { RootState } from "@/redux/store/store";
import { jwtDecode } from "jwt-decode";

const DashboardHomeProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state?.auth?.user);
    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (token) {
            const decoded = jwtDecode(token);
            dispatch(setUser(decoded));
        }
    }, [dispatch]);

    const handleLogout = () => {
        Cookies.remove("accessToken");
        dispatch(clearUser());
        window.location.href = "/login";
    };

    return (
        <div className="mb-[1000px]">
            <div className="flex justify-between items-center py-2 rounded-3xl border border-teal-800 px-5">
                <div className="flex gap-4">
                    <div>
                        <h1 className="h-10 w-10 rounded-full bg-slate-400"></h1>
                    </div>
                    <div>
                        <p>{user?.name || "Guest User"}</p>
                        <p>{user?.email || "No Email"}</p>
                        <p className="text-sm text-gray-500">{user?.role}</p>
                    </div>
                </div>
                <div>
                    <button className="px-5 py-2 rounded-md bg-teal-400">click</button>
                </div>
                <div>
                    <button
                        onClick={handleLogout}
                        className="px-5 py-2 rounded-md bg-teal-400 text-black text-sm md:text-base lg:text-lg xl:text-xl"
                    >
                        log out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardHomeProfile;
