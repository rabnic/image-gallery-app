import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('images.db');


const createTable = () => {
    db.transaction((tx) => {
        console.log('>>> createTable')
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, album TEXT, uri TEXT, location TEXT, date TEXT)'
        );
    },
    (error) => console.error('Error creating table:', error),
    (result) => console.log('result: Table created successfully'));
};

const addImage = (name, album, uri, location, date) => {
    console.log('>> addImage')
    // console.log(db)
    db.transaction((tx) => {
        tx.executeSql(
            'INSERT INTO images (name, album, uri, location, date) VALUES (?, ?, ?, ?, ?)',
            [name, album, uri, location, date]
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

const deleteTable = () => {
    db.transaction((tx) => {
        console.log('>>> deleteTable')
        tx.executeSql(
            'DROP TABLE IF EXISTS images'
        );
    },
    (error) => console.error('Error deleting table:', error),
    (result) => console.log('result: Table deleted successfully'));
};


export { createTable, addImage, getAllImages, deleteImage, deleteAllImages, updateAlbum, deleteTable };
