import { useCalculator } from "../../../context/profileContext";
import MeasureFormField, { MeasureFormFieldProps } from "./measureField"
import { UNew, Unit, UnitProps, Measure } from "js-ballistics/dist/v2"
import { usePreferredUnits } from "../../../context/preferredUnitsContext";
import getFractionDigits from "../../../utils/fractionConvertor";


export const SightHeightField = () => {
    const { profileProperties, updateProfileProperties } = useCalculator();

    const { preferredUnits } = usePreferredUnits()

    const prefUnit = preferredUnits.sizes
    const accuracy = getFractionDigits(0.1, UNew.Inch(1).In(prefUnit))

    const fieldProps: Partial<MeasureFormFieldProps> = {
        fKey: "scHeight",
        label: "Sight height",
        icon: "crosshairs",
        fractionDigits: accuracy,
        step: 1 / (10 ** accuracy),
        suffix: UnitProps[prefUnit].symbol,
        minValue: UNew.Inch(-5).In(prefUnit),
        maxValue: UNew.Inch(5).In(prefUnit),
    }

    const value: number = UNew.Millimeter(
        profileProperties?.[fieldProps.fKey] ? 
        profileProperties[fieldProps.fKey] : 2
    ).In(prefUnit)

    const onValueChange = (value: number): void => {
        return updateProfileProperties({
            [fieldProps.fKey]: new Measure.Distance(value, prefUnit).In(Unit.Millimeter)
        })
    }

    return (
        <MeasureFormField
            {...fieldProps}
            value={value}
            onValueChange={onValueChange}
        />
    )
}
