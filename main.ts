function KørTilLigeud(Hastighed: number) {
    Kør(1 * Hastighed, 1 * Hastighed)
}

function Kør(Venstre: number, Højre: number) {
    OLED.writeNumNewLine(Venstre)
    OLED.writeNumNewLine(Højre)
    if (Venstre <= 0 && Højre > 0) {
        ContinuousServo.turn_off_motor(DigitalPin.P0)
        ContinuousServo.spin_other_way_with_speed(AnalogPin.P1, 0.5 * Højre)
    } else if (Højre <= 0 && Venstre > 0) {
        ContinuousServo.turn_off_motor(DigitalPin.P1)
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P0, 1 * Venstre)
    } else if (Venstre <= 0 && Højre <= 0) {
        ContinuousServo.turn_off_motor(DigitalPin.P1)
        ContinuousServo.turn_off_motor(DigitalPin.P0)
    } else {
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P0, 1 * Venstre)
        ContinuousServo.spin_other_way_with_speed(AnalogPin.P1, 0.5 * Højre)
    }
    
}

function KørTilVenstre(Hastighed2: number) {
    Kør(0 * Hastighed2, 1 * Hastighed2)
}

function KørTilHøjre(Hastighed3: number) {
    Kør(2.5 * Hastighed3, 0 * Hastighed3)
}

let HøjreLinjeInput = 0
let VenstreLinjeInput = 0
let MaxSpeed = 20
OLED.init(128, 64)
basic.forever(function on_forever() {
    
    OLED.clear()
    VenstreLinjeInput = pins.digitalReadPin(DigitalPin.P13)
    HøjreLinjeInput = pins.digitalReadPin(DigitalPin.P14)
    OLED.writeNumNewLine(VenstreLinjeInput)
    OLED.writeNumNewLine(HøjreLinjeInput)
    if (!VenstreLinjeInput && HøjreLinjeInput) {
        KørTilHøjre(MaxSpeed)
    } else if (!HøjreLinjeInput && VenstreLinjeInput) {
        KørTilVenstre(MaxSpeed)
    } else {
        KørTilLigeud(MaxSpeed)
    }
    
})
