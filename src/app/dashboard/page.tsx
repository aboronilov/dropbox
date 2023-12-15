import Dropzone from '@/components/Dropzone';
import { auth } from '@clerk/nextjs';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { FileType } from '../../../typings';
import TableWrapper from '@/components/table/TableWrapper';

type Props = {}

const Dashboard = async (props: Props) => {
  const { userId } = auth();
  const docsResults = await getDocs(collection(db, "users", userId!, "files"))
  const skeletonFiles: FileType[] = docsResults.docs.map((item) => ({
    id: item.id,
    filename: item.data().filename || item.id,
    timestamp: new Date(item.data().timestamp?.seconds * 1000) || undefined,
    fullName: item.data().fullName,
    downloadURL: item.data().downloadURL,
    type: item.data().type,
    size: item.data().size,
  }))
  
  return (
    <div className='border-t'>
      <Dropzone />

      <section className='container space-y-5'>
        <h2 className='font-bold'>Files List</h2>
        <div className="">
          <TableWrapper skeletonFiles={skeletonFiles}/>
        </div>
      </section>
    </div>
  )
}

export default Dashboard