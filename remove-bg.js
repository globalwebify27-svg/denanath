const sharp = require('sharp');
const fs = require('fs');

async function processImage() {
  try {
    const inputPath = 'public/images/Screenshot 2026-07-02 221435.png';
    const outputPath = 'public/images/Screenshot 2026-07-02 221435_transparent.png';
    
    console.log(`Reading image from ${inputPath}...`);
    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    console.log(`Processing ${info.width}x${info.height} image...`);
    
    // Convert off-white pixels to transparent
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // If pixel is light enough (close to white or light gray), make it transparent
      if (r > 230 && g > 230 && b > 230) {
        data[i + 3] = 0; // alpha = 0
      }
    }

    console.log(`Writing transparent image to ${outputPath}...`);
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
    .png()
    .toFile(outputPath);
    
    console.log('Done successfully!');
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

processImage();
