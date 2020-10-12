import axios from 'axios';

const getApiUrl = (url) => {
    return `http://localhost:3001${url}`
}

const get = async (url, queryParams) => {
    try{
        const response = await axios.get(getApiUrl(url), queryParams)
        return response
    }
    catch(error){
        throw new Error(error)
    }
}

const post = async (url, requestBody) => {
    try{
        const response = await axios.post(getApiUrl(url), requestBody)
        return response
    }
    catch(error){
        throw new Error(error)
    }
}

const patch = async (url, requestBody) => {
    try{
        const response = await axios.patch(getApiUrl(url), requestBody)
        return response
    }
    catch(error){
        throw new Error(error)
    }
}

export default { get, post, patch}
