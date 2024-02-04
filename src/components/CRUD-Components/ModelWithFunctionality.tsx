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
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridCellParams } from '@mui/x-data-grid';
import { Box, Container, DialogContentText, TablePagination } from "@mui/material";
import CloseIcon from "@material-ui/icons/Close";

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
  page: number;
  rowsPerPage: number;
}

class CustomToolbar extends Component {
  render() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
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
    this.loadItemsFromLocalStorage();
  }

  loadItemsFromLocalStorage() {
    const storedItems = localStorage.getItem("items");
    const items = storedItems ? JSON.parse(storedItems) : [];
    this.setState({ items });
  }

  setItemsToLocalStorage(items: Item[]): void {
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

    if (!this.isValidItem(newItem)) {
      alert("Please enter valid data.");
      return;
    }

    const updatedItems = editItemId
      ? items.map((item) => (item.id === editItemId ? { ...newItem, id: editItemId } : item))
      : [...items, { ...newItem, id: Date.now() }];

    this.setState(
      {
        items: updatedItems,
        newItem: { id: 0, name: "", description: "", age: 0 },
        editItemId: null,
        isDialogOpen: false,
      },
      () => this.setItemsToLocalStorage(updatedItems)
    );
  };

  isValidItem(item: Item): boolean {
    return item.name.trim() !== "" && item.description.trim() !== "" && item.age > 0;
  }

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
      () => this.setItemsToLocalStorage(updatedItems)
    );
  };

  handleDialogClose = () => {
    this.setState({
      deleteItemId: null,
      isDeleteDialogOpen: false,
    });
  };

  handleChangePage = (event: any, newPage: number) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
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

  getDataGridConfig() {
    return {
      columns: [
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 1 },
        { field: 'age', headerName: 'Age', flex: 1 },
        {
          field: 'actions',
          headerName: 'Actions',
          flex: 1,
          renderCell: (params: GridCellParams) => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '5px',
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => this.handleEditItem(params.id as number)}
                style={{ margin: '5px' }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                style={{ margin: '5px' }}
                color="secondary"
                onClick={() => this.handleDeleteItem(params.id as number)}
              >
                Delete
              </Button>
            </Box>
          ),
        },
      ],
      rows: this.state.items.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        age: item.age,
      })),
    };
  }

  render() {
    const { isDialogOpen, editItemId, isDeleteDialogOpen, page, rowsPerPage } = this.state;
    const { columns, rows } = this.getDataGridConfig();

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <div style={{ textAlign: 'center' }}>
        <h2>Employee Management System</h2>
        <Box
          sx={{
            height: "2px",
            backgroundColor: "red",
            width: "100%",
          }}
        ></Box>
        <Button
          sx={{
            marginTop: "30px",
            display: "flex",
            marginLeft: "30px",
          }}
          variant="outlined"
          color="primary"
          onClick={() => this.setState({ isDialogOpen: true })}
        >
          Add User
        </Button>

        <DataGrid
          columns={columns}
          rows={rows}
          components={{
            Toolbar: CustomToolbar,
          }}
        />

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
              value={this.state.newItem.name}
              onChange={this.handleInputChange}
              fullWidth
              margin="normal"
              name="name"
            />
            <TextField
              label="Description"
              value={this.state.newItem.description}
              onChange={this.handleInputChange}
              fullWidth
              margin="normal"
              name="description"
            />
            <TextField
              label="Age"
              value={this.state.newItem.age}
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
              Are you sure you want to delete this item?
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
                  backgroundColor: "#c11d1d",
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
                ? this.state.items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : this.state.items
              ).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      padding: '5px'
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
            display: 'flex',
            justifyContent: 'center',
          }}
          component="div"
          count={this.state.items.length}
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
