import axios from "axios"
import { API_URL } from "../../Helpers/Path"

const getBookDetails = async(bookId)=>{
  let response = await axios.get(`${API_URL}/book/${bookId}`)
  return response.data[0]
}

export { getBookDetails }