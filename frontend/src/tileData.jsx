// This file is shared across the demos.

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


export const mailFolderListItems = (
  <div>
      <ListItem component={Link} to="/" button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Index" />
      </ListItem>

    <ListItem component={Link} to="/analysis" button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Analizar datos" />
    </ListItem>

    <ListItem component={Link} to="/results" button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="Resultados" />
    </ListItem>
  </div>
);