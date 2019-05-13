import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.flag = true;
    this.state = {
      div1: ["1", "2", "3", "4"],
      div2: ["5", "6", "7", "8"],
      div3:["9","10","11","12"],
      picked_parentElement: "",
      indexNumber: ""
    };
  }

  allowDrop = ev => {
    ev.preventDefault();
    ev.target.style.marginBottom = "50px";

  };

  dragleave = ev => {
    ev.target.style.border = "";
    ev.target.style.marginBottom = "0px";
    this.flag = true;

  };

  drag = ev => {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log("saad", ev.target.parentElement.id);
    this.setState({
      picked_parentElement: ev.target.parentElement.id,
      picked_element: ev.target.innerHTML
    });
  };

  drop = ev => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var content = document.getElementById(data).innerHTML;
    var id = document.getElementById(data).id;
    const drop_parentElement = ev.target.parentElement.id;
    const picked_parentElemet = this.state.picked_parentElement;
    ev.target.style.border = "";

         ev.target.style.marginBottom = "0px";
     


    const array1 = this.state[drop_parentElement];
    const indexNumber = array1.indexOf(ev.target.innerHTML);
    var array = [...array1];
    array.splice(indexNumber + 1, 0, content);
    this.setState({
      [drop_parentElement]: array
    });
    console.log(array);

    if (this.state.picked_parentElement == drop_parentElement) {
      console.log(1);
      const dropArray = this.state[drop_parentElement];
      var array = [...dropArray];
      const target_indexNumber = array.indexOf(ev.target.innerHTML);
      const picked_indexNumber = array.indexOf(this.state.picked_element);
      var element = array[picked_indexNumber];
      array.splice(picked_indexNumber, 1);
      array.splice(target_indexNumber, 0, element);

      console.log(array);
      this.setState({
        [drop_parentElement]: array
      });
    }

    if (this.state.picked_parentElement != drop_parentElement) {

      const dropArray1 = this.state[picked_parentElemet];
      var array = dropArray1;
      console.log("=====>",array);
      
      const indexNumber = array.indexOf(content);
      console.log(content)
      console.log(indexNumber);
      if (indexNumber !== -1) {
        array.splice(indexNumber, 1);
        this.setState({ [picked_parentElemet]: array });
      }
      console.log(array)
    }
  };

  render() {
    return (
      <div className="App">
        <div
          class="card"
          style={{
            width: "18rem",
            marginLeft: "50px",
            marginTop: "55px",
            display: "inline-block"
          }}
          onDrop={this.drop}
          onDragOver={this.allowDrop}
          onDragLeave={this.dragleave}
          id="div1"
        >
          <div class="card-body">
            <h5 class="card-title">Task Completed</h5>
          </div>
          <ul
            class="list-group list-group-flush"
            onDrop={this.drop}
            onDragOver={this.allowDrop}
            onDragLeave={this.dragleave}
            id="div1"
          >
            {this.state.div1.map((v, i) => {
              return (
                <li
                  class="list-group-item"
                  style={{ cursor: "pointer" }}
                  draggable="true"
                  onDragStart={this.drag}
                  id={v}
                >
                  {v}
                </li>
              );
            })}
          </ul>
        </div>

        <div
          class="card"
          style={{
            width: "18rem",
            marginLeft: "50px",
            marginTop: "55px",
            display: "inline-block"
          }}
          onDrop={this.drop}
          onDragOver={this.allowDrop}
          onDragLeave={this.dragleave}
          id="div2"
        >
          <div class="card-body">
            <h5 class="card-title">Task in Progress</h5>
          </div>
          <ul
            class="list-group list-group-flush"
            onDrop={this.drop}
            onDragOver={this.allowDrop}
            onDragLeave={this.dragleave}
            id="div2"
          >
            {this.state.div2.map((v, i) => {
              return (
                <li
                  class="list-group-item"
                  style={{ cursor: "pointer" }}
                  draggable="true"
                  onDragStart={this.drag}
                  id={v}
                >
                  {v}
                </li>
              );
            })}
          </ul>
        </div>
        <div
          class="card"
          style={{
            width: "18rem",
            marginLeft: "50px",
            marginTop: "55px",
            display: "inline-block"
          }}
          onDrop={this.drop}
          onDragOver={this.allowDrop}
          onDragLeave={this.dragleave}
          id="div3"
        >
          <div class="card-body">
            <h5 class="card-title">Task in Started</h5>
          </div>
          <ul
            class="list-group list-group-flush"
            onDrop={this.drop}
            onDragOver={this.allowDrop}
            onDragLeave={this.dragleave}
            id="div3"
          >
            {this.state.div3.map((v, i) => {
              return (
                <li
                  class="list-group-item"
                  style={{ cursor: "pointer" }}
                  draggable="true"
                  onDragStart={this.drag}
                  id={v}
                >
                  {v}
                </li>
              );
            })}
          </ul>
        </div>
        <br></br>
        <br></br>
        <button type="button" class="btn btn-info">Add New Table</button>

      </div>
    );
  }
}

export default App;
