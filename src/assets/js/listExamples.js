export default {
  family: {
    list: [
      {
        role: "Son",
        name: "Ryan",
        age: 55,
        children: [
          {
            role: "Grandson",
            name: "Peter",
            age: 32,
            children: [
              {
                role: "Great granddaughter",
                name: "Lisa",
                age: 4,
              },
              {
                role: "Great grandson",
                name: "Jack",
                age: 2,
              },
            ],
          },
          {
            role: "Granddaughter",
            name: "Jane",
            age: 31,
          },
        ],
      },
      {
        role: "Daughter",
        name: "Mary",
        age: 53,
        children: [
          {
            role: "Grandson",
            name: "Cindy",
            age: 31,
          },
        ],
      },
    ],
  },
  business: {
    availableFor: ["find"],
    list: [
      {
        name: "Happy Farm",
        role: "Headquarter",
        inventoryContent: [
          {
            productName: "milk",
            count: 20000,
          },
          {
            productName: "egg",
            count: 100000,
          },
        ],
        subBusinessList: [
          {
            name: "Healthy-Foods",
            role: "Dealer",
            inventoryContent: [
              {
                productName: "milk",
                count: 300,
              },
              {
                productName: "egg",
                count: 10000,
              },
            ],
            subBusinessList: [
              {
                name: "Twelve-Eight",
                role: "Store",
                inventoryContent: [
                  {
                    productName: "milk",
                    count: 50,
                  },
                ],
              },
              {
                name: "Nutritious Life",
                role: "Store",
                inventoryContent: [
                  {
                    productName: "milk",
                    count: 40,
                  },
                  {
                    productName: "egg",
                    count: 120,
                  },
                ],
              },
            ],
          },
          {
            name: "Daily Energy",
            role: "Dealer",
            inventoryContent: [
              {
                productName: "milk",
                count: 900,
              },
              {
                productName: "egg",
                count: 20000,
              },
            ],
            subBusinessList: [
              {
                name: "Twelve-Eight",
                role: "Store",
                inventoryContent: {
                  productName: "egg",
                  count: 100,
                },
              },
              {
                name: "Urban24",
                role: "Store",
                inventoryContent: [
                  {
                    productName: "egg",
                    count: 75,
                  },
                  {
                    productName: "egg",
                    count: 112,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};
