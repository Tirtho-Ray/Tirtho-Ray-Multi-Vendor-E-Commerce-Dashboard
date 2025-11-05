"use client";

import { useAllVendorsQuery } from "@/redux/api/vendor/vendorApi";

const ManageVendor = () => {
    const { data: vendors, isLoading, isError } = useAllVendorsQuery();

    if (isLoading)
        return (
            <p className="text-center mt-10 text-gray-500 animate-pulse text-lg">
                Loading vendors...
            </p>
        );

    if (isError)
        return (
            <p className="text-center mt-10 text-red-500 font-medium text-lg">
                Failed to load vendors.
            </p>
        );

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-teal-800 text-center mt-3 ">Manage Vendors</h1>

            {vendors?.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No vendors found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                    {vendors?.map((vendor) => (
                        <div
                            key={vendor._id}
                            className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
                        >
                            {/* Banner + Logo */}
                            <div className="relative h-32 w-full">
                                <img
                                    src={vendor.bannerImg}
                                    alt={`${vendor.shopName} banner`}
                                    className="object-cover w-full h-full"
                                />
                                <img
                                    src={vendor.logoImg}
                                    alt={`${vendor.shopName} logo`}
                                    className="absolute -bottom-6 left-4 w-16 h-16 rounded-full border-2 border-white object-cover"
                                />
                            </div>

                            <div className="p-6 pt-10 flex-1 flex flex-col justify-between">
                                <div className="flex">
                                    {/* Vendor Info */}
                                    <div className="mb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-1">{vendor.shopName}</h2>
                                        <p className="text-sm text-gray-500 mb-2">{vendor.description}</p>

                                        <div className="text-sm text-gray-600 space-y-1 mb-3">
                                            <p>
                                                <span className="font-medium">Owner:</span> {vendor.userId?.name}
                                            </p>
                                            <p>
                                                <span className="font-medium">Email:</span> {vendor.email}
                                            </p>
                                            <p>
                                                <span className="font-medium">Phone:</span> {vendor.phone}
                                            </p>
                                            <p>
                                                <span className="font-medium">Address:</span>{" "}
                                                {vendor.address?.street}, {vendor.address?.city},{" "}
                                                {vendor.address?.state}, {vendor.address?.postalCode},{" "}
                                                {vendor.address?.country}
                                            </p>
                                            <p>
                                                <span className="font-medium">Business Type:</span> {vendor.businessType}
                                            </p>
                                        </div>

                                        {/* Categories */}
                                        {vendor.productCategories?.length > 0 && (
                                            <p className="text-sm text-gray-600 mb-3">
                                                <span className="font-medium">Categories:</span>{" "}
                                                {vendor.productCategories.join(", ")}
                                            </p>
                                        )}
                                    </div>
                                    {/* Bank Details */}
                                    {vendor.bankDetails && (
                                        <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                            <p className="font-medium text-gray-700 mb-1">Bank Details</p>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>
                                                    <span className="font-medium">Account Name:</span> {vendor.bankDetails.accountName}
                                                </li>
                                                <li>
                                                    <span className="font-medium">Account Number:</span> {vendor.bankDetails.accountNumber}
                                                </li>
                                                <li>
                                                    <span className="font-medium">Bank:</span> {vendor.bankDetails.bankName}
                                                </li>
                                                <li>
                                                    <span className="font-medium">IFSC:</span> {vendor.bankDetails.ifscCode}
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Documents */}
                                {vendor.documents && (
                                    <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <p className="font-medium text-gray-700 mb-1">Documents</p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>
                                                <span className="font-medium">National ID:</span> {vendor.documents.nationalId}
                                            </li>
                                            <li>
                                                <span className="font-medium">Trade License:</span> {vendor.documents.tradeLicense}
                                            </li>
                                            {vendor.documents.otherDocs?.map((doc, index) => (
                                                <li key={index}>
                                                    <a
                                                        href={doc.url}
                                                        target="_blank"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {doc.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Status Badges */}
                                <div className="flex flex-wrap gap-2 text-xs mb-4">
                                    <span
                                        className={`px-2 py-1 rounded-full font-semibold ${vendor.status === "approved"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                            }`}
                                    >
                                        {vendor.status}
                                    </span>
                                    <span
                                        className={`px-2 py-1 rounded-full font-semibold ${vendor.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {vendor.isActive ? "Active" : "Inactive"}
                                    </span>
                                    <span
                                        className={`px-2 py-1 rounded-full font-semibold ${vendor.isVerified ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        {vendor.isVerified ? "Verified" : "Unverified"}
                                    </span>
                                    <span
                                        className={`px-2 py-1 rounded-full font-semibold ${vendor.isBlocked ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"
                                            }`}
                                    >
                                        {vendor.isBlocked ? "Blocked" : "Not Blocked"}
                                    </span>
                                    <span className="px-2 py-1 rounded-full font-semibold bg-gray-100 text-gray-700">
                                        Rating: {vendor.rating || "N/A"}
                                    </span>
                                </div>



                                {/* Social Links */}
                                {vendor.socialLinks && (
                                    <div className="flex gap-3 mb-3 text-sm">
                                        {vendor.socialLinks.facebook && (
                                            <a
                                                href={vendor.socialLinks.facebook}
                                                target="_blank"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Facebook
                                            </a>
                                        )}
                                        {vendor.socialLinks.instagram && (
                                            <a
                                                href={vendor.socialLinks.instagram}
                                                target="_blank"
                                                className="text-pink-600 hover:underline"
                                            >
                                                Instagram
                                            </a>
                                        )}
                                        {vendor.socialLinks.twitter && (
                                            <a
                                                href={vendor.socialLinks.twitter}
                                                target="_blank"
                                                className="text-sky-500 hover:underline"
                                            >
                                                Twitter
                                            </a>
                                        )}
                                    </div>
                                )}

                                {/* Metadata */}
                                <div className="text-xs text-gray-400 space-y-1">
                                    <p>Joined: {new Date(vendor.createdAt).toLocaleDateString()}</p>
                                    <p>Updated: {new Date(vendor.updatedAt).toLocaleDateString()}</p>
                                    {vendor.approvalDate && <p>Approved on: {new Date(vendor.approvalDate).toLocaleDateString()}</p>}
                                    {vendor.approvedBy && <p>Approved By: {vendor.approvedBy.name} ({vendor.approvedBy.email})</p>}
                                    {vendor.blockInfo && <p>Blocked By: {vendor.blockInfo.blockedBy}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageVendor;
