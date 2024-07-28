import React, { useState } from 'react';

function CreateCollectionModal({ onClose, onCreate }) {
    const [collectionName, setCollectionName] = useState('');

    const handleCreate = async () => {
        await onCreate(collectionName);
        onClose();
        window.location.reload(); // Reload the page after successful creation
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-xl mb-4">Create New Database</h2>
                <div className="mb-2">
                    <label className="block">Database Name</label>
                    <input
                        type="text"
                        value={collectionName}
                        onChange={(e) => setCollectionName(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={handleCreate} className="px-4 py-2 bg-blue-500 text-white rounded">Create</button>
                </div>
            </div>
        </div>
    );
}

export default CreateCollectionModal;
