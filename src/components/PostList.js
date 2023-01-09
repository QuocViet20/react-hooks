import React from "react";

const PostList=({postList})=>{
    return(<ul className="post-list">
        {postList.map(post=>(
            <li key={post.id}>{post.title}</li>
        ))}
    </ul>);
}
export default PostList