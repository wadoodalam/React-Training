import { useContext } from "react";
import { OfficeContext } from "../Context/OfficeContext";
import { useState } from "react";

export function RenderTable() {
    const { offices } = useContext(OfficeContext);

    const [selectedRegion, setSelectedRegion] = useState('All');
    const [selectedModel, setSelectedModel] = useState('All');

    // get unique regions to display in the drop-down list
    // the map function returns all the office's regions
    // it is then added to the set ensuring only unique values are considered
    const uniqueOfficeRegionsSet = new Set(offices.map(office => office.region));
    const uniqueOfficeModelSet = new Set(offices.map(office => office.model));
   
    
    // convert the set into array for rendering
    const uniqueOfficeRegions = [...uniqueOfficeRegionsSet];
    const uniqueOfficeModel = [...uniqueOfficeModelSet];

    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value);
        // the log will be previous one b/c setSelectedRegion is aysnc and logs before the update
        //console.log(selectedRegion);
    };

    const handleModelChange = (e) => {
        setSelectedModel(e.target.value);
        // the log will be previous one b/c setSelectedModel is aysnc and logs before the update
        //console.log(selectedRegion);
    };

    // const filteredOffices = offices.filter(office => {
    //     if (selectedRegion === 'All') {
    //         return office;
    //     }
    //     return (office.region === selectedRegion);

    // }).filter((office) => {
    //     if (selectedModel === 'All') {
    //         return office;
    //     }
    //     return (office.model === selectedModel);
    // });
    const filteredOffices = offices.filter(office => {
        const regionMatch = selectedRegion === 'All' || office.region === selectedRegion;
        const modelMatch = selectedModel === 'All' || office.model === selectedModel;
        return regionMatch && modelMatch;
    });

    return (
        <div>
            <label>Region Filter</label>
            <select id="region-filter" onChange={handleRegionChange}>
                <option>All</option>
                {uniqueOfficeRegions.map((region) => (
                    <option>{region}</option>
                ))}
            </select>

            <label>Model Filter</label>
            <select id="model-filter" onChange={handleModelChange}>
                <option>All</option>
                {uniqueOfficeModel.map((model) => (
                    <option>{model}</option>
                ))}
            </select>

            <table>
                <thead>
                    <tr>
                        <th>Region</th>
                        <th>Model</th>
                        <th>Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOffices.map((office) => {
                        return (
                            <tr key={office.id}>
                                <td>{office.region}</td>
                                <td>{office.model}</td>
                                <td>{office.sales}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}