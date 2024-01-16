// Home.jsx

import Header from '../components/Header';
import InfluencersTable from '../components/InfluencerTable';
import Stat from '../components/Stat';
function Influencers() {

  return (

    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <div className="h-full flex flex-col">
          <InfluencersTable/>
        </div>
      </div>
    </div>

    
  );
}

export default Influencers;
