import bodyParser from "body-parser";
import { Request, Response, Router } from "express"
import router from './router';
import { Hosting } from "../models/models";
import { hostingController } from "../controllers/controllers";
import { httpStatusMatcher } from "../utils/utils";

class HostingRoutes {
    buildRoutes(): Router {
        const hostingPath = '/local-de-hospedagem';
        const hostingByIdPath = `${hostingPath}/id/:id`;

        const jsonParser = bodyParser.json();

        router.post(hostingPath, jsonParser, this.createRoute);
        router.get(`${hostingPath}/todos`, this.findAllRoute);
        router.get(hostingByIdPath, this.findByIdRoute);
        router.delete(hostingByIdPath, this.deleteRoute);
        router.patch(hostingByIdPath, this.updateRoute);
        router.put(hostingByIdPath, this.updateAllFieldsRoute);

        return router;
    }

    async updateAllFieldsRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const hosting: Hosting = request.body as Hosting;
        hostingController.updateAllFields(id, hosting)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async updateRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const hosting: Hosting = request.body as Hosting;
        hostingController.update(id, hosting)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findByIdRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const hostingFound: Hosting = await hostingController.findById(id);
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(hostingFound);
        response.status(responseHttpStatus).json(hostingFound);
    }

    async deleteRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        hostingController.delete(id)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findAllRoute(request: Request, response: Response): Promise<void> {
        const hostingsFound: Hosting[] = await hostingController.findAll();
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(hostingsFound);
        response.status(responseHttpStatus).json(hostingsFound);
    }

    async createRoute(request: Request, response: Response): Promise<void> {
        const hosting: Hosting = request.body as Hosting;
        hostingController.create(hosting)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }
}

export default new HostingRoutes();