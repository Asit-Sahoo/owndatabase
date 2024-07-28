import React, { useState } from 'react';

function CreateFolder() {
    const [foldername, setFoldername] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    const handleCreate = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/folders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ foldername }),
            });
            const result = await response.json();
            if (response.ok) {
                setMessage(result.message);
                setError(null);
            } else {
                setError(result.error);
                setMessage('');
            }
        } catch (error) {
            setError('Error creating folder');
        }
    };

    return (
        <div>
            <h2>Create a new Collection</h2>
            <input
                type="text"
                placeholder="Folder name"
                value={foldername}
                onChange={(e) => setFoldername(e.target.value)}
            />
            <br />
            <button onClick={handleCreate}>Create Collection</button>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default CreateFolder;
