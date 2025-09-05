import prisma from "@/lib/prisma";

export const createNewCustomer = async (customer) => {
  const { passport, addresses, ...customerData } = customer;

  const count = await prisma.customer.count({
    where: {
      branchCode: customer.branchCode,
    },
  });

  const customerId = `OB${customer.branchCode}${getNewSequence(count)}`;
  console.log(`New customer ID: ${customerId}`);
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

export const updateCustomer = async (id, customer) => {
  const { passport, addresses, ...customerData } = customer;

  try {
    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: {
        ...customerData,
        addresses: {
          deleteMany: {},
          createMany: { data: addresses },
        },
      },
    });

    if (passport) {
      await prisma.passport.update({
        where: { customerId: id },
        data: { ...passport },
      });
    }

    return { ...updatedCustomer };
  } catch (error) {
    throw error;
  }
};

export const updateCustomerById = async (id, dataToUpdate) => {
  try {
    const updatedCustomer = await prisma.customer.update({
      where: { id: id },
      data: { ...dataToUpdate },
    });

    return { ...updatedCustomer };
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
  filter = {},
  includeFields = ""
) => {
  const skip = (page - 1) * limit;
  const where = buildCriteria(filter);

  const includeArray = includeFields
    .split(",")
    .map((field) => field.trim())
    .filter(Boolean);

  const include = {};
  includeArray.forEach((field) => {
    include[field] = true;
  });

  try {
    const customers = await prisma.customer.findMany({
      take: limit,
      skip,
      orderBy: sort,
      where,
      include,
    });

    const totalRecords = await prisma.customer.count();
    const totalPages = Math.ceil(totalRecords / limit);
    return { data: customers, totalRecords, totalPages };
  } catch (error) {
    throw error;
  }
};

export const findByCustomerId = async (customerId) => {
  try {
    const record = await prisma.customer.findUnique({
      where: {
        customerId: customerId,
      },
      include: {
        addresses: true,
        passport: true,
      },
    });
    return record;
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

export const findById = async (id) => {
  try {
    const record = await prisma.customer.findUnique({
      where: {
        id: id,
      },
      include: {
        addresses: true,
        passport: true,
      },
    });

    return record;
  } catch (error) {
    throw error;
  }
};

const getNewSequence = (count) => {
  //Generate current timestamp in YYYYMMDDHHMMSS format
  const now = new Date();
  const timestamp = now
    .toISOString()
    .replace(/[-T:.Z]/g, "")
    .slice(0, 14);
  // return String(count + 1).padStart(6, "0");
  return timestamp;
};

const buildCriteria = (filter) => {
  let where = {};

  if (!filter) return where;

  Object.keys(filter).forEach((key) => {
    if (filter[key]) {
      // Check if the filter value is an array or not
      if (Array.isArray(filter[key])) {
        // Use `in` for array values to match any value in the array
        where[key] = { in: filter[key] };
      } else {
        // Use direct equality for non-array values
        where[key] = filter[key];
      }
    }
  });

  return where;
};
