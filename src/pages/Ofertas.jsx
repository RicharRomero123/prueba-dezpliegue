// Home.jsx

import Header from '../components/Header';
import Stat from '../components/Stat';
import Table from '../components/Table';
function Ofertas() {

  return (

    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
      <Header />
        <div className="h-full flex flex-col">
          <Table />
        </div>
      </div>
    </div>

    
  );
}

export default Ofertas;
