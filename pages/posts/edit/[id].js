import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { TextField, TextareaAutosize } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import { BASE_URL } from "../../services";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 20,
    alignItems: 'center', justifyContent: 'center'
  },
  heading:{
    marginBottom: 40
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
  actions:{
    justifyContent: "center"
  }
});

export default function EditPost({ post }) {
  const classes = useStyles();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    setTitle(post.title);
    setBody(post.body);
  }, []);

  const handleTitle = (e) => {
    e.preventDefault();
    console.log("LOG...:", e.target.value);
    setTitle(e.target.value);
  };

  const handleBody = (e) => {
    e.preventDefault();
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("CALLING");
    e.preventDefault();

    axios({
      method: "PUT",
      url: BASE_URL + `/${post.id}`,
      data: {
        title: title,
        body: body,
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        console.log("ES...:", response);
        if (response.status == 200) {
          router.push("/posts");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.heading} variant="h4" component="h4">
          Edit Post
        </Typography>

        <form noValidate autoComplete="off">
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
            rowsMin={4}
            aria-label="maximum height"
            placeholder="Maximum 4 rows"
            value={body}
            onChange={handleBody}
            style={{ width: "100%" }}
          />
        </form>
        <CardActions className={classes.actions} >
          <Button
            style={{ width: "70%" }}
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
          >
            Edit
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export async function getStaticPaths() {
  const res = await axios.get(BASE_URL);
  const posts = res.data;

  const paths = posts.map((post) => {
    return {
      params: { id: post.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;

  const res = await axios.get(BASE_URL + `/${id}`);
  const post = res.data;

  return {
    props: { post: post },
  };
}
