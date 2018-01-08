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
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText primary="Overview" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
  </div>
);

export const otherMailFolderListItems = (
  <div>
  <ListItem button>
    <ListItemIcon>
      <AccountBoxIcon />
    </ListItemIcon>
    <ListItemText primary="User Details" />
  </ListItem>
  <ListItem button>
    <ListItemIcon>
      <VideoCallIcon />
    </ListItemIcon>
    <ListItemText primary="Conference Details" />
  </ListItem>
  </div>
);
