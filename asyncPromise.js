const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Done!!!");
        }, 1500);
    });
    return promise;
};

setTimeout(() => { // waiting
    console.log("starting...");
    fetchData()
        .then(text => {
            console.log(text);
            return fetchData();
        })
        .then(text2 => {
            console.log(text2);
        });
}, 2000
);

console.log("end of program.");