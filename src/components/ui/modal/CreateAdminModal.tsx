/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitErrorHandler } from "react-hook-form";
import { toast } from "sonner";
import { FormWrapper } from "../forms/FormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAdminValidationSchema } from "@/schema/createAdmin.scheme";
import InputField from "../forms/InputField";
import { useCreateAdminMutation } from "@/redux/api/user/userApi";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

type TAdmin = {
    name: string;
    email: string;
    password: string;
    role: string;
};


const CreateAdminModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => {
    const [createAdmin] = useCreateAdminMutation();

    const onSubmit: SubmitErrorHandler<TAdmin> = async (data: any) => {
        try {
            const result = await createAdmin(data).unwrap();
            console.log("Admin data:", result);
            toast.success("Admin created successfully!");
            onClose();
        } catch (error: any) {
            const message =
                error?.data?.errorSources?.[0]?.message ||
                error?.data?.message ||
                "Admin creation failed. Please try again.";
            toast.error(message);
        }
    };

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
                {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}

                {/* Form */}
                <FormWrapper onSubmit={onSubmit} resolver={zodResolver(createAdminValidationSchema)}>
                    <InputField label="Name" name="name" type="name" size="sm" />
                    <InputField label="Email" name="email" type="email" size="sm" />
                    <InputField label="Password" name="password" type="password" size="sm" />
                    <InputField label="Role" name="role" type="name" size="sm" />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 mt-2"
                    >
                        Create Admin
                    </button>
                </FormWrapper>
            </div>
        </div>
    );
};

export default CreateAdminModal;
