import { SubNavProps } from '../features/SubNav'

const navData: Record<string, SubNavProps> = {
  home: {
    title: 'Home',
    upperOptions: [
      {
        name: 'About',
        link: 'about',
      },
      {
        name: 'Plans',
        link: 'plans',
      },
      {
        name: 'Contacts',
        link: 'contacts',
      },
    ],
    lowerOptions: [
      {
        name: 'Help and Support',
        link: 'support',
      }
    ]
  },
  search: {
    title: 'Search',
    upperOptions: [
      {
        name: 'Previous Bills',
        link: 'previous-bills',
      },
      {
        name: 'Medicines',
        link: 'medicines',
      },
      {
        name: 'People',
        link: 'people',
      },
    ],
    lowerOptions: [
      {
        name: 'Help and Support',
        link: 'support',
      }
    ]
  },
  sales: {
    title: 'Sales',
    upperOptions: [
      {
        name: 'Create New Bill',
        link: 'create-new-bill',
      },
      {
        name: 'Draft Bill 1',
        link: 'draft-bill-1',
      },
      {
        name: 'Draft Bill 2',
        link: 'draft-bill-2',
      },
      {
        name: 'Draft Bill 3',
        link: 'draft-bill-3',
      },
      {
        name: 'Draft Bill 4',
        link: 'draft-bill-4',
      },
      {
        name: 'Draft Bill 5',
        link: 'draft-bill-5',
      },
    ],
    lowerOptions: [
      {
        name: 'Help and Support',
        link: 'support',
      }
    ]
  },
  store: {
    title: 'Store',
    upperOptions: [
      {
        name: 'Stock',
        link: 'stock',
      },
      {
        name: 'Orders',
        link: 'orders',
      },
    ],
    lowerOptions: [
      {
        name: 'Help and Support',
        link: 'support',
      }
    ]
  },
  profile: {
    title: 'My Account',
    upperOptions: [
      {
        name: 'Profile',
        link: 'profile',
      },
    ],
    lowerOptions: [
      {
        name: 'Help and Support',
        link: 'support',
      }
    ]
  }
}

export default navData