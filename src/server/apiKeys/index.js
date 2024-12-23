import prisma from "@/lib/prisma";

export const getApiKeysForUser = async (userId) => {
  return prisma.apiKey.findMany({
    where: {
      userId,
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
