

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function CreateFileModal({ onClose, onCreateFile }) {
    const generatedId = uuidv4();
    const initialJsonData = JSON.stringify({ id: generatedId }, null, 2);
    const [jsonData, setJsonData] = useState(initialJsonData);
    const [jsonError, setJsonError] = useState(null);

    const handleCreateFile = async () => {
        try {
            const dataToSend = JSON.parse(jsonData);

            await onCreateFile(generatedId, dataToSend);
            onClose();
            window.location.reload(); 
        } catch (error) {
            console.error('Error creating file:', error);
            setJsonError('Invalid JSON format'); // Set JSON error message
        }
    };

    const handleJsonChange = (e) => {
        const value = e.target.value;
        try {
            const parsedData = JSON.parse(value);
            // Preserve the generated id
            if (parsedData.id === generatedId) {
                setJsonData(value);
                setJsonError(null);
            } else {
                setJsonError('The "id" field cannot be changed.');
            }
        } catch (error) {
            setJsonData(value);
            setJsonError('Invalid JSON format');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg z-50">
                <h2 className="text-xl mb-4">Create New JSON Object</h2>
                <div className="mb-2">
                    <label className="block">JSON Data (optional)</label>
                    <textarea
                        value={jsonData}
                        onChange={handleJsonChange}
                        placeholder="Enter JSON data"
                        rows="4"
                        className="border p-2 rounded w-full"
                    />
                    {jsonError && <div className="text-red-500 mt-2">{jsonError}</div>}
                </div>
                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={handleCreateFile} className="px-4 py-2 bg-blue-500 text-white rounded">Create</button>
                </div>
            </div>
        </div>
    );
}

export default CreateFileModal;






