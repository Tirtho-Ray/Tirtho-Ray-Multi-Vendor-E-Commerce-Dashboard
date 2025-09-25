// InputField.tsx
import { useFormContext } from "react-hook-form";

interface IProps {
    name: string;
    size?: "sm" | "md" | "lg";
    required?: boolean;
    type?: string;
    label: string;
    placeholder?: string;
}

const InputField = ({
    name,
    size = "md",
    required = false,
    type = "text",
    label,
    placeholder
}: IProps) => {
    const {
        register,
        formState: { errors }
    } = useFormContext();

    const sizeClass = {
        sm: "p-2 text-sm",
        md: "p-3 text-base",
        lg: "p-4 text-lg"
    }[size];

    const error = errors?.[name]?.message as string;

    return (
        <div className="flex flex-col w-full">
            <label className="mb-2 font-medium text-white">{label}</label>
            <input
                {...register(name)}
                type={type}
                required={required}
                placeholder={placeholder}
                className={`border rounded-[15px] focus:ring-2 focus:ring-blue-500 focus:outline-none bg-black/50 text-white placeholder-white/70 ${sizeClass} ${error ? "border-red-500" : "border-white/30"
                    }`}
            />
            {error && <span className="text-red-400 text-sm mt-1">{error}</span>}
        </div>
    );
};

export default InputField;
