export function drawTextFactory(width, height) {
    return (num) => {
        const buffer = document.createElement('canvas');
        const bContext = buffer.getContext('2d');
        buffer.width = width;
        buffer.height = height;
        bContext.font = `bold ${height / 2}px Arial`;
        bContext.textBaseline = 'middle';

        bContext.beginPath();
        bContext.fillStyle = '#FFFFFF';
        bContext.fillRect(0, 0, buffer.width, buffer.height);
        bContext.closePath();

        bContext.beginPath();
        bContext.fillStyle = '#000000';
        bContext.textAlign = "center";
        bContext.fillText(
            num,
            buffer.width / 2,
            buffer.height / 2
        );
        bContext.closePath();

        const imageData = bContext.getImageData(0, 0, buffer.width, buffer.height);
        return blackWhite(imageData);
    }
}

function blackWhite(imageData) {
    for (let i = 0; i < imageData.data.length; i += 4) {
        const avg = (imageData.data[i + 0] +
            imageData.data[i + 1] +
            imageData.data[i + 2]) / 3;

        const color = avg < 127 ? 0 : 255;

        imageData.data[i + 0] = imageData.data[i + 1] = imageData.data[i + 2] = color;
        imageData.data[i + 3] = 255;
    }

    return imageData;
}