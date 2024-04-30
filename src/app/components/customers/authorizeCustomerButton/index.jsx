"use client";
import { authorizeCustomer } from "@/app/actions/customers";
import Button from "@/components/shared/button";
import React, { useState } from "react";
import { GrUserAdmin } from "react-icons/gr";
import AlertDialog from "../../alertDialog";
import { useRouter } from "next/navigation";

const AuthorizeCustomerButton = ({ id }) => {
  const router = useRouter();

  const [authorizationResult, setAuthorizationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const doAuthorize = async () => {
    setLoading(true);
    const result = await authorizeCustomer(id);
    setAuthorizationResult(result);
    setLoading(false);
  };

  const handleAlertClose = () => {
    if (authorizationResult.success) {
      router.refresh();
    } else {
      setAuthorizationResult(null);
    }
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
          type={authorizationResult.success ? "success" : "error"}
          title={authorizationResult.success ? "Success" : "Error"}
          message={
            authorizationResult.success
              ? "Authorization successful!"
              : authorizationResult.message
          }
          onClose={handleAlertClose}
        />
      )}
    </>
  );
};

export default AuthorizeCustomerButton;
