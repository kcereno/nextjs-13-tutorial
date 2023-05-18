import Nav from '@/components/Nav';
import '../styles/globals.css';

export const metadata = {
  title: 'Promptopia',
  description: 'Discover and share AI prompts',
};

interface PropsI {
  children: React.ReactNode;
}

const RootLayout = ({ children }: PropsI) => {
  return (
    <html lang="eng">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
