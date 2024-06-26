import { useAppContext } from "../../../data/contexts/AppContext";
import Select from "react-select";


// Importação de Estilos
import '../../styles/inputs/select.css'

const TeamSelect = () => {
    const { teamsOptions, setSelectedTeamId, selectedCompetitionId, isLoading } = useAppContext()

    const formatOptionLabel = ({ label }: { label: string }) => {
        const option = teamsOptions.find((option) => option.name === label);
        if (option) {
            return (
                <div className="option-container">
                    <img width={20} src={option.image} alt={option.name} />
                    <div className="vertical-divider" />
                    <span>{option.name}</span>
                </div>
            );
        }
        return label;
    };

    const options = teamsOptions.map((option) => ({
        value: option.id,
        label: option.name,
        image: option.image,
    }));

    return (
        <div>
            <span>Selecione a equipe</span>
            <Select
                key={selectedCompetitionId}
                placeholder="Selecione uma equipe"
                isDisabled={isLoading}
                isLoading={isLoading}
                noOptionsMessage={() => "Nenhuma equipe encontrada"}
                isClearable
                id="team"
                onChange={(e) => setSelectedTeamId(e?.value || null)}
                options={options}
                formatOptionLabel={({ label }) => formatOptionLabel({ label })}
            />
        </div>
    );
};

export default TeamSelect;
