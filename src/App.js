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
      div3: ["9", "10", "11", "12"],
      tables: {
        div1: ["1", "2", "3", "4"],
        div2: ["5", "6", "7", "8"],
        div3: ["9", "10", "11", "12"]
      },
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

    if (drop_parentElement != "" && drop_parentElement != undefined) {
      const array1 = this.state[drop_parentElement];
      const indexNumber = array1.indexOf(ev.target.innerHTML);
      var array = [...array1];
      array.splice(indexNumber + 1, 0, content);
      this.setState({
        [drop_parentElement]: array
      });
      console.log(array);

      /*       const array1 = this.state.tables;
      const indexNumber = array1[drop_parentElement].indexOf(ev.target.innerHTML);
      var array = [...array1];
      array.splice(indexNumber + 1, 0, content);
      this.setState({
        [drop_parentElement]: array
      });
      console.log(array); */
    }
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
      console.log("=====>", array);

      const indexNumber = array.indexOf(content);
      console.log(content);
      console.log(indexNumber);
      if (indexNumber !== -1) {
        array.splice(indexNumber, 1);
        this.setState({ [picked_parentElemet]: array });
      }
      console.log(array);
    }
  };

  addCard = ev => {
    console.log(ev.target.parentElement.id);
    const id = ev.target.parentElement.id;
    let table = this.state.tables;
    table[id].push("Sample Card");
    this.setState({ tables: table });
  };

  addnewTable = () => {
    var id = prompt("Please enter your Table Id");
    let { tables } = this.state;
    tables[id] = ["Sample", "Sample", "Sample"];
    this.setState({
      tables
    });
  };

  render() {
    const { tables } = this.state;
    const tableValues = Object.values(tables);
    return (
      <div className="App">
        {Object.keys(tables).map((u, r) => {
          return (
            <div
              className="card"
              style={{
                width: "18rem",
                marginLeft: "50px",
                marginTop: "55px",
                display: "inline-block"
              }}
              onDrop={this.drop}
              onDragOver={this.allowDrop}
              onDragLeave={this.dragleave}
              id={u}
            >
              <div className="card-body">
                <h5 className="card-title">Task Completed</h5>
              </div>
              <ul
                className="list-group list-group-flush"
                onDrop={this.drop}
                onDragOver={this.allowDrop}
                onDragLeave={this.dragleave}
                id={u}
              >
                {tableValues[r].map((v, i) => {
                  return (
                    <li
                      className="list-group-item"
                      style={{ cursor: "pointer" }}
                      draggable="true"
                      onDragStart={this.drag}
                      id={v}
                    >
                      {v}
                    </li>
                  );
                })}
                <button
                  type="button"
                  class="btn btn-outline-success"
                  style={{ margin: 20 }}
                  onClick={event => this.addCard(event)}
                >
                  Add Card
                </button>
              </ul>
            </div>
          );
        })}
        <br />
        <br />
        <button
          type="button"
          className="btn btn-info"
          onClick={this.addnewTable}
        >
          Add New Table
        </button>
      </div>
    );
  }
}

export default App;
