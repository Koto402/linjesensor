def KørTilLigeud(Hastighed: number):
    Kør(1 * Hastighed, 1 * Hastighed)
def Kør(Venstre: number, Højre: number):
    OLED.write_num_new_line(Venstre)
    OLED.write_num_new_line(Højre)
    if Venstre <= 0 and Højre > 0:
        ContinuousServo.turn_off_motor(DigitalPin.P0)
        ContinuousServo.spin_other_way_with_speed(AnalogPin.P1, 0.5 * Højre)
    elif Højre <= 0 and Venstre > 0:
        ContinuousServo.turn_off_motor(DigitalPin.P1)
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P0, 1 * Venstre)
    elif Venstre <= 0 and Højre <= 0:
        ContinuousServo.turn_off_motor(DigitalPin.P1)
        ContinuousServo.turn_off_motor(DigitalPin.P0)
    else:
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P0, 1 * Venstre)
        ContinuousServo.spin_other_way_with_speed(AnalogPin.P1, 0.5 * Højre)
def KørTilVenstre(Hastighed2: number):
    Kør(0 * Hastighed2, 1 * Hastighed2)
def KørTilHøjre(Hastighed3: number):
    Kør(2.5 * Hastighed3, 0 * Hastighed3)
HøjreLinjeInput = 0
VenstreLinjeInput = 0
MaxSpeed = 20
OLED.init(128, 64)

def on_forever():
    global VenstreLinjeInput, HøjreLinjeInput
    OLED.clear()
    VenstreLinjeInput = pins.digital_read_pin(DigitalPin.P13)
    HøjreLinjeInput = pins.digital_read_pin(DigitalPin.P14)
    OLED.write_num_new_line(VenstreLinjeInput)
    OLED.write_num_new_line(HøjreLinjeInput)
    if not (VenstreLinjeInput) and HøjreLinjeInput:
        KørTilHøjre(MaxSpeed)
    elif not (HøjreLinjeInput) and VenstreLinjeInput:
        KørTilVenstre(MaxSpeed)
    else:
        KørTilLigeud(MaxSpeed)
basic.forever(on_forever)
