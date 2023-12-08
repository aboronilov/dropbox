'use client'

import { cn } from '@/lib/utils';
import DropzoneComponent from 'react-dropzone'

type Props = {}

const Dropzone = (props: Props) => {
    const maxSize = 20971520;
    return (
        <DropzoneComponent
            onDrop={acceptedFiles => console.log(acceptedFiles)}
            minSize={0}
            maxSize={maxSize}
        >
            {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragReject,
                fileRejections
            }) => {
                const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
                return (
                    <section className='m-4 cursor-pointer hover:text-orange-800 dark:hover:text-amber-800 transition duration-300 '>
                        <div
                            {...getRootProps()}
                            className={cn(
                                'w-full h-32 flex justify-center items-center p-5 rounded-lg',
                                isDragActive 
                                ? 'bg-[#035FFE] text-white animate-pulse' 
                                : "bg-slate-100/50 dark:bg-slate-800/50 text-slate-400"
                            )}
                        >
                            {!isDragActive && 'Click here to drop a file to upload!'}
                            {isDragActive && !isDragReject && 'Drop to upload a file!'}
                            {isDragReject && 'File type not excepted, sorry!'}
                            {isFileTooLarge && (
                                <div className='text-danger mt-2'>File is too large</div>
                            )}
                        </div>
                    </section>
                )
            }}
        </DropzoneComponent>
    )
}

export default Dropzone



