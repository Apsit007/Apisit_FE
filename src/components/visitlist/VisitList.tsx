import React, { useEffect, useState } from 'react'

interface Props {
    VisitorId: string;
}
function VisitList({ VisitorId }: Props) {
    const [error, setError] = useState('');
    const [postInfo, setpostInfo] = useState<Post>({
        visitor: VisitorId,
        postContent: ''
    });
    const configValue: string = (import.meta.env.VITE_API_URL as string);
    const [postLists, setPostList] = useState<PostList[]>([]);
    const fetchPosts = async () => {
        try {
            const posts = await onGetAllPost();
            setPostList(posts);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postInfo),
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setpostInfo(prevState => ({
            ...prevState,
            postContent: e.target.value
        }));
        setError('');
    };

    const handleSubmit = () => {
        if (!postInfo.postContent.trim()) {
            setError('Please enter something before posting.');
            return;
        }
        // Handle form submission
        fetch(configValue + 'posts/SavePost', requestOptions)
            .then(response => response.json())
            .then(() => {
                fetchPosts();
            })
            .catch(error => {
                console.error('Error:', error);
            });

        // Clear the input field
        setpostInfo(_ => ({
            ..._,
            postContent: ''
        }));
    };
    return (
        <>
            <div className='p-5 mt-5'>
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">VisitorName</th>
                            <th scope="col">Organization</th>
                            <th scope="col">Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postLists.map((postList, index) => (
                            <tr key={postList._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{postList.visitor.VisitorName}</td>
                                <td>{postList.visitor.OrganizationName}</td>
                                <td>{postList.postContent}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            {/* <div className="d-flex justify-content-center text-center "> */}

            <div className="input-group d-flex justify-content-center flex-sm-nowrap flex-wrap p-5 ">
                <input
                    type="text"
                    className={`form-control rounded-3 ${error ? 'is-invalid' : ''}`}
                    placeholder="Say Something :)"
                    value={postInfo.postContent}
                    onChange={handleInputChange}
                />
                <button className="btn btn-outline-secondary w-25" type="button" onClick={handleSubmit}>Post</button>

                {error && <div className="invalid-feedback">{error}</div>}
            </div>
            {/* </div> */}
        </>
    )
}

async function onGetAllPost(): Promise<PostList[]> {
    try {
        const configValue: string = (import.meta.env.VITE_API_URL as string);
        const response = await fetch(configValue + 'posts/GetAllPost', {
            method: 'GET',
            // headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData: PostList[] = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export default VisitList
interface Post {
    visitor: string;
    postContent: string;
}

interface PostList {
    _id: string;
    visitor: {
        _id: string;
        VisitorName: string;
        OrganizationName: string;
    };
    postContent: string;
    created_date: string;
    update_date: string;
}