// import TextareaAutosize from 'react-textarea-autosize'

import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore"; // replace with the actual path to useEdgeStore
import { SingleImageDropzone } from "@/components/ui/single-image-dropzone";
import { Link } from "lucide-react";

export const InputFile = () => {
    const [file, setFile] = useState<File>();
    const [urls, setUrls] = useState<{
        url: string;
        thumbnailUrl: string | null;
    }>();
    const [progress, setProgress] = useState(0);
    const { edgestore } = useEdgeStore();
    return (
        <div className="flex flex-col items-center m-6 gap-2">
            <SingleImageDropzone
                width={200}
                height={200}
                value={file}
                onChange={(file) => {
                    setFile(file);
                }}
            />
            <div className="h-[6px] w-44 border rounded overflow-hidden transition-all duration-150">
                <div
                    className="h-full bg-white"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <button
                className="bg-white text-black rounded px-2 hover:opacity-80"
                onClick={async () => {
                    if (file) {
                        const res = await edgestore.myPublicImages.upload({
                            file,
                            onProgressChange: (progress) => {
                                setProgress(progress);
                            },
                        });
                        setUrls({
                            url: res.url,
                            thumbnailUrl: res.thumbnailUrl,
                        });
                    }
                }}
            >
                Upload
            </button>
            {urls?.url && (
                <Link href={urls.url} target="_blank">
                    URL
                </Link>
            )}
            {urls?.thumbnailUrl && (
                <Link href={urls.thumbnailUrl} target="_blank">
                    THUMBNAIL
                </Link>
            )}
        </div>
    );
};
