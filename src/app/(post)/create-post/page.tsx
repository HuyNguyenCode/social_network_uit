'use client';

import { useState } from 'react';
import InputFile from './inputFile';



// import Editor from './editor';

const CreatePost = () => {
    const [content, setContent] = useState('');

    return (

        <div className="max-w-4xl mx-auto p-4 space-y-4">
            <div className="bg-black rounded-lg shadow p-4">
                {/* <Editor 
                    
                /> */}
                <InputFile />
            </div>
        </div>
    );
};

export default CreatePost; 