let removeItemInArray = (array, item) => {
    const index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    };
}

let redirect = (url, data) => {
    for (let item in data) {
        sessionStorage.setItem(`${item}`, `${data[item]}`);
    }
    location.href = `${url}`;
}