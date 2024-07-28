// import React, { useState, useEffect } from 'react';
// import FolderList from './FolderList'; // Adjust import path as necessary

// function ParentComponent() {
//     const [collections, setCollections] = useState([]);

//     useEffect(() => {
//         // Fetch the initial list of collections
//         fetchCollections();
//     }, []);

//     const fetchCollections = async () => {
//         try {
//             const response = await fetch('http://localhost:4000/api/collections');
//             if (!response.ok) {
//                 throw new Error('Failed to fetch collections');
//             }
//             const data = await response.json();
//             setCollections(data);
//         } catch (error) {
//             console.error('Error fetching collections:', error);
//         }
//     };

//     const handleCreateFolderClick = (collection) => {
//         // Handle creating a new folder
//     };

//     const handleFolderSelect = (collection, folder) => {
//         // Handle folder selection
//     };

//     const handleCollectionDelete = async (collectionToDelete) => {
//         const confirmDelete = window.confirm(`Are you sure you want to delete the database '${collectionToDelete}'?`);
        
//         if (confirmDelete) {
//             try {
//                 const response = await fetch(`http://localhost:4000/api/collections/${collectionToDelete}`, {
//                     method: 'DELETE',
//                 });
//                 if (response.ok) {
//                     console.log(`Collection ${collectionToDelete} deleted successfully`);
//                     // Update collections after deletion
//                     const updatedCollections = collections.filter(collection => collection !== collectionToDelete);
//                     setCollections(updatedCollections);
//                 } else {
//                     console.error('Failed to delete collection');
//                 }
//             } catch (error) {
//                 console.error('Error deleting collection:', error);
//             }
//         }
//     };

//     return (
//         <div>
//             <FolderList
//                 collections={collections}
//                 onCreateFolderClick={handleCreateFolderClick}
//                 onFolderSelect={handleFolderSelect}
//                 onCollectionDelete={handleCollectionDelete} // Pass the function as a prop
//             />
//         </div>
//     );
// }

// export default ParentComponent;
