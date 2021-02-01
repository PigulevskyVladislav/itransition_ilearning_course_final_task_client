import React from "react";
import TagCloud from "./component/tag_cloud/TagCloud";
import { fetchData, getAddress, errorPage, loading } from "../../utils"
import LastItemTable from "./component/LastItemTable";
import BiggestCollectionTable from "./component/BiggestCollectionTable";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastAddedItems: [],
      biggestCollections: [],
      tags: [],
      isItemsLoaded: false,
      isCollectionsLoaded: false,
      isTagsLoaded: false,
    };
  }

  componentDidMount() {
    fetchData(getAddress().concat("/collections/biggest"), this.getCollections);
    fetchData(getAddress().concat("/items/lastadded"), this.getItems);
    fetchData(getAddress().concat("/tags"), this.getTags);
  }

  getCollections = (response) => {
    let result = response.result;
    if (result) {
      this.setState({
        biggestCollections: Array.from(result),
        isCollectionsLoaded: true,
      });
    } else {
      this.setState({
        error: { message: "Collections loading error" },
      });
    } 
  }

  getItems = (response) => {
    let result = response.result;
    if (result) {
      this.setState({
        lastAddedItems: Array.from(result),
        isItemsLoaded: true,
      });
    } else {
      this.setState({
        error: response.error,
      });
    }
  }

  getTags = (response) => {
    let result = response.result;
    if (result) {
      this.setState({
        tags: Array.from(result),
        isTagsLoaded: true,
      });
    } else {
      this.setState({
        error: { message: "Tags loading error" },
      });
    }
  }  
  
  render() {  
    const { error, tags, lastAddedItems, biggestCollections, 
            isItemsLoaded, isCollectionsLoaded, isTagsLoaded } = this.state;
    if (error) {
      return errorPage(error); 
    } else if (!(isItemsLoaded && isCollectionsLoaded && isTagsLoaded)) {
      return loading();
    } else 
    return(
      <div className="container page-begin">
        <div className="row">
          <div className="col w-50">
            <h1>Last added items</h1>
            <LastItemTable items={lastAddedItems}/>
          </div>
          <div className="col w-50">
            <h1>Biggest collections</h1>
            <BiggestCollectionTable collections={biggestCollections} />
          </div>
        </div>
        <TagCloud tags={tags} />
      </div>
    );
  }
}

export default Home;