import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { postOpinion, Opinion } from '../../data/feedback';
import { useNavigate } from 'react-router-dom';


export function CustomerSatisfactionFeedback() {
    const [rating, setRating] = useState<number | null>(null);
    const [comment, setComment] = useState<string>('');
    const navigate = useNavigate(); // Moved the hook call here

    const handleSubmit = async () => {
        if (rating === null) {
            alert('Please select a rating before submitting.');
            return;
        }

        const feedback: Opinion = {
            rating: rating as number,
            comment,
        };

        try {
            await postOpinion(feedback);
            // Handle successful feedback submission, if needed
            navigate('/pharmacy'); // Redirect to the specified URL
        } catch (error) {
            // Handle error during feedback submission, if needed
            console.error('Error submitting feedback:', error);
        }
    };


    return (
        <Container className="mt-auto d-flex flex-column align-items-center justify-content-center">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    '& > legend': {
                        mt: 2,
                    },
                }}
            >
                <Typography component="legend">How satisfied are you with our service?</Typography>
                <Rating
                    name="customer-satisfaction"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
            </Box>
            <div className="mt-3">
                <label>Comments:</label>
                <input
                    type="text"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    className="form-control"
                />
            </div>
            <Button variant="secondary" onClick={handleSubmit} className="mt-3">
                Submit Feedback
            </Button>
        </Container>
    );
}
