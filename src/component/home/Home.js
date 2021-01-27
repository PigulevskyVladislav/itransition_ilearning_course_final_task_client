import React from "react";
import TagCloud from "./component/tag_cloud/TagCloud";
import LastItemTable from "./component/LastItemTable";
import BiggestCollectionTable from "./component/BiggestCollectionTable";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastAddedItems: [],
      biggestCollections: [],
      tags: [],
    };
  }
  
  render() {  
    return(
      <div className="container">
        <div className="row">
          <div className="col w-50">
            <h1>Last added items</h1>
            <LastItemTable/>
          </div>
          <div className="col w-50">
            <h1>Biggest collections</h1>
            <BiggestCollectionTable />
          </div>
        </div>
        <TagCloud />
      </div>
    );
  }
}

export default Home;