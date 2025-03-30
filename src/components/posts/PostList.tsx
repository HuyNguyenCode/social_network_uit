import { useEffect, useState } from "react";

interface PostListProps {
  username: string;
  filter: 'all' | 'upvoted' | 'downvoted';
}

export default function PostList({ username, filter }: PostListProps) {
  // Logic chung để lấy và hiển thị posts
  const mockPosts = [
    {
      p_id: '1',
      title: 'First Post',
      content: 'This is a mock post content',
      created_at: '2024-01-20T10:00:00Z',
      author: username,
      upvotes: 10,
      downvotes: 2
    },
    {
      p_id: '2', 
      title: 'Second Post',
      content: 'Another mock post content',
      created_at: '2024-01-21T11:00:00Z',
      author: username,
      upvotes: 5,
      downvotes: 1
    }
  ];

  const [posts, setPosts] = useState(mockPosts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);  

  // Simulate filter changes
  useEffect(() => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      if (filter === 'upvoted') {
        setPosts(mockPosts.filter(post => post.upvotes > post.downvotes));
      } else if (filter === 'downvoted') {
        setPosts(mockPosts.filter(post => post.downvotes > post.upvotes));
      } else {
        setPosts(mockPosts);
      }
      setLoading(false);
    }, 500);
  }, [filter]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!username) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <div className="">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.p_id} className="w-full px-2 py-4 border-b">
              <div>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <div className="text-sm text-gray-500">
                  <span>Upvotes: {post.upvotes}</span>
                  <span className="ml-4">Downvotes: {post.downvotes}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No posts found.</div>
        )}
      </div>
    </div>
  );
} 