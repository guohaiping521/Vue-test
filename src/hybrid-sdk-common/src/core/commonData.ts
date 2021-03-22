import {hybrid} from "./hybrid"

export function core_getCommonParameters(callback?: Function){
    return hybrid("core_commonData", {}, callback)
}