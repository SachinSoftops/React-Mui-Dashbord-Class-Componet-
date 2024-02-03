import React, { ChangeEvent, Component } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Box, Container } from "@mui/material";

interface Item {
  id: number;
  name: string;
  description: string;
  age: number;
}

interface ItemCRUDState {
  items: Item[];
  newItem: Item;
  editItemId: number | null;
  isDialogOpen: boolean;
}

class ModelWithFunctionality extends Component<{}, ItemCRUDState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      items: [],
      newItem: { id: 0, name: "", description: "", age: 0 },
      editItemId: null,
      isDialogOpen: false,
    };
  }

  componentDidMount() {
    const storedItems = localStorage.getItem("items");
    const items = storedItems ? JSON.parse(storedItems) : [];
    this.setState({ items });
  }

  setItemToLocalStorage(items: Item[]): void {
    localStorage.setItem("items", JSON.stringify(items));
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      newItem: { ...prevState.newItem, [name]: value },
    }));
  };

  handleAddItem = () => {
    const { items, newItem, editItemId } = this.state;

    if (
      !newItem.name.trim() ||
      !newItem.description.trim() ||
      newItem.age <= 0
    ) {
      alert("Please enter valid data.");
      return;
    }

    const updatedItems = editItemId
      ? items.map((item) =>
          item.id === editItemId ? { ...newItem, id: editItemId } : item
        )
      : [...items, { ...newItem, id: Date.now() }];

    this.setState(
      {
        items: updatedItems,
        newItem: { id: 0, name: "", description: "", age: 0 },
        editItemId: null,
        isDialogOpen: false,
      },
      () => this.setItemToLocalStorage(updatedItems)
    );
  };

  handleEditItem = (id: number) => {
    const itemToEdit = this.state.items.find((item) => item.id === id);

    if (itemToEdit) {
      this.setState({
        newItem: { ...itemToEdit },
        editItemId: id,
        isDialogOpen: true,
      });
    }
  };

  handleDeleteItem = (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updatedItems = this.state.items.filter((item) => item.id !== id);

      this.setState(
        {
          items: updatedItems,
          editItemId: null,
        },
        () => this.setItemToLocalStorage(updatedItems)
      );
    }
  };

  handleCloseDialog = () => {
    this.setState({
      newItem: { id: 0, name: "", description: "", age: 0 },
      isDialogOpen: false,
    });
  };

  render() {
    const { newItem, items, isDialogOpen, editItemId } = this.state;

    return (
      <div style={{ textAlign: "center" }}>
        <h2>Employee Management System</h2>
      <Box sx={{
        height:'2px',
        backgroundColor:'red',
        width:'100%'

      }} >

      </Box >
        <Button sx={{
          marginTop:'30px',
          display:'flex',
          marginLeft:'30px'
        }}
          variant="outlined"
          color="primary"
          onClick={() => this.setState({ isDialogOpen: true })}
        >
          Add User
        </Button>
       
        <Dialog  onClose={this.handleCloseDialog} open={isDialogOpen}>
          <DialogTitle>
            {editItemId !== null ? "Edit User" : "Add User"}
          </DialogTitle>
          <DialogContent dividers>
            <TextField
              label="Name"
              value={newItem.name}
              onChange={this.handleInputChange}
              fullWidth
              margin="normal"
              name="name"
            />
            <TextField
              label="Description"
              value={newItem.description}
              onChange={this.handleInputChange}
              fullWidth
              margin="normal"
              name="description"
            />
            <TextField
              label="Age"
              value={newItem.age}
              onChange={this.handleInputChange}
              fullWidth
              margin="normal"
              name="age"
            />
            <Button
              variant="contained"
              style={{
                marginTop: "15px",
                color: "#fff",
                backgroundColor: "#198754",
                borderColor: "#198754",
              }}
              onClick={this.handleAddItem}
            >
              {editItemId !== null ? "Update" : "Add"}
            </Button>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Container   sx={{
          marginTop:'10px'
        }}>
          <Table style={{ width: "100%", alignItems: "center" , }}>
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
                      color="primary"
                      onClick={() => this.handleEditItem(item.id)}
                      style={{ margin: "5px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => this.handleDeleteItem(item.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Container>
      </div>
    );
  }
}

export default ModelWithFunctionality;
