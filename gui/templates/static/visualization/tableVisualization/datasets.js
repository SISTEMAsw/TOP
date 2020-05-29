let server = "https://wcs.top-platform.eu/wcs";
let service="?service=WCS&Request=GetCapabilities&version=2.0.0";

var Datasets = [
    {
        orderInTable: 1,
        name: "Global Model Data"
    },
    {
        name: "Global PM10 forecast",
        description: "CAMS ECMWF PM10 Surface forecast",
        domain: "Atmosphere",
        orderInTable: 2,
        coverageid: "Z_CAMS_C_ECMF_PM10",//_4326_04"
    },
    {
        name: "Global NO2 forecast",
        description: "CAMS ECMWF NO2 total column forecast",
        domain: "Atmosphere",
        orderInTable: 3,
        coverageid: "Z_CAMS_C_ECMF_TCNO2",//_4326_04"
    },
    {
        name: "Global O3 forecast",
        description: "CAMS ECMWF O3 total column forecast",
        domain: "Atmosphere",
        orderInTable: 4,
        coverageid: "Z_CAMS_C_ECMF_GTCO3",//_4326_04"
    },
    {
        name: "Global SO2 forecast",
        description: "CAMS ECMWF SO2 total column forecast",
        domain: "Atmosphere",
        orderInTable: 5,
        coverageid: "Z_CAMS_C_ECMF_TCSO2",//_4326_04"
    },
    {
        orderInTable: 6,
        name: "Regional European Model Data"
    },
    {
        name: "European PM10 analysis and forecast",
        description: "CAMS EU Regional PM10 surface analysis and forecast",
        domain: "Atmosphere",
        orderInTable: 7,
        coverageid: "EU_CAMS_SURFACE_PM10_G",//_4326_01"
    },
    {
        name: "European SO2 analysis and forecast",
        description: "CAMS EU Regional SO2 surface analysis and forecast",
        domain: "Atmosphere",
        orderInTable: 8,
        coverageid: "EU_CAMS_SURFACE_SO2_G",//_4326_01"
    },
    {
        name: "European NO2 analysis and forecast",
        description: "CAMS EU Regional NO2 surface analysis and forecast",
        domain: "Atmosphere",
        orderInTable: 9,
        coverageid: "EU_CAMS_SURFACE_NO2_G",//_4326_01"
    },
    {
        name: "European O3 analysis and forecast",
        description: "CAMS EU Regional O3 surface analysis and forecast",
        domain: "Atmosphere",
        orderInTable: 10,
        coverageid: "EU_CAMS_SURFACE_O3_G",//_4326_01"
    },
    {
        orderInTable: 11,
        name: "Global Satellite Data"
    },
    {
        name: "NO2 tropospheric column",
        description: "Sentinel 5P Nitrogen Dioxide (NO2) tropospheric columns",
        domain: "Atmosphere",
        orderInTable: 12,
        coverageStart:    "vr_S5P_RPRO_L2_NO2_PRODUCT_NITROGENDIOXIDE_TROPOSPHERIC_COLUMN",
        coverageEnd:      "vr_S5P_NRTI_L2_NO2_PRODUCT_NITROGENDIOXIDE_TROPOSPHERIC_COLUMN",//_4326_0035"
        //coverageFallBack: "vr_S5P_OFFL_L2_CO_PRODUCT_CARBONMONOXIDE_TOTAL_COLUMN"
    },
    {
        name: "SO2 total column",
        description: "Sentinel 5P Sulfur Dioxide (SO2) total column",
        domain: "Atmosphere",
        orderInTable: 13,
        coverageStart: "vr_S5P_RPRO_L2_SO2_PRODUCT_SULFURDIOXIDE_TOTAL_VERTICAL_COLUMN",
        coverageEnd: "vr_S5P_NRTI_L2_SO2_PRODUCT_SULFURDIOXIDE_TOTAL_VERTICAL_COLUMN",//_4326_0035",
        coverageFallBack: "vr_S5P_OFFL_L2_CO_PRODUCT_CARBONMONOXIDE_TOTAL_COLUMN"
    },
    {
        name: "CO Vertical column",
        description: "Sentinel 5P Carbn Monoxide (CO) total column",
        domain: "Atmosphere",
        orderInTable: 14,
        coverageStart: "vr_S5P_RPRO_L2_CO_PRODUCT_CARBONMONOXIDE_TOTAL_COLUMN",
        coverageEnd: "vr_S5P_OFFLNRTI_L2_CO_PRODUCT_CARBONMONOXIDE_TOTAL_COLUMN",//_4326_0035",
        coverageFallBack: "vr_S5P_OFFL_L2_CO_PRODUCT_CARBONMONOXIDE_TOTAL_COLUMN"
    },
    {
        name: "O3 tropospheric column",
        description: "Sentinel 5P Ozone (O3) tropospheric column",
        domain: "Atmosphere",
        orderInTable: 15,
        coverageStart: "vr_S5P_RPRO_L2_O3_PRODUCT_OZONE_TOTAL_VERTICAL_COLUMN",
        coverageEnd: "vr_S5P_NRTI_L2_O3_PRODUCT_OZONE_TOTAL_VERTICAL_COLUMN",//_4326_0035",
        coverageFallBack: "vr_S5P_OFFL_L2_O3_PRODUCT_OZONE_TOTAL_VERTICAL_COLUMN"
    },
    {
        name: "Aerosol index",
        description: "Sentinel 5P UV Aerosol Index 340-480 nm",
        domain: "Atmosphere",
        orderInTable: 16,
        coverageStart: "vr_S5P_RPRO_L2_AER_AI_PRODUCT_AEROSOL_INDEX",
        coverageEnd: "vr_S5P_RPROOFFLNRTI_L2_AER_AI_PRODUCT_AEROSOL_INDEX",//_4326_0035",
        coverageFallBack: "vr_S5P_OFFL_L2_AER_AI_PRODUCT_AEROSOL_INDEX"
    },
    {
        name: "CH4 total column",
        description: "Sentinel 5P Methane (CH4) total column",
        domain: "Atmosphere",
        orderInTable: 17,
        coverageStart: "vr_S5P_RPRO_L2_CH4_PRODUCT_METHANE_MIXING_RATIO",
        coverageEnd:   "vr_S5P_OFFLNRTI_L2_CH4_PRODUCT_METHANE_MIXING_RATIO",//_4326_0035",
        coverageFallBack: "vr_S5P_OFFL_L2_CH4_PRODUCT_METHANE_MIXING_RATIO"
    },
    {
        orderInTable: 18,
        name: "EEA non EO-RS products"
    },
];

createTable();
