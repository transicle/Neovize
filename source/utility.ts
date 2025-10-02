/**
 * 
 * Alternative to the **`.pop`** method on Arrays, but returning
 *  an Array object instead of a number.
 */
export function append(
    array: any[],
    data: any
): any[] {
    return array[array.length + 1] = data;
}