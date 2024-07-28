// import React, { useState, useEffect } from 'react';
// import CodeMirror from '@uiw/react-codemirror';
// import { json } from '@codemirror/lang-json';

// function ViewFiles({ collection, folder }) {
//     const [files, setFiles] = useState([]);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [fileContent, setFileContent] = useState('');
//     const [originalId, setOriginalId] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [jsonError, setJsonError] = useState(null);
//     const [editableContent, setEditableContent] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [unsavedChanges, setUnsavedChanges] = useState(false);

//     useEffect(() => {
//         const fetchFiles = async () => {
//             try {
//                 const response = await fetch(`http://localhost:4000/api/collections/${collection}/folders/${folder}/files`);
//                 const data = await response.json();
//                 setFiles(data);
//             } catch (error) {
//                 console.error('Error fetching files:', error);
//             }
//         };
//         fetchFiles();
//     }, [collection, folder]);

//     const handleFileSelect = async (filename) => {
//         try {
//             const response = await fetch(`http://localhost:4000/api/collections/${collection}/folders/${folder}/files/${filename}`);
//             const data = await response.json();
//             setFileContent(JSON.stringify(data, null, 2));
//             setOriginalId(data.id);

//             const { id, ...rest } = data;
//             setEditableContent(JSON.stringify(rest, null, 2));
            
//             setSelectedFile(filename);
//             setIsEditing(true);
//             setJsonError(null);
//             setIsModalOpen(true);
//             setUnsavedChanges(false);
//         } catch (error) {
//             console.error('Error fetching file content:', error);
//         }
//     };

//     const handleSave = async () => {
//         try {
//             const parsedContent = JSON.parse(editableContent);
//             parsedContent.id = originalId;

//             await fetch(`http://localhost:4000/api/collections/${collection}/folders/${folder}/files/${selectedFile}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(parsedContent, null, 2),
//             });
//             setIsEditing(false);
//             setIsModalOpen(false);
//             alert('File content updated successfully');
//         } catch (error) {
//             if (error instanceof SyntaxError) {
//                 setJsonError('Invalid JSON format');
//             } else {
//                 console.error('Error saving file content:', error);
//             }
//         }
//     };

//     const handleDelete = async () => {
//         try {
//             const confirmDelete = window.confirm('Are you sure you want to delete this file?');
//             if (confirmDelete) {
//                 await fetch(`http://localhost:4000/api/collections/${collection}/folders/${folder}/files/${selectedFile}`, {
//                     method: 'DELETE',
//                 });
//                 setFiles(files.filter(file => file !== selectedFile));
//                 setSelectedFile(null);
//                 setFileContent('');
//                 setIsEditing(false);
//                 setIsModalOpen(false);
//                 alert('File deleted successfully');
//             }
//         } catch (error) {
//             console.error('Error deleting file:', error);
//         }
//     };

//     const handleContentChange = (value) => {
//         setEditableContent(value);
//         setUnsavedChanges(true);
//         try {
//             JSON.parse(value);
//             setJsonError(null);
//         } catch (error) {
//             setJsonError('Invalid JSON format');
//         }
//     };

//     const handleCloseModal = () => {
//         if (unsavedChanges) {
//             const confirmSave = window.confirm('You have unsaved changes. Do you want to save before closing?');
//             if (confirmSave) {
//                 handleSave();
//             }
//         } else {
//             setIsModalOpen(false);
//         }
//     };

//     return (
//         <>
//             {isModalOpen && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                     <div className="bg-white p-4 rounded-lg shadow-lg w-2/3">
//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-xl">Edit File: {selectedFile}</h2>
//                             <button onClick={handleCloseModal} className="text-gray-500">&times;</button>
//                         </div>
//                         <div className="bg-gray-100 p-4 rounded-lg w-full">
//                             <div className="mb-2">
//                                 <span className="font-bold">id:</span> <span>{originalId}</span>
//                             </div>
//                             <CodeMirror
//                                 value={editableContent}
//                                 height="200px"
//                                 extensions={[json()]}
//                                 onChange={(value, viewUpdate) => handleContentChange(value)}
//                                 className="bg-gray-100 p-4 rounded-lg w-full"
//                             />
//                             {jsonError && <div className="text-red-500 mt-2">{jsonError}</div>}
//                         </div>
//                         <div className="flex justify-end space-x-2 mt-2">
//                             <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
//                             <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             <div className='mt-4'>
//                 <h3 className='font-bold'>{collection} &gt; {folder}</h3>
//                 <div className='grid grid-cols-1 gap-4'>
//                     {files.map((file) => (
//                         <div key={file} onClick={() => handleFileSelect(file)} className="cursor-pointer p-2 border rounded-lg">
//                             {file}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default ViewFiles;






import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

function ViewFiles({ database, collection, folder }) {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileContent, setFileContent] = useState('');
    const [originalId, setOriginalId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [jsonError, setJsonError] = useState(null);
    const [editableContent, setEditableContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState(false);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/collections/${collection}/folders/${folder}/files`);
                const data = await response.json();
                console.log('Fetched files:', data); // Debug log
                setFiles(data);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };
        fetchFiles();
    }, [collection, folder]);

    const handleFileSelect = async (filename) => {
        try {
            const response = await fetch(`http://localhost:4000/api/collections/${collection}/folders/${folder}/files/${filename}`);
            const data = await response.json();
            setFileContent(JSON.stringify(data, null, 2));
            setOriginalId(data.id);

            const { id, ...rest } = data;
            setEditableContent(JSON.stringify(rest, null, 2));
            
            setSelectedFile(filename);
            setIsEditing(true);
            setJsonError(null);
            setIsModalOpen(true);
            setUnsavedChanges(false);
        } catch (error) {
            console.error('Error fetching file content:', error);
        }
    };

    const handleSave = async () => {
        try {
            const parsedContent = JSON.parse(editableContent);
            parsedContent.id = originalId;

            await fetch(`http://localhost:4000/api/collections/${collection}/folders/${folder}/files/${selectedFile}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsedContent, null, 2),
            });
            setIsEditing(false);
            setIsModalOpen(false);
            alert('File content updated successfully');
        } catch (error) {
            if (error instanceof SyntaxError) {
                setJsonError('Invalid JSON format');
            } else {
                console.error('Error saving file content:', error);
            }
        }
    };

    const handleDelete = async () => {
        try {
            const confirmDelete = window.confirm('Are you sure you want to delete this file?');
            if (confirmDelete) {
                await fetch(`http://localhost:4000/api/collections/${collection}/folders/${folder}/files/${selectedFile}`, {
                    method: 'DELETE',
                });
                setFiles(files.filter(file => file !== selectedFile));
                setSelectedFile(null);
                setFileContent('');
                setIsEditing(false);
                setIsModalOpen(false);
                alert('File deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    const handleContentChange = (value) => {
        setEditableContent(value);
        setUnsavedChanges(true);
        try {
            JSON.parse(value);
            setJsonError(null);
        } catch (error) {
            setJsonError('Invalid JSON format');
        }
    };

    const handleCloseModal = () => {
        if (unsavedChanges) {
            const confirmSave = window.confirm('You have unsaved changes. Do you want to save before closing?');
            if (confirmSave) {
                handleSave();
            }
        } else {
            setIsModalOpen(false);
        }
    };

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-2/3">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl">Edit File: {selectedFile}</h2>
                            <button onClick={handleCloseModal} className="text-gray-500">&times;</button>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg w-full">
                            <div className="mb-2">
                                <span className="font-bold">id:</span> <span>{originalId}</span>
                            </div>
                            <CodeMirror
                                value={editableContent}
                                height="200px"
                                extensions={[json()]}
                                onChange={(value, viewUpdate) => handleContentChange(value)}
                                className="bg-gray-100 p-4 rounded-lg w-full"
                            />
                            {jsonError && <div className="text-red-500 mt-2">{jsonError}</div>}
                        </div>
                        <div className="flex justify-end space-x-2 mt-2">
                            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                        </div>
                    </div>
                </div>
            )}
            <div className='mt-4'>
                <h3 className='font-bold'>{database} &gt; {collection} &gt; {folder}</h3>
                <div className='grid grid-cols-1 gap-4'>
                    {files.map((file) => (
                        <div key={file} onClick={() => handleFileSelect(file)} className="cursor-pointer p-2 border rounded-lg">
                            {file}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ViewFiles;


