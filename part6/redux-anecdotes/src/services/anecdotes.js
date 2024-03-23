import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const obj = { content, votes: 0, id: getId() }
    const response = await axios.post(baseUrl, obj)
    return response.data
}

const update = async (object) => {
    const response = await axios.put(`${baseUrl}/${object.id}`, object)
    return response.data
}

export default { getAll, createNew, update }