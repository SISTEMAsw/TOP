var Servers =[
    {
        adress: "https://wcs.top-platform.eu/wcs",
        hasDatasets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    },
];

var Summery = [
    {
        name: "Global PM10 forecast",
        description: "CAMS ECMWF PM10 Surface forecast",
        domain: "Atmosphere",
        collectsDatasets: [0],
        GB: 0,
        orderInTable: 2
    },
    {
        name: "Global NO2 forecast",
        description: "CAMS ECMWF NO2 total column forecast",
        domain: "Atmosphere",
        collectsDatasets: [1],
        GB: 0,
        orderInTable: 3
    },
    {
        name: "Global O3 forecast",
        description: "CAMS ECMWF O3 total column forecast",
        domain: "Atmosphere",
        collectsDatasets: [2],
        GB: 0,
        orderInTable: 4
    },
    {
        name: "Global SO2 forecast",
        description: "CAMS ECMWF SO2 total column forecast",
        domain: "Atmosphere",
        collectsDatasets: [3],
        GB: 0,
        orderInTable: 5
    },
    {	
        name: "European PM10 analysis and forecast",
        description: "CAMS EU Regional PM10 surface analysis and forecast",
        domain: "Atmosphere",
        collectsDatasets: [4],
        GB: 0,
        orderInTable: 7
    },
    {
        name: "European SO2 analysis and forecast",
        description: "CAMS EU Regional SO2 surface analysis and forecast",
        domain: "Atmosphere",
        collectsDatasets: [5],
        GB: 0,
        orderInTable: 8
    },
    {
        name: "European NO2 analysis and forecast",
        description: "CAMS EU Regional NO2 surface analysis and forecast",
        domain: "Atmosphere",
        collectsDatasets: [6],
        GB: 0,
        orderInTable: 9
    },
    {
        name: "European O3 analysis and forecast",
        description: "CAMS EU Regional O3 surface analysis and forecast",
        domain: "Atmosphere",
        collectsDatasets: [7],
        GB: 0,
        orderInTable: 10
    },
    {
        name: "NO2 tropospheric column",
        description: "Sentinel 5P Nitrogen Dioxide (NO2) tropospheric columns",
        domain: "Atmosphere",
        collectsDatasets: [8],
        GB: 0,
        orderInTable: 12
    },
    {
        name: "SO2 total column",
        description: "Sentinel 5P Sulfur Dioxide (SO2) total column",
        domain: "Atmosphere",
        collectsDatasets: [9],
        GB: 0,
        orderInTable: 13
    },
    {
        name: "CO Vertical column",
        description: "Sentinel 5P Carbn Monoxide (CO) total column",
        domain: "Atmosphere",
        collectsDatasets: [10],
        GB: 0,
        orderInTable: 14
    },
    {
        name: "O3 tropospheric column",
        description: "Sentinel 5P Ozone (O3) tropospheric column",
        domain: "Atmosphere",
        collectsDatasets: [11],
        GB: 0,
        orderInTable: 15
    },
    {
        name: "Aerosol index",
        description: "Sentinel 5P UV Aerosol Index 340-480 nm",
        domain: "Atmosphere",
        collectsDatasets: [12],
        GB: 0,
        orderInTable: 16
    },
    {
        name: "CH4 total column",
        description: "Sentinel 5P Methane (CH4) total column",
        domain: "Atmosphere",
        collectsDatasets: [13],
        GB: 0,
        orderInTable: 17
    }
];

var Datasets = [ 
    {
        id: 0,
        coverageid: "Z_CAMS_C_ECMF_PM10_4326_04",
        domain: "Atmosphere",
        sensor: "CAMS",
        resolution: 0.4,
        coverage: 64800,
        coverageDay: 100,
        bitdepth: 4,
        bands: 24,
        GBperDay: 0
    },
    {
        id: 1,
        coverageid: "Z_CAMS_C_ECMF_TCNO2_4326_04",
        domain: "Atmosphere",
        sensor: "CAMS",
        resolution: 0.4,
        coverage: 64800,
        coverageDay: 100,
        bitdepth: 4,
        bands: 24,
        GBperDay: 0
    },
    {
        id: 2,
        coverageid: "Z_CAMS_C_ECMF_GTCO3_4326_04",
        domain: "Atmosphere",
        sensor: "CAMS",
        resolution: 0.4,
        coverage: 64800,
        coverageDay: 100,
        bitdepth: 4,
        bands: 24,
        GBperDay: 0
    },
    {
        id: 3,
        coverageid: "Z_CAMS_C_ECMF_TCSO2_4326_04",
        domain: "Atmosphere",
        sensor: "CAMS",
        resolution: 0.4,
        coverage: 64800,
        coverageDay: 100,
        bitdepth: 4,
        bands: 24,
        GBperDay: 0
    },
    {
        id: 4,
        coverageid: "EU_CAMS_SURFACE_PM10_G_4326_01",
        domain: "Atmosphere",
        sensor: "CAMS",
        resolution: 0.1,
        coverage: 64800,
        coverageDay: 100,
        bitdepth: 4,
        bands: 24,
        GBperDay: 0
    },
    {
        id: 5,
        coverageid: "EU_CAMS_SURFACE_SO2_G_4326_01",
        domain: "Atmosphere",
        sensor: "CAMS",
        resolution: 0.1,
        coverage: 64800,
        coverageDay: 100,
        bitdepth: 4,
        bands: 24,
        GBperDay: 0
    },
    {
        id: 6,
        coverageid: "EU_CAMS_SURFACE_NO2_G_4326_01",
        domain: "Atmosphere",
        sensor: "CAMS",
        resolution: 0.1,
        coverage: 64800,
        coverageDay: 100,
        bitdepth: 4,
        bands: 24,
        GBperDay: 0
    },
    {
        id: 7,
        coverageid: "EU_CAMS_SURFACE_O3_G_4326_01",
        domain: "Atmosphere",
        sensor: "CAMS",
        resolution: 0.1,
        coverage: 64800,
        coverageDay: 100,
        bitdepth: 4,
        bands: 24,
        GBperDay: 0
    },
    {
        id: 8,
        coverageid: "vr_S5P_RPROOFFLNRTI_L2_NO2_PRODUCT_NITROGENDIOXIDE_TROPOSPHERIC_COLUMN_4326_0035",
        domain: "Atmosphere",
        sensor: "Sentinel 5P",
        resolution: 0.035,
        coverage: 64800,
        coverageDay: 100,
        bitdepth: 4,
        bands: 1,
        GBperDay: 0
    },
    {
        id: 9,
        coverageid: "vr_S5P_RPROOFFLNRTI_L2_SO2_PRODUCT_SULFURDIOXIDE_TOTAL_VERTICAL_COLUMN_4326_0035",
        domain: "Atmosphere",
        sensor: "Sentinel 5P",
        resolution: 0.035,
        coverage: 64800,
        coverageDay: 100,
        bitdepth: 4,
        bands: 1,
        GBperDay: 0
    },
    {
        id: 10,
        coverageid: "vr_S5P_RPROOFFLNRTI_L2_CO_PRODUCT_CARBONMONOXIDE_TOTAL_COLUMN_4326_0035",
        domain: "Atmosphere",
        sensor: "Sentinel 5P",
        resolution: 0.035,
        coverage: 64800,
        coverageDay: 100,
        bitdepth: 4,
        bands: 1,
        GBperDay: 0
    },
    {
        id: 11,
        coverageid: "vr_S5P_RPROOFFLNRTI_L2_O3_PRODUCT_OZONE_TOTAL_VERTICAL_COLUMN_4326_0035",
        domain: "Atmosphere",
        sensor: "Sentinel 5P",
        resolution: 0.035,
        coverage: 64800,
        coverageDay: 100,
        bitdepth: 4,
        bands: 1,
        GBperDay: 0
    },
    {
        id: 12,
        coverageid: "vr_S5P_OFFLNRTI_L2_AER_AI_PRODUCT_AEROSOL_INDEX_4326_0035",
        domain: "Atmosphere",
        sensor: "Sentinel 5P",
        resolution: 0.035,
        coverage: 64800,
        coverageDay: 100,
        bitdepth: 4,
        bands: 1,
        GBperDay: 0
    },
    {
        id: 13,
        coverageid: "vr_S5P_RPROOFFLNRTI_L2_CH4_PRODUCT_METHANE_MIXING_RATIO_4326_0035",
        domain: "Atmosphere",
        sensor: "Sentinel 5P",
        resolution: 0.035,
        coverage: 64800,
        coverageDay: 100,
        bitdepth: 4,
        bands: 1,
        GBperDay: 0
    }
];


var specialRows = [
    {
        orderInTable: 1,
        name: "Global Model Data"
    },
    {
        orderInTable: 6,
        name: "Regional European Model Data"
    },
    {
        orderInTable: 11,
        name: "Global Satellite Data"
    },
    {
        orderInTable: 18,
        name: "EEA non EO-RS products"
    },
];

var service="?service=WCS&Request=GetCapabilities&version=2.0.0";
var orderedDataTable = new Array(Summery.length + specialRows.length);
addSpecialRows();
var orderedDataTableForDIV = new Array(Summery.length + specialRows.length);

getGBperDay();
startRequests();
