import * as FileSystem from 'expo-file-system';

export const saveImageToDisk = async (image) => {
    if (image) {
        
        const fileName = `${Date.now()}.jpg`;
  
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


  