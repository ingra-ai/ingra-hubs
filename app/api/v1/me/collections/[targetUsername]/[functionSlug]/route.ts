import { NextRequest, NextResponse } from "next/server";
import { ApiError } from '@v1/types/api-response';
import { Logger } from "@lib/logger";
import handlerFn from "./handlers/functions";
import { getAnalyticsObject } from "@lib/utils";

export async function GET(req: NextRequest, { params }: { params: { functionSlug: string, targetUsername: string } }) {
  const { searchParams } = new URL(req.url);
  const requestArgs = Object.fromEntries(searchParams);
  const { functionSlug, targetUsername } = params;

  // Check if the handler function exists
  if ( typeof handlerFn !== 'function' ) {
    return NextResponse.json(
      {
        status: 400,
        code: 'BAD_REQUEST',
        message: 'Unable to understand the request.'
      } as ApiError,
      {
        status: 400
      }
    );
  }

  Logger.withTag('GET|collectionsSubscriptions').log(`Function handler ${ functionSlug } invoked.`);
  return await handlerFn(functionSlug, targetUsername, requestArgs, getAnalyticsObject(req));
}

export async function POST(req: NextRequest, { params }: { params: { functionSlug: string, targetUsername: string } }) {
  const requestArgs = await req.json();
  const { functionSlug, targetUsername } = params;

  // Check if the handler function exists
  if ( typeof handlerFn !== 'function' ) {
    return NextResponse.json(
      {
        status: 400,
        code: 'BAD_REQUEST',
        message: 'Unable to understand the request.'
      } as ApiError,
      {
        status: 400
      }
    );
  }

  Logger.withTag('POST|collectionsSubscriptions').log(`Function handler ${ functionSlug } invoked.`);
  return await handlerFn(functionSlug, targetUsername, requestArgs, getAnalyticsObject(req));
}


export async function PUT(req: NextRequest, { params }: { params: { functionSlug: string, targetUsername: string } }) {
  const requestArgs = await req.json();
  const { functionSlug, targetUsername } = params;

  // Check if the handler function exists
  if ( typeof handlerFn !== 'function' ) {
    return NextResponse.json(
      {
        status: 400,
        code: 'BAD_REQUEST',
        message: 'Unable to understand the request.'
      } as ApiError,
      {
        status: 400
      }
    );
  }

  Logger.withTag('PUT|collectionsSubscriptions').log(`Function handler ${ functionSlug } invoked.`);
  return await handlerFn(functionSlug, targetUsername, requestArgs, getAnalyticsObject(req));
}


export async function PATCH(req: NextRequest, { params }: { params: { functionSlug: string, targetUsername: string } }) {
  const requestArgs = await req.json();
  const { functionSlug, targetUsername } = params;

  // Check if the handler function exists
  if ( typeof handlerFn !== 'function' ) {
    return NextResponse.json(
      {
        status: 400,
        code: 'BAD_REQUEST',
        message: 'Unable to understand the request.'
      } as ApiError,
      {
        status: 400
      }
    );
  }

  Logger.withTag('PATCH|collectionsSubscriptions').log(`Function handler ${ functionSlug } invoked.`);
  return await handlerFn(functionSlug, targetUsername, requestArgs, getAnalyticsObject(req));
}

export async function DELETE(req: NextRequest, { params }: { params: { functionSlug: string, targetUsername: string } }) {
  const { searchParams } = new URL(req.url);
  const requestArgs = Object.fromEntries(searchParams);
  const { functionSlug, targetUsername } = params;

  // Check if the handler function exists
  if ( typeof handlerFn !== 'function' ) {
    return NextResponse.json(
      {
        status: 400,
        code: 'BAD_REQUEST',
        message: 'Unable to understand the request.'
      } as ApiError,
      {
        status: 400
      }
    );
  }

  Logger.withTag('DELETE|collectionsSubscriptions').log(`Function handler ${ functionSlug } invoked.`);
  return await handlerFn(functionSlug, targetUsername, requestArgs, getAnalyticsObject(req));
}
