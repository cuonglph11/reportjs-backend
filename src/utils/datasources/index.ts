import { BaseDataSourceTypeMapping, HistoricalData } from "~/services/data-mapping/helper";
import { DataSourceChildClass, DataSourceType, ReportFilter } from "~/services/data-mapping/type";
type Constructor<T> = new () => T;

const dataMappingConstructors: Record<DataSourceType, Constructor<BaseDataSourceTypeMapping>> = {
    HISTORICAL_DATA: HistoricalData,
    STATIONS: HistoricalData,
    // Add more mappings as needed
};

export const getDatasourceByType = (key: DataSourceType, filters?: ReportFilter) => {
    const Constructor = dataMappingConstructors[key];
    if (Constructor) {
        return new Constructor(filters);
    } else {
        throw new Error(`Unknown DataSourceType: ${key}`);
    }
};