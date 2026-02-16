import { useEffect, useState } from 'react';
import api from '../api/api';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error loading products:', error);
      });
  }, []);

  return (
    <div>
      <h2>Products</h2>

      {products.map(product => (
        <div key={product.id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>

          <strong>Raw materials:</strong>
          <ul>
            {product.materials.length === 0 && <li>No materials</li>}

            {product.materials.map(material => (
              <li key={material.id}>
                {material.name} — Required: {material.quantity_required} — Stock: {material.stock_quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Products;
