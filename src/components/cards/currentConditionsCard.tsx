import React from "react";
import CustomCard from "./customCard";
import { useCalculator } from "../../context/profileContext";
import { CurrentHumidityField, CurrentLookAngleField, CurrentPressureField, CurrentTemperatureField } from "../widgets/measureFields";


interface AtmoCardProps {
    label?: string;
    expanded?: boolean;
}

const CurrentConditionsCard: React.FC<AtmoCardProps> = ({ label = "Zero atmosphere", expanded = true }) => {

    const { currentConditions } = useCalculator();

    if (!currentConditions) {
        return (
            <CustomCard title={label} expanded={expanded} />
        )
    }

    return (
        <CustomCard title={label} expanded={expanded}>
            <CurrentTemperatureField />
            <CurrentPressureField />
            <CurrentHumidityField />
            <CurrentLookAngleField />
        </CustomCard>
    );
};

export default CurrentConditionsCard;
