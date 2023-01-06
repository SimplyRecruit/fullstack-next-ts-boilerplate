import { NextApiResponse } from "next";

/**
 * Sends a 400 error with an optional custom message.
 * 
 * Default message is "Bad Request"
 * @param res
 * @param customMessage 
 */
export function sendBadRequest(res: NextApiResponse, customMessage: string = "Bad Request") {
    res.status(400).send(customMessage)
}