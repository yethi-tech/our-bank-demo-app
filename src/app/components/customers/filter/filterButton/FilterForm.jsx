import Input from "@/components/shared/input";
import Select from "@/components/shared/select";
import React from "react";

const FilterForm = ({ criteria, setCriteria }) => {
  return (
    <div className="p-4 grid grid-cols-2" id="filter_form">
      <div className="my-2 px-1 col-span-2">
        <Input
          label="Customer ID"
          value={criteria.customerId}
          onChange={(e) =>
            setCriteria({ ...criteria, customerId: e.target.value })
          }
          id="customerId"
          name="customerId"
        />
      </div>
      <div className="my-2 px-1 col-span-2">
        <Input
          label="Primary ID Number"
          value={criteria.udid}
          onChange={(e) => setCriteria({ ...criteria, udid: e.target.value })}
          id="udid"
          name="udid"
        />
      </div>
      <div className="my-2 px-1 col-span-1">
        <Input
          label="Branch Code"
          value={criteria.branchCode}
          onChange={(e) =>
            setCriteria({ ...criteria, branchCode: e.target.value })
          }
          id="branchCode"
          name="branchCode"
        />
      </div>
      <div className="my-2 px-1 col-span-1">
        <Select
          options={["Authorized", "Unauthorized"]}
          value={criteria.authStatus}
          onChange={(val) => setCriteria({ ...criteria, authStatus: val })}
          label="Authorization Status"
        />
      </div>
    </div>
  );
};

export default FilterForm;
