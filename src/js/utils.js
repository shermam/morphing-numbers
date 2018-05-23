export const diffID = compareID(notEquals);
export const sameID = compareID(equals);

function equals(p1, p2) {
    return p1 === p2;
}

function notEquals(p1, p2) {
    return p1 !== p2;
}

function compareID(comparator) {
    return function (firstID, secondID) {
        const ret = new ImageData(firstID.width, firstID.height);

        for (let i = 0; i < firstID.data.length; i += 4) {
            if (comparator(firstID.data[i], secondID.data[i])) {
                ret.data[i + 0] =
                    ret.data[i + 1] =
                    ret.data[i + 2] = firstID.data[i];
                ret.data[i + 3] = 255;
            }
        }

        return ret;
    }
}

export function getPixels(imageData) {
    const pixels = [];
    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            const index = x + y * imageData.width;
            if (imageData.data[index * 4] === 0) {
                pixels.push({ x, y });
            }
        }
    }

    return pixels;
}

export function mapPixels(firstPixels, secondPixels, reverse) {
    return firstPixels.map(p => {
        let min = secondPixels[0];
        let minDistance = getDistance(p, secondPixels[0]);

        for (let i = 1; i < secondPixels.length; i++) {
            let distance = getDistance(p, secondPixels[i]);
            if (distance < minDistance) {
                min = secondPixels[i];
                minDistance = distance;
            }
        }

        if (!min) {
            return {
                x: p.x,
                y: p.y,
                toX: p.x,
                toY: p.y,
                distance: 0,
                r: 0
            }
        }

        if (reverse) {
            return {
                x: min.x,
                y: min.y,
                toX: p.x,
                toY: p.y,
                distance: Math.sqrt(minDistance),
                r: Math.abs((p.y - min.y) / (p.x - min.x))
            }
        }

        return {
            x: p.x,
            y: p.y,
            toX: min.x,
            toY: min.y,
            distance: Math.sqrt(minDistance),
            r: Math.abs((min.y - p.y) / (min.x - p.x))
        }
    });
}

function getDistance(p1, p2) {
    //We are just using this distance to compare and find the minimum
    //so we maybe do not need to square root it here and save some performance
    if (!p1 || !p2) {
        return 0;
    }

    return (
        (Math.abs(p2.x - p1.x) ** 2) +
        (Math.abs(p2.y - p1.y) ** 2)
    );
}


export function getIDFromMap(mappedPixels, width, height) {
    const id = new ImageData(width, height);
    mappedPixels.forEach(p => {
        id.data[((p.x + p.y * width) * 4) + 0] = 0;
        id.data[((p.x + p.y * width) * 4) + 1] = 0;
        id.data[((p.x + p.y * width) * 4) + 2] = 0;
        id.data[((p.x + p.y * width) * 4) + 3] = 255;
    });
    return id;
}