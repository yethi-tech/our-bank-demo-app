import prisma from "@/lib/prisma";

export const createNewCustomer = async (customer) => {
  try {
    const count = await prisma.customer.count({
      where: {
        branchCode: customer.branchCode,
      },
    });

    const customerId = `OB${customer.branchCode}${getNewSequence(count)}`;
    customer.customerId = customerId;

    const newCustomer = await prisma.customer.create({ data: customer });
    console.log("Customer created with ID: ", newCustomer.id);
    return newCustomer;
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
  return String(count).padStart(6, "0");
};
