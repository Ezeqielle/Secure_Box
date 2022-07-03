import { SERVER_PORT } from './config';

export async function postFetch(bodyData, url){
    return fetch('https://' + process.env.REACT_APP_HOST_IP + ':' + SERVER_PORT + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    })
        .then(data => data.json())
};

export async function getFetch(queryData, url){
    let queryString = "?"
    for (const item of Object.entries(queryData)) {

        queryString += `${item[0]}=${item[1]}&`
    }
    return fetch('https://' + process.env.REACT_APP_HOST_IP + ':' + SERVER_PORT + url +queryString, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
};

export async function checkToken(username, token){
    const res = await getFetch({username: username, token: token}, '/checkToken')
    return res.data.isValidToken
};