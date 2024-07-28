import React, { useState } from 'react';

function CreateFile({ collection, folder }) {
    const [filename, setFilename] = useState('');
    const [data, setData] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    const handleCreate = async () => {
        try {
            const jsonData = JSON.parse(data);
            const response = await fetch(`http://localhost:4000/api/collections/${collection}/folders/${folder}/create-file`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filename, data: jsonData }),
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
            setError('Invalid JSON data');
        }
    };

    return (
        <div>
            <h3>Create a new file in {folder}</h3>
            <input
                type="text"
                placeholder="Filename"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="border p-2 rounded mb-2"
            />
            <textarea
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="Enter JSON data"
                rows="4"
                className="border p-2 rounded mb-2 w-full"
            />
            <br />
            <button onClick={handleCreate} className="bg-blue-500 text-white p-2 rounded">Create File</button>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default CreateFile;
