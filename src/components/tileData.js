// This file is shared across the demos.

import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import AssessmentIcon from 'material-ui-icons/Assessment';
import HomeIcon from 'material-ui-icons/Home';
import DashboardIcon from 'material-ui-icons/Dashboard';
import AccountBoxIcon from 'material-ui-icons/AccountBox';
import VideoCallIcon from 'material-ui-icons/VideoCall';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';

export const mailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" href="/" />
    </ListItem>
    <ListItem >
      <ListItemIcon>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText secondary="Overview" />
    </ListItem>
    <ListItem >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText secondary="Dashboard" />
    </ListItem>
  </div>
);

export const otherMailFolderListItems = (
  <div>
  <ListItem >
    <ListItemIcon>
      <AccountBoxIcon />
    </ListItemIcon>
    <ListItemText secondary="User Details" />
  </ListItem>
  <ListItem >
    <ListItemIcon>
      <VideoCallIcon />
    </ListItemIcon>
    <ListItemText secondary="Conference Details" />
  </ListItem>
  </div>
);
