import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Hello World!</h1>
      <p className="text-lg mb-8 text-red-600">
        Bem-vindo ao template Next.js.
      </p>
      <div className="space-x-4">
        <Link 
          href="/password-generator" 
          className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Password Generator
        </Link>
        <Link 
          href="/shorten" 
          className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Encurtador de URLs
        </Link>
        <Link 
          href="/conversor" 
          className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Conversor moedas
        </Link>
      </div>
    </div>
  );
}