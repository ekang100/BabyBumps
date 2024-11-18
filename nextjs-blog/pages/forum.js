import { useState } from "react";
import Link from "next/link";
import styles from "../styles/Forum.module.css";
import Post from "../components/Post";

export default function Forum() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Sarah",
      content: "Hi everyone! Looking to connect with other intended parents.",
      replies: [],
    },
    {
      id: 2,
      user: "John",
      content: "Hello! We are just starting our journey and would love advice.",
      replies: [],
    },
  ]);
  const [newPost, setNewPost] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [replyContent, setReplyContent] = useState({});

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      setPosts([
        ...posts,
        {
          id: posts.length + 1,
          user: "Anonymous",
          content: newPost.trim(),
          replies: [],
        },
      ]);
      setNewPost("");
    }
  };

  const handleReplySubmit = (postId) => {
    if (replyContent[postId]?.trim()) {
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                replies: [
                  ...post.replies,
                  { user: "Anonymous", content: replyContent[postId] },
                ],
              }
            : post
        )
      );
      setReplyContent({ ...replyContent, [postId]: "" });
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.replies.some((reply) =>
        reply.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className={styles.container}>
      {/* Forum Section */}
      <main className={styles.forumSection}>
        <h1 className={styles.forumTitle}>Community Forum</h1>
        <div className={styles.headerSection}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
            className={styles.searchInput}
          />
        </div>
        <div className={styles.postsContainer}>
          {filteredPosts.map((post) => (
            <Post
              key={post.id}
              post={post}
              replyContent={replyContent[post.id] || ""}
              setReplyContent={setReplyContent}
              handleReplySubmit={handleReplySubmit}
            />
          ))}
        </div>
        <div className={styles.newPostSection}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Write a new post..."
            className={styles.newPostInput}
          />
          <button onClick={handlePostSubmit} className={styles.postButton}>
            Post
          </button>
        </div>
      </main>
    </div>
  );
}
