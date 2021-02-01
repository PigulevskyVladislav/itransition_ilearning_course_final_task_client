import React from "react";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Collections from "./Collections";
import { fetchData, getAddress, errorPage, loading } from "../../utils"

class UserCollectionsPage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      token: cookies.get('token'),
      collections: [],
      isLoaded: false,
      error: null,
    }
  }

  componentDidMount() {
    let token = this.state.token;
    let source = getAddress().concat("/collections".concat("/byuser/").concat(token));
    fetchData(source, this.getCollections);
  }

  getCollections = (response) => {
    let result = response.result;
    if (result) {
      this.setState({
        collections: Array.from(result),
        isLoaded: true,
      });
    } else {
      this.setState({
        error: { message: "Collection loading error" },
      });
    }
  }

  render() {
    const { collections, error, isLoaded } = this.state;
    if (error) {
      return errorPage(error); 
    } else if (!isLoaded) {
      return loading();
    } else 
    return(
      <div className="container page-begin">
        <Collections collections={collections} />
      </div>
    )
  }
}

export default withCookies(UserCollectionsPage);