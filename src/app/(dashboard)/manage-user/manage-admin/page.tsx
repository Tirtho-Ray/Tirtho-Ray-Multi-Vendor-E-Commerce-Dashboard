/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import UserInfoModal from "@/components/ui/modal/UserInfoModal";
import CreateAdminModal from "@/components/ui/modal/CreateAdminModal";
import { useAllUsersQuery, useHardDeleteUserMutation, useSoftDeleteUserMutation } from "@/redux/api/user/userApi";
import React, { useState } from "react";
import DeleteUserModal from "@/components/ui/modal/DeleteUserModal";

const ManageAdmin: React.FC = () => {
    const { data: users, isLoading, isError } = useAllUsersQuery();
    const [filterRole, setFilterRole] = useState<string>("ALL");
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<any>(null);

    const [softDeleteUser] = useSoftDeleteUserMutation();
    const [hardDeleteUser] = useHardDeleteUserMutation();


    if (isLoading)
        return (
            <p className="text-center mt-8 text-gray-500 animate-pulse">Loading users...</p>
        );
    if (isError)
        return (
            <p className="text-center mt-8 text-red-500 font-medium">
                Failed to load users.
            </p>
        );

    // Count users by role
    const roleCounts = {
        ALL: users?.length || 0,
        ADMIN: users?.filter((u: any) => u.role === "ADMIN").length || 0,
        SUPER_ADMIN: users?.filter((u: any) => u.role === "SUPER_ADMIN").length || 0,
        USER: users?.filter((u: any) => u.role === "USER").length || 0,
        VENDOR: users?.filter((u: any) => u.role === "VENDOR").length || 0,
    };

    const roleBoxes = [
        { role: "ALL", count: roleCounts.ALL, bg: "from-orange-300 to-orange-200" },
        { role: "ADMIN", count: roleCounts.ADMIN, bg: "from-green-400 to-green-500" },
        { role: "SUPER_ADMIN", count: roleCounts.SUPER_ADMIN, bg: "from-yellow-400 to-yellow-500" },
        { role: "USER", count: roleCounts.USER, bg: "from-red-400 to-red-500" },
        { role: "VENDOR", count: roleCounts.VENDOR, bg: "from-blue-400 to-blue-500" },
    ];

    const roles = ["ALL", "ADMIN", "SUPER_ADMIN", "USER", "VENDOR"];

    // Filtered users
    const filteredUsers = users?.filter((user: any) => {
        const matchesRole = filterRole === "ALL" || user.role === filterRole;
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesRole && matchesSearch;
    });

    // Open modal with selected user
    const handleUserClick = (user: any) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-teal-700 text-center">Manage Users</h1>

            {/* Role Count Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-8 mt-10">
                {roleBoxes.map((box) => (
                    <div
                        key={box.role}
                        className={`flex flex-col items-center justify-center p-6 rounded-xl text-white font-bold shadow-lg cursor-pointer transform transition hover:scale-105 bg-gradient-to-r ${box.bg}`}
                    >
                        <span className="text-3xl">{box.count}</span>
                        <span className="uppercase mt-2">{box.role.replace("_", " ")}</span>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center mb-6 relative mt-20">
                <button
                    className="text-[14px] px-4 py-2 rounded-lg bg-gradient-to-r from-teal-400 to-green-500  font-semibold shadow hover:shadow-lg transition-all"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    + Create Admin
                </button>

                <div className="rounded-full bg-gradient-to-r backdrop-blur-md bg-black/15 border border-white/30  font-semibold shadow hover:shadow-lg transition-all">
                    <input
                        type="search"
                        className="w-[400px] px-4 py-2 rounded-full text-white text-[12px]"
                        placeholder="search here ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>


                <div className="relative">
                    <button
                        className="text-[14px] px-4 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 font-semibold shadow hover:shadow-lg transition-all"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        Filter
                    </button>
                    <CreateAdminModal
                        isOpen={isCreateModalOpen}
                        onClose={() => setIsCreateModalOpen(false)}
                        title="Create New Admin"
                    />

                    {showDropdown && (
                        <div className="absolute right-1 mt-2 w-40 rounded-lg shadow-lg z-10 backdrop-blur-md bg-black/40 border border-white/30 text-white text-[10px] hover:rounded-lg">
                            {roles.map((role) => (
                                <div
                                    key={role}
                                    className={`px-4 py-2 cursor-pointer hover:bg-blue-500/50 transition text-[10px] hover:rounded-lg
                                                ${filterRole === role ? "font-bold bg-teal-200/50 border rounded-lg" : ""}`}
                                    onClick={() => {
                                        setFilterRole(role);
                                        setShowDropdown(false);
                                    }}
                                >
                                    {role.replace("_", " ")}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Table Container */}
            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full text-left text-sm">
                    <thead className="uppercase text-xs tracking-wider">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers?.map((user: any, index: number) => (
                            <tr
                                key={user.id || index}
                                className="border-t hover:bg-blue-600 transition-colors"
                            >
                                <td className="px-6 py-3 font-medium">
                                    <span
                                        className="bg-emerald-500 rounded-3xl px-3 py-1 font-bold font-sans cursor-pointer"
                                        onClick={() => handleUserClick(user)}
                                        title={user.name}
                                    >
                                        {user.name.length > 15
                                            ? `${user.name.slice(0, 15)}...`
                                            : user.name}
                                    </span>
                                </td>
                                <td className="px-6 py-3">{user.email}</td>
                                <td className="px-6 py-3 capitalize">
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full 
                                         ${user.role === "ADMIN"
                                                ? "bg-green-100 text-green-700"
                                                : user.role === "SUPER_ADMIN"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : user.role === "USER"
                                                        ? "bg-red-100 text-red-700"
                                                        : user.role === "VENDOR"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-right">
                                    <button
                                        className="px-3 py-1.5 rounded-md bg-green-500 text-white text-xs font-semibold hover:bg-yellow-600 transition"
                                        onClick={() => {
                                            setUserToDelete(user);
                                            setIsDeleteModalOpen(true);
                                        }}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredUsers?.length === 0 && (
                    <p className="p-6 text-center text-gray-500">No users found for selected role.</p>
                )}
            </div>

            {/* User Info Modal */}
            <UserInfoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedUser?.name}
            >
                {selectedUser && (
                    <div className="space-y-2 text-sm text-gray-700">
                        <p>
                            <strong>Email:</strong> {selectedUser.email}
                        </p>
                        <p>
                            <strong>Role:</strong> {selectedUser.role}
                        </p>
                        {selectedUser.phone && (
                            <p>
                                <strong>Phone:</strong> {selectedUser.phone}
                            </p>
                        )}
                        {selectedUser.address && (
                            <p>
                                <strong>Address:</strong> {selectedUser.address}
                            </p>
                        )}
                    </div>
                )}
            </UserInfoModal>

            {/* Create Admin Modal */}
            <CreateAdminModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create New Admin"
            />
            <DeleteUserModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                userName={userToDelete?.name}
                onSoftDelete={async () => {
                    if (!userToDelete) return;
                    await softDeleteUser(userToDelete.id);
                    setIsDeleteModalOpen(false);
                }}
                onHardDelete={async () => {
                    if (!userToDelete) return;
                    await hardDeleteUser(userToDelete.id);
                    setIsDeleteModalOpen(false);
                }}
            />

        </div>
    );
};

export default ManageAdmin;
