import { getStationById } from "~/services/ill"

export const convertIdToKey = async (id: string): Promise<string> => {
    const station = await getStationById(id)
    if (station === null) {
        return null
    }

    return station?.data?.key
}