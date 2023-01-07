import { MinLength } from "class-validator";

export default class {
    constructor(name: string, surname: string) {
        this.name = name
        this.surname = surname
    }
    @MinLength(3)
    readonly name: string;

    @MinLength(3)
    readonly surname!: string;
}
