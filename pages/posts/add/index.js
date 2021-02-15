import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { TextField, TextareaAutosize } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router'
import { BASE_URL } from '../../services/index';


const useStyles = makeStyles({
  root: {
    minWidth: 200,
    margin: 15,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function AddPost() {
  const classes = useStyles();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleTitle = (e) => {
    e.preventDefault();
    console.log("LOG...:" , e.target.value)
    setTitle(e.target.value);
  };

  const handleBody = (e) => {
    e.preventDefault();
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("CALLING")
    e.preventDefault();
    
    axios({
      method: 'POST',
      url: BASE_URL,
      data: {
        "title": title,
        "body": body
      },
      headers:{
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then(function (response) {
      console.log("ES...:", response)
      if (response.status == 201) {
        router.push('/posts')
      }
    })
    .catch(function (error) {
      console.log(error);
  });

  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h4" component="h2">
          Add Post
        </Typography>

        <br></br>

        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="title"
            label="Title"
            value={title}
            variant="outlined"
            color="primary"
            onChange={handleTitle}
            style={{ width: "100%" }}
          />

          <br></br>
          <br></br>

          <TextareaAutosize
            rowsMax={4}
            aria-label="maximum height"
            placeholder="Maximum 4 rows"
            value={body}
            onChange={handleBody}
            style={{ width: "100%" }}
          />
        </form>
        <CardActions>
          <Button style={{ width: "70%" , alignSelf: 'center' }} onClick={handleSubmit} type="submit" variant="contained" color="primary">Add</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}


