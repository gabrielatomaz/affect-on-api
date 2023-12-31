import userRoutes from './user-routes'
import preferenceRoutes from './preference-routes';
import ratingRoutes from './rating-routes';
import categoryRoutes from './category-routes';
import clientRoutes from './client-routes';
import complaintRoutes from './complaint-routes';
import accessGroupRoutes from './access-group-routes';
import permissionTypeRoutes from './permission-type-routes';
import accessGroupPermissionTypeRoutes from './access-group-permission-type-routes';
import historyRoutes from './history-routes';
import hostingRoutes from './hosting-routes';
import hostingCategoryRoutes from './hosting-category-routes';
import hostingComfortRoutes from './hosting-comfort-routes';
import comfortRoutes from './comfort-routes';
import offerRoutes from './offer-routes';
import hostRoutes from './host-routes';
import reservationRoutes from './reservation-routes';

import { Express } from 'express'

class Routes {
    constructor(app: Express) {
        const routes = [
            userRoutes,
            hostRoutes,
            clientRoutes,
            offerRoutes,
            reservationRoutes,
            accessGroupRoutes,
            permissionTypeRoutes,
            accessGroupPermissionTypeRoutes,
            categoryRoutes, 
            preferenceRoutes,
            comfortRoutes,
            hostingRoutes,
            hostingCategoryRoutes,
            hostingComfortRoutes,
            complaintRoutes,
            ratingRoutes, 
            historyRoutes,
        ];

        routes
            .forEach(routes => app.use(routes.buildRoutes()));
    }
}

export default Routes;