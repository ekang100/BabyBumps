import React from 'react';
import styles from './Post.module.css';

const Post = ({ post, replyContent, setReplyContent, handleReplySubmit }) => (
  <div className={styles.postCard}>
    <div className={styles.postHeader}>
      <h3 className={styles.postUser}>{post.user}</h3>
      <p className={styles.postContent}>{post.content}</p>
    </div>
    <div className={styles.replySection}>
      {post.replies.map((reply, index) => (
        <div key={index} className={styles.replyCard}>
          <h4 className={styles.replyUser}>{reply.user}</h4>
          <p className={styles.replyContent}>{reply.content}</p>
        </div>
      ))}
      <textarea
        value={replyContent}
        onChange={(e) => setReplyContent((prev) => ({ ...prev, [post.id]: e.target.value }))}
        placeholder="Write a reply..."
        className={styles.replyInput}
      />
      <button onClick={() => handleReplySubmit(post.id)} className={styles.replyButton}>Reply</button>
    </div>
  </div>
);

export default Post; 