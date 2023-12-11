'use client'

import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import DropzoneComponent from 'react-dropzone'
import { db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

type Props = {}

const Dropzone = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const { isLoaded, isSignedIn, user } = useUser();
    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach((item) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading failed')
            reader.onload = async () => {
                await uploadFile(item)
            }
            reader.readAsArrayBuffer(item)
        })
    }

    // <ToastContainer />

    const uploadFile = async (selectdFile: File) => {
        if (loading) return;
        if (!user) return;

        setLoading(true);

        // uploading logic
        const docRef = await addDoc(collection(db, "users", user.id, "files"), {
            userId: user.id,
            filename: selectdFile.name,
            fullName: user.fullName,
            profileImg: user.imageUrl,
            timestamp: serverTimestamp(),
            type: selectdFile.type,
            size: selectdFile.size
        })

        const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`)

        uploadBytes(imageRef, selectdFile).then(async (snapshot) => {
            const downloadURL = await getDownloadURL(imageRef)
            await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
                downloadURL: downloadURL
            })
        })

        setLoading(false);
    }

    const maxSize = 20971520;
    return (
        <DropzoneComponent
            onDrop={onDrop}
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



