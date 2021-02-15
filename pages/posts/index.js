import React from 'react';
import "../../styles/Employees.module.css";
import axios from 'axios';
import Link from "next/link";
import { BASE_URL } from '../services';

export default function Posts({posts}) {
    return (
        <div className="container">
            {
                posts.map((post) => {
                    return(
                        <div key={post.id.toString()}>
                          <Link href={`/posts/${post.id}`}><a><h4>{post.title}</h4></a></Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

export async function getStaticProps() {

    const res = await axios.get(BASE_URL);
    const posts = await res.data;

    return {
      props: {posts : posts },
    }
  }

