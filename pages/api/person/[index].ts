// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Person } from 'types/person'
import { sendBadRequest } from 'util/responses';
import { paramToInt } from "util/transformers";

const people: Person[] = [{ name: "John", surname: "Doe" }, { name: "Mehmet", surname: "Yılmaz" }]

export async function get(index: number): Promise<Person> {
  if (index >= people.length) return { name: "", surname: "" }
  return people[index]
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const index: number | undefined = paramToInt(req.query["index"])
        if (index === undefined) {
          sendBadRequest(res)
          break
        }
        res.status(200).json(await get(index))
        break
      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {

  }

}