import Image from "next/image";

export default function Illustration() {
    return (
        <div className="flex justify-center">
            <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={120}
                className="object-contain"
            />
        </div>
    );
}
