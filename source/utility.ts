/**
 * 
 * Alternative to the **`.pop`** method on Arrays, but returning
 *  an Array object instead of a number.
 */
export function append<T>(
    array: T[],
    data: T
): T[] {
    return [...array, data];
}