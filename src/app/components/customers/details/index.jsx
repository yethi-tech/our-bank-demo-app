"use client";

import React from "react";
import StaticFieldInfo from "./StaticFieldInfo";
import Moment from "react-moment";

const CustomerDetails = ({ customer }) => {
  let passportNumber = customer?.passport?.passportNumber;
  let passportIssueDate = customer?.passport?.issueDate;
  let passportExpiryDate = customer?.passport?.expiryDate;
  let passportIssuingCountry = customer?.passport?.issuingCountry;

  let currentAddress = customer.addresses.find((c) => c.type === "Current");
  let permanentAddress = customer.addresses.find((c) => c.type === "Permanent");

  return (
    <div id="customer_details_wrapper" className="h-full p-4 overflow-y-auto">
      <div id="customer_primary_info" className="py-2 grid grid-cols-3">
        <StaticFieldInfo
          fieldName="Customer ID"
          fieldValue={customer.customerId}
          id="customerId"
        />
        <StaticFieldInfo
          fieldName="Type / Branch"
          fieldValue={
            <p className="text-sm">
              {customer.type} / {customer.branchCode}
            </p>
          }
          id="typeAndBranchCode"
        />
        <StaticFieldInfo
          fieldName="Short Name"
          fieldValue={customer.shortName}
          id="shortName"
        />
      </div>
      <div id="customer_basic_info" className="py-2 grid grid-cols-2">
        <div className="my-2 col-span-2">
          <p className="text-sm font-semibold">Basic Information</p>
        </div>
        <StaticFieldInfo
          fieldName="First Name"
          fieldValue={customer.firstName}
          id="firstName"
        />
        <StaticFieldInfo
          fieldName="Middle Name"
          fieldValue={customer.middleName}
          id="middleName"
        />
        <StaticFieldInfo
          fieldName="Last Name"
          fieldValue={customer.lastName}
          id="lastName"
        />
        <StaticFieldInfo
          fieldName="Full Name"
          fieldValue={customer.fullName}
          id="fullName"
        />
        <StaticFieldInfo
          fieldName="Gender"
          fieldValue={customer.gender}
          id="gender"
        />
        <StaticFieldInfo
          fieldName="Date of Birth"
          fieldValue={
            <p className="text-sm">
              <Moment format="DD/MM/yyyy">{customer.dateOfBirth}</Moment>
            </p>
          }
          id="dateOfBirth"
        />
        <StaticFieldInfo
          fieldName="Prefix"
          fieldValue={customer.prefix}
          id="prefix"
        />
        <StaticFieldInfo
          fieldName="Minor"
          fieldValue={customer.minor ? "Yes" : "No"}
          id="minor"
        />
      </div>
      <div id="customer_kyc_info" className="py-2 grid grid-cols-2">
        <div className="my-2 col-span-2">
          <p className="text-sm font-semibold">Identification Information</p>
        </div>
        <StaticFieldInfo
          fieldName="Primary ID Type"
          fieldValue="Aadhaar Card"
          id="primaryIdType"
        />
        <StaticFieldInfo
          fieldName="Primary ID Number"
          fieldValue={customer.udid}
          id="udid"
        />
        <StaticFieldInfo
          fieldName="Passport No."
          id="passportNumber"
          fieldValue={passportNumber}
        />
        <StaticFieldInfo
          fieldName="Issue Date"
          id="passportIssueDate"
          fieldValue={passportIssueDate}
        />
        <StaticFieldInfo
          fieldName="Issue Date"
          id="passportIssuingCountry"
          fieldValue={passportIssuingCountry}
        />
        <StaticFieldInfo
          fieldName="Expiry Date"
          id="passportExpiryDate"
          fieldValue={passportExpiryDate}
        />
      </div>
      <div id="customer_contact_info" className="py-2 grid grid-cols-2">
        <div className="my-2 col-span-2">
          <p className="text-sm font-semibold">Contact Information</p>
        </div>
        <div className="my-2 text-sm font-semibold">Current Address</div>
        <div className="my-2 text-sm font-semibold">Permanent Address</div>

        <div>
          <StaticFieldInfo
            fieldName="Line 1"
            id="currentAddress?.line1"
            fieldValue={currentAddress?.line1}
          />
          <StaticFieldInfo
            fieldName="Line 2"
            id="currentAddress?.line2"
            fieldValue={currentAddress?.line2}
          />
          <StaticFieldInfo
            fieldName="Line 3"
            id="currentAddress?.line3"
            fieldValue={currentAddress?.line3}
          />
          <StaticFieldInfo
            fieldName="City"
            id="currentAddress?.city"
            fieldValue={currentAddress?.city}
          />
          <StaticFieldInfo
            fieldName="State"
            id="currentAddress?.state"
            fieldValue={currentAddress?.state}
          />
          <StaticFieldInfo
            fieldName="ZIP"
            id="currentAddress?.zipCode"
            fieldValue={currentAddress?.zipCode}
          />
          <StaticFieldInfo
            fieldName="Country"
            id="currentAddress?.country"
            fieldValue={currentAddress?.country}
          />
          <StaticFieldInfo
            fieldName="Phone Number"
            id="currentAddress?.phoneNumber"
            fieldValue={
              <>
                <p className="text-sm">
                  +{currentAddress?.phoneIsdCode}-{currentAddress?.phoneNumber}
                </p>
              </>
            }
          />
        </div>
        <div>
          <StaticFieldInfo
            fieldName="Line 1"
            id="permanentAddress?.line1"
            fieldValue={permanentAddress?.line1}
          />
          <StaticFieldInfo
            fieldName="Line 2"
            id="permanentAddress?.line2"
            fieldValue={permanentAddress?.line2}
          />
          <StaticFieldInfo
            fieldName="Line 3"
            id="permanentAddress?.line3"
            fieldValue={permanentAddress?.line3}
          />
          <StaticFieldInfo
            fieldName="City"
            id="permanentAddress?.city"
            fieldValue={permanentAddress?.city}
          />
          <StaticFieldInfo
            fieldName="State"
            id="permanentAddress?.state"
            fieldValue={permanentAddress?.state}
          />
          <StaticFieldInfo
            fieldName="ZIP"
            id="permanentAddress?.zipCode"
            fieldValue={permanentAddress?.zipCode}
          />
          <StaticFieldInfo
            fieldName="Country"
            id="permanentAddress?.country"
            fieldValue={permanentAddress?.country}
          />
          <StaticFieldInfo
            fieldName="Phone Number"
            id="permanentAddress?.phoneNumber"
            fieldValue={
              <>
                <p className="text-sm">
                  +{permanentAddress?.phoneIsdCode}-
                  {permanentAddress?.phoneNumber}
                </p>
              </>
            }
          />
        </div>
      </div>
      <div id="customer_basic_info" className="py-2 grid grid-cols-2">
        <div className="my-2 col-span-2">
          <p className="text-sm font-semibold">
            Relationship & Audit Information
          </p>
        </div>
        <StaticFieldInfo
          fieldName="Relationship Manager"
          fieldValue={customer.relationshipManager?.name}
          id="relationshipManagerName"
        />
        <StaticFieldInfo
          fieldName="Authorization Status"
          fieldValue={customer.authStatus}
          id="authStatus"
        />
        <StaticFieldInfo
          fieldName="Maker"
          fieldValue={customer.maker}
          id="maker"
        />
        <StaticFieldInfo
          fieldName="Record Last Updated"
          fieldValue={
            <p className="text-sm">
              <Moment format="DD/MM/yyyy HH:mm:ss">{customer.updatedAt}</Moment>
            </p>
          }
          id="updatedOn"
        />
      </div>
    </div>
  );
};

export default CustomerDetails;
