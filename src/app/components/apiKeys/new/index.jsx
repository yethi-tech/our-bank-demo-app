"use client";

import { createApiKey } from "@/app/actions/apiKeys";
import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import React, { useState } from "react";

const NewApiKeyButton = () => {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const onSave = async () => {
    if (key === "") {
      return;
    }

    const response = await createApiKey(key);
    if (response.success) {
      setOpen(false);
      window.location.reload();
    } else {
      setError(response.data);
    }
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

            <div className="my-2">
              <Input
                isRequired
                label="Name of your API Key"
                value={key}
                placeholder="My API Key"
                onChange={(e) => setKey(e.target.value)}
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
          </div>
        </div>
      )}
    </>
  );
};

export default NewApiKeyButton;
