# booking-microfrontend (Enhanced)

This project contains a Base App (host) and 4 Micro Frontends (Food, Events, Cab, Hotel) using Webpack Module Federation with Redux.

## Ports
- base-app: http://localhost:3000
- mfe-food: http://localhost:3001
- mfe-events: http://localhost:3002
- mfe-cab: http://localhost:3003
- mfe-hotel: http://localhost:3004

## Quick Start

Open five terminals and run the following commands:

### MFEs first
```bash
cd mfe-food
npm install
npm start

cd ../mfe-events
npm install
npm start

cd ../mfe-cab
npm install
npm start

cd ../mfe-hotel
npm install
npm start
```

### Base App last
```bash
cd ../base-app
npm install
npm start
```

> **Important:** Start MFEs first so Base App can resolve remoteEntry.js files.

## Features

- **Role-based login:** `admin` can modify inventory, `user` can only add/remove items.
- **Shared Redux store:** Base App provides the store; MFEs access/update it via `useSelector` / `useDispatch` or imported action creators.
- **Dynamic Module Loading:** Categories (Food, Events, Cab, Hotel) are loaded dynamically from MFEs.
- **Cart Summary:** Base App shows a popup with all items across categories.

## Adding a new category / MFE

1. Create a new folder `mfe-<category>` with standard React app structure.
2. Create `App.jsx` and List component for the category.
3. Expose the main component via Module Federation (`./<Category>App`).
4. Update `base-app/webpack.config.js` remotes and HomePage lazy import.

## Admin Inventory UI

- Admin can add/edit/delete items in Base App.
- MFEs automatically reflect inventory changes from the shared Redux store.

## Redux Action Creators

- Base App exposes action creators (e.g., `addToCart`) via Module Federation.
- MFEs import them instead of dispatching string actions.
- Example:
```javascript
import { addToCart } from 'base_app/redux/cartActions';
dispatch(addToCart('food', { id: 1, qty: 1 }));
```

## Troubleshooting

- If you see `Cannot find remote entry`, check that MFEs are running.
- Redux state undefined → ensure MFEs are rendered inside `<Provider>`.
- Ports 3000–3004 must be free and accessible.

## Notes

- Each MFE only manages its own category.
- Base App handles login, navigation, cart, and admin inventory.
- Adding new category → just create new MFE and expose via Module Federation.
