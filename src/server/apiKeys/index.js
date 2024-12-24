import prisma from "@/lib/prisma";

export const getApiKeysForUser = async (userId) => {
  return prisma.apiKey.findMany({
    where: {
      userId,
      revoked: false,
    },
  });
};

export const getApiKey = async (keyString) => {
  return prisma.apiKey.findFirst({
    where: {
      key: keyString,
      revoked: false,
    },
    include: {
      user: true,
    },
  });
};

export const getApiKeyByUserIdAndName = async (userId, keyName) => {
  return prisma.apiKey.findFirst({
    where: {
      userId,
      name: keyName,
    },
  });
};

export const revokeKey = async (keyId, userId) => {
  return prisma.apiKey.updateMany({
    where: {
      id: keyId,
      userId: userId,
    },
    data: {
      revoked: true,
    },
  });
};

export const saveApiKey = async (apiKey) => {
  try {
    return prisma.apiKey.create({
      data: apiKey,
    });
  } catch (error) {
    throw error;
  }
};
