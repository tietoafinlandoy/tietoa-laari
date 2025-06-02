import axios from "axios";
import { InputTask } from "../types/Task";
import config from "../config";

export default async function getTasks({ queryKey }: any) {
  const [_key, auth] = queryKey;

  const response = await axios.get(
    `https://${config.API_URL}/tasks?include_archived=true`,
    { headers: { Authorization: `Bearer ${auth}` } }
  );
  return response.data as InputTask[];
}
