import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.flag = true;
    this.state = {
      tables: {
        div1: [
          { title: "Software Enginner", description: "Hello This is Me" },
          { title: "Mechanic", description: "1234" }
        ],
        div2: [
          { title: "Web Developer", description: "Hello This is Me" },
          { title: "Rider", description: "1234" }
        ],
        div3: [
          { title: "Data Enginner", description: "Hello This is Me" },
          { title: "Youtuber", description: "1234" }
        ]
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
    this.setState({
      picked_parentElement: ev.target.parentElement.id,
      picked_element: ev.target.id
    });
  };

  drop = ev => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    const drop_parentElement = ev.target.parentElement.id;
    const picked_parentElemet = this.state.picked_parentElement;
    const pickedElementid = this.state.picked_element;
    ev.target.style.border = "";
    ev.target.style.marginBottom = "0px";
    const pickedElement = this.state.tables[picked_parentElemet][
      pickedElementid
    ];

    /* Drop On Different Table  */
    if (
      drop_parentElement != "" &&
      drop_parentElement != undefined &&
      this.state.picked_parentElement != drop_parentElement
    ) {
      const array1 = this.state.tables[drop_parentElement];
      const indexNumber = ev.target.id;
      array1.splice(indexNumber + 1, 0, pickedElement);
      this.setState({
        [drop_parentElement]: array1
      });
    }

    if (this.state.picked_parentElement != drop_parentElement) {
      const dropArray1 = this.state.tables[picked_parentElemet];
      const indexNumber = pickedElementid;
      if (indexNumber !== -1) {
        dropArray1.splice(indexNumber, 1);
        this.setState({ [picked_parentElemet]: dropArray1 });
      }
    }
    /* Drop On Different Table  */


    /* Drop on same table */
    if (this.state.picked_parentElement == drop_parentElement) {
      const dropArray = this.state.tables[drop_parentElement];
      const target_indexNumber = ev.target.id;
      const picked_indexNumber = pickedElementid;
      var element = pickedElement;
      dropArray.splice(picked_indexNumber, 1);
      dropArray.splice(target_indexNumber, 0, element);

      this.setState({
        [drop_parentElement]: dropArray
      });
    }
    /* Drop on same table */
  };

  addCard = ev => {
    console.log(ev.target.parentElement.id);
    const id = ev.target.parentElement.id;
    let table = this.state.tables;
    table[id].push({ title: "Sample Job", description: "Hello This is Me" });
    this.setState({ tables: table });
  };

  addnewTable = () => {
    var id = prompt("Please enter your Table Id");
    let { tables } = this.state;
    tables[id] = [
      { title: "Sample Job", description: "Hello This is Me" },
      { title: "Sample Job", description: "1234" }
    ];
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
              key={r}
            >
              <div className="card-body">
                <h5 className="card-title">Task Completed</h5>
              </div>
              <ul className="list-group list-group-flush" id={u}>
                {tableValues[r].map((v, i) => {
                  return (
                    <li
                      className="list-group-item"
                      style={{ cursor: "pointer" }}
                      draggable="true"
                      onDragStart={this.drag}
                      id={i}
                      key={i}
                    >
                      {v.title}
                    </li>
                  );
                })}
                <button
                  type="button"
                  className="btn btn-outline-success"
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
