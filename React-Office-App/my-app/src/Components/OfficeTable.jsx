import { useContext } from "react";
import { OfficeContext } from "../Context/OfficeContext";
import { useState } from "react";

export function RenderTable() {
    const { offices } = useContext(OfficeContext);

    const [selectedRegion, setSelectedRegion] = useState('All');
    const [selectedModel, setSelectedModel] = useState('All');
    const [showSum, setShowSum] = useState(true);

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
    const officesArray = [...offices];
    if (showSum) {
        const officeMap = new Map();
        officesArray.forEach((office) => {
            if (officeMap.has(office.region)) {
                officeMap.set(office.region, officeMap.get(office.region) + office.sales);
            } else {
                officeMap.set(office.region, office.sales);
            }
        });
        officeMap.forEach((sum, region) => {
            const firstOccurence = officesArray.findIndex((office) => office.region === region);
            //console.log(firstOccurence);
            // add before sum row before the first occurence using splice
            officesArray.splice(firstOccurence, 0, {
                region: region,
                model: "Sum",
                sales: sum
            });
        });
        //console.log(officesArray);
    }


    const filteredOffices = offices.filter(office => {
        const regionMatch = selectedRegion === 'All' || office.region === selectedRegion;
        const modelMatch = selectedModel === 'All' || office.model === selectedModel;
        return regionMatch && modelMatch;
    });
    if (!showSum) {
        return (
            <div>
                <button onClick={() => { setShowSum(!showSum); }}>Show Sum Table</button>
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
    } else {
        return (
            <div>
                <button onClick={() => { setShowSum(!showSum); }}>Show Filter Table</button>
                <table>
                    <thead>
                        <tr>
                            <th>Region</th>
                            <th>Model</th>
                            <th>Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {officesArray.map((office) => {
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
}