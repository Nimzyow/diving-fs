import AddressFunctions from "../address/AddressFunctions";
import UserFunctions from "../users/UserFunctions";

/**
 * 
 * A Data Provider must have the following methods:

const dataProvider = {
    getList:    (resource, params) => Promise,
    getOne:     (resource, params) => Promise,
    getMany:    (resource, params) => Promise,
    getManyReference: (resource, params) => Promise,
    create:     (resource, params) => Promise,
    update:     (resource, params) => Promise,
    updateMany: (resource, params) => Promise,
    delete:     (resource, params) => Promise,
    deleteMany: (resource, params) => Promise,
}
 */

const dataProvider = {
  // create: UserFunctions.create(resource, params),
  create: async (resource, params) => {
    switch (resource) {
      case "user":
        return UserFunctions.create(params);

      default:
        break;
    }
  },
  getList: async (resource, params) => {
    switch (resource) {
      case "user":
        return UserFunctions.getList(params);
      case "address":
        return AddressFunctions.getList(params);

      default:
        break;
    }
  },
  getOne: async (resource, params) => {
    switch (resource) {
      case "user":
        return UserFunctions.getOne(params);
      case "address":
        return AddressFunctions.getOne(params);

      default:
        break;
    }
  },
  getMany: async (resource, params) => {
    switch (resource) {
      case "user":
        return UserFunctions.getMany(params);
      case "address":
        return AddressFunctions.getMany(params);

      default:
        break;
    }
  },
  update: async (resource, params) => {
    switch (resource) {
      case "user":
        return UserFunctions.update(params);

      default:
        break;
    }
  },
  delete: async (resource, params) => {
    switch (resource) {
      case "user":
        return UserFunctions.delete(params);

      default:
        break;
    }
  },
  deleteMany: async (resource, params) => {
    switch (resource) {
      case "user":
        return UserFunctions.deleteMany(params);

      default:
        break;
    }
  },
};

export default dataProvider;
