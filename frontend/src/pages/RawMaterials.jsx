import { useEffect, useState } from "react";
import api from "../api/api";

function RawMaterials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  // estados do formulário
  const [name, setName] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = () => {
    api.get("/raw_materials")
      .then(response => {
        setMaterials(response.data);
      })
      .catch(error => {
        console.error("Error loading raw materials", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      
    api.post('/raw_materials', {
      name,
      stock_quantity: Number(stockQuantity)
    })
    .then(() => {
      setName('');
      setStockQuantity('');
      loadMaterials(); // recarrega lista
    })
    .catch(error => {
      console.error('Error creating raw material:', error);
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Raw Materials</h2>

      <h3>Create Raw Material</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Stock Quantity"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
          required
        />

        <button type="submit">Save</button>
      </form>

      <hr />

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Stock Quantity</th>
          </tr>
        </thead>

        <tbody>
          {materials.map(material => (
            <tr key={material.id}>
              <td>{material.id}</td>
              <td>{material.name}</td>
              <td>{material.stock_quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RawMaterials;
