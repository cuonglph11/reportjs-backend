import { getFetch } from '~/utils/request'

export const getStationById = async (id: string): Promise<any | null> => {
  try {
    const result = await getFetch(
      `https://demo-api.ilotusland.asia/station-auto/${id}`
    )
    return result
  } catch (error) {
    console.log(error)
    return null
  }
}
