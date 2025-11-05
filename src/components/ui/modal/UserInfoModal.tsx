import React, { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

const UserInfoModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
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

                {/* Modal Title */}
                {title && <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">{title}</h2>}

                {/* Modal Content */}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default UserInfoModal;
