import {FETCH_ALL,CREATE,UPDATE,LIKE,DELETE} from './../constants/actionTypes'
 
 const posts = (posts = [], action) => {
  switch (action.type) {
    case DELETE:
      return posts.filter((post)=>post._id!==action.payload)
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      // console.log("create-reducer");
      return [...posts, action.payload];
    case UPDATE:
    case LIKE:
      return posts.map((post)=>post._id===action.payload._id?action.payload:post)
    default:
      return posts;
  }
};
export default posts;
