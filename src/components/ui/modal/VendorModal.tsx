/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

interface VendorModalProps {
    isOpen: boolean;
    onClose: () => void;
    vendor: any; // Replace with your vendor interface
    onApprove?: (vendorId: string) => void; // Optional approve handler
}

const VendorModal: React.FC<VendorModalProps> = ({ isOpen, onClose, vendor, onApprove }) => {
    if (!isOpen || !vendor) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-2xl rounded-2xl w-full max-w-3xl mx-4 overflow-hidden animate-slideUp">

                {/* Close Button */}
                <button
                    className="absolute top-5 right-6 text-gray-500 hover:text-teal-600 dark:text-gray-300 dark:hover:text-white text-2xl font-bold transition-transform hover:scale-110"
                    onClick={onClose}
                >
                    ✕
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-t-2xl shadow">
                    <div>
                        <h2 className="text-2xl font-semibold">
                            {vendor.shopName || "Vendor Details"}
                        </h2>
                        <p className="text-sm opacity-90">
                            Vendor ID: {vendor._id || "N/A"}
                        </p>
                    </div>
                    <div className="flex gap-2 mt-4 sm:mt-0">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${vendor.status === "APPROVED"
                                ? "bg-green-100 text-green-800"
                                : vendor.status === "PENDING"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                        >
                            {vendor.status}
                        </span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${vendor.isVerified
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                                }`}
                        >
                            {vendor.isVerified ? "Verified" : "Unverified"}
                        </span>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-8 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">

                    {/* Basic Info */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 border-b border-gray-200 dark:border-gray-700 pb-1">
                            Basic Information
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                            <p><strong>Name:</strong> {vendor.userId?.name || "N/A"}</p>
                            <p><strong>Email:</strong> {vendor.email || "N/A"}</p>
                            <p><strong>Phone:</strong> {vendor.phone || "N/A"}</p>
                            <p><strong>Business Type:</strong> {vendor.businessType || "N/A"}</p>
                            <p className="sm:col-span-2"><strong>Description:</strong> {vendor.description || "N/A"}</p>
                            <p className="sm:col-span-2">
                                <strong>Address:</strong>{" "}
                                {vendor.address
                                    ? `${vendor.address.street}, ${vendor.address.city}, ${vendor.address.state}, ${vendor.address.country}`
                                    : "N/A"}
                            </p>
                        </div>
                    </section>

                    {/* Bank Details */}
                    {vendor.bankDetails && (
                        <section>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 border-b border-gray-200 dark:border-gray-700 pb-1">
                                Bank Details
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300 bg-gray-50/70 dark:bg-gray-800/60 p-4 rounded-xl">
                                <p><strong>Account Name:</strong> {vendor.bankDetails.accountName}</p>
                                <p><strong>Account Number:</strong> {vendor.bankDetails.accountNumber}</p>
                                <p><strong>Bank:</strong> {vendor.bankDetails.bankName}</p>
                                <p><strong>IFSC:</strong> {vendor.bankDetails.ifscCode}</p>
                            </div>
                        </section>
                    )}

                    {/* Documents */}
                    {vendor.documents && (
                        <section>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 border-b border-gray-200 dark:border-gray-700 pb-1">
                                Documents
                            </h3>
                            <div className="bg-gray-50/70 dark:bg-gray-800/60 p-4 rounded-xl text-sm text-gray-700 dark:text-gray-300 space-y-2">
                                <p><strong>National ID:</strong> {vendor.documents.nationalId || "N/A"}</p>
                                <p><strong>Trade License:</strong> {vendor.documents.tradeLicense || "N/A"}</p>
                                {vendor.documents.otherDocs?.length > 0 && (
                                    <div>
                                        <strong>Other Documents:</strong>
                                        <ul className="list-disc list-inside space-y-1 mt-1">
                                            {vendor.documents.otherDocs.map((doc: any, index: number) => (
                                                <li key={index}>
                                                    <a
                                                        href={doc.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-teal-600 hover:underline"
                                                    >
                                                        {doc.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 p-5 border-t border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/60 rounded-b-2xl">
                    {vendor.status !== "APPROVED" && (
                        <button
                            onClick={() => onApprove?.(vendor._id)}
                            className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-md shadow hover:shadow-lg transition-all"
                        >
                            Approve Vendor
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VendorModal;
