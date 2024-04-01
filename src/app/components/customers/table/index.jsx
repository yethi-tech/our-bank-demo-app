"use client";

import PropTypes from "prop-types";
import Table from "@/components/shared/table";
import Link from "next/link";

const columns = [
  {
    name: "customerId",
    display: "Customer ID",
    width: "120px",
    render: (item) => (
      <Link href={`/branch/customers/${item.id}`}>
        <span className="text-tenjin-primary">{item.customerId}</span>
      </Link>
    ),
  },
  {
    name: "shortName",
    display: "Short Name",
    width: "180px",
  },
  {
    name: "fullName",
    display: "Full Name",
    width: "240px",
  },
  {
    name: "type",
    display: "Type",
    width: "120px",
  },
  {
    name: "residentStatus",
    display: "Residential Status",
    width: "120px",
  },
  {
    name: "branchCode",
    display: "Branch Code",
    width: "60px",
  },
  {
    name: "authStatus",
    display: "Authorization",
    width: "120px",
  },
];

const CustomersTable = ({ customers }) => {
  if (!customers) {
    return <></>;
  }

  return (
    <Table
      id="customers_table"
      columns={columns}
      data={customers.data}
      size="small"
    />
  );
};

CustomersTable.propTypes = {
  customers: PropTypes.array.isRequired,
};

export default CustomersTable;
