import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Link from 'next/link';
import { useRouter } from 'next/router'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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

export default function Post({ post }) {
  const classes = useStyles();
  const router = useRouter();
  const handleDelete = () => {
    console.log("CALLING")
    axios({
      method: 'DELETE',
      url: `https://jsonplaceholder.typicode.com/posts/${post.id}`,
    })
    .then(function (response) {
      console.log("ES...:", response)
      if (response.status == 200) {
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
          {post.id.toString()} : {post.title}
        </Typography>

        <br></br>
        <br></br>

        <Typography variant="body2" component="p">
          {post.body}
        </Typography>

        <br></br>
        <br></br>

        <CardActions>
          <Link href={`/posts/edit/${post.id}`}>
            <a><Button variant="contained" color="primary">Edit</Button></a>
          </Link>

          <Button variant="contained" color="Secondary" onClick={handleDelete}>Delete</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export async function getStaticPaths() {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
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

  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const post = res.data;

  return {
    props: { post: post },
  };
}
