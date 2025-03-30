import Link from 'next/link';


export default function Home() {
  return (
    <div>
      <div className='text-5xl w-full text-center h-[100px] mt-5'>
        <p>
          Visualizer
        </p>
      </div>
        <div className='flex justify-center'>
          <div className=' text-3xl bg-blue-500 rounded-full w-[200px] text-center '>
            <Link  href='/login'>
              Login Page
            </Link>
          </div> 
        </div>     
    </div>
  );
}
