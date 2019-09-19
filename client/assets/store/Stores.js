import React, { Component } from "react";
import PropTypes from "prop-types";
import { list } from "./store-api";
import { Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import List, { ListItem, ListItemAvatar } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 3
  }),
  title: {
    margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 2}px`,
    color: theme.palette.protectedTitle,
    textAlign: "center",
    fontSize: "1.2em"
  },
  avatar:{
    width: 100,
    height: 100
  },
  subheading: {
    color: theme.palette.text.secondary
  },
  storeTitle: {
    fontSize: "1.2em",
    marginBottom: "5px"
  },
  details: {
    padding: "24px"
  }
})
class Stores extends Component {
  state = {
      stores:[]
  }
  loadStores = () => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({stores: data})
      }
    })
  }
  componentDidMount = () => {
    this.loadStores()
  }
  render() {
    const {classes} = this.props
    return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          All Stores
        </Typography>
        <List dense>
          {this.state.stores.map((store, i) => {
            return <Link to={"/stores/"+store._id} key={i}>
              <Divider/>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}  src={"/api/stores/logo/"+store._id+"?" + new Date().getTime()}/>
                </ListItemAvatar>
                <div className={classes.details}>
                  <Typography type="headline" component="h2" color="primary" className={classes.storeTitle}>
                    {store.name}
                  </Typography>
                  <Typography type="subheading" component="h4" className={classes.subheading}>
                    {store.description}
                  </Typography>
                </div>
              </ListItem>
              <Divider/>
            </Link>})}
        </List>
      </Paper>
    </div>)
  }
}
Stores.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Stores);
