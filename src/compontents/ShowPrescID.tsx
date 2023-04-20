import React, { useState } from 'react';
import { GetPrescID, CreatePrescInput } from '../data/api';
import {Button} from "react-bootstrap";

export function ShowPrescID() {
    const [preId, setPostId] = useState<number>(1);
    const [post, setPost] = useState<CreatePrescInput | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fetchedPost = await GetPrescID(preId.toString());

        setPost(fetchedPost);
    };

    return (
        <>
            <h2 className="mt-auto d-flex flex-column align-items-center justify-content-center">Get By ID</h2>
    <form className="mt-auto d-flex flex-column align-items-center justify-content-center" onSubmit={handleSubmit}>
        <div>
            <label className="mt-auto d-flex flex-column align-items-center justify-content-center">Prescription ID:</label>
    <input className="mt-auto d-flex flex-column align-items-center justify-content-center"
    type="text"
    value={preId}
    onChange={(event) => setPostId(parseInt(event.target.value))}
    />
    </div>
    <Button  variant="secondary" type="submit">Get prescription</Button>
    </form>
    {post && (
        <>
            <h3>{post.drugs}</h3>
        <p>{post.expiration}</p>
        </>
    )}
    </>
);
}