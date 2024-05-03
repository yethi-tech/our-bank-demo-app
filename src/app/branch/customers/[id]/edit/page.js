import { getCustomerById } from "@/app/actions/customers";
import CustomerForm from "@/app/components/customers/addForm";

export default async function CustomerDetailsPage({ params }) {
  const customerResponse = await getCustomerById(params.id);

  if (!customerResponse.success) {
    return <div>Error!</div>;
  }

  const customer = customerResponse.data;

  return (
    <div
      className="h-full container px-8 mx-auto py-4 flex flex-col overflow-y-auto"
      id="edit_customer_page_wrapper"
    >
      <CustomerForm customer={customer} />
    </div>
  );
}
