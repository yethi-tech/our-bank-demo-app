import { getCustomerById } from "@/app/actions/customers";
import CustomerDetails from "@/app/components/customers/details";
import SuspenseFallback from "@/app/components/suspenseFallback";
import Button from "@/components/shared/button";
import PageContent from "@/components/shared/pageContent";
import PageHeader from "@/components/shared/pageHeader";
import Link from "next/link";
import { Suspense } from "react";
import { AiFillUnlock } from "react-icons/ai";
import { GrUserAdmin } from "react-icons/gr";

export default async function CustomerDetailsPage({ params }) {
  const customerResponse = await getCustomerById(params.id);

  if (!customerResponse.success) {
    return <div>Error!</div>;
  }

  const customer = customerResponse.data;

  return (
    <div
      className="h-full overflow-hidden p-4 flex flex-col"
      id="customer_details_page"
    >
      <PageHeader
        title="Customer Details"
        id="page_header"
        actions={[
          <Button
            variant="contained"
            size="small"
            id="btn_authorize"
            key="authorize"
            icon={<GrUserAdmin />}
          >
            Authorize
          </Button>,
          <Button
            variant="outlined"
            size="small"
            id="btn_unlock"
            as={Link}
            // icon="edit"
            icon={<AiFillUnlock />}
            href={`/branch/customers/${customer.id}/edit`}
            key="edit"
          >
            Unlock
          </Button>,
          <Button
            variant="outlined"
            size="small"
            id="btn_back"
            as={Link}
            icon="back"
            href="/branch/customers"
            key="back"
          >
            Back
          </Button>,
        ]}
      />
      <PageContent id="content" fillHeight={true}>
        <Suspense fallback={<SuspenseFallback />}>
          <CustomerDetails customer={customer} />
        </Suspense>
      </PageContent>
    </div>
  );
}
