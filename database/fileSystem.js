import * as FileSystem from 'expo-file-system';

export const saveImageToDisk = async (image) => {
    if (image) {

        const fileName = `${getFormattedName()}.jpg`;

        const directory = `${FileSystem.documentDirectory}images/`;

        // Ensure the directory exists
        await FileSystem.makeDirectoryAsync(directory, { intermediates: true });

        // Build the full path to save the image
        const imagePath = `${directory}${fileName}`;

        // Move the image to the new path
        await FileSystem.moveAsync({
            from: image.uri,
            to: imagePath,
        });

        // image path to be saved to sqlite
        return [fileName, imagePath];
    }
}

const getFormattedDateTime = () => {
    const today = new Date();

    return today.toLocaleString(navigator.language, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    });
}


const getFormattedName = () => {
    let d = new Date().toISOString();
    d = d.substring(0, 19);
    d = d.replace(/[-:]/g, '');
    d = d.replace('T', '_')
    return `IMG_${d}`;
}
