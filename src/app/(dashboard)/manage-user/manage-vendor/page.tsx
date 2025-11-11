/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useAllVendorsQuery } from "@/redux/api/vendor/vendorApi";
import VendorModal from "@/components/ui/modal/VendorModal";

const ManageVendor: React.FC = () => {
    const { data: vendors, isLoading, isError } = useAllVendorsQuery();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedVendor, setSelectedVendor] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [filterStatus, setFilterStatus] = useState<string>("ALL");

    // Loading & Error States
    if (isLoading)
        return (
            <p className="text-center mt-8 text-gray-500 animate-pulse">
                Loading vendors...
            </p>
        );

    if (isError)
        return (
            <p className="text-center mt-8 text-red-500 font-medium">
                Failed to load vendors.
            </p>
        );

    // ✅ Vendor Status Counts
    const statusCounts = {
        ALL: vendors?.length || 0,
        approved: vendors?.filter((v: any) => v.status === "approved").length || 0,
        pending: vendors?.filter((v: any) => v.status === "pending").length || 0,
        rejected: vendors?.filter((v: any) => v.status === "rejected").length || 0,
        misInfo: vendors?.filter((v: any) => v.status === "misInfo").length || 0,
    };

    // ✅ Count Boxes Config
    const statusBoxes = [
        { status: "ALL", count: statusCounts.ALL, bg: "from-gray-400 to-gray-300" },
        { status: "approved", count: statusCounts.approved, bg: "from-green-400 to-green-500" },
        { status: "pending", count: statusCounts.pending, bg: "from-yellow-400 to-yellow-500" },
        { status: "rejected", count: statusCounts.rejected, bg: "from-red-400 to-red-500" },
        { status: "misInfo", count: statusCounts.misInfo, bg: "from-purple-400 to-purple-500" },
    ];

    const statuses = ["ALL", "approved", "pending", "rejected", "misInfo"];

    // ✅ Filtered Vendors
    const filteredVendors = vendors?.filter((vendor: any) => {
        const matchesStatus =
            filterStatus === "ALL" || vendor.status === filterStatus;
        const matchesSearch =
            vendor.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vendor.email?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    // ✅ Open Modal Handler
    const handleVendorClick = (vendor: any) => {
        setSelectedVendor(vendor);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-teal-700 text-center">
                Manage Vendors
            </h1>

            {/* ✅ Status Count Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-8 mt-10">
                {statusBoxes.map((box) => (
                    <div
                        key={box.status}
                        onClick={() => setFilterStatus(box.status)}
                        className={`flex flex-col items-center justify-center p-6 rounded-xl text-white font-bold shadow-lg cursor-pointer transform transition hover:scale-105 bg-gradient-to-r ${box.bg} ${filterStatus === box.status ? "ring-2 ring-white" : ""
                            }`}
                    >
                        <span className="text-3xl">{box.count}</span>
                        <span className="uppercase mt-2">
                            {box.status.replace("_", " ")}
                        </span>
                    </div>
                ))}
            </div>

            {/* ✅ Controls */}
            <div className="flex justify-between items-center mb-6 relative mt-20">
                <div></div>

                {/* Search */}
                <div className="rounded-full bg-gradient-to-r backdrop-blur-md bg-black/15 border border-white/30 font-semibold shadow hover:shadow-lg transition-all">
                    <input
                        type="search"
                        className="w-[400px] px-4 py-2 rounded-full text-white text-[12px] placeholder:text-gray-300 focus:outline-none"
                        placeholder="Search vendor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Dropdown Filter */}
                <div className="relative">
                    <button
                        className="text-[14px] px-4 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 font-semibold shadow hover:shadow-lg transition-all"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        Filter
                    </button>

                    {showDropdown && (
                        <div className="absolute right-1 mt-2 w-40 rounded-lg shadow-lg z-10 backdrop-blur-md bg-black/40 border border-white/30 text-white text-[10px]">
                            {statuses.map((status) => (
                                <div
                                    key={status}
                                    className={`px-4 py-2 cursor-pointer hover:bg-blue-500/50 transition hover:rounded-lg ${filterStatus === status
                                        ? "font-bold bg-teal-200/50 border rounded-lg"
                                        : ""
                                        }`}
                                    onClick={() => {
                                        setFilterStatus(status);
                                        setShowDropdown(false);
                                    }}
                                >
                                    {status}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ✅ Vendor Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full text-left text-sm">
                    <thead className="uppercase text-xs tracking-wider">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">City</th>
                            <th className="px-6 py-3">NID Number</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVendors?.map((vendor: any, index: number) => (
                            <tr
                                key={vendor._id || index}
                                className="border-t hover:bg-blue-500 transition-colors"
                            >
                                <td className="px-6 py-3 font-medium">
                                    <span
                                        className="font-semibold cursor-pointer hover:underline"
                                        onClick={() => handleVendorClick(vendor)}
                                        title={vendor.userId?.name}
                                    >
                                        {vendor.userId?.name?.length > 15
                                            ? `${vendor.userId?.name.slice(0, 15)}...`
                                            : vendor.userId?.name || "N/A"}
                                    </span>
                                </td>
                                <td className="px-6 py-3">{vendor.email || "N/A"}</td>
                                <td className="px-6 py-3">{vendor.address?.city || "N/A"}</td>
                                <td className="px-6 py-3">{vendor.documents?.nationalId || "N/A"}</td>
                                <td className="px-6 py-3 capitalize">
                                    <span
                                        className={`px-3 py-1 text-xs font-semibold rounded-full ${vendor.status === "approved"
                                            ? "bg-green-100 text-green-700"
                                            : vendor.status === "pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : vendor.status === "rejected"
                                                    ? "bg-red-100 text-red-700"
                                                    : vendor.status === "misInfo"
                                                        ? "bg-purple-100 text-purple-700"
                                                        : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {vendor.status}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-right">
                                    <button
                                        className="px-3 py-1.5 rounded-md bg-teal-500 text-white text-xs font-semibold hover:bg-teal-600 transition"
                                        onClick={() => handleVendorClick(vendor)}
                                    >
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredVendors?.length === 0 && (
                    <p className="p-6 text-center text-gray-500">
                        No vendors found for selected status.
                    </p>
                )}
            </div>

            {/* ✅ Vendor Modal */}
            <VendorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                vendor={selectedVendor}
            />
        </div>
    );
};

export default ManageVendor;
