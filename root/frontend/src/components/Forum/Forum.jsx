import React, {
    useState,
    useEffect
} from 'react'
import CreatePost from './CreatePost'
export default function Show() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch('/api/posts').then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonRes => setUser(jsonRes[0].author));
    });
    return (
      <div className="container">
        <h1>{ user }</h1>
        <CreatePost />
      </div>
    );
}

