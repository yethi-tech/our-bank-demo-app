"use client";

import { createApiKey } from "@/app/actions/apiKeys";
import Button from "@/components/shared/button";
import IconButton from "@/components/shared/iconButton";
import Input from "@/components/shared/input";
import React, { useState } from "react";
import { AiFillCheckCircle, AiFillCopy } from "react-icons/ai";

const NewApiKeyButton = () => {
  const [createdApiKey, setCreatedApiKey] = useState(null);
  const [open, setOpen] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [error, setError] = useState("");
  const onSave = async () => {
    if (keyName === "") {
      return;
    }

    const response = await createApiKey(keyName);
    if (response.success) {
      setCreatedApiKey(response.data);
    } else {
      setError(response.data);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(createdApiKey.key).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const [copied, setCopied] = useState(false);

  const closeAndRefresh = () => {
    setOpen(false);
    setCreatedApiKey(null);
    setKeyName("");
    setError("");
    window.location.reload();
  };

  return (
    <>
      <Button
        size="small"
        variant="contained"
        icon="plus"
        onClick={() => setOpen(true)}
      >
        New API Key
      </Button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-400 bg-opacity-60 z-50">
          <div className="bg-white p-6 rounded shadow-lg border border-gray-300 w-96">
            <h2 className="font-semibold mb-4 text-md">Create New API Key</h2>

            {error && (
              <div className="my-2">
                <p className="text-sm text-tenjin-error tjn-error">{error}</p>
              </div>
            )}

            {createdApiKey ? (
              <div className="flex flex-col gap-2">
                <div
                  id="created-key-message"
                  className="flex items-center gap-4"
                >
                  <p className="text-tenjin-success">
                    <AiFillCheckCircle />
                  </p>
                  <p className="text-sm">Your API Key is created!</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <div className="grow">
                    <Input
                      value={createdApiKey.key}
                      readOnly
                      id="created-key"
                    />
                  </div>
                  <div className="mt-2" id="copyier-container">
                    <IconButton
                      variant="outlined"
                      color={copied ? "success" : "primary"}
                      icon={copied ? <AiFillCheckCircle /> : <AiFillCopy />}
                      id="btn-copy-key"
                      onClick={copyToClipboard}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm">
                    Make sure you copy this key to a safe place. This key will
                    not be visible again once you close this dialog.
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={closeAndRefresh}
                  >
                    I have copied the API Key
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="my-2">
                  <Input
                    isRequired
                    label="Name of your API Key"
                    value={keyName}
                    placeholder="My API Key"
                    onChange={(e) => setKeyName(e.target.value)}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={onSave}
                    size="small"
                    variant="contained"
                    className="ml-2"
                  >
                    Create
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NewApiKeyButton;
