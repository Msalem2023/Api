import SelectableList from "./resuable"

const Add = ({getParticipants,Participants }) => {

        
    return (
        <>
            <SelectableList
            items={Participants} 
            label="Participants" 
            handleSelection={getParticipants} 
        />
        </>
    )
}
export default Add



