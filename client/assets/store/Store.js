import React, { Component } from "react";
import PropTypes from "prop-types";
import { read } from "./store-api.js";
import Products from "./../product/Products";
import {listByStore} from "./../product/product-api";
import Card, { CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";
import Avatar from "material-ui/Avatar";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    textAlign: "center",
    paddingBottom: theme.spacing.unit * 2
  },
  title: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.protectedTitle,
    fontSize: "1.2em"
  },
  subheading: {
    marginTop: theme.spacing.unit,
    color: theme.palette.openTitle
  },
  bigAvatar: {
    width: 100,
    height: 100,
    margin: "auto"
  },
  productTitle: {
    padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.openTitle,
    width: "100%",
    fontSize: "1.2em"
  }
})

class Store extends Component {
  constructor({match}) {
    super()
    this.state = {
      store: "",
      products:[]
    }
    this.match = match
  }

  loadProducts = () => {
    listByStore({
      storeId: this.match.params.storeId
    }).then((data)=>{
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({products: data})
      }
    })
  }

  componentDidMount = () => {
    this.loadProducts()
    read({
      storeId: this.match.params.storeId
    }).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({store: data})
      }
    })
  }

  render() {
    const logoUrl = this.state.store._id
          ? `/api/stores/logo/${this.state.store._id}?${new Date().getTime()}`
          : "/api/stores/defaultphoto"
    const {classes} = this.props
    return (<div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={4} sm={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography type="headline" component="h2" className={classes.title}>
                {this.state.store.name}
              </Typography>
              <br/>
              <Avatar src={logoUrl} className={classes.bigAvatar}/><br/>
                <Typography type="subheading" component="h2" className={classes.subheading}>
                  {this.state.store.description}
                </Typography><br/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8} sm={8}>
          <Card>
            <Typography type="title" component="h2" className={classes.productTitle}>Products</Typography>
            <Products products={this.state.products} searched={false}/>
          </Card>
        </Grid>
      </Grid>
    </div>)
  }
}

Store.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Store);
