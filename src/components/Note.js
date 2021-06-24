import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { IconButton } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core'
import { yellow, green, pink, blue } from '@material-ui/core/colors'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles({
    avatar: {
      backgroundColor: (note) => {
        if (note.category === 'work') {
          return yellow[700]
        }
        if (note.category === 'money') {
          return green[500]
        }
        if (note.category === 'todos') {
          return pink[500]
        }
        return blue[500]
      },
    }
  })
  
const Note = ({ note,handleDelete }) => {
    const classes = useStyles(note)
  return (
    <div>
      <Card elevation={5} className={classes.test}>
        <CardHeader
         avatar={
            <Avatar className={classes.avatar}>
              {note.category[0].toUpperCase()}
            </Avatar>}
          action={
            <IconButton aria-label="settings" onClick={()=> handleDelete(note.id)}>
              <DeleteOutline />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
            <Typography variant="body2">{note.details}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Note;
