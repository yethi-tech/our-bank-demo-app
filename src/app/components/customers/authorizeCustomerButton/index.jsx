"use client";
import { authorizeCustomer } from "@/app/actions/customers";
import Button from "@/components/shared/button";
import React, { useState } from "react";
import { GrUserAdmin } from "react-icons/gr";
import AlertDialog from "../../alertDialog";

const AuthorizeCustomerButton = ({ id }) => {
  const [authorizationResult, setAuthorizationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const doAuthorize = async () => {
    setLoading(true);
    const result = await authorizeCustomer(id);
    setAuthorizationResult(result);
    setLoading(false);
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        id="btn_authorize"
        key="authorize"
        icon={<GrUserAdmin />}
        loading={loading}
        disabled={loading}
        onClick={doAuthorize}
      >
        Authorize
      </Button>
      {authorizationResult && (
        <AlertDialog
          type={authorizationResult.success}
          title={authorizationResult.success ? "Success" : "Error"}
          message={
            authorizationResult.success
              ? "Authorization successful!"
              : authorizationResult.message
          }
          onClose={() => setAuthorizationResult(null)}
        />
      )}
    </>
  );
};

export default AuthorizeCustomerButton;
