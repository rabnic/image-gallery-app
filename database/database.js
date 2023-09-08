import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('images.db');


const createTable = () => {
    db.transaction((tx) => {
        console.log('>>> createTable')
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, album TEXT, uri TEXT)'
        );
    },
    (error) => console.error('Error creating table:', error),
    (result) => console.log('result: Table created successfully'));
};

const addImage = (name, album, uri) => {
    console.log('>> addImage')
    // console.log(db)
    db.transaction((tx) => {
        tx.executeSql(
            'INSERT INTO images (name, album, uri) VALUES (?, ?, ?)',
            [name, album, uri]
        );
    },
    (error) => console.error('Error adding image:', error),
    (result) => console.log('result: Image added successfully')
    );
};

const updateAlbum = (id, newAlbum) => {
    console.log('>> updateAlbum');
    db.transaction((tx) => {
        tx.executeSql(
            'UPDATE images SET album = ? WHERE id = ?',
            [newAlbum, id],
            (txObj, resultSet) => {
                console.log('result: Album updated successfully');
            },
            (txObj, error) => {
                console.error('Error updating album:', error);
            }
        );
    });
};
 
const getAllImages = (callback) => {
    db.transaction((tx) => {
        console.log('>> getAllImages')
        tx.executeSql(
            'SELECT * FROM images',
            [],
            (_, { rows: { _array } }) => callback(_array),
            (_, error) => console.error('Error fetching images:', error)
        );
    },
    (error) => console.error('Error getting images:', error),
    (result) => console.log('Get all images success'));
};


const deleteImage = (id) => {
    db.transaction((tx) => {
        tx.executeSql(
            'DELETE FROM images WHERE id = ?',
            [id],
            () => console.log('Image deleted successfully'),
            (_, error) => console.error('Error deleting image:', error)
        );
    });
};

const deleteAllImages = (id) => {
    db.transaction((tx) => {
        tx.executeSql(
            'DELETE FROM images',
            [],
            () => console.log('Images deleted successfully'),
            (_, error) => console.error('Error deleting image:', error)
        );
    });
};


export { createTable, addImage, getAllImages, deleteImage, deleteAllImages, updateAlbum };
