import React, { Component } from 'react';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data:[
            {
              "name":"Sombra"
            },
            {
              "name":"Ente"
            },
            {
              "name":"Oni"
            }
        ]
    }
    this.addGhost = this.addGhost.bind(this);
  }

  addGhost(){
    var newdata = this.state.data
    newdata.push({ "name":"Danifalky" })
    this.setState({data: newdata});
  }

  render() {
    return (
      <div>
        <ListTitle/>
          <ul>
            {this.state.data.map((item) => <List data = {item} />)}
          </ul>
        <button onClick={this.addGhost}> Add Ghost </button>
      </div>
    );
  }
}

class ListTitle extends React.Component {
   render() {
      return (
         <div>
            <h1>Possible Ghosts</h1>
         </div>
      );
   }
}
class List extends React.Component {
   render() {
      return (
         <ul>
            <li>{this.props.data.name}</li>
         </ul>
      );
   }
}
export default App;
