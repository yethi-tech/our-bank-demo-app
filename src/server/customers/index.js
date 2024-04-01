import prisma from "@/lib/prisma";

export const createNewCustomer = async (customer) => {
  const { passport, addresses, ...customerData } = customer;

  const count = await prisma.customer.count({
    where: {
      branchCode: customer.branchCode,
    },
  });

  const customerId = `OB${customer.branchCode}${getNewSequence(count)}`;
  customerData.customerId = customerId;

  try {
    const newCustomer = await prisma.customer.create({
      data: {
        ...customerData,
        addresses: {
          createMany: { data: addresses },
        },
      },
    });
    if (passport) {
      await prisma.passport.create({
        data: { ...passport, customerId: newCustomer.id },
      });
    }

    return { ...newCustomer };
  } catch (error) {
    throw error;
  }
};

export const searchCustomers = async (
  limit = 5,
  page = 1,
  sort = {
    firstName: "asc",
  },
  filter = {}
) => {
  const skip = (page - 1) * limit;
  const where = {};

  try {
    const customers = await prisma.customer.findMany({
      take: limit,
      skip,
      orderBy: sort,
      where,
    });

    const totalRecords = await prisma.customer.count();
    const totalPages = Math.ceil(totalRecords / limit);
    return { data: customers, totalRecords, totalPages };
  } catch (error) {
    throw error;
  }
};

export const findByShortName = async (shortName) => {
  try {
    const record = await prisma.customer.findFirst({
      where: {
        shortName: shortName,
      },
    });
    return record;
  } catch (error) {
    throw error;
  }
};

export const findByUdid = async (udid) => {
  try {
    const record = await prisma.customer.findFirst({
      where: {
        udid: udid,
      },
    });
    return record;
  } catch (error) {
    throw error;
  }
};

const getNewSequence = (count) => {
  return String(count + 1).padStart(6, "0");
};
