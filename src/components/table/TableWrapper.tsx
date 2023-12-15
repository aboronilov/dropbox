"use client"

import React, { useEffect, useState } from 'react'
import { FileType } from '../../../typings'
import { Button } from '../ui/button'
import { DataTable } from './Table'
import { columns } from './columns'
import { useUser } from '@clerk/nextjs'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from 'firebase/firestore'
import { db } from '../../../firebase'

type Props = {
  skeletonFiles: FileType[]
}

const TableWrapper = ({ skeletonFiles }: Props) => {
  const { user } = useUser();
  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const [docs, loading, error] = useCollection(
    user && 
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timestamp", sort)
      )
  )

  useEffect(() => {
    if (!docs) return;

    const files: FileType[] = docs.docs.map((item) => ({
      id: item.id,
      filename: item.data().filename || item.id,
      timestamp: new Date(item.data().timestamp?.seconds * 1000) || undefined,
      fullName: item.data().fullName,
      downloadURL: item.data().downloadURL,
      type: item.data().type,
      size: item.data().size
    }))

    setInitialFiles(files)
  }, [docs])

  return (
    <div>
      <Button 
        variant="outline"
        onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
      >
        Sort By {sort === "desc" ? "Newest" : "Oldest"}
      </Button>
      <DataTable columns={columns} data={initialFiles} />
    </div>
  )
}

export default TableWrapper