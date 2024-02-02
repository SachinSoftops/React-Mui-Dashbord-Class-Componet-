import React, { ChangeEvent, Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import { Item } from "./types";
import { TableRow } from "@material-ui/core";

interface ItemCRUDState {
  items: Item[];
  newItem: Item;
  editItemId: number | null;
}

class CrudComponents extends Component<{}, ItemCRUDState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      items: [],
      newItem: {
        id: 0,
        name: "",
        description: "",
        age: 0,
      },
      editItemId: null,
    };

    // Bind event handler methods
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
  }

  componentDidMount() {
    // Load data from local storage when the component is mounted
    const storedItems = localStorage.getItem("items");
    const items = storedItems ? JSON.parse(storedItems) : [];
    this.setState({ items });
  }

  setItemToLocalStorage(items: Item[]): void {
    localStorage.setItem("items", JSON.stringify(items));
  }

  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      newItem: { ...prevState.newItem, [name]: value },
    }));
  }

  handleAddItem() {
    const { items, newItem, editItemId } = this.state;

    if (!newItem.name.trim() || !newItem.description.trim()) {
      alert("Please enter both name and description.");
      return;
    }

    if (newItem.age <= 0) {
      alert("Please enter a valid age.");
      return;
    }

    if (editItemId !== null) {
      const updatedItems = items.map((item) =>
        item.id === editItemId ? { ...newItem, id: editItemId } : item
      );

      this.setState(
        {
          items: updatedItems,
          newItem: { id: 0, name: "", description: "", age: 0 },
          editItemId: null,
        },
        () => this.setItemToLocalStorage(this.state.items)
      );
    } else {
      this.setState(
        {
          items: [...items, { ...newItem, id: Date.now() }],
          newItem: { id: 0, name: "", description: "", age: 0 },
        },
        () => this.setItemToLocalStorage(this.state.items)
      );
    }
  }

  handleEditItem(id: number) {
    const itemToEdit = this.state.items.find((item) => item.id === id);

    if (itemToEdit) {
      if (!itemToEdit.name.trim() || !itemToEdit.description.trim()) {
        alert(
          "Existing item must have both name and description. Please correct the data."
        );
        return;
      }

      if (itemToEdit.age <= 0) {
        alert("Please enter a valid age.");
        return;
      }

      this.setState({
        newItem: { ...itemToEdit },
        editItemId: id,
      });
    }
  }

  handleDeleteItem(id: number) {
    this.setState(
      (prevState) => ({
        items: prevState.items.filter((item) => item.id !== id),
        editItemId: null,
      }),
      () => this.setItemToLocalStorage(this.state.items)
    );
  }

  handleCancelEdit() {
    this.setState({
      newItem: { id: 0, name: "", description: "", age: 0 },
      editItemId: null,
    });
  }

  render() {
    const { newItem, items, editItemId } = this.state;

    return (
      <div style={{ textAlign: "center" }}>
        <h2>Item CRUD</h2>

        <TextField
          label="Name"
          name="name"
          value={newItem.name}
          onChange={this.handleInputChange}
        />

        <TextField
          label="Description"
          name="description"
          value={newItem.description}
          onChange={this.handleInputChange}
        />

        <TextField
          label="Age"
          name="age"
          value={newItem.age}
          onChange={this.handleInputChange}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={this.handleAddItem}
          style={{ margin: "5px" }}
        >
          {editItemId !== null ? "Update Item" : "Add Item"}
        </Button>

        {editItemId !== null && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.handleCancelEdit}
            style={{ margin: "5px" }}
          >
            Cancel Edit
          </Button>
        )}

        <Table style={{ width: "100%", alignItems: "center " }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.age}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => this.handleDeleteItem(item.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => this.handleEditItem(item.id)}
                    style={{ margin: "5px" }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default CrudComponents;
