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
        bContext.strokeStyle = '#000000';
        bContext.textAlign = "center";
        bContext.strokeText(
            num,
            buffer.width / 2,
            buffer.height / 2
        );
        bContext.closePath();

        const imageData = bContext.getImageData(0, 0, buffer.width, buffer.height);
        return blackWhite(imageData);
    }
}

export function drawRectFactory(width, height) {
    return orientation => {
        const buffer = document.createElement('canvas');
        const bContext = buffer.getContext('2d');
        buffer.width = width;
        buffer.height = height;

        bContext.beginPath();
        bContext.fillStyle = '#FFFFFF';
        bContext.fillRect(0, 0, buffer.width, buffer.height);
        bContext.closePath();

        bContext.beginPath();
        bContext.strokeStyle = '#000000';
        if (orientation === 'v') {
            bContext.rect(3 * (width / 8), 2 * (height / 8), width / 4, height / 2)
        } else {
            bContext.rect(2 * (width / 8), 3 * (height / 8), width / 2, height / 4)
        }
        bContext.stroke();
        bContext.closePath();

        const imageData = bContext.getImageData(0, 0, buffer.width, buffer.height);
        return blackWhite(imageData);
    };
}

export function drawPixelFactory(width, height) {
    return (xP, yP) => {
        const id = new ImageData(width, height);
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const index = (x + y * width) * 4;
                if (xP === x && yP === y) {
                    id.data[index + 0] =
                        id.data[index + 1] =
                        id.data[index + 2] = 0;
                } else {
                    id.data[index + 0] =
                        id.data[index + 1] =
                        id.data[index + 2] = 255;
                }
                id.data[index + 3] = 255;
            }
        }
        return id;
    };
}

function blackWhite(imageData) {
    for (let i = 0; i < imageData.data.length; i += 4) {
        const avg = (imageData.data[i + 0] +
            imageData.data[i + 1] +
            imageData.data[i + 2]) / 3;

        const color = avg < 255 ? 0 : 255;

        imageData.data[i + 0] = imageData.data[i + 1] = imageData.data[i + 2] = color;
        imageData.data[i + 3] = 255;
    }

    return imageData;
}