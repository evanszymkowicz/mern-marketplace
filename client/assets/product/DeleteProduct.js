import React, { Component } from "react";
import PropTypes from "prop-types";
import auth from "./../auth/auth-helper";
import { remove } from "./product-api";
import  IconButton, Button, Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from "material-ui";
import DeleteIcon from "material-ui-icons";

class DeleteProduct extends Component {
  state = {
    open: false
  }
  clickButton = () => {
    this.setState({open: true})
  }
  deleteProduct = () => {
    const jwt = auth.isAuthenticated()
    remove({
      storeId: this.props.storeId,
      productId: this.props.product._id
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({open: false}, () => {
          this.props.onRemove(this.props.product)
        })
      }
    })
  }
  handleRequestClose = () => {
    this.setState({open: false})
  }
  render() {
    return (<span>
      <IconButton aria-label="Delete" onClick={this.clickButton} color="secondary">
        <DeleteIcon/>
      </IconButton>
      <Dialog open={this.state.open} onClose={this.handleRequestClose}>
        <DialogTitle>{"Delete "+this.props.product.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your product {this.props.product.name}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.deleteProduct} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>)
  }
}
DeleteProduct.propTypes = {
  storeId: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
}
export default DeleteProduct;
