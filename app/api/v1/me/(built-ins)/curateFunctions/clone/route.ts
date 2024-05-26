import { NextRequest, NextResponse } from "next/server";
import { apiAuthTryCatch } from "@app/api/utils/apiAuthTryCatch";
import { Logger } from "@lib/logger";
import { cloneFunction } from "@/data/functions";

/**
 * @swagger
 * /api/v1/me/curateFunctions/clone:
 *   post:
 *     summary: Clone a function by providing referenced function ID.
 *     operationId: cloneFunction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               functionId:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the function to clone. In UUID format.
 *                 example: "090abc6e-0e19-466d-8549-83dd24c5c8e5"
 *     responses:
 *       '200':
 *         description: Successfully cloned the function
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiSuccess'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       '404':
 *         description: Function not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *     tags:
 *       - Built-ins Internal
 */
export async function POST(req: NextRequest) {
  const { functionId } = await req.json();

  return await apiAuthTryCatch<any>(async (authSession) => {
    // Clone the function
    const clonedFunction = await cloneFunction(functionId, authSession.user.id);

    Logger.withTag('me-builtins')
      .withTag('curateFunctions-clone')
      .withTag(`user:${authSession.user.id}`)
      .info('Cloned a user function');

    return NextResponse.json(
      {
        status: 'success',
        message: 'Successfully cloned the function',
        data: clonedFunction,
      },
      {
        status: 200,
      }
    );
  });
}