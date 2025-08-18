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

  const start = <h2 className="text-xl font-bold">Shopflow 🛍️</h2>;

  return (
    <div className="p-8 text-center min-h-screen">
      <div className="flex flex-col">
        <nav className="mb-6">
          <Menubar model={items} start={start} />
        </nav>
        <h1 className="text-3xl font-bold">Welcome to Shopflow 🛍️</h1>
      </div>
    </div>
  );
};

export default HomePage;
