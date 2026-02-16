import RawMaterials from './pages/RawMaterials';
import Products from './pages/Products';
import ProducibleProducts from './pages/ProducibleProducts';

function App() {
  return (
    <div>
      <h1>AutoFlex Stock Control</h1>

      <RawMaterials />

      <hr />
      
      <Products />

      <hr />

      <ProducibleProducts />
    </div>
  );
}

export default App;
