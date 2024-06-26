import RoundSelect from "../components/inputs/RoundSelect"
import TeamSelect from "../components/inputs/TeamSelect"

const Filters = () => {
    return (
        <div className="filters">
            <TeamSelect />
            <RoundSelect />
        </div>
    )
}

export default Filters