import AddCustomerForm from "@/app/components/customers/addForm";

export default function NewCustomerPage() {
  return (
    <div
      className="h-full container px-8 mx-auto py-4 flex flex-col overflow-y-auto"
      id="new_customer_page_wrapper"
    >
      <AddCustomerForm />
    </div>
  );
}
