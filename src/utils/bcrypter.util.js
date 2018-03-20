import * as bcrypt from "bcrypt";
import * as bluebird from "bluebird";

const saltRounds = 10;


export function getHash(pass) {
    return bluebird.resolve(bcrypt.hash(pass, saltRounds));
}

export function compareHash(pass, hashedPass) {
    return bluebird.resolve(bcrypt.compare(pass, hashedPass));
}