'use client';

import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { Dispatch, SetStateAction, useRef } from 'react';

export const CldUploadWg = ({ props }: { props: {children: React.ReactNode, setImages: Dispatch<SetStateAction<string[]>>, className?: string} }) => {
    const { children, setImages, className } = props;
    const tmpImages = useRef<string[]>([]);

    return (
        <CldUploadWidget
            uploadPreset="ml_default"
            options={{
                sources: ['local', 'url'],
                multiple: true,
                maxFiles: 10,
            }}

            onSuccess={(results: CloudinaryUploadWidgetResults) => {
                const info = results.info;
                if (info && typeof info === 'object' && 'secure_url' in info) {
                    tmpImages.current.push(info.public_id);
                }
            }}

            onClose={() => {
                if (tmpImages.current.length > 0) {
                    setImages(prev => [...prev, ...tmpImages.current]);
                    tmpImages.current = [];
                }
            }}
        >
            {({ open }) => {
                return (
                    <button onClick={() => open()} className={className}>
                        {children}
                    </button>
                );
            }}
        </CldUploadWidget>
    );
};
