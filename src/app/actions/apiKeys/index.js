"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getApiKeysForUser, saveApiKey } from "@/server/apiKeys";
import { getServerSession } from "next-auth";
import crypto from "crypto";

export const getApiKeysForCurrentUser = async () => {
  const session = await getServerSession(authOptions);

  const sessionUserId = session?.user?.id || -1;

  try {
    const apikeys = await getApiKeysForUser(sessionUserId);
    return { success: true, data: apikeys };
  } catch (error) {
    return { success: false, data: error.message };
  }
};

export const createApiKey = async (name) => {
  const session = await getServerSession(authOptions);

  const sessionUserId = session?.user?.id || -1;

  try {
    const apiKeyObject = {
      userId: sessionUserId,
      name: name,
      key: `ob_${crypto.randomBytes(32).toString("hex")}`,
      revoked: false,
    };

    const savedApiKey = await saveApiKey(apiKeyObject);
    return { success: true, data: savedApiKey };
  } catch (error) {
    return { success: false, data: error.message };
  }
};
