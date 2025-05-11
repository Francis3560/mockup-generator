import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Image1 from '../../public/assets/kid.png';
import Image2 from '../../public/assets/mug.png';
import Image3 from '../../public/assets/phone.png';
import Image4 from '../../public/assets/shirt.png';
import Image5 from '../../public/assets/shirt1.png';
import Image6 from '../../public/assets/sweatshirt.png';
import Image7 from '../../public/assets/shirt3.png';

const products = [
  { id: 'tshirt', name: 'Kid-T-Shirt', image: Image1 },
  { id: 'mug', name: 'Mug', image: Image2 },
  { id: 'phone', name: 'Phone Casing', image: Image3 },
  { id: 'men-shirt', name: 'Men-T-Shirt', image: Image4 },
  { id: 'ladies-shirt', name: 'Women-T-Shirt', image: Image5 },
  { id: 'sweatshirt', name: 'Sweatshirt', image: Image6 },
  { id: 'shirt', name: 'T-shirt', image: Image7 },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Helmet>
        <title>Choose a Product - My Shop</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">Choose a Product</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/editor/${product.id}`} // Pass productId as part of the route
            className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <img
              src={product.image}
              alt={`Image of ${product.name}`}
              className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-xl font-semibold text-center">{product.name}</h2>
          </Link>
        ))}
      </section>
    </div>
  );
}
