const { Jimp } = require('jimp');

async function removeBackground() {
  const imagePath = './public/images/ChatGPT Image Jul 27, 2026, 05_05_55 PM (1).png';
  const image = await Jimp.read(imagePath);
  
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const red   = this.bitmap.data[idx + 0];
    const green = this.bitmap.data[idx + 1];
    const blue  = this.bitmap.data[idx + 2];
    
    // If the pixel is near-white or beige
    if (red > 230 && green > 230 && blue > 210) {
      // Set alpha to 0 (fully transparent)
      this.bitmap.data[idx + 3] = 0;
    }
  });
  
  await image.write('./public/images/ChatGPT Image Jul 27, 2026, 05_05_55 PM (1)_transparent.png');
  console.log('Background removed successfully.');
}

removeBackground().catch(err => console.error(err));
