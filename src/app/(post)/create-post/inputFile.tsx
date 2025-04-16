'use client';
import { useRef, useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { CldUploadWg } from "@/components/ui/cldUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";
import { CldImage } from "next-cloudinary";

const cloudinary = new Cloudinary({
    cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    }
});

const InputFile = () => {
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImages((prev) => [...prev, imageURL]);
        }
    };

    const prevSlide = (): void => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };

    const nextSlide = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handleDeleteImage = (index: number): void => {
        setImages((prev) => prev.filter((_, idx) => idx !== index));
        setCurrentIndex(0);
    };

    return (
        <>
            {images.length === 0 && (
                <div className="w-full h-60 border-2 border-dashed border-gray-400 rounded-2xl flex gap-2 items-center justify-center">
                    <p className="text-gray-400 text-xl">Kéo hoặc thả file vào đây</p>
                    <label htmlFor="inputFile" className="p-2 rounded-full bg-slate-500 hover:bg-slate-400 flex">
                        <CldUploadWg props={{
                            children: <svg
                                fill="currentColor"
                                height="24"
                                viewBox="0 0 20 20"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="m10.513 5.63 3.929 3.928-.884.884-2.933-2.933V19h-1.25V7.51l-2.933 2.932-.884-.884L9.67 5.446l.589-.029.254.212Zm5.859-1.482A6.876 6.876 0 0 0 10 0a6.876 6.876 0 0 0-6.372 4.148A4.639 4.639 0 0 0 0 8.625a4.716 4.716 0 0 0 4.792 4.625V12A3.465 3.465 0 0 1 1.25 8.625 3.412 3.412 0 0 1 4.189 5.31l.364-.06.123-.35A5.607 5.607 0 0 1 10 1.25a5.607 5.607 0 0 1 5.324 3.65l.123.348.364.06a3.412 3.412 0 0 1 2.939 3.317A3.465 3.465 0 0 1 15.208 12v1.25A4.716 4.716 0 0 0 20 8.625a4.639 4.639 0 0 0-3.628-4.477Z" />
                            </svg>,
                            setImages: setImages
                        }}
                        />
                    </label>
                </div>
            )}

            {images.length > 0 && (
                <div className="relative w-full h-[400px] border-2 border-gray-400 bg-white/10 backdrop-blur-3xl rounded-lg flex gap-2 items-center justify-center cursor-none">
                    {/* <button
                        className="absolute top-3 left-3 py-2 px-3 z-10 gap-2 rounded-full bg-black hover:bg-black/70 flex justify-center items-center cursor-pointer"
                        onClick={() => inputFileRef.current?.click()}
                    >
                        <svg
                            fill="currentColor"
                            height="16"
                            viewBox="0 0 20 20"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M2.625 16A1.627 1.627 0 0 1 1 14.375V2.625A1.627 1.627 0 0 1 2.625 1h11.75A1.627 1.627 0 0 1 16 2.625h-1.25a.375.375 0 0 0-.375-.375H2.625a.375.375 0 0 0-.375.375v11.75a.375.375 0 0 0 .375.375V16Zm14.044-7.068a2.573 2.573 0 1 1-5.147.002 2.573 2.573 0 0 1 5.147-.002Zm-1.029 0a1.544 1.544 0 1 0-3.087.002 1.544 1.544 0 0 0 3.087-.002ZM19 5.622v11.756A1.624 1.624 0 0 1 17.378 19H5.622A1.624 1.624 0 0 1 4 17.378V5.622A1.624 1.624 0 0 1 5.622 4h11.756A1.624 1.624 0 0 1 19 5.622ZM5.622 17.75h9.151l-4.648-4.65a1.958 1.958 0 0 0-2.765 0l-2.11 2.11v2.166a.373.373 0 0 0 .372.374ZM17.75 5.622a.373.373 0 0 0-.372-.372H5.622a.373.373 0 0 0-.372.372v8.134l1.382-1.381a2.988 2.988 0 0 1 4.222 0l5.375 5.375h1.149a.373.373 0 0 0 .372-.372V5.622Z" />
                        </svg>
                        Add
                    </button> */}
                    <button
                        className="absolute top-3 left-3 py-2 px-3 z-10 gap-2 rounded-full bg-black hover:bg-black/70 flex justify-center items-center cursor-pointer"
                        onClick={() => inputFileRef.current?.click()}
                    >

                    </button>
                    <CldUploadWg props={{
                        children: <>
                            <svg
                                fill="currentColor"
                                height="16"
                                viewBox="0 0 20 20"
                                width="16"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2.625 16A1.627 1.627 0 0 1 1 14.375V2.625A1.627 1.627 0 0 1 2.625 1h11.75A1.627 1.627 0 0 1 16 2.625h-1.25a.375.375 0 0 0-.375-.375H2.625a.375.375 0 0 0-.375.375v11.75a.375.375 0 0 0 .375.375V16Zm14.044-7.068a2.573 2.573 0 1 1-5.147.002 2.573 2.573 0 0 1 5.147-.002Zm-1.029 0a1.544 1.544 0 1 0-3.087.002 1.544 1.544 0 0 0 3.087-.002ZM19 5.622v11.756A1.624 1.624 0 0 1 17.378 19H5.622A1.624 1.624 0 0 1 4 17.378V5.622A1.624 1.624 0 0 1 5.622 4h11.756A1.624 1.624 0 0 1 19 5.622ZM5.622 17.75h9.151l-4.648-4.65a1.958 1.958 0 0 0-2.765 0l-2.11 2.11v2.166a.373.373 0 0 0 .372.374ZM17.75 5.622a.373.373 0 0 0-.372-.372H5.622a.373.373 0 0 0-.372.372v8.134l1.382-1.381a2.988 2.988 0 0 1 4.222 0l5.375 5.375h1.149a.373.373 0 0 0 .372-.372V5.622Z" />
                            </svg>
                            Add
                        </>,
                        setImages: setImages,
                        className: "absolute top-3 left-3 py-2 px-3 z-10 gap-2 rounded-full bg-black hover:bg-black/70 flex justify-center items-center cursor-pointer"
                    }} />
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-black hover:bg-black/70 z-10" onClick={() => handleDeleteImage(currentIndex)}>
                        <svg fill="currentColor" height="16" icon-name="delete-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M15.751 6.023 17 6.106l-.761 11.368a2.554 2.554 0 0 1-.718 1.741A2.586 2.586 0 0 1 13.8 20H6.2a2.585 2.585 0 0 1-1.718-.783 2.553 2.553 0 0 1-.719-1.737L3 6.106l1.248-.083.761 11.369c-.005.333.114.656.333.908.22.252.525.415.858.458h7.6c.333-.043.64-.207.859-.46.22-.254.338-.578.332-.912l.76-11.363ZM18 2.983v1.243H2V2.983h4v-.372A2.737 2.737 0 0 1 6.896.718 2.772 2.772 0 0 1 8.875.002h2.25c.729-.03 1.44.227 1.979.716.538.488.86 1.169.896 1.893v.372h4Zm-10.75 0h5.5v-.372a1.505 1.505 0 0 0-.531-1.014 1.524 1.524 0 0 0-1.094-.352h-2.25c-.397-.03-.79.097-1.094.352-.304.256-.495.62-.531 1.014v.372Z"></path></svg>
                    </button>
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512"
                                    className="w-6 h-6"
                                >
                                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                                </svg>
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512"
                                    className="w-6 h-6"
                                >
                                    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                                </svg>
                            </button>
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-1">
                                {images.map((_, index) => (
                                    <span
                                        key={index}
                                        className={`w-[5px] h-[5px] rounded-full transition-all duration-500 ease-in-out ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                                        onClick={() => setCurrentIndex(index)}
                                    ></span>
                                ))}
                            </div>
                        </>
                    )}
                    <div className="w-full h-full">
                        <CldImage
                            // deliveryType="fetch" 
                            src={images[currentIndex]}
                            alt={`image ${currentIndex}`}
                            loading="lazy"
                            fill
                            style={{ objectFit: 'contain' }}
                            className="transition-all duration-300 ease-in-out animate-fadeIn"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default InputFile;

const fadeIn = `
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
}`
    ;
const styleTag = document.createElement('style');
styleTag.textContent = fadeIn;
document.head.appendChild(styleTag);