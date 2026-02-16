import { useEffect, useState } from 'react';
import api from '../api/api';

function ProducibleProducts() {
  const [products, setProducts] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    api.get('/products/producible')
      .then(response => {
        setProducts(response.data);

        // calcula valor total
        let total = 0;
        response.data.forEach(item => {
          total += Number(item.price) * item.max_quantity;
        });

        setTotalValue(total);
      })
      .catch(error => {
        console.error('Error loading producible products:', error);
      });
  }, []);

  return (
    <div>
      <h2>Producible Products</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Max Quantity</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.product_id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.max_quantity}</td>
              <td>${(product.price * product.max_quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total value: ${totalValue.toFixed(2)}</h3>
    </div>
  );
}

export default ProducibleProducts;
