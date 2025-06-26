import { getApiKey } from "@/server/apiKeys";
import { NextResponse } from "next/server";
import { jsonToXml } from "../route";
import { getCustomerById } from "@/app/actions/customers";

const validateApiKey = async (request) => {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    throw new Error("Authorization header is missing");
  }

  const apiKey = authHeader.replace("Bearer ", "");
  try {
    const validKey = await getApiKey(apiKey);
    return validKey.user;
  } catch (error) {
    console.error("Error validating API Key", error);
    throw new Error();
  }
};

const getErrorResponse = (acceptHeader, errorMessage, statusCode) => {
  if (acceptHeader !== MEDIA_TYPE_APPLICATION_XML) {
    return NextResponse.json(
      {
        status: "error",
        message: errorMessage || "An unexpected error occurred",
      },
      { status: statusCode }
    );
  }

  const xmlWrapper = {
    ServerError: {
      status: "error",
      message: errorMessage || "An unexpected error occurred",
    },
  };

  const xmlResponse = jsonToXml(xmlWrapper);
  return new NextResponse(xmlResponse, {
    status: statusCode,
    headers: {
      "Content-Type": "application/xml",
    },
  });
};

export async function GET(request, { params }) {
  const acceptHeader =
    request.headers.get("accept") || MEDIA_TYPE_APPLICATION_JSON;

  try {
    await validateApiKey(request);
  } catch (error) {
    return getErrorResponse(
      acceptHeader,
      "You must be authenticated to access this resource",
      401
    );
  }
  try {
    const { id } = await params;
    const searchResult = await getCustomerById(id);
    const { success, data: customer } = searchResult;

    if (success) {
      const { addresses, passport, ...restOfCustomer } = customer;
      const wrappedResponse = {
        ...restOfCustomer,
        Addresses: addresses
          ? {
              Address: addresses.map((addr) => ({
                ...addr,
              })),
            }
          : undefined,
        Passport: passport
          ? {
              ...passport,
            }
          : undefined,
      };

      return NextResponse.json(wrappedResponse);
    } else {
      return getErrorResponse(
        acceptHeader,
        "The requested record was not found",
        404
      );
    }
  } catch (error) {
    return getErrorResponse(acceptHeader, "An unexpected error occurred", 500);
  }
}
