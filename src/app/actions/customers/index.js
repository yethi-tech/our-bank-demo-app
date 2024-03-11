"use server";

import {
  createNewCustomer,
  findByShortName,
  findByUdid,
} from "@/server/customers";

export async function createCustomer(prevState, formData) {
  const postedObject = {};
  for (var pair of formData.entries()) {
    const [key, value] = pair;
    postedObject[key] = value;
  }

  console.log("Building entity...");

  const {
    fullName,
    shortName,
    branchCode,
    firstName,
    middleName,
    lastName,
    udid,
    gender,
    dateOfBirth,
  } = postedObject;

  const customerToCreate = {
    fullName,
    shortName: shortName.toUpperCase(),
    branchCode,
    firstName,
    lastName,
    middleName,
    dateOfBirth,
    udid,
    gender,
  };

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
    let createdCustomer = await createNewCustomer(customerToCreate);
    return {
      success: true,
      message:
        "Customer created successfully with ID: " + createdCustomer.customerId,
    };
  } catch (error) {
    return { success: false, message: "An internal error occurred." };
  }
}

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
