"use client";

import { revokeApiKey } from "@/app/actions/apiKeys";
import Button from "@/components/shared/button";
import Error from "@/components/shared/error";
import Input from "@/components/shared/input";
import Table from "@/components/shared/table";
import React, { useState } from "react";
import Moment from "react-moment";

const ApiKeysList = ({ keys }) => {
  const [filter, setFilter] = useState("");
  const [revokingKeyId, setRevokingKeyId] = useState(null);
  const [revokedKeyIds, setRevokedKeyIds] = useState([]);

  const onRevoke = async (key) => {
    if (
      window.confirm(
        `You are trying to revoke key [${key.name}].\nDoing so will cause any apps using this key to stop functioning.\nAre you sure?`
      )
    ) {
      setRevokingKeyId(key.id);
      const response = await revokeApiKey(key.id);
      if (response.success) {
        setRevokingKeyId(null);
        setRevokedKeyIds([...revokedKeyIds, key.id]);
      } else {
        <Error message={response.message} />;
      }
    }
  };

  const columns = [
    {
      name: "name",
      display: "Name",
      width: "240px",
      render: (item) => (
        <div className="w-full overflow-hidden whitespace-nowrap text-ellipsis">
          <span
            className={revokedKeyIds.includes(item.id) ? "line-through" : ""}
          >
            {item.name}
          </span>
        </div>
      ),
    },
    {
      name: "key",
      display: "Key",
      width: "360px",
      render: (item) => (
        <div className="w-full overflow-hidden whitespace-nowrap text-ellipsis">
          <span
            className={revokedKeyIds.includes(item.id) ? "line-through" : ""}
          >
            {item.key.substring(0, 7) + "**********"}
          </span>
        </div>
      ),
    },
    {
      name: "lastUsedAt",
      display: "Last Used",
      width: "120px",
      render: (item) => (
        <div className="w-full overflow-hidden whitespace-nowrap text-ellipsis">
          <p
            className={`text-sm ${
              revokedKeyIds.includes(item.id) ? "line-through" : ""
            }`}
          >
            <Moment fromNow>{item.lastUsedAt}</Moment>
          </p>
        </div>
      ),
    },
    {
      name: "actions",
      display: "Actions",
      width: "120px",
      render: (item) => (
        <div className="flex flex-row gap-2">
          <Button
            className="btn-revoke"
            size="small"
            id={`btn-delete-${item.id}`}
            color={revokedKeyIds.includes(item.id) ? "error" : "primary"}
            onClick={() => onRevoke(item)}
            disabled={
              revokingKeyId === item.id || revokedKeyIds.includes(item.id)
            }
          >
            {revokingKeyId === item.id
              ? "Revoking..."
              : revokedKeyIds.includes(item.id)
              ? "Revoked"
              : "Revoke"}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div id="api-keys-list-container" className="flex flex-col gap-4">
      <div
        className="my-2 flex flex-row items-center gap-2"
        id="search-container"
      >
        <div className="w-[40%]">
          <Input
            fullWidth
            id="txt-search-keys"
            placeholder="Search by name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      <div id="list-container">
        <Table id="api-keys-table" columns={columns} data={keys} size="small" />
      </div>
    </div>
  );
};

export default ApiKeysList;
