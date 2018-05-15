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