import Link from 'next/link';


export default function Home() {
  return (
    <div>
      <p>
        Visualizer
      </p>
      <Link  href='/login'>
        Login Page
      </Link>
    </div>
  );
}
