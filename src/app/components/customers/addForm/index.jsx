"use client";

import { CONFIRM_CANCEL } from "@/app/utils/messages";
import Button from "@/components/shared/button";
import Checkbox from "@/components/shared/checkbox";
import Input from "@/components/shared/input";
import Select from "@/components/shared/select";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createCustomer } from "@/app/actions/customers";

const initialState = {
  message: "",
  success: false,
};

const customerTypes = ["Individual", "Corporate"];
const countries = [
  { code: "IN", name: "India" },
  { code: "US", name: "USA" },
];

const CustomerForm = ({ customer }) => {
  const router = useRouter();
  const [state, formAction] = useFormState(createCustomer, initialState);

  const handleCancel = (e) => {
    e.preventDefault();
    if (window.confirm(CONFIRM_CANCEL)) {
      router.push("/branch/customers");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const postObject = {};
    for (var pair of formData.entries()) {
      const [key, value] = pair;
      postObject[key] = value;
    }

    console.log(postObject);
  };

  const { pending } = useFormStatus();

  const { success, message } = state;

  return (
    <div id="form">
      <form name="customer_form" action={formAction}>
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              {customer ? "Update Customer" : "New Customer"}
            </h2>
          </div>
          {!success && message ? (
            <div className="error-message" id="errorMessage">
              <p className="text-sm text-tenjin-error">{message}</p>
            </div>
          ) : (
            <></>
          )}
          <BasicDetails customer={customer} />
          <PersonalDetails customer={customer} />
          <IdentificationDetails customer={customer} />
          <ContactDetails customer={customer} />
          <div className="my-3 py-3 border-t flex flex-row items-center justify-end gap-2">
            <Button size="small" id="btnCancel" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              disabled={pending}
              loading={pending}
              loadingText="Please wait..."
              size="small"
              id="btnSave"
              type="submit"
              variant="contained"
              icon="save"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

const BasicDetails = ({ customer }) => {
  return (
    <div
      id="main_details"
      className="border p-3 rounded-md w-full grid grid-cols-12 mt-1 gap-x-6 gap-y-8 shadow-md"
    >
      <div className="col-span-2">
        <Select
          label="Type"
          options={customerTypes}
          defaultValue={customer?.type}
          isRequired
          id="customerType"
          name="type"
        />
      </div>
      <div className="col-span-4">
        <Input
          autoFocus
          id="fullName"
          name="fullName"
          isRequired
          label="Full Name"
        />
      </div>
      <div className="col-span-3">
        <Input id="shortName" name="shortName" isRequired label="Short Name" />
      </div>
      <div className="col-span-2">
        <Input
          id="branchCode"
          name="branchCode"
          defaultValue="001"
          isRequired
          label="Branch Code"
        />
      </div>
    </div>
  );
};

const PersonalDetails = ({ customer }) => {
  return (
    <div
      id="personal_details"
      className="border p-3 rounded-md w-full grid grid-cols-12 mt-1 gap-x-6 gap-y-4 shadow-md"
    >
      <div className="col-span-12 mb-3">
        <h4 className="text-sm font-semibold">Personal Details</h4>
      </div>
      <div className="col-span-2">
        <Select
          label="Prefix"
          options={["Mr.", "Mrs.", "Ms.", "Master", "Dr.", "Sir", "Lord"]}
          id="prefix"
          name="prefix"
        />
      </div>
      <div className="col-span-3">
        <Input label="First Name" isRequired id="firstName" name="firstName" />
      </div>
      <div className="col-span-3">
        <Input label="Middle Name" id="middleName" name="middleName" />
      </div>
      <div className="col-span-3">
        <Input label="Last Name" id="lastName" name="lastName" />
      </div>
      <div className="col-span-2">
        <Select
          label="Gender"
          isRequired
          options={["Male", "Female", "Other", "Undisclosed"]}
          id="gender"
          name="gender"
        />
      </div>
      <div className="col-span-3">
        <Input
          label="Date of Birth"
          isRequired
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
        />
      </div>
      <div className="col-span-2">
        <Select
          label="Resident Status"
          isRequired
          id="residentStatus"
          name="residentStatus"
          options={["Resident", "Non-Resident"]}
        />
      </div>
    </div>
  );
};

const ContactDetails = ({ customer }) => {
  const [
    permenantAddressSameAsContactAddress,
    setPermanentAddressSameAsContactAddress,
  ] = useState(true);
  const onAddressCheckChange = (e) => {
    setPermanentAddressSameAsContactAddress(e.target.checked);
  };
  return (
    <div
      id="contact_details"
      className="border p-3 rounded-md w-full grid grid-cols-12 mt-1 gap-x-6 gap-y-4 shadow-md"
    >
      <input
        type="hidden"
        name="permanentAddressSameAsContactAddress"
        value={permenantAddressSameAsContactAddress}
      />
      <div className="col-span-4 grid grid-cols-2" id="contact_address_block">
        <div className="col-span-2 mb-3">
          <h4 className="text-sm font-semibold">Current Address</h4>
        </div>
        <AddressBlock addressType={"current"} customer={customer} />
      </div>
      <div className="col-span-4 grid grid-cols-2" id="contact_address_block">
        <div className="col-span-2 mb-3 flex flex-row items-center">
          <h4 className="text-sm font-semibold">Permanent Address</h4>
          <div className="ml-3">
            <Checkbox
              checked={permenantAddressSameAsContactAddress}
              onChange={onAddressCheckChange}
              label="Same as Current Address"
              id="sameAsCurrentAddress"
              name="sameAsCurrentAddress"
            />
          </div>
        </div>

        <AddressBlock
          addressType={"permanent"}
          customer={customer}
          disabled={permenantAddressSameAsContactAddress}
        />
      </div>
    </div>
  );
};

const AddressBlock = ({ addressType, customer, disabled }) => {
  return (
    <>
      <div className="col-span-2">
        <Input
          label="Address"
          placeholder="Line 1"
          id={`${addressType}_line1`}
          name={`${addressType}_line1`}
          isRequired
          disabled={disabled}
        />
      </div>
      <div className="col-span-2">
        <Input
          placeholder="Line 2"
          id={`${addressType}_line2`}
          name={`${addressType}_line2`}
          disabled={disabled}
        />
      </div>
      <div className="col-span-2">
        <Input
          placeholder="Line 3"
          id={`${addressType}_line3`}
          name={`${addressType}_line3`}
          disabled={disabled}
        />
      </div>
      <div className="col-span-2 mt-3">
        <Input
          label="City"
          id={`${addressType}_city`}
          name={`${addressType}_city`}
          disabled={disabled}
          isRequired
        />
      </div>
      <div className="col-span-2 mt-1">
        <Input
          label="State"
          id={`${addressType}_state`}
          name={`${addressType}_state`}
          disabled={disabled}
          isRequired
        />
      </div>
      <div className="col-span-1 mt-1">
        <Input
          label="Zip Code"
          isRequired
          id={`${addressType}_zip`}
          name={`${addressType}_zip`}
          disabled={disabled}
        />
      </div>
      <div className="col-span-2 mt-1">
        <Select
          label="Country"
          options={countries}
          by={"code"}
          labelKey={"name"}
          isRequired
          id={`${addressType}_country`}
          name={`${addressType}_country`}
          disabled={disabled}
        />
      </div>
      <div className="col-span-2 mt-1">
        <Input
          label="Phone Number"
          isRequired
          id={`${addressType}_phoneNumber`}
          name={`${addressType}_phoneNumber`}
          disabled={disabled}
        />
      </div>
    </>
  );
};

const IdentificationDetails = ({ customer }) => {
  return (
    <div
      id="identification_details"
      className="border p-3 rounded-md w-full grid grid-cols-12 mt-1 gap-x-6 gap-y-4 shadow-md"
    >
      <div className="col-span-12 mb-3">
        <h4 className="text-sm font-semibold">Identification Details</h4>
      </div>
      <div className="col-span-3">
        <Input label="Aadhaar No." isRequired id="udid" name="udid" />
      </div>
      <div className="col-span-9"></div>
      <div className="col-span-3">
        <Input label="Passport No." id="passportNo" name="passportNo" />
      </div>
      <div className="col-span-3">
        <Input
          label="Issue Date"
          id="passportIssueDate"
          type="date"
          name="passportIssueDate"
        />
      </div>
      <div className="col-span-3">
        <Input
          label="Expiry Date"
          id="passportExpiryDate"
          type="date"
          name="passportExpiryDate"
        />
      </div>
    </div>
  );
};

export default CustomerForm;
