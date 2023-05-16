export type PoliticianType = {
    nombre?: string,
    partido?: string,
    partido_para_filtro?: string,
    genero?: string,
    cargo_para_filtro?: string,
    cargo?: string,
    institucion?: string,
    ccaa?: string, 
    sueldobase_sueldo?: number,
    otrasdietaseindemnizaciones_sueldo?: number,
    retribucionmensual?: number,
    retribucionanual?: number,
    observaciones?: string,
};

export type ResponseType = {
    error?: string
};

export type ItemResponseType = {
    error?: string,
    _index?: string, 
    _id?: string, 
    _version?: number,
    _seq_no?: number,
    _primary_term?: number,
    found?: boolean,
    _score?: number, 
    _source?: PoliticianType
};

export type ItemsResponseType = {
    error?: string,
    total?: number,
    items?: Array<ItemResponseType>,
};

export type StatisticsResponseType = {
    error?: string,
    average?: { value: number },
    median?: { value: number },
    top10?: { items: Array<ItemResponseType> }
};