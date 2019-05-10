import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.flag = true;
    this.state = {
      array: ["1", "2", "3", "4"],
      array2: ["5", "6", "7", "8"],
      picked_parentElement: "",
      indexNumber: ""
    };
  }

  allowDrop = ev => {
    ev.preventDefault();
    ev.target.style.borderBottom = "3px dotted red";
    console.log(ev.target.parentElement.id);
    console.log(ev.target.innerHTML);

    /*     if (ev.target.parentElement.id == "div1" && this.flag) {
      this.flag = false;
      const indexNumber = this.state.array.indexOf(ev.target.innerHTML);
      var array = [...this.state.array];
      console.log(indexNumber);
      array.splice(indexNumber + 1, 0, " ");
      this.setState({
        array: array,
        indexNumber: indexNumber + 1
      });
    }

    if (ev.target.parentElement.id == "div2" && this.flag) {
      this.flag = false;
      const indexNumber = this.state.array2.indexOf(ev.target.innerHTML);
      var array = [...this.state.array2];
      console.log(indexNumber);
      array.splice(indexNumber + 1, 0, " ");
      this.setState({
        array2: array,
        indexNumber: indexNumber + 1
      });
    } */
  };

  dragleave = ev => {
    ev.target.style.border = "";
    this.flag = true;

    /*     if (ev.target.parentElement.id == "div1" && this.flag) {
      var array = [...this.state.array];
      const emptyIndex = array.indexOf(" ");
      if (emptyIndex !== -1) {
        array.splice(emptyIndex, 1);
        this.setState({ array: array });
      }
    }
    if (ev.target.parentElement.id == "div2" && this.flag) {
      var array = [...this.state.array2];
      const emptyIndex = array.indexOf(" ");
      if (emptyIndex !== -1) {
        array.splice(emptyIndex, 1);
        this.setState({ array2: array });
      }
    } */
  };

  drag = ev => {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log("saad", ev.target.parentElement.id);
    this.setState({
      picked_parentElement: ev.target.parentElement.id,
      picked_element: ev.target.innerHTML
    });
    ev.target.style.opacity = "0.2";
  };

  drop = ev => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var content = document.getElementById(data).innerHTML;
    var id = document.getElementById(data).id;
    const drop_parentElement = ev.target.parentElement.id;
    ev.target.style.border = "";

    /* Remove Empty Spaces */
    /*        if (ev.target.parentElement.id == "div1" && this.flag) {
        var array = [...this.state.array];
        const emptyIndex = array.indexOf(" ");
        if (emptyIndex !== -1) {
          array.splice(emptyIndex, 1);
          this.setState({ array: array });
        }
      }
      if (ev.target.parentElement.id == "div2" && this.flag) {
        var array = [...this.state.array2];
        const emptyIndex = array.indexOf(" ");
        if (emptyIndex !== -1) {
          array.splice(emptyIndex, 1);
          this.setState({ array2: array });
        }
      } */
    /* Remove Empty Spaces */
    /*      ev.target.parentElement.appendChild(document.getElementById(data));
     */

    document.getElementById(data).style = "background-color:white;color:black;";
    console.log(ev.target.parentElement);

    console.log("======>", ev.target);

    /* Div 1  */
    if (ev.target.parentElement.id == "div1") {
      const indexNumber = this.state.array.indexOf(ev.target.innerHTML);
      var array = [...this.state.array];
      array.splice(indexNumber + 1, 0, content);
      this.setState({
        array: array
      });

      if (this.state.picked_parentElement == "div1") {
        var array = [...this.state.array];
        const target_indexNumber = array.indexOf(ev.target.innerHTML);
        const picked_indexNumber = array.indexOf(this.state.picked_element);
        var element = array[picked_indexNumber];
        array.splice(picked_indexNumber, 1);
        array.splice(target_indexNumber, 0, element);

        console.log(array);
        this.setState({
          array: array
        });
      }

      if (this.state.picked_parentElement == "div2") {
        var array = [...this.state.array2];
        const indexNumber = array.indexOf(content);
        console.log(indexNumber);
        if (indexNumber !== -1) {
          array.splice(indexNumber, 1);
          this.setState({ array2: array });
        }
      }
    }
    /* Div 1  */

    /* Div 2  */
    if (ev.target.parentElement.id == "div2") {
      const indexNumber = this.state.array2.indexOf(ev.target.innerHTML);
      var array = [...this.state.array2];
      array.splice(indexNumber + 1, 0, content);
      this.setState({
        array2: array
      });

      if (this.state.picked_parentElement == "div1") {
        var array = [...this.state.array];
        const indexNumber = array.indexOf(content);
        console.log("=======sssssss=====>", indexNumber);
        if (indexNumber !== -1) {
          array.splice(indexNumber, 1);
          this.setState({ array: array });
        }
      }
      if (this.state.picked_parentElement == "div2") {
        console.log("Target Id======>", ev.target.id);
        console.log("------<", this.state.picked_element);
        var array = [...this.state.array2];
        const target_indexNumber = array.indexOf(ev.target.innerHTML);
        const picked_indexNumber = array.indexOf(this.state.picked_element);
        var element = array[picked_indexNumber];
        array.splice(picked_indexNumber, 1);
        array.splice(target_indexNumber, 0, element);

        console.log(array);
        this.setState({
          array2: array
        });
      }
    }
    /* Div 2  */
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
            {this.state.array.map((v, i) => {
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
            {this.state.array2.map((v, i) => {
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
      </div>
    );
  }
}

export default App;
