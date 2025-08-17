import { useNavigate } from 'react-router-dom';

const InitialPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Marketplace</h1>
      <p className="text-lg text-gray-600 mb-8">The best place to buy and sell amazing products.</p>
      <div className="flex flex-row gap-2">
        <button
          onClick={() => navigate('/signup')}
          className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-6 rounded-lg text-lg"
        >
        Get Started
        </button>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-6 rounded-lg text-lg"
        >
        Login
        </button>
      </div>
      
    </div>
  );
}

export default InitialPage;