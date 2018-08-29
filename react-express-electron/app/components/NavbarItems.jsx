// This file is shared across the demos.

import React from 'react';
import PropTypes from "prop-types";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import InputIcon from '@material-ui/icons/Input';
import InsChartOutIcon from '@material-ui/icons/InsertChartOutlined';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const styles = theme => ({
  badge: {
    top: 1,
    right: -15,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
      }`
  }
});


export const MailFolderListItems = (
  <div>
  <ListItem component={Link} to="/" button>
    <ListItemIcon>
        <HomeIcon />
    </ListItemIcon>
    <ListItemText primary="Página Principal" />
  </ListItem>
  <ListItem component={Link} to="/analysis" button>
    <ListItemIcon>
      <InputIcon />
    </ListItemIcon>
    <ListItemText primary="Ingresar Datos" />
  </ListItem>
  <ListItem component={Link} to="/results" button>
    <ListItemIcon>
      <InsChartOutIcon />
    </ListItemIcon>
    <ListItemText primary="Resultados" />
  </ListItem>
</div>
);

export const otherMailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      <ListItemText primary="Saber Más" />
    </ListItem>
  </div>
);
