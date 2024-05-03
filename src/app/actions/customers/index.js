"use server";

import {
  createNewCustomer,
  updateCustomer as updateExistingCustomer,
  findById,
  findByShortName,
  findByUdid,
  searchCustomers,
  updateCustomerById,
} from "@/server/customers";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function getCustomers(pageSize, currentPage, sort, criteria) {
  try {
    const result = await searchCustomers(pageSize, currentPage, sort, criteria);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function getCustomerById(id) {
  let customerId = id ? Number(id) : 0;
  try {
    const result = await findById(customerId);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, data: error.message };
  }
}

export async function createCustomer(prevState, formData) {
  if (!formData) {
    return { success: false, message: null };
  }

  const session = await getServerSession(authOptions);

  const postedObject = {};
  for (var pair of formData.entries()) {
    const [key, value] = pair;
    postedObject[key] = value;
  }

  const {
    fullName,
    prefix,
    shortName,
    branchCode,
    firstName,
    middleName,
    lastName,
    udid,
    gender,
    dateOfBirth,
    residentStatus,
    type,
  } = postedObject;

  const customerToCreate = {
    fullName,
    prefix,
    shortName: shortName.toUpperCase(),
    branchCode,
    firstName,
    lastName,
    middleName,
    udid,
    gender,
    residentStatus,
    type,
    maker: session.user.userId,
  };

  try {
    validateMandatoryFields(customerToCreate);
  } catch (error) {
    return { success: false, message: error };
  }

  if (!dateOfBirth) {
    return { success: false, message: "Date of Birth is required" };
  } else {
    customerToCreate.dateOfBirth = new Date(dateOfBirth).toISOString();
    customerToCreate.minor = isMinor(dateOfBirth);
  }

  const customerByShortName = await findByShortName(shortName);
  if (customerByShortName) {
    return { success: false, message: "This short name is already used" };
  }

  const customerByUdid = await findByUdid(udid);
  if (customerByUdid) {
    return { success: false, message: "This UDID is already used" };
  }

  try {
    validatePassportInfo(postedObject, customerToCreate);
    validateAddresses(postedObject, customerToCreate);
  } catch (error) {
    return {
      success: false,
      message: error.message || "An internal error occurred",
    };
  }

  customerToCreate.authStatus = "Unauthorized";

  console.log("Final Customer data: ", JSON.stringify(customerToCreate));

  try {
    let createdCustomer = await createNewCustomer(customerToCreate);
    return {
      success: true,
      message:
        "Customer created successfully with ID: " + createdCustomer.customerId,
    };
  } catch (error) {
    console.error("ERROR creating customer", error);
    return { success: false, message: "An internal error occurred." };
  }
}

export async function updateCustomer(prevState, formData) {
  if (!formData) {
    return { success: false, message: null };
  }

  const session = await getServerSession(authOptions);

  const postedObject = {};
  for (var pair of formData.entries()) {
    const [key, value] = pair;
    postedObject[key] = value;
  }

  const {
    fullName,
    prefix,
    shortName,
    branchCode,
    firstName,
    middleName,
    lastName,
    udid,
    gender,
    dateOfBirth,
    residentStatus,
    type,
  } = postedObject;

  let customerByIdResponse = await getCustomerById(Number(postedObject.id));

  if (!customerByIdResponse.success) {
    return { success: false, message: "This customer does not exist." };
  }

  let customer = customerByIdResponse.data;

  const customerToUpdate = {
    fullName,
    prefix,
    shortName: shortName.toUpperCase(),
    branchCode,
    firstName,
    lastName,
    middleName,
    udid,
    gender,
    residentStatus,
    type,
    maker: session.user.userId,
  };

  try {
    validateMandatoryFields(customerToUpdate);
  } catch (error) {
    return { success: false, message: error };
  }

  if (!dateOfBirth) {
    return { success: false, message: "Date of Birth is required" };
  } else {
    customerToUpdate.dateOfBirth = new Date(dateOfBirth).toISOString();
    customerToUpdate.minor = isMinor(dateOfBirth);
  }

  if (customer.shortName !== shortName) {
    const customerByShortName = await findByShortName(shortName);
    if (customerByShortName) {
      return { success: false, message: "This short name is already used" };
    }
  }

  if (customer.udid !== udid) {
    const customerByUdid = await findByUdid(udid);
    if (customerByUdid) {
      return { success: false, message: "This UDID is already used" };
    }
  }

  try {
    validatePassportInfo(postedObject, customerToUpdate);
    validateAddresses(postedObject, customerToUpdate);
  } catch (error) {
    return {
      success: false,
      message: error.message || "An internal error occurred",
    };
  }

  customerToUpdate.authStatus = "Unauthorized";

  console.log("Final Customer data: ", JSON.stringify(customerToUpdate));

  try {
    await updateExistingCustomer(customer.id, customerToUpdate);
    return {
      success: true,
      message: `Record Updated Successfully!`,
    };
  } catch (error) {
    console.error("ERROR updating customer", error);
    return { success: false, message: "An internal error occurred." };
  }
}

export async function authorizeCustomer(id) {
  let customerByIdResponse = await getCustomerById(id);
  if (customerByIdResponse.success) {
    let customer = customerByIdResponse.data;
    const session = await getServerSession(authOptions);

    const checker = session.user.userId;
    if (checker === customer.maker) {
      return {
        success: false,
        message: "Record cannot be authorized by Maker",
      };
    }

    try {
      await updateCustomerById(id, {
        checker: checker,
        authStatus: "Authorized",
      });
      return { success: true, message: "Record successfully authorized." };
    } catch (error) {
      console.error("ERROR authorizing customer", error);
      return { success: false, message: "An internal error occurred." };
    }
  }
}

const isMinor = (dateOfBirth) => {
  const eighteenYearsAgo = new Date(dateOfBirth);
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() + 18);

  const currentDate = new Date();
  return currentDate > eighteenYearsAgo;
};

const validateAddresses = (requestData, customerToCreate) => {
  const {
    permanentAddressSameAsContactAddress,
    current_line1,
    current_line2,
    current_line3,
    current_city,
    current_state,
    current_zip,
    current_phoneNumber,
    permanent_line1,
    permanent_line2,
    permanent_line3,
    permanent_city,
    permanent_state,
    permanent_zip,
    permanent_phoneNumber,
  } = requestData;

  const requiredCurrentAddressFields = {
    current_line1: "Current Address Line 1",
    current_city: "Current Address City",
    current_state: "Current Address State",
    current_zip: "Current Address Zip",
    current_phoneNumber: "Current Address Phone Number",
  };

  Object.keys(requiredCurrentAddressFields).forEach((key) => {
    if (!requestData[key]) {
      throw new Error(`${requiredCurrentAddressFields[key]} is Required`);
    }
  });

  let currentAddress = {
    type: "Current",
    line1: current_line1,
    line2: current_line2,
    line3: current_line3,
    city: current_city,
    state: current_state,
    zipCode: current_zip,
    country: "IN",
    phoneIsdCode: "91",
    phoneNumber: current_phoneNumber,
  };

  customerToCreate.addresses = [currentAddress];

  if (Boolean(permanentAddressSameAsContactAddress)) {
    customerToCreate.addresses.push({ ...currentAddress, type: "Permanent" });
  } else {
    const requiredPermanenttAddressFields = {
      current_line1: "Permanent Address Line 1",
      permanent_city: "Permanent Address City",
      permanent_state: "Permanent Address State",
      permanent_zip: "Permanent Address Zip",
      permanent_phoneNumber: "Permanent Address Phone Number",
    };

    Object.keys(requiredPermanenttAddressFields).forEach((key) => {
      if (!requestData[key]) {
        throw new Error(`${requiredPermanenttAddressFields[key]} is Required`);
      }
    });

    let permanentAddress = {
      type: "Permanent",
      line1: permanent_line1,
      line2: permanent_line2,
      line3: permanent_line3,
      city: permanent_city,
      state: permanent_state,
      zipCode: permanent_zip,
      country: "IN",
      phoneIsdCode: "91",
      phoneNumber: permanent_phoneNumber,
    };

    customerToCreate.addresses.push(permanentAddress);
  }
};

const validatePassportInfo = (requestData, customerToCreate) => {
  if (requestData.passportNo) {
    if (!requestData.passportIssueDate || !requestData.passportExpiryDate) {
      throw new Error("Passport Issue / Expiry Date is required");
    }

    customerToCreate.passport = {
      passportNumber: requestData.passportNo,
      issueDate: requestData.passportIssueDate,
      expiryDate: requestData.passportExpiryDate,
      issuingCountry: "IN",
    };
  }
};

const validateMandatoryFields = (customerToCreate) => {
  const mandatoryFields = [
    "type",
    "fullName",
    "firstName",
    "shortName",
    "gender",
    "residentStatus",
    "udid",
  ];

  for (const field of mandatoryFields) {
    const fieldName = field.replace(/([a-z])([A-Z])/g, "$1 $2"); // Split camel case into two words
    if (!customerToCreate[field]) {
      throw `${
        fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
      } is required`;
    }
  }
};
