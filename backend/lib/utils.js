// export function uniqueCount(scrapes) {
//     return scrapes.reduce((accumulator, scrape) => {
//         // check if this one is already in the accumulator
//         // if there is already one in the doc
//         if (!accumulator.find(element => element.count === scrape.count)) {
//             return [...accumulator, scrape]; // "..." takes everything in the accumulator already and pushes the new value into it
//         }
//         return accumulator;
//     }, []); // <-- starting value of empty array
// }

export function uniqueCount(scrapes) {
    return scrapes.filter((item, i, arr) => {
        if (i === 0) return true; // keep it, it's the first one
        const lastItem = arr[i - 1];
        if (!isNaN(item.count)) {
            return !(item.count === lastItem.count);
        }
    });
}