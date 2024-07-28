import React, { useState } from 'react';

function CreateFolderModal({ onClose, onCreate }) {
    const [folderName, setFolderName] = useState('');

    const handleCreate = () => {
        onCreate(folderName);
        setFolderName('');
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <span className="absolute top-0 right-0 p-2 cursor-pointer" onClick={onClose}>&times;</span>
                <h2 className="text-lg font-semibold mb-4">Create Collection</h2>
                <input
                    type="text"
                    placeholder="Collection Name"
                    className="border border-gray-300 px-3 py-2 w-full rounded"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                />
                <div className="flex justify-end mt-4 space-x-2">
                    <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                    <button onClick={handleCreate} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create</button>
                </div>
            </div>
        </div>
    );
}

export default CreateFolderModal;
