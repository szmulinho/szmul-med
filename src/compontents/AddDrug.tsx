import { useState, useEffect } from 'react';
import {Button, Container} from 'react-bootstrap';
import { postDrug, Drug } from '../data/api';

export function AddDrug() {
    const [postData, setPostData] = useState<Drug>({
        drugid: '',
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
                    <label>Drug ID:</label>
                    <input
                        type="text"
                        value={postData.drugid || ''}
                        onChange={(event) =>
                            setPostData({...postData, drugid: event.target.value})
                        }
                    />
                </div>
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
                        type="text"
                        value={postData.price || ''}
                        onChange={(event) =>
                            setPostData({...postData, price: event.target.value})
                        }
                    />
                </div>

                <Button variant="secondary" type="submit">Submit</Button>
            </form>
        </Container>
    );
}
