import React, {
    useState,
    useEffect
} from 'react'
import CreatePost from './CreatePost'
import PostCard from './PostCard';

export default function Show() {
    const [user, setUser] = useState(0);
    const [post, setPost] = useState(false);
    useEffect(() => {
        fetch('/api/posts').then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonRes => console.log(jsonRes[0].author));
    });

    const handleClick = (e) => {
        e.preventDefault();
        setUser({ user: user + 1 });
        console.log(user);
        setPost({ post: !post });
    }
    return (
      <div className="container">
            <button onClick={handleClick} className='btn' style={{ backgroundColor: 'whitesmoke' }}>Add Post</button>
            {post ? <CreatePost /> : <p></p>}
            <PostCard />
      </div>
    );
}

