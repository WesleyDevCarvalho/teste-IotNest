import { useAppContext } from "../../../data/contexts/AppContext";
import Select from "react-select";


// Importação de Estilos
import '../../styles/inputs/select.css'


interface CustomSelectProps extends React.ComponentProps<typeof Select> {
    options: { code: string; name: string; image: string }[];
}

const CompetitionSelect = ({ }: CustomSelectProps) => {
    const { competitionsOptions, setSelectedCompetitionId } = useAppContext()

    const formatOptionLabel = ({ label }: { label: string }) => {
        const option = competitionsOptions.find((option) => option.name === label);
        if (option) {
            return (
                <div className="option-container">
                    <img width={20} src={option.image} alt={option.code} />
                    <div className="vertical-divider" />
                    <span>{option.code}</span>
                    <div className="vertical-divider" />
                    <span>{option.name}</span>
                </div>
            );
        }
        return label;
    };

    const options = competitionsOptions.map((option) => ({
        value: option.id,
        label: option.name,
        image: option.image,
    }));

    return (
        <div>
            <span>Selecione o campeonato *</span>
            <Select
                id="competition"
                placeholder="Selecione um campeonato"
                onChange={(e) => setSelectedCompetitionId(e?.value || null)}
                options={options}
                formatOptionLabel={({ label }) => formatOptionLabel({ label })}
            />
        </div>
    );
};

export default CompetitionSelect;
