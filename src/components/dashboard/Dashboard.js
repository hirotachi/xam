import React, {Component} from "react";
import requireAuth from "../RequireAuth";


class Dashboard extends Component{

  render(){
    return (
      <div>
        <div>
          <button>add</button>
          <button>list</button>
          <button>support</button>
        </div>
      </div>
    );
  }
}
export default requireAuth(Dashboard);