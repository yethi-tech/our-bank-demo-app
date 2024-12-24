import { createCustomer, getCustomers } from "@/app/actions/customers";
import { getApiKey } from "@/server/apiKeys";
import {
  MEDIA_TYPE_APPLICATION_JSON,
  MEDIA_TYPE_APPLICATION_XML,
} from "@/utils/constants";
import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { NextResponse } from "next/server";

const xmlOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  format: true,
  suppressEmptyNode: true,
};

export const jsonToXml = (data) => {
  const builder = new XMLBuilder(xmlOptions);
  return builder.build(data);
};

export const xmlToJson = (xml) => {
  const parser = new XMLParser(xmlOptions);
  return parser.parse(xml);
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

// Example wrapper for your response data
export const wrapCustomersResponse = (data) => {
  const { totalRecords, totalPages, data: customers } = data;

  return {
    CustomerSearchResponse: {
      totalRecords,
      totalPages,
      Customers: {
        Customer: customers.map((customer) => {
          const { addresses, passport, ...restOfCustomer } = customer;
          return {
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
        }),
      },
    },
  };
};

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

export async function GET(request) {
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
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const pageSize = parseInt(searchParams.get("pageSize") ?? 10);

    const include = "addresses,passport";

    const customers = await getCustomers(
      pageSize,
      page,
      { customerId: "asc" },
      {},
      include
    );

    const { success, data, message } = customers;

    if (success) {
      if (acceptHeader !== MEDIA_TYPE_APPLICATION_XML) {
        return NextResponse.json(data);
      }

      const wrappedData = wrapCustomersResponse(data);
      const xmlResponse = jsonToXml(wrappedData);

      return new NextResponse(xmlResponse, {
        status: 200,
        headers: {
          "Content-Type": "application/xml",
        },
      });
    } else {
      return getErrorResponse(acceptHeader, message, 500);
    }
  } catch (error) {
    console.error(error);
    return getErrorResponse(acceptHeader, "Failed to Fetch Customers", 500);
  }
}

export async function POST(request) {
  let user = null;
  try {
    user = await validateApiKey(request);
  } catch (error) {
    return getErrorResponse(
      "application/json",
      "You must be authenticated to access this resource",
      401
    );
  }
  try {
    const customerRequest = await request.json();

    const { currentAddress, permanentAddress, passport, ...rest } =
      customerRequest;

    const dataToBeSubmitted = {
      ...rest,
      permanentAddressSameAsContactAddress: false,
    };

    if (currentAddress) {
      const { line1, line2, line3, city, state, zipCode, phoneNumber } =
        currentAddress;
      dataToBeSubmitted.current_line1 = line1;
      dataToBeSubmitted.current_line2 = line2;
      dataToBeSubmitted.current_line3 = line3;
      dataToBeSubmitted.current_city = city;
      dataToBeSubmitted.current_state = state;
      dataToBeSubmitted.current_zip = zipCode;
      dataToBeSubmitted.current_phoneNumber = phoneNumber;
    }
    if (permanentAddress) {
      const { line1, line2, line3, city, state, zipCode, phoneNumber } =
        permanentAddress;
      dataToBeSubmitted.permanent_line1 = line1;
      dataToBeSubmitted.permanent_line2 = line2;
      dataToBeSubmitted.permanent_line3 = line3;
      dataToBeSubmitted.permanent_city = city;
      dataToBeSubmitted.permanent_state = state;
      dataToBeSubmitted.permanent_zip = zipCode;
      dataToBeSubmitted.permanent_phoneNumber = phoneNumber;
    }

    if (passport) {
      const { passportNumber, issueDate, expiryDate } = passport;
      dataToBeSubmitted.passportNumber = passportNumber;
      dataToBeSubmitted.issueDate = issueDate;
      dataToBeSubmitted.expiryDate = expiryDate;
    }

    const response = await createCustomer(dataToBeSubmitted, user?.userId);
    if (response.success) {
      return NextResponse.json({
        id: response.data.id,
        customerId: response.data.customerId,
        type: response.data.type,
        shortName: response.data.shortName,
        fullName: response.data.fullName,
      });
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: response.message,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to create customer",
      },
      { status: 500 }
    );
  }
}
