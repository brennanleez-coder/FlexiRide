const SURGE_CHARGE_RATE = 1.5

export const calculate_fare = (duration, multiplier) => {
    return SURGE_CHARGE_RATE * duration * multiplier / 100
}
