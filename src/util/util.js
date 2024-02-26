export function fromLetterToNumber(letter) {
    let value;

    switch (letter) {
        case "S":
            value = 5;
            break;

        case "A":
            value = 4;
            break;

        case "B":
            value = 3;
            break;

        case "C":
            value = 2;
            break;

        case "D":
            value = 1;
            break;

        default:
            value = -1
    }
    return value;

}