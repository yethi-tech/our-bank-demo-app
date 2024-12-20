import { createCustomer, getCustomers } from "@/app/actions/customers";
import { NextResponse } from "next/server";

export async function GET(request) {
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
      return NextResponse.json(data);
    } else {
      return NextResponse.json(
        {
          status: "error",
          message,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch customers",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
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

    const response = await createCustomer(dataToBeSubmitted, "user1");
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
