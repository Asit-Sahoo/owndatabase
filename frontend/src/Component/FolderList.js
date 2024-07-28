

// import React, { useState, useEffect } from 'react';
// import CreateFileModal from './CreateFileModal'; // Import the CreateFileModal component

// function FolderList({ onCreateFolderClick, onFolderSelect }) {
//     const [collections, setCollections] = useState([]);
//     const [expandedCollection, setExpandedCollection] = useState(null);
//     const [folders, setFolders] = useState([]);
//     const [isFileModalOpen, setIsFileModalOpen] = useState(false);
//     const [selectedCollection, setSelectedCollection] = useState(null);
//     const [selectedFolder, setSelectedFolder] = useState(null);

//     useEffect(() => {
//         const fetchCollections = async () => {
//             try {
//                 const response = await fetch('http://localhost:4000/api/collections');
//                 const data = await response.json();
//                 setCollections(data);
//             } catch (error) {
//                 console.error('Error fetching collections:', error);
//             }
//         };
//         fetchCollections();
//     }, []);

//     const toggleCollection = async (collection) => {
//         setExpandedCollection(expandedCollection === collection ? null : collection);

//         if (expandedCollection !== collection) {
//             await fetchFolders(collection);
//         }
//     };

//     const fetchFolders = async (collection) => {
//         try {
//             const response = await fetch(`http://localhost:4000/api/collections/${collection}/folders`);
//             const data = await response.json();
//             setFolders(data);
//         } catch (error) {
//             console.error('Error fetching folders:', error);
//         }
//     };

//     const handleFolderSelect = (collection, folder) => {
//         onFolderSelect(collection, folder);
//     };

//     const handleDeleteCollection = async (collection) => {
        


// const confirmDelete = window.confirm(`Are you sure you want to delete the database '${collection}'?`);
        
// if (confirmDelete) {
//     try {
//         const response = await fetch(`http://localhost:4000/api/collections/${collection}`, {
//             method: 'DELETE',
//         });
//         if (response.ok) {
//             setCollections(collections.filter(c => c !== collection));
//             // Optionally, reload the collection list or perform other actions after deletion
//         } else {
//             console.error('Failed to delete collection');
//         }
//     } catch (error) {
//         console.error('Error deleting collection:', error);
//     }
// }
//     };

//     const handleDeleteFolder = async (collection, folder) => {
       

// const confirmDelete = window.confirm(`Are you sure you want to delete the collection '${folder}'?`);
        
// if (confirmDelete) {
//     try {
//         const response = await fetch(`http://localhost:4000/api/collections/${collection}/folders/${folder}`, {
//             method: 'DELETE',
//         });
//         if (response.ok) {
//             setFolders(folders.filter(f => f !== folder));
//             // Optionally, reload the folder list or perform other actions after deletion
//         } else {
//             console.error('Failed to delete folder');
//         }
//     } catch (error) {
//         console.error('Error deleting folder:', error);
//     }
// }


//     };

//     const handleOpenFileModal = (collection, folder) => {
//         setSelectedCollection(collection);
//         setSelectedFolder(folder);
//         setIsFileModalOpen(true);
       
//     };

//     const handleCloseFileModal = () => {
//         setSelectedCollection(null);
//         setSelectedFolder(null);
//         setIsFileModalOpen(false);
       
//     };

//     const handleCreateFile = async (fileName, jsonData) => {
//         try {
//             const response = await fetch(`http://localhost:4000/api/collections/${selectedCollection}/folders/${selectedFolder}/create-file`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ filename: fileName, data: jsonData }),
//             });

//             if (response.ok) {
//                 console.log('File created successfully');
//                 fetchFolders(selectedCollection);
//                 setIsFileModalOpen(false);
//             } else {
//                 const errorData = await response.json();
//                 console.error('Error creating file:', errorData.error);
//             }
//             window.location.reload();
//         } catch (error) {
//             console.error('Error creating file:', error);
//         }
//     };

//     return (
//         <div className='grid grid-cols-1 gap-4'>
//             {collections.map((collection) => (
//                 <div key={collection} className="border p-4 rounded-lg">
//                     <div className="flex justify-between items-center">
//                         <div onClick={() => toggleCollection(collection)} className="cursor-pointer text-lg font-bold">
//                             {collection}
//                         </div>
//                         <div>
//                             <button onClick={() => handleDeleteCollection(collection)} className="ml-2 text-red-500">Delete</button>
//                             <button onClick={() => onCreateFolderClick(collection)} className="ml-2 text-green-500">+</button>
//                         </div>
//                     </div>
//                     {expandedCollection === collection && (
//                         <div className='mt-4 ml-4'>
//                             {folders.map((folder) => (
//                                 <div key={folder} className="border p-4 rounded-lg mb-4">
//                                     <div className="flex justify-between items-center">
//                                         <div onClick={() => handleFolderSelect(collection, folder)} className="cursor-pointer text-lg font-bold">
//                                             {folder}
//                                         </div>
//                                         <div>
//                                             <button onClick={() => handleDeleteFolder(collection, folder)} className="ml-2 text-red-500">Delete</button>
//                                             <button onClick={() => handleOpenFileModal(collection, folder)} className="ml-2 text-blue-500">+</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             ))}
//             {isFileModalOpen && (
//                 <CreateFileModal onClose={handleCloseFileModal} onCreateFile={handleCreateFile} />
//             )}
//         </div>
//     );
// }

// export default FolderList;


// import React, { useState, useEffect } from 'react';
// import CreateFileModal from './CreateFileModal'; // Adjust import path as necessary

// function FolderList({ collections, onCreateFolderClick, onFolderSelect }) {
//     const [expandedCollection, setExpandedCollection] = useState(null);
//     const [folders, setFolders] = useState([]);
//     const [isFileModalOpen, setIsFileModalOpen] = useState(false);
//     const [selectedCollection, setSelectedCollection] = useState(null); // Track selected collection
//     const [selectedFolder, setSelectedFolder] = useState(null); // Track selected folder within collection

//     useEffect(() => {
//         // Fetch folders for the initially selected collection
//         if (selectedCollection) {
//             fetchFolders(selectedCollection);
//         }
//     }, [selectedCollection]);

//     const toggleCollection = async (collection) => {
//         if (expandedCollection === collection) {
//             setExpandedCollection(null);
//         } else {
//             setExpandedCollection(collection);
//             fetchFolders(collection);
//         }
//     };

//     const fetchFolders = async (collection) => {
//         try {
//             const response = await fetch(`http://localhost:4000/api/collections/${collection}/folders`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch folders');
//             }
//             const data = await response.json();
//             setFolders(data);
//         } catch (error) {
//             console.error('Error fetching folders:', error);
//         }
//     };

//     const handleFolderSelect = (collection, folder) => {
//         setSelectedCollection(collection); // Update selectedCollection state
//         setSelectedFolder(folder); // Update selectedFolder state
//         onFolderSelect(collection, folder);
//     };

//     const handleDeleteCollection = async (collection) => {
//         const confirmDelete = window.confirm(`Are you sure you want to delete the database '${collection}'?`);
        
//         if (confirmDelete) {
//             try {
//                 const response = await fetch(`http://localhost:4000/api/collections/${collection}`, {
//                     method: 'DELETE',
//                 });
//                 if (response.ok) {
//                     // Optionally, reload the collection list or perform other actions after deletion
//                 } else {
//                     console.error('Failed to delete collection');
//                 }
//             } catch (error) {
//                 console.error('Error deleting collection:', error);
//             }
//         }
//     };

//     const handleDeleteFolder = async (collection, folder) => {
//         const confirmDelete = window.confirm(`Are you sure you want to delete the folder '${folder}' in collection '${collection}'?`);
        
//         if (confirmDelete) {
//             try {
//                 const response = await fetch(`http://localhost:4000/api/collections/${collection}/folders/${folder}`, {
//                     method: 'DELETE',
//                 });
//                 if (response.ok) {
//                     // Optionally, refresh the folder list or perform other actions after deletion
//                     fetchFolders(collection); // Refresh folders after deletion
//                 } else {
//                     console.error('Failed to delete folder');
//                 }
//             } catch (error) {
//                 console.error('Error deleting folder:', error);
//             }
//         }
//     };

//     const handleOpenFileModal = (collection, folder) => {
//         setSelectedCollection(collection);
//         setSelectedFolder(folder);
//         setIsFileModalOpen(true);
//     };

//     const handleCloseFileModal = () => {
//         setSelectedCollection(null);
//         setSelectedFolder(null);
//         setIsFileModalOpen(false);
//     };

//     const handleCreateFile = async (fileName, jsonData) => {
//         try {
//             const response = await fetch(`http://localhost:4000/api/collections/${selectedCollection}/folders/${selectedFolder}/create-file`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ filename: fileName, data: jsonData }),
//             });

//             if (response.ok) {
//                 console.log('File created successfully');
//                 fetchFolders(selectedCollection); // Refresh folders after file creation
//                 setIsFileModalOpen(false);
//             } else {
//                 const errorData = await response.json();
//                 console.error('Error creating file:', errorData.error);
//             }
//         } catch (error) {
//             console.error('Error creating file:', error);
//         }
//     };

//     return (
//         <div className='grid grid-cols-1 gap-4'>
//             {collections.map((collection) => (
//                 <div key={collection} className="border p-4 rounded-lg">
//                     <div className="flex justify-between items-center">
//                         <div onClick={() => toggleCollection(collection)} className="cursor-pointer text-lg font-bold">
//                             {collection}
//                         </div>
//                         <div>
//                             <button onClick={() => handleDeleteCollection(collection)} className="ml-2 text-red-500">Delete</button>
//                             <button onClick={() => onCreateFolderClick(collection)} className="ml-2 text-green-500">+</button>
//                         </div>
//                     </div>
//                     {expandedCollection === collection && (
//                         <div className='mt-4 ml-4'>
//                             {folders.map((folder) => (
//                                 <div key={folder} className="border p-4 rounded-lg mb-4">
//                                     <div className="flex justify-between items-center">
//                                         <div onClick={() => handleFolderSelect(collection, folder)} className="cursor-pointer text-lg font-bold">
//                                             {folder}
//                                         </div>
//                                         <div>
//                                             <button onClick={() => handleDeleteFolder(collection, folder)} className="ml-2 text-red-500">Delete</button>
//                                             <button onClick={() => handleOpenFileModal(collection, folder)} className="ml-2 text-blue-500">+</button>
//                                         </div>
//                                     </div>
//                                     {/* Display additional details or files within the folder */}
//                                     {/* Example: <div>{/* Render additional details or files }</div> */}
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             ))}
//             {isFileModalOpen && (
//                 <CreateFileModal onClose={handleCloseFileModal} onCreateFile={handleCreateFile} />
//             )}
//         </div>
//     );
// }

// export default FolderList;

// import React, { useState, useEffect } from 'react';
// import CreateFileModal from './CreateFileModal'; // Adjust import path as necessary

// function FolderList({ collections, onCreateFolderClick, onFolderSelect }) {
//     const [expandedCollection, setExpandedCollection] = useState(null);
//     const [folders, setFolders] = useState([]);
//     const [isFileModalOpen, setIsFileModalOpen] = useState(false);
//     const [selectedCollection, setSelectedCollection] = useState(null); // Track selected collection
//     const [selectedFolder, setSelectedFolder] = useState(null); // Track selected folder within collection

//     useEffect(() => {
//         // Fetch folders for the initially selected collection
//         if (selectedCollection) {
//             fetchFolders(selectedCollection);
//         }
//     }, [selectedCollection]);

//     const toggleCollection = async (collection) => {
//         if (expandedCollection === collection) {
//             setExpandedCollection(null);
//         } else {
//             setExpandedCollection(collection);
//             fetchFolders(collection);
//         }
//     };

//     const fetchFolders = async (collection) => {
//         try {
//             const response = await fetch(`http://localhost:4000/api/collections/${collection}/folders`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch folders');
//             }
//             const data = await response.json();
//             setFolders(data);
//         } catch (error) {
//             console.error('Error fetching folders:', error);
//         }
//     };

//     const handleFolderSelect = (collection, folder) => {
//         setSelectedCollection(collection); // Update selectedCollection state
//         setSelectedFolder(folder); // Update selectedFolder state
//         onFolderSelect(collection, folder);
//     };

//     const handleDeleteCollection = async (collection) => {
//         const confirmDelete = window.confirm(`Are you sure you want to delete the database '${collection}'?`);
        
//         if (confirmDelete) {
//             try {
//                 const response = await fetch(`http://localhost:4000/api/collections/${collection}`, {
//                     method: 'DELETE',
//                 });
//                 if (response.ok) {
//                     // Remove the deleted collection from the state
//                     const updatedCollections = collections.filter((item) => item !== collection);
//                     setExpandedCollection(null); // Collapse collection if deleted
//                     setSelectedCollection(null);
//                     setSelectedFolder(null);
//                     setFolders([]);
//                     onCreateFolderClick(null); // Reset any selected folder state
//                     // Update the collections state
//                     collections(updatedCollections);
//                 } else {
//                     console.error('Failed to delete collection');
//                 }
//             } catch (error) {
//                 console.error('Error deleting collection:', error);
//             }
//         }
//     };

//     const handleDeleteFolder = async (collection, folder) => {
//         const confirmDelete = window.confirm(`Are you sure you want to delete the folder '${folder}' in collection '${collection}'?`);
        
//         if (confirmDelete) {
//             try {
//                 const response = await fetch(`http://localhost:4000/api/collections/${collection}/folders/${folder}`, {
//                     method: 'DELETE',
//                 });
//                 if (response.ok) {
//                     // Remove the deleted folder from the state
//                     const updatedFolders = folders.filter((item) => item !== folder);
//                     setFolders(updatedFolders);
//                 } else {
//                     console.error('Failed to delete folder');
//                 }
//             } catch (error) {
//                 console.error('Error deleting folder:', error);
//             }
//         }
//     };

//     const handleOpenFileModal = (collection, folder) => {
//         setSelectedCollection(collection);
//         setSelectedFolder(folder);
//         setIsFileModalOpen(true);
//     };

//     const handleCloseFileModal = () => {
//         setSelectedCollection(null);
//         setSelectedFolder(null);
//         setIsFileModalOpen(false);
//     };

//     const handleCreateFile = async (fileName, jsonData) => {
//         try {
//             const response = await fetch(`http://localhost:4000/api/collections/${selectedCollection}/folders/${selectedFolder}/create-file`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ filename: fileName, data: jsonData }),
//             });

//             if (response.ok) {
//                 console.log('File created successfully');
//                 fetchFolders(selectedCollection); // Refresh folders after file creation
//                 setIsFileModalOpen(false);
//             } else {
//                 const errorData = await response.json();
//                 console.error('Error creating file:', errorData.error);
//             }
//         } catch (error) {
//             console.error('Error creating file:', error);
//         }
//     };

//     return (
//         <div className='grid grid-cols-1 gap-4'>
//             {collections.map((collection) => (
//                 <div key={collection} className="border p-4 rounded-lg">
//                     <div className="flex justify-between items-center">
//                         <div onClick={() => toggleCollection(collection)} className="cursor-pointer text-lg font-bold">
//                             {collection}
//                         </div>
//                         <div>
//                             <button onClick={() => handleDeleteCollection(collection)} className="ml-2 text-red-500">Delete</button>
//                             <button onClick={() => onCreateFolderClick(collection)} className="ml-2 text-green-500">+</button>
//                         </div>
//                     </div>
//                     {expandedCollection === collection && (
//                         <div className='mt-4 ml-4'>
//                             {folders.map((folder) => (
//                                 <div key={folder} className="border p-4 rounded-lg mb-4">
//                                     <div className="flex justify-between items-center">
//                                         <div onClick={() => handleFolderSelect(collection, folder)} className="cursor-pointer text-lg font-bold">
//                                             {folder}
//                                         </div>
//                                         <div>
//                                             <button onClick={() => handleDeleteFolder(collection, folder)} className="ml-2 text-red-500">Delete</button>
//                                             <button onClick={() => handleOpenFileModal(collection, folder)} className="ml-2 text-blue-500">+</button>
//                                         </div>
//                                     </div>
//                                     {/* Display additional details or files within the folder */}
//                                     {/* Example: <div>{/* Render additional details or files }</div> */}
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             ))}
//             {isFileModalOpen && (
//                 <CreateFileModal onClose={handleCloseFileModal} onCreateFile={handleCreateFile} />
//             )}
//         </div>
//     );
// }

// export default FolderList;




import React, { useState, useEffect } from 'react';
import CreateFileModal from './CreateFileModal'; // Adjust import path as necessary

function FolderList({ collections, onCreateFolderClick, onFolderSelect }) {
    const [expandedCollection, setExpandedCollection] = useState(null);
    const [folders, setFolders] = useState([]);
    const [isFileModalOpen, setIsFileModalOpen] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState(null); // Track selected collection
    const [selectedFolder, setSelectedFolder] = useState(null); // Track selected folder within collection

    useEffect(() => {
        // Fetch folders for the initially selected collection
        if (selectedCollection) {
            fetchFolders(selectedCollection);
        }
    }, [selectedCollection]);

    const toggleCollection = async (collection) => {
        if (expandedCollection === collection) {
            setExpandedCollection(null);
        } else {
            setExpandedCollection(collection);
            fetchFolders(collection);
        }
    };

    const fetchFolders = async (collection) => {
        try {
            const response = await fetch(`http://localhost:4000/api/collections/${collection}/folders`);
            if (!response.ok) {
                throw new Error('Failed to fetch folders');
            }
            const data = await response.json();
            setFolders(data);
        } catch (error) {
            console.error('Error fetching folders:', error);
        }
    };

    const handleFolderSelect = (collection, folder) => {
        setSelectedCollection(collection); // Update selectedCollection state
        setSelectedFolder(folder); // Update selectedFolder state
        onFolderSelect(collection, folder);
    };

    const handleDeleteCollection = async (collection) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the database '${collection}'?`);
        
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:4000/api/collections/${collection}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    // Remove the deleted collection from the state
                    const updatedCollections = collections.filter((item) => item !== collection);
                    setExpandedCollection(null); // Collapse collection if deleted
                    setSelectedCollection(null);
                    setSelectedFolder(null);
                    setFolders([]);
                    // Update the collections state by informing the parent component
                   // onCreateFolderClick(updatedCollections); // Call onCreateFolderClick with updated collections
                   window.location.reload(); 
                } else {
                    console.error('Failed to delete collection');
                }
            } catch (error) {
                console.error('Error deleting collection:', error);
            }
        }
    };

    const handleDeleteFolder = async (collection, folder) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the folder '${folder}' in collection '${collection}'?`);
        
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:4000/api/collections/${collection}/folders/${folder}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    // Remove the deleted folder from the state
                    const updatedFolders = folders.filter((item) => item !== folder);
                    setFolders(updatedFolders);
                    window.location.reload(); 
                } else {
                    console.error('Failed to delete folder');
                }
            } catch (error) {
                console.error('Error deleting folder:', error);
            }
        }
    };

    const handleOpenFileModal = (collection, folder) => {
        setSelectedCollection(collection);
        setSelectedFolder(folder);
        setIsFileModalOpen(true);
    };

    const handleCloseFileModal = () => {
        setSelectedCollection(null);
        setSelectedFolder(null);
        setIsFileModalOpen(false);
    };

    const handleCreateFile = async (fileName, jsonData) => {
        try {
            const response = await fetch(`http://localhost:4000/api/collections/${selectedCollection}/folders/${selectedFolder}/create-file`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filename: fileName, data: jsonData }),
            });

            if (response.ok) {
                console.log('File created successfully');
                fetchFolders(selectedCollection); // Refresh folders after file creation
                setIsFileModalOpen(false);
            } else {
                const errorData = await response.json();
                console.error('Error creating file:', errorData.error);
            }
        } catch (error) {
            console.error('Error creating file:', error);
        }
    };

    return (
        <div className='grid grid-cols-1 gap-4'>
            {collections.map((collection) => (
                <div key={collection} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div onClick={() => toggleCollection(collection)} className="cursor-pointer text-lg font-bold">
                            {collection}
                        </div>
                        <div>
                            <button onClick={() => handleDeleteCollection(collection)} className="ml-2 text-red-500">Delete</button>
                            <button onClick={() => onCreateFolderClick(collection)} className="ml-2 text-green-500">+</button>
                        </div>
                    </div>
                    {expandedCollection === collection && (
                        <div className='mt-4 ml-4'>
                            {folders.map((folder) => (
                                <div key={folder} className="border p-4 rounded-lg mb-4">
                                    <div className="flex justify-between items-center">
                                        <div onClick={() => handleFolderSelect(collection, folder)} className="cursor-pointer text-lg font-bold">
                                            {folder}
                                        </div>
                                        <div>
                                            <button onClick={() => handleDeleteFolder(collection, folder)} className="ml-2 text-red-500">Delete</button>
                                            <button onClick={() => handleOpenFileModal(collection, folder)} className="ml-2 text-blue-500">+</button>
                                        </div>
                                    </div>
                                    {/* Display additional details or files within the folder */}
                                    {/* Example: <div>{/* Render additional details or files }</div> */}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            {isFileModalOpen && (
                <CreateFileModal onClose={handleCloseFileModal} onCreateFile={handleCreateFile} />
            )}
        </div>
    );
}

export default FolderList;

























