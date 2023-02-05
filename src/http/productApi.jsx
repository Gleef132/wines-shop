import axios from "axios"

export const fetchOneProduct = async (id) => {
	const { data } = await axios.get('https://6276472dbc9e46be1a151e2e.mockapi.io/Wines/' + id)
	return data
}

export const adminAuth = async () => {
	const { data } = await axios.get('https://6276472dbc9e46be1a151e2e.mockapi.io/Admin/admin')
	return data
}