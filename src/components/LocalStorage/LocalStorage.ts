const addToCart = (item: any) => {
    const db = getCart();

    let index = -1;

    for (let i = 0; i < db.length; i++) {
        if (db[i].id === item.id) {
            index = i;
        }
    }

    if (index > -1) {
        db[index] = item;
    } else {
        db.push(item)
    }

    saveToCart(db);
}

// const removeFromCart = item => {
//     const db = getCart();
//     if (item in db) {
//         db[item] = db[item] - 1;
//         if (db[item] === 0) {
//             delete db[item];
//         }
//     }

//     saveToCart(db);
// }

const saveToCart = (db: any) => {
    const dbJSON = JSON.stringify(db);
    localStorage.setItem('shopping-cart', dbJSON);
}

const getCart = () => {
    let savedData = localStorage.getItem('shopping-cart');
    return savedData ? JSON.parse(savedData) : [];
}

export { addToCart, getCart };