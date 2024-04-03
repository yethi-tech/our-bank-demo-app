import FilterButton from "@/app/components/customers/filter/filterButton";
import CustomerList from "@/app/components/customers/list";
import SuspenseFallback from "@/app/components/suspenseFallback";
import { SearchCriteriaProvider } from "@/app/contexts/SearchCriteriaContext";
import Button from "@/components/shared/button";
import PageContent from "@/components/shared/pageContent";
import PageHeader from "@/components/shared/pageHeader";
import Link from "next/link";
import { Suspense } from "react";

export default function CustomersListPage() {
  return (
    <div
      className="h-full overflow-hidden p-4 flex flex-col"
      id="customers_list_page"
    >
      <SearchCriteriaProvider>
        <PageHeader
          title="Customers"
          id="page_header"
          actions={[
            <FilterButton key="filters" />,
            <Button
              variant="contained"
              size="small"
              id="btn_create_customer"
              icon="plus"
              as={Link}
              href="/branch/customers/new"
              key="newCustomer"
            >
              New Customer
            </Button>,
          ]}
        />
        <PageContent id="content" fillHeight>
          <Suspense fallback={<SuspenseFallback />}>
            <CustomerList />
          </Suspense>
        </PageContent>
      </SearchCriteriaProvider>
    </div>
  );
}
