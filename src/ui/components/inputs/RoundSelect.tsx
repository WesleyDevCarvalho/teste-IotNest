import { useAppContext } from "../../../data/contexts/AppContext";
import Select from "react-select";


// Importação de Estilos
import '../../styles/inputs/select.css'
const RoundSelect = () => {
    const { roundOptions, setRound, selectedCompetitionId, isLoading } = useAppContext()

    return (
        <div>
            <span>Selecione a rodada</span>
            <Select
                key={selectedCompetitionId}
                placeholder="Selecione uma rodada"
                isDisabled={isLoading}
                isLoading={isLoading}
                noOptionsMessage={() => "Nenhuma rodada encontrada"}
                isClearable
                isMulti
                id="competition"
                onChange={(selectedOptions) => setRound(selectedOptions ? selectedOptions.map(option => option.value) : [])}
                options={roundOptions.map((option) => ({
                    value: option,
                    label: option + 'ª rodada',
                }))}
            />
        </div>
    );
};

export default RoundSelect;
