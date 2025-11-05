import React from "react";

interface DeleteUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    userName?: string;
    onSoftDelete: () => void;
    onHardDelete: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
    isOpen,
    onClose,
    userName,
    onSoftDelete,
    onHardDelete,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-md p-6 relative animate-fadeIn">
                {/* Close button */}
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl font-bold"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
                    Delete User
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                    Are you sure you want to delete <strong>{userName}</strong>?
                </p>

                <div className="flex justify-around">
                    <button
                        onClick={onSoftDelete}
                        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition"
                    >
                        Soft Delete
                    </button>
                    <button
                        onClick={onHardDelete}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
                    >
                        Hard Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUserModal;
