import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const items = [
    {
      label: 'Account',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: handleLogout,
        },
      ],
    },
    {
      label: 'Create Ad',
      icon: 'pi pi-plus',
      command: () => navigate('/create-product'),
  },
  ];

  const start = <h2 className="text-xl font-bold">Shopflow</h2>;

  return (
    <div className="p-8 text-center min-h-screen min-w-screen flex flex-col">
      <nav className="mb-6 w-full">
        <Menubar model={items} start={start} />
      </nav>
      <h1 className="font-bold text-2xl">Welcome to Shopflow </h1>    
    </div>
  );
};

export default HomePage;
