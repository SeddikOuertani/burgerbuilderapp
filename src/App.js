import Layout from './hoc/Layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import './App.css';

function App() {
  return (
    <div >
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
