import { getApiKeysForCurrentUser } from "@/app/actions/apiKeys";
import NewApiKeyButton from "@/app/components/apiKeys/new";
import Container from "@/components/shared/container";
import PageHeader from "@/components/shared/pageHeader";

export default async function ApiKeys() {
  const apiKeys = await getApiKeysForCurrentUser();

  if (!apiKeys.success) {
    return <div>Error!</div>;
  }

  const keys = apiKeys.data;

  return (
    <div className="h-full p-4">
      <Container maxWidth="md" fullHeight>
        <div className="flex flex-col" id="api-keys-page">
          <PageHeader
            title="Manage your API Keys"
            id="page_header"
            actions={[<NewApiKeyButton key={0} />]}
          />
          <div>{keys.length} keys found</div>
        </div>
      </Container>
    </div>
  );
}
