import React from 'react'
import makeStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { deletePost,likePost } from "../../../actions/posts";
import { useDispatch } from "react-redux";
import { useState } from "react";
const Post = (props) => {
  const dispatch = useDispatch()
  const classes = makeStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  // console.log('reached here')
  // const [likeCount,setLikeCount] = useState(props.post.likeCount)
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={props.post.selectedFile}
        title={props.post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{props.post.name}</Typography>
        <Typography variant="body2">
          {moment(props.post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
      {(user?.result?.googleId === props.post?.creator || user?.result?._id===props.post?.creator) &&
        <Button style={{ color: "white" }} size="small" onClick={() => props.setCurrentId(props.post._id)}>
          <MoreHorizIcon fontSize="medium" />
        </Button>}
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {props.post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
          {props.post.title}
        </Typography>
      <CardContent>
        <Typography  variant="body2" color="textSecondary" component="p" gutterBottom>
          {props.post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled ={!user?.result}onClick={() => {dispatch(likePost(props.post._id))}}>
          <ThumbUpAltIcon fontSize="small" />
          {!props.post.likes.length?'Like':props.post.likes.length}
          {/* {console.log(likeCount)} */}
          
        </Button>
        {(user?.result?.googleId === props.post?.creator || user?.result?._id===props.post?.creator) &&
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(props.post._id))}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>}
      </CardActions>
    </Card>
  );
};

export default Post;
