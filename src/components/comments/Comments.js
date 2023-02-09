import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getComments } from '../../API/firebase-api';
import useHttp from '../../Hooks/use-http';
import Loader from '../UI/Loader';


import styles from './Comments.module.css';
import CommentsList from './CommentsList';
import NewCommentForm from './NewCommentForm';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams()
  const {sendHttpRequest,status,data: comments} = useHttp(getComments,true)

  useEffect(()=>{
    sendHttpRequest(params.commentId)  
    },[sendHttpRequest,params.commentId])


  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const closeCommentForm = useCallback(() => {
    setIsAddingComment(false);    
    sendHttpRequest(params.commentId)
  },[sendHttpRequest,params.commentId])
  let commentsList;

  if (status === 'pending') {
    commentsList = (
      <div className='centered'>
        <Loader />
      </div>
    );
  }

  if (status === 'completed' && comments && comments.length > 0) {
    commentsList = <CommentsList comments={comments} />;
  }

  if (
    status === 'completed' &&
    (!comments || comments.length === 0)
  ) {
    commentsList = <p className='centered'>This joke doesn't have comments yet</p>;
  }

  return (
    <section className={styles.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onCommentAdded={closeCommentForm} jokeId={params.commentId}/>}
      <p>Comments...</p>
    {commentsList}
    </section>
  );
};

export default Comments;
