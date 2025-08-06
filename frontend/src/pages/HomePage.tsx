import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Marketplace</h1>
      <p className="text-lg text-gray-600 mb-8">The best place to buy and sell amazing products.</p>
      <button
        onClick={() => navigate('/signup')}
        className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-6 rounded-lg text-lg"
      >
        Get Started
      </button>
    </div>
  );
}

export default HomePage;