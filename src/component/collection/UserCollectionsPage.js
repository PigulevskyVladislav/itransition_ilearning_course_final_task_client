import React from "react";
import Collections from "./Collections";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class UserCollectionsPage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      token: cookies.get('token'),
    }
  }
  render() {
    return(
      <div>
        <Collections token={this.state.token}/>
      </div>
    )
  }
}

export default withCookies(UserCollectionsPage);