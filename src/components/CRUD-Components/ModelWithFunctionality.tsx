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
import {
  Box,
  Container,
  DialogContentText,
  TablePagination,
} from "@mui/material";
import CloseIcon from "@material-ui/icons/Close";
import { CSVLink } from "react-csv";
import GetAppIcon from "@material-ui/icons/GetApp";

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
  deleteItemId: number | null;
  isDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  deleteItemName: string | null;
  page: any;
  rowsPerPage: any;
}

class ModelWithFunctionality extends Component<{}, ItemCRUDState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      items: [],
      newItem: { id: 0, name: "", description: "", age: 0 },
      editItemId: null,
      deleteItemId: null,
      isDialogOpen: false,
      isDeleteDialogOpen: false,
      deleteItemName: "",
      page: 0,
      rowsPerPage: 5,
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
    const itemToDelete = this.state.items.find((item) => item.id === id);

    if (itemToDelete) {
      this.setState({
        isDialogOpen: false,
        isDeleteDialogOpen: true,
        deleteItemId: id,
        deleteItemName: itemToDelete.name,
      });
    }
  };

  handleDialogAction = () => {
    const { deleteItemId, items } = this.state;

    const updatedItems = items.filter((item) => item.id !== deleteItemId);

    this.setState(
      {
        items: updatedItems,
        deleteItemId: null,
        isDeleteDialogOpen: false,
      },
      () => this.setItemToLocalStorage(updatedItems)
    );
  };

  handleDialogClose = () => {
    this.setState({
      deleteItemId: null,
      isDeleteDialogOpen: false,
    });
  };

  handleChangePage = (event: any, newPage: any) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event: any) => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 5),
      page: 0,
    });
  };

  handleCloseDialog = () => {
    this.setState({
      newItem: { id: 0, name: "", description: "", age: 0 },
      editItemId: null,
      isDialogOpen: false,
    });
  };

  render() {
    const {
      newItem,
      items,
      isDialogOpen,
      editItemId,
      isDeleteDialogOpen,
      page,
      rowsPerPage,
    } = this.state;

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);

    // Create columns for CSVLink
    const columns = [
      { headerName: "Name", field: "name" },
      { headerName: "Description", field: "description" },
      { headerName: "Age", field: "age" },
    ];

    const paginatedData = items.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    return (
      <div style={{ textAlign: "center" }}>
        <h2>Employee Management System</h2>
        <Box
          sx={{
            height: "2px",
            backgroundColor: "red",
            width: "100%",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            marginTop: "30px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
             
              display: "flex",
              marginLeft: "30px",
            }}
            variant="outlined"
            color="primary"
            onClick={() => this.setState({ isDialogOpen: true })}
          >
            Add User
          </Button>
          <CSVLink
            style={{
              display: "flex",
              textDecoration:'none',
              marginRight: "30px",
            }}
            data={paginatedData} // Use paginatedData instead of items
            headers={columns.map((col) => ({
              label: col.headerName,
              key: col.field,
            }))}
            filename={`table_data_page_${page + 1}.csv`}
          >
            <GetAppIcon /> EXPORT
          </CSVLink>
         
        </Box>
         
        <Dialog onClose={this.handleCloseDialog} open={isDialogOpen}>
          <DialogTitle>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {editItemId !== null ? "Edit User" : "Add User"}
              <Box
                sx={{
                  cursor: "pointer",
                }}
                autoFocus
                onClick={this.handleCloseDialog}
              >
                <CloseIcon />
              </Box>
            </Box>
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

        <Dialog onClose={this.handleDialogClose} open={isDeleteDialogOpen}>
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Alert
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this item ?
              <Box
                sx={{
                  color: "red",
                }}
              >
                {`[ ${this.state.deleteItemName} ]`}
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              margin: "10px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleDialogClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={this.handleDialogAction}
              color="secondary"
              sx={{
                backgroundColor: "red",
                color: "white",
                "&:hover": {
                  backgroundColor: "#c11d1d", // Change this to the color you want on hover
                },
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Container
          sx={{
            marginTop: "10px",
          }}
        >
          <Table style={{ width: "100%", alignItems: "center" }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Age</TableCell>
                <TableCell
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? items.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : items
              ).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "5px",
                    }}
                  >
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
                      style={{ margin: "5px" }}
                      color="secondary"
                      onClick={() => this.handleDeleteItem(item.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 23 * emptyRows }}>
                  <TableCell colSpan={4} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Container>

        <TablePagination
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          component="div"
          count={items.length}
          page={page}
          onPageChange={this.handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

export default ModelWithFunctionality;
