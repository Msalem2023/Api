import SelectableList from "./resuable";

const Location = ({ handelProject }) => {

    const Offices = [
        "United States",
        "Germany",
        "Canada",
        "Australia",
        "Sweden",
        "Switzerland",
        "Norway",
        "Singapore",
        "Netherlands",
        "Japan"
    ];
  

    return (
        <>
            <>
                <SelectableList
                    items={Offices}
                    label="Location"
                    handleSelection={handelProject}
                />
            </>
        </>
    );
}

export default Location;
