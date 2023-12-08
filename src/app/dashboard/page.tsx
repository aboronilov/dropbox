import Dropzone from '@/components/Dropzone';
import { auth } from '@clerk/nextjs';

type Props = {}

const Dashboard = (props: Props) => {
  const { userId } = auth();
  return (
    <section>
      <Dropzone />
    </section>
  )
}

export default Dashboard