import axios from 'axios'
export type Data = {
  id: number
  title: string
  body: string
}
export async function getAllMedicalList (): Promise<any> {
  let res = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return res
}
export async function deleteItem (id: number): Promise<any> {
  let res = await axios.delete(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  )
  return res
}
