import { useState, useEffect } from 'react';
import {Button, Container} from 'react-bootstrap';
import { postDrug, Drug } from '../../../data/drugstore';

export function AddDrug() {
    const [postData, setPostData] = useState<Drug>({
        drugid: 0,
        name: '',
        price: '',
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await postDrug(postData);
    };

    return (
        <Container className="mt-auto d-flex flex-column align-items-center justify-content-center">
            <form onSubmit={handleSubmit} className="mt-auto d-flex flex-column align-items-center justify-content-center">
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={postData.name || ''}
                        onChange={(event) =>
                            setPostData({...postData, name: event.target.value})
                        }
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={postData.price || 1}
                        step="0.01"
                        min="0"
                        onChange={(event) =>
                            setPostData({...postData, price: (event.target.value)})
                        }
                    />
                </div>

                <Button variant="secondary" type="submit">Submit</Button>
            </form>
        </Container>
    );
}
