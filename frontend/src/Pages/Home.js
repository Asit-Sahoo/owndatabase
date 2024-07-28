// import React, { useState } from 'react';
// import FolderList from '../Component/FolderList';
// import CreateFolderModal from '../Component/CreateFolderModal';
// import CreateCollectionModal from '../Component/CreateCollectionModal';
// import ViewFiles from '../Component/ViewFiles';

// function Home() {
//     const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
//     const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
//     const [selectedCollection, setSelectedCollection] = useState(null);
//     const [selectedFolder, setSelectedFolder] = useState(null);

//     const handleCreateCollectionClick = () => {
//         setIsCollectionModalOpen(true);
//     };

//     const handleCloseCollectionModal = () => {
//         setIsCollectionModalOpen(false);
//     };

//     const handleCreateCollection = async (collectionName) => {
//         await fetch('http://localhost:4000/api/collections', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ collectionName }),
//         });
//         window.location.reload(); // Reload the page after successful creation
//     };

//     const handleCreateFolderClick = (collection) => {
//         setSelectedCollection(collection);
//         setIsFolderModalOpen(true);
//     };

//     const handleCloseFolderModal = () => {
//         setIsFolderModalOpen(false);
//     };

//     const handleCreateFolder = async (folderName, fileName) => {
//         await fetch(`http://localhost:4000/api/collections/${selectedCollection}/folders`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ folderName }),
//         });

//         window.location.reload(); // Reload the page after successful creation
//     };

//     const handleFolderSelection = (collection, folder) => {
//         setSelectedCollection(collection);
//         setSelectedFolder(folder);
//     };

//     return (
//         <div className="flex h-screen">
//             <div className="w-64 bg-gray-100 border-r p-4 overflow-y-auto">
//                 <div>
//                     <ul className="flex space-x-4">
//                         <li className="font-bold">DATABASE</li>
//                         <li onClick={handleCreateCollectionClick} className="cursor-pointer text-blue-500">+</li>
//                     </ul>
//                 </div>
//                 <div className='forsearch'>

//                 </div>
//                 <div className="mt-4">
//                     <FolderList onCreateFolderClick={handleCreateFolderClick} onFolderSelect={handleFolderSelection} />
//                 </div>
//             </div>
//             <div className="flex-1 p-4 overflow-y-auto">
//                 {selectedCollection && selectedFolder && (
//                     <ViewFiles collection={selectedCollection} folder={selectedFolder} />
//                 )}
//             </div>
//             {isCollectionModalOpen && (
//                 <CreateCollectionModal onClose={handleCloseCollectionModal} onCreate={handleCreateCollection} />
//             )}
//             {isFolderModalOpen && (
//                 <CreateFolderModal onClose={handleCloseFolderModal} onCreate={handleCreateFolder} />
//             )}
//         </div>
//     );
// }

// export default Home;


import React, { useState, useEffect } from 'react';
import FolderList from '../Component/FolderList';
import CreateFolderModal from '../Component/CreateFolderModal';
import CreateCollectionModal from '../Component/CreateCollectionModal';
import ViewFiles from '../Component/ViewFiles';

function Home() {
    const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
    const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [filteredCollections, setFilteredCollections] = useState([]);
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/collections');
                const data = await response.json();
                setCollections(data);
                setFilteredCollections(data); // Initialize filtered collections with all collections
            } catch (error) {
                console.error('Error fetching collections:', error);
            }
        };
        fetchCollections();
    }, []);

    // Function to handle search input change
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        filterCollections(searchTerm);
    };

    // Function to filter collections based on search term
    const filterCollections = (searchTerm) => {
        if (!searchTerm) {
            setFilteredCollections(collections); // If search term is empty, show all collections
        } else {
            const filtered = collections.filter(collection =>
                collection.toLowerCase().includes(searchTerm)
            );
            setFilteredCollections(filtered);
        }
    };

    const handleCreateCollectionClick = () => {
        setIsCollectionModalOpen(true);
    };

    const handleCloseCollectionModal = () => {
        setIsCollectionModalOpen(false);
    };

    const handleCreateCollection = async (collectionName) => {
        await fetch('http://localhost:4000/api/collections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ collectionName }),
        });
        window.location.reload(); // Reload the page after successful creation
    };

    const handleCreateFolderClick = (collection) => {
        setSelectedCollection(collection);
        setIsFolderModalOpen(true);
    };

    const handleCloseFolderModal = () => {
        setIsFolderModalOpen(false);
    };

    const handleCreateFolder = async (folderName, fileName) => {
        await fetch(`http://localhost:4000/api/collections/${selectedCollection}/folders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ folderName }),
        });

        window.location.reload(); // Reload the page after successful creation
    };

    const handleFolderSelection = (collection, folder) => {
        setSelectedCollection(collection);
        setSelectedFolder(folder);
    };

    return (
        <div className="flex h-screen">
            <div className="w-64 bg-gray-100 border-r p-4 overflow-y-auto">
                <div>
                    <ul className="flex space-x-4">
                        <li className="font-bold">DATABASE</li>
                        <li onClick={handleCreateCollectionClick} className="cursor-pointer text-blue-500">+</li>
                    </ul>
                </div>
                <div className='forsearch'>
                    <input
                        type="text"
                        placeholder="Search...."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="border border-gray-300 rounded-lg px-3 py-2 mt-4"
                    />
                </div>
                <div className="mt-4">
                    <FolderList
                        collections={filteredCollections} // Pass filtered collections to FolderList
                        onCreateFolderClick={handleCreateFolderClick}
                        onFolderSelect={handleFolderSelection}
                    />
                </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                {selectedCollection && selectedFolder && (
                    <ViewFiles collection={selectedCollection} folder={selectedFolder} />
                )}
            </div>
            {isCollectionModalOpen && (
                <CreateCollectionModal onClose={handleCloseCollectionModal} onCreate={handleCreateCollection} />
            )}
            {isFolderModalOpen && (
                <CreateFolderModal onClose={handleCloseFolderModal} onCreate={handleCreateFolder} />
            )}
        </div>
    );
}

export default Home;




