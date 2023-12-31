import { Preference, PreferenceComfortCategory } from "../models/models";
import { preferenceRepository } from "../repositories/repositories";
import { preferenceMapper, preferenceComfortCategoryMapper } from "../mappers/mappers"

class PreferenceService {
    async findPreferencesByClientCPF(cpf: string): Promise<PreferenceComfortCategory[]> {
        const { rows: preferencesByClientCPF } = await preferenceRepository
            .findPreferencesByClientCPF(cpf);
        return preferencesByClientCPF.map(preference =>
            preferenceComfortCategoryMapper.map(preference));
    }
    async updateAllFields(id: number, preference: Preference): Promise<void> {
        preferenceRepository.update(id, preference);
    }

    async findAll(): Promise<Preference[]> {
        const { rows: preferences } = await preferenceRepository.findAll();
        return preferences.map(preference => preferenceMapper.map(preference));
    }

    async delete(id: number): Promise<void> {
        preferenceRepository.delete(id);
    }

    async findById(id: number): Promise<Preference> {
        const { rows: [preferenceFound] } = await preferenceRepository.findById(id);

        return preferenceMapper.map(preferenceFound);
    }

    async update(id: number, preference: Preference): Promise<void> {
        const { cpf, response } = preference;
        const { cpf: cpfFound, response: responseFound }: Preference = await this.findById(id);
        const preferenceToBeUpdated: Preference = {
            cpf: cpf ? cpf : cpfFound,
            response: response ? response : responseFound,
        };
        preferenceRepository.update(id, preferenceToBeUpdated);
    }

    async create(preference: Preference): Promise<void> {
        preferenceRepository.create(preference);
    }

}

export default new PreferenceService();