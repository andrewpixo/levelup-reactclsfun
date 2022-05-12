export default async function asyncFunction() : Promise<any> {
    let promise = new Promise(resolve => {
        setTimeout(() => {
            resolve({message: "hello future"})
        }, 500)
    });

    return await promise;
}