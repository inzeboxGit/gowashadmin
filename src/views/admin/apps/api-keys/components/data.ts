// import auFlag from '/images/flags/au.svg'
// import caFlag from '/images/flags/ca.svg'
import deFlag from '/images/flags/de.svg'
// import frFlag from '/images/flags/fr.svg'
import gbFlag from '/images/flags/gb.svg'
import inFlag from '/images/flags/in.svg'
import usFlag from '/images/flags/us.svg'
import user2 from '/images/users/user-2.jpg'
// import user3 from '/images/users/user-3.jpg'
import user4 from '/images/users/user-4.jpg'
import user5 from '/images/users/user-5.jpg'
// import user6 from '/images/users/user-6.jpg'
import user7 from '/images/users/user-7.jpg'
// import user8 from '/images/users/user-8.jpg'
// import user9 from '/images/users/user-9.jpg'

export type ApiClientType = {
  name: string
  user: {
    name: string
    image: string
  }
  apiKey: string
  status: 'pending' | 'revoked' | 'active' | 'suspended' | 'trial' | 'expired'
  createdAtDate: string
  keyUsage: number
  totalKeys: number
  expireAtDate: string
  country: {
    code: string
    flag: string
  }
}

export const apiClientData: ApiClientType[] = [
  {
    name: 'Api Google Analytics',
    user: {
      name: 'Google Analytics',
      image: user2,
    },
    apiKey: 'e4A7Fc98z120XYz776abc90MNZ',
    status: 'pending',
    keyUsage: 245,
    totalKeys: 1000,
    createdAtDate: 'Jan 10, 2025',
    expireAtDate: 'Nov 15, 2025',
    country: {
      code: 'DE',
      flag: deFlag,
    },
  },
  {
    name: 'GOOGLE MAPS API',
    user: {
      name: 'Google Analytics',
      image: user4,
    },
    apiKey: '9BcD456Xy78LmN0zPQR12sA3Z',
    status: 'revoked',
    keyUsage: 847,
    totalKeys: 1000,
    createdAtDate: 'Mar 5, 2025',
    expireAtDate: 'Aug 20, 2025',
    country: {
      code: 'UK',
      flag: gbFlag,
    },
  },
  {
    name: 'OneSignal API Notifications',
    user: {
      name: 'Liam ',
      image: user5,
    },
    apiKey: 'ZZ99xC8K23Fm10TyPLqZa17d',
    status: 'active',
    keyUsage: 105,
    totalKeys: 700,
    createdAtDate: 'Apr 22, 2025',
    expireAtDate: 'Dec 31, 2025',
    country: {
      code: 'IN',
      flag: inFlag,
    },
  },
  {
    name: 'Mapbox API',
    user: {
      name: 'Ava Turner',
      image: user2,
    },
    apiKey: 'XY91kLpB42Ga98WxRTzEe55n',
    status: 'pending',
    keyUsage: 0,
    totalKeys: 500,
    createdAtDate: 'Apr 10, 2025',
    expireAtDate: 'Oct 10, 2025',
    country: {
      code: 'US',
      flag: usFlag,
    },
  },
  {
    name: 'WeatherAPI',
    user: {
      name: 'Noah Reed',
      image: user7,
    },
    apiKey: 'BB22zWqT65Op90VxMLaRt18c',
    status: 'suspended',
    keyUsage: 369,
    totalKeys: 1000,
    createdAtDate: 'Mar 15, 2025',
    expireAtDate: 'Sep 15, 2025',
    country: {
      code: 'DE',
      flag: deFlag,
    },
  },
  // {
  //   name: 'WebhookMate',
  //   user: {
  //     name: 'Sophia Lee',
  //     image: user3,
  //   },
  //   apiKey: 'RM19yUlP75Kl44YvNJdHg09s',
  //   status: 'active',
  //   keyUsage: 459,
  //   totalKeys: 600,
  //   createdAtDate: 'Jan 01, 2025',
  //   expireAtDate: 'Dec 31, 2025',
  //   country: {
  //     code: 'UK',
  //     flag: gbFlag,
  //   },
  // },
  // {
  //   name: 'DevPortal',
  //   user: {
  //     name: 'Mason Clark',
  //     image: user4,
  //   },
  //   apiKey: 'AA47qBcJ61Tr77WpKKzTy39k',
  //   status: 'trial',
  //   keyUsage: 0,
  //   totalKeys: 100,
  //   createdAtDate: 'Feb 01, 2025',
  //   expireAtDate: 'May 01, 2025',
  //   country: {
  //     code: 'AU',
  //     flag: auFlag,
  //   },
  // },
  // {
  //   name: 'NotifyX',
  //   user: {
  //     name: 'Ella James',
  //     image: user6,
  //   },
  //   apiKey: 'ZP83mXcD28Uv11MtYYoXx03b',
  //   status: 'active',
  //   keyUsage: 3584,
  //   totalKeys: 5000,
  //   createdAtDate: 'Apr 01, 2025',
  //   expireAtDate: 'Jan 01, 2026',
  //   country: {
  //     code: 'CA',
  //     flag: caFlag,
  //   },
  // },
  // {
  //   name: 'TokenVault',
  //   user: {
  //     name: 'Lucas Hill',
  //     image: user8,
  //   },
  //   apiKey: 'LK35yTrF82Lo99UiSSpPr47x',
  //   status: 'expired',
  //   keyUsage: 958,
  //   totalKeys: 1000,
  //   createdAtDate: 'Jul 15, 2024',
  //   expireAtDate: 'Jan 15, 2025',
  //   country: {
  //     code: 'FR',
  //     flag: frFlag,
  //   },
  // },
  // {
  //   name: 'StreamAPI',
  //   user: {
  //     name: 'Mia Bennett',
  //     image: user9,
  //   },
  //   apiKey: 'DW64aUvQ11Gh32PpDDjWw72t',
  //   status: 'active',
  //   keyUsage: 78,
  //   totalKeys: 100,
  //   createdAtDate: 'Mar 05, 2025',
  //   expireAtDate: 'Dec 05, 2025',
  //   country: {
  //     code: 'IN',
  //     flag: inFlag,
  //   },
  // },
]
