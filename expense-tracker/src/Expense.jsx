import React from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  Paper,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Expense() {
  const [data, setData] = React.useState({});
  const [expense, setExpense] = React.useState([]);
  const [update, setUpdate] = React.useState(null);

  const handleChange = (e) => {
    setData({
      ...data,
      id: expense.length + 1,
      [e.target.name]: e.target.value,
    });
  };

  const addExpense = () => {
    if (!data.name || !data.cost || !data.select || !data.description) {
      alert("Please fill in all fields");
      return;
    }
    setExpense([...expense, data]);
    setData({});
  };

  const handleDelete = (index) => {
    const newList = [...expense];
    newList.splice(index, 1);
    setExpense(newList);
  };

  const handleEdit = (id) => {
    const toEdit = expense.find((val) => val.id === id);
    setData(toEdit);
    setUpdate(id);
  };

  const finalUpdate = () => {
    const updatedList = expense.map((item) =>
      item.id === update ? { ...item, ...data } : item
    );
    setExpense(updatedList);
    setData({});
    setUpdate(null);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Expense Tracker
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={data.name || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cost"
              name="cost"
              type="number"
              value={data.cost || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              fullWidth
              name="select"
              value={data.select || ""}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="">Select Type</MenuItem>
              <MenuItem value="debit">Debit</MenuItem>
              <MenuItem value="credit">Credit</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Description"
              name="description"
              value={data.description || ""}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                mt: 2,
                flexWrap: "wrap",
              }}
            >
              <Button variant="contained" onClick={addExpense}>
                Add
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={finalUpdate}
                disabled={update === null}
              >
                Update
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {expense.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ p: 2 }}>
            Expense List
          </Typography>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
                <TableCell sx={{ color: "white" }}>Sr no</TableCell>
                <TableCell sx={{ color: "white" }}>Name</TableCell>
                <TableCell sx={{ color: "white" }}>Cost</TableCell>
                <TableCell sx={{ color: "white" }}>Type</TableCell>
                <TableCell sx={{ color: "white" }}>Description</TableCell>
                <TableCell sx={{ color: "white" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expense.map((val, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{val.name}</TableCell>
                  <TableCell>{val.cost}</TableCell>
                  <TableCell>{val.select}</TableCell>
                  <TableCell>{val.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleEdit(val.id)}
                    >
                      <EditTwoToneIcon />
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteForeverIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default Expense;
