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

  // componentDidMount() {
  //   this.getItems();
  // }

  getItems = (source) => {
    fetch(source)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            lastAddedItems: Array.from(result),
            isItemsLoaded: true,
          });
        },
        (error) => {
          alert("error!");
          // TODO Errors
        }
      );   
  }

  // renderItems = () => {
  //   let items = this.state.lastAddedItems;
  //   let itemRows = items.map((item) => 
  //   <tr key={item.id}>
  //     <td>{item.name}</td>
  //     <td>{item.collection_name}</td>
  //   </tr>
  //   );
  //   return itemRows;
  // }

  render() {
    // let rows;
    // if (this.state.isItemsLoaded) {
    //   rows = this.renderItems();
    // }
    
    return(
      <div>
        <LastItemTable />
        <BiggestCollectionTable />
        <TagCloud />
      </div>
    );
  }
}

export default Home;