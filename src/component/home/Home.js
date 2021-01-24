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
      <div>
        <LastItemTable/>
        <BiggestCollectionTable />
        <TagCloud />
      </div>
    );
  }
}

export default Home;